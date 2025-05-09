
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface FunnelPage {
  id: string;
  name: string;
  type: 'quiz' | 'result' | 'form' | 'landing' | 'thank_you' | string;
  order_index: number;
  content: any;
  funnel_id: string;
  created_at?: string;
  updated_at?: string;
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
  created_at?: string;
  updated_at?: string;
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
  const fetchPages = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data: pagesData, error: pagesError } = await supabase
        .from('funnel_pages')
        .select('*')
        .eq('funnel_id', funnelId)
        .order('order_index');
        
      if (pagesError) throw pagesError;
      
      // Convert the data to the proper FunnelPage type
      const typedPages: FunnelPage[] = pagesData?.map(page => ({
        id: page.id,
        name: page.name,
        type: page.type,
        order_index: page.order_index,
        content: page.content,
        funnel_id: page.funnel_id,
        created_at: page.created_at,
        updated_at: page.updated_at
      })) || [];
      
      setPages(typedPages);
      
      const { data: rulesData, error: rulesError } = await supabase
        .from('logic_rules')
        .select('*')
        .eq('funnel_id', funnelId);
        
      if (rulesError) throw rulesError;
      
      // Convert the data to the proper LogicRule type
      const typedRules: LogicRule[] = rulesData?.map(rule => ({
        id: rule.id,
        element_id: rule.element_id,
        condition: typeof rule.condition === 'string' 
          ? JSON.parse(rule.condition) 
          : rule.condition as LogicRule['condition'],
        action: typeof rule.action === 'string'
          ? JSON.parse(rule.action)
          : rule.action as LogicRule['action'],
        funnel_id: rule.funnel_id,
        created_at: rule.created_at,
        updated_at: rule.updated_at
      })) || [];
      
      setLogicRules(typedRules);
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
  }, [funnelId, toast]);
  
  // Call fetchPages whenever funnelId changes
  useEffect(() => {
    if (funnelId) {
      fetchPages();
    }
  }, [funnelId, fetchPages]);

  const currentPage = pages[currentPageIndex];
  
  // Function to create multiple pages at once from a template
  const createPagesFromTemplate = useCallback(async (templatePages: any[]) => {
    try {
      // Format pages for insertion
      const pagesToInsert = templatePages.map((page, index) => ({
        name: page.name,
        type: page.type,
        order_index: index,
        funnel_id: funnelId,
        content: page.content
      }));
      
      // Insert all pages at once
      const { data, error } = await supabase
        .from('funnel_pages')
        .insert(pagesToInsert)
        .select();
        
      if (error) throw error;
      
      // Refresh pages to include the new ones
      await fetchPages();
      
      return data;
    } catch (error) {
      console.error('Error creating pages from template:', error);
      toast({
        title: 'Error creating funnel pages',
        description: 'Could not create the funnel pages. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  }, [funnelId, fetchPages, toast]);
  
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
      const { data: validationData, error: validationError } = await supabase.functions.invoke('validate-contact', {
        body: { 
          email, 
          phone: dataToSubmit.phone || null
        }
      });
      
      if (validationError) throw validationError;
      
      if (!validationData?.isValid) {
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
      const { data: scoreData, error: scoreError } = await supabase.functions.invoke('score-lead', {
        body: { leadId: lead.id }
      });
      
      if (scoreError) {
        console.error('Error scoring lead:', scoreError);
      }
      
      setLeadId(lead.id);
      
      toast({
        title: 'Submission successful',
        description: 'Thank you for your submission!',
      });
      
      // Navigate to thank you page if it exists
      const thankYouPageIndex = pages.findIndex(page => page.type === 'thank_you');
      if (thankYouPageIndex !== -1) {
        setCurrentPageIndex(thankYouPageIndex);
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
    createPagesFromTemplate, // Expose the new function for creating pages from templates
    refreshPages: fetchPages, // Allow manual refresh of pages
  };
};
