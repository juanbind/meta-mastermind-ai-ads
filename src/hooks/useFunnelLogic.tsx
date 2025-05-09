
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface FunnelPage {
  id: string;
  name: string;
  type: 'quiz' | 'result' | 'form' | 'landing' | 'thank_you';
  order_index: number;
  content: any;
  funnel_id: string;
}

export interface LogicRule {
  id: string;
  element_id: string;
  condition: {
    field: string;
    operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan';
    value: any;
  };
  action: {
    type: 'show' | 'hide' | 'navigate' | 'setValue';
    target: string;
    value?: any;
  };
  funnel_id: string;
}

interface UseFunnelLogicProps {
  funnelId: string;
}

export const useFunnelLogic = ({ funnelId }: UseFunnelLogicProps) => {
  const [pages, setPages] = useState<FunnelPage[]>([]);
  const [logicRules, setLogicRules] = useState<LogicRule[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [leadId, setLeadId] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch funnel pages
  useEffect(() => {
    const fetchPages = async () => {
      try {
        setIsLoading(true);
        const { data: pagesData, error: pagesError } = await supabase
          .from('funnel_pages')
          .select('*')
          .eq('funnel_id', funnelId)
          .order('order_index');
          
        if (pagesError) throw pagesError;
        
        setPages(pagesData || []);
        
        const { data: rulesData, error: rulesError } = await supabase
          .from('logic_rules')
          .select('*')
          .eq('funnel_id', funnelId);
          
        if (rulesError) throw rulesError;
        
        setLogicRules(rulesData || []);
      } catch (error) {
        console.error('Error fetching funnel data:', error);
        toast({
          title: 'Error loading funnel',
          description: 'Could not load funnel data. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (funnelId) {
      fetchPages();
    }
  }, [funnelId, toast]);

  const currentPage = pages[currentPageIndex];
  
  const navigateToNextPage = useCallback(() => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
      
      // Apply any relevant navigation logic
      const navigationRules = logicRules.filter(rule => 
        rule.action.type === 'navigate' && 
        evaluateCondition(rule.condition, formState)
      );
      
      if (navigationRules.length > 0) {
        const targetPageIndex = pages.findIndex(page => page.id === navigationRules[0].action.target);
        if (targetPageIndex !== -1) {
          setCurrentPageIndex(targetPageIndex);
        }
      }
    }
  }, [currentPageIndex, pages, logicRules, formState]);
  
  const navigateToPreviousPage = useCallback(() => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  }, [currentPageIndex]);

  const updateFormValue = useCallback((field: string, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  }, []);
  
  const submitForm = useCallback(async (finalData?: Record<string, any>) => {
    try {
      const dataToSubmit = finalData || formState;
      
      const email = dataToSubmit.email;
      if (!email) {
        throw new Error('Email is required');
      }
      
      // Validate contact info
      const { data: validationData } = await supabase.functions.invoke('validate-contact', {
        body: { 
          email, 
          phone: dataToSubmit.phone || null
        }
      });
      
      if (!validationData.isValid) {
        toast({
          title: 'Invalid contact information',
          description: 'Please provide a valid email and phone number.',
          variant: 'destructive',
        });
        return;
      }
      
      // Save lead to database
      const { data: lead, error: leadError } = await supabase
        .from('leads')
        .insert({
          email: validationData.sanitized.email,
          phone: validationData.sanitized.phone,
          funnel_id: funnelId,
          answers: dataToSubmit
        })
        .select()
        .single();
        
      if (leadError) throw leadError;
      
      // Trigger lead scoring
      await supabase.functions.invoke('score-lead', {
        body: { leadId: lead.id }
      });
      
      setLeadId(lead.id);
      
      toast({
        title: 'Submission successful',
        description: 'Thank you for your submission!',
      });
      
      // Navigate to thank you page if it exists
      const thankYouPage = pages.findIndex(page => page.type === 'thank_you');
      if (thankYouPage !== -1) {
        setCurrentPageIndex(thankYouPage);
      }
      
      return lead;
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error submitting form',
        description: error.message || 'Please try again later.',
        variant: 'destructive',
      });
      return null;
    }
  }, [funnelId, formState, pages, toast]);

  function evaluateCondition(condition: LogicRule['condition'], state: Record<string, any>): boolean {
    if (!condition || !condition.field || !condition.operator) return true;
    
    const fieldValue = state[condition.field];
    const targetValue = condition.value;
    
    switch (condition.operator) {
      case 'equals':
        return fieldValue === targetValue;
      case 'notEquals':
        return fieldValue !== targetValue;
      case 'contains':
        return String(fieldValue || '').includes(String(targetValue));
      case 'greaterThan':
        return Number(fieldValue || 0) > Number(targetValue);
      case 'lessThan':
        return Number(fieldValue || 0) < Number(targetValue);
      default:
        return true;
    }
  }
  
  // Get rules applicable to a specific element
  const getRulesForElement = useCallback((elementId: string) => {
    return logicRules.filter(rule => 
      rule.element_id === elementId && 
      (rule.action.type === 'show' || rule.action.type === 'hide')
    );
  }, [logicRules]);

  return {
    pages,
    currentPage,
    currentPageIndex,
    formState,
    isLoading,
    leadId,
    logicRules,
    navigateToNextPage,
    navigateToPreviousPage,
    updateFormValue,
    submitForm,
    getRulesForElement,
  };
};
