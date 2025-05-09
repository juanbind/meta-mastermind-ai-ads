
import React, { useState, useEffect } from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';
import ContentBlockRenderer from '../ContentBlockRenderer';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ContentElementRendererProps {
  type: string;
  content: any;
  props?: Record<string, any>;
  device: 'mobile' | 'tablet' | 'desktop';
  onSubmit?: (data: any) => void;
  logicRules?: any[];
  formState?: Record<string, any>;
  onFormChange?: (field: string, value: any) => void;
}

const ContentElementRenderer: React.FC<ContentElementRendererProps> = ({ 
  type, 
  content, 
  props = {}, 
  device, 
  onSubmit,
  logicRules = [],
  formState = {},
  onFormChange
}) => {
  const { toast } = useToast();
  const [parsedContent, setParsedContent] = useState<any>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    try {
      // Parse content if it's a string, otherwise use it directly
      setParsedContent(typeof content === 'string' ? JSON.parse(content) : content);
    } catch (error) {
      console.error(`Error parsing content for ${type}:`, error);
      setParsedContent(null);
    }
  }, [content, type]);

  useEffect(() => {
    // Check if this element should be visible based on logic rules
    if (logicRules && logicRules.length > 0) {
      const shouldBeVisible = evaluateLogicRules(logicRules, formState);
      setIsVisible(shouldBeVisible);
    }
  }, [logicRules, formState]);

  const evaluateLogicRules = (rules: any[], currentFormState: Record<string, any>) => {
    // If no rules, element is visible by default
    if (!rules || rules.length === 0) return true;

    // Evaluate each rule
    return rules.some(rule => {
      const { condition } = rule;
      
      // Skip if no valid condition
      if (!condition || !condition.field || !condition.operator) return true;
      
      const fieldValue = currentFormState[condition.field];
      const targetValue = condition.value;
      
      switch (condition.operator) {
        case 'equals':
          return fieldValue === targetValue;
        case 'notEquals':
          return fieldValue !== targetValue;
        case 'contains':
          return String(fieldValue).includes(String(targetValue));
        case 'greaterThan':
          return Number(fieldValue) > Number(targetValue);
        case 'lessThan':
          return Number(fieldValue) < Number(targetValue);
        default:
          return true;
      }
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (onFormChange) {
      onFormChange(field, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default submit behavior for forms
        if (type === 'form' && props.submitEndpoint) {
          await supabase.functions.invoke(props.submitEndpoint, {
            body: { formData }
          });
          toast({
            title: "Form submitted successfully",
            description: props.successMessage || "Thank you for your submission!",
          });
          setFormData({});
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error submitting form",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for validating contact info
  const validateContactInfo = async (email: string, phone?: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('validate-contact', {
        body: { email, phone }
      });
      
      if (error) throw error;
      return data.isValid;
    } catch (error) {
      console.error('Error validating contact:', error);
      return false;
    }
  };

  if (!isVisible) {
    return null;
  }

  // Handle special components based on type
  if (type === 'form') {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {parsedContent && Array.isArray(parsedContent.fields) && parsedContent.fields.map((field: any, index: number) => {
          // Apply field-level logic
          const fieldLogic = logicRules?.filter(rule => rule.element_id === field.id) || [];
          const fieldVisible = evaluateLogicRules(fieldLogic, formState);
          
          if (!fieldVisible) return null;
          
          switch (field.type) {
            case 'text':
            case 'email':
            case 'phone':
              return (
                <div key={index} className="space-y-2">
                  <label htmlFor={field.name} className="text-sm font-medium">
                    {field.label}{field.required && <span className="text-red-500">*</span>}
                  </label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full"
                  />
                </div>
              );
            
            case 'textarea':
              return (
                <div key={index} className="space-y-2">
                  <label htmlFor={field.name} className="text-sm font-medium">
                    {field.label}{field.required && <span className="text-red-500">*</span>}
                  </label>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full"
                    rows={4}
                  />
                </div>
              );
              
            case 'select':
              return (
                <div key={index} className="space-y-2">
                  <label htmlFor={field.name} className="text-sm font-medium">
                    {field.label}{field.required && <span className="text-red-500">*</span>}
                  </label>
                  <Select
                    value={formData[field.name] || ''}
                    onValueChange={(value) => handleInputChange(field.name, value)}
                    name={field.name}
                    required={field.required}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={field.placeholder || 'Select an option'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {field.options && field.options.map((option: any, optIdx: number) => (
                          <SelectItem key={optIdx} value={option.value || option}>
                            {option.label || option}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              );
              
            default:
              return null;
          }
        })}
        
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Submitting...' : (parsedContent?.buttonText || 'Submit')}
        </Button>
      </form>
    );
  }

  // Quiz component
  if (type === 'quiz') {
    return (
      <div className="space-y-6">
        {parsedContent && (
          <>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">{parsedContent.question}</h3>
              {parsedContent.description && (
                <p className="text-metamaster-gray-600">{parsedContent.description}</p>
              )}
            </div>
            
            <div className="space-y-3">
              {parsedContent.options && parsedContent.options.map((option: any, index: number) => (
                <div 
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    formData[parsedContent.id] === option.value 
                      ? 'border-metamaster-primary bg-metamaster-primary/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleInputChange(parsedContent.id, option.value)}
                >
                  {option.label}
                  {option.description && (
                    <p className="text-sm text-metamaster-gray-500 mt-1">{option.description}</p>
                  )}
                </div>
              ))}
            </div>
            
            {props.showNavigation !== false && (
              <div className="flex justify-between items-center mt-8">
                {props.onPrevious && (
                  <Button variant="outline" onClick={props.onPrevious}>
                    Back
                  </Button>
                )}
                <div className="flex-1" />
                {props.onNext && (
                  <Button 
                    onClick={props.onNext}
                    disabled={!formData[parsedContent.id] && parsedContent.required}
                    className="flex items-center"
                  >
                    Next <ArrowRight size={16} className="ml-2" />
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // Try to render the content using ContentBlockRenderer
  try {
    return (
      <ContentBlockRenderer 
        type={type} 
        content={parsedContent || content} 
        props={props} 
        device={device} 
      />
    );
  } catch (error) {
    console.error(`Error rendering content element of type ${type}:`, error);
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <div className="flex items-center text-red-700">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>Error rendering {type}</span>
        </div>
      </div>
    );
  }
};

export default ContentElementRenderer;
