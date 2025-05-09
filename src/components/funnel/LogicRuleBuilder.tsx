import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, ArrowRightLeft, Code } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

interface LogicRuleBuilderProps {
  funnelId: string;
  elements: Array<{id: string, label: string, type: string}>;
  pages?: Array<{id: string, name: string}>;
  onRulesChange?: (rules: any[]) => void;
}

const LogicRuleBuilder: React.FC<LogicRuleBuilderProps> = ({ 
  funnelId, 
  elements, 
  pages = [],
  onRulesChange 
}) => {
  const [rules, setRules] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Fetch existing rules on component mount
  useEffect(() => {
    const fetchRules = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('logic_rules')
          .select('*')
          .eq('funnel_id', funnelId);
          
        if (error) throw error;
        setRules(data || []);
        
        if (onRulesChange) {
          onRulesChange(data || []);
        }
      } catch (error) {
        console.error('Error fetching logic rules:', error);
        toast({
          title: 'Error loading rules',
          description: 'Could not load logic rules. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (funnelId) {
      fetchRules();
    }
  }, [funnelId, toast, onRulesChange]);

  const addNewRule = () => {
    const newRule = {
      id: `temp-${Date.now()}`,
      element_id: '',
      condition: {
        field: '',
        operator: 'equals',
        value: ''
      },
      action: {
        type: 'show',
        target: '',
        value: ''
      },
      funnel_id: funnelId,
      isNew: true
    };
    
    setRules([...rules, newRule]);
  };

  const updateRule = (index: number, field: string, value: any) => {
    const updatedRules = [...rules];
    
    // Handle nested fields
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      updatedRules[index][parent][child] = value;
    } else {
      updatedRules[index][field] = value;
    }
    
    updatedRules[index].hasChanges = true;
    setRules(updatedRules);
  };

  const deleteRule = async (index: number) => {
    const ruleToDelete = rules[index];
    
    if (ruleToDelete.isNew) {
      // Just remove from local state if it's a new unsaved rule
      const updatedRules = rules.filter((_, i) => i !== index);
      setRules(updatedRules);
      return;
    }
    
    // Otherwise delete from database
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('logic_rules')
        .delete()
        .eq('id', ruleToDelete.id);
        
      if (error) throw error;
      
      const updatedRules = rules.filter((_, i) => i !== index);
      setRules(updatedRules);
      
      if (onRulesChange) {
        onRulesChange(updatedRules);
      }
      
      toast({
        title: 'Rule deleted',
        description: 'Logic rule has been removed.'
      });
    } catch (error) {
      console.error('Error deleting rule:', error);
      toast({
        title: 'Error deleting rule',
        description: 'Could not delete rule. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveAllRules = async () => {
    try {
      setIsLoading(true);
      
      // Process each rule
      for (const rule of rules) {
        if (rule.isNew || rule.hasChanges) {
          const { id, isNew, hasChanges, ...ruleData } = rule;
          
          if (isNew) {
            // Insert new rule
            const { error } = await supabase
              .from('logic_rules')
              .insert(ruleData);
              
            if (error) throw error;
          } else {
            // Update existing rule
            const { error } = await supabase
              .from('logic_rules')
              .update(ruleData)
              .eq('id', id);
              
            if (error) throw error;
          }
        }
      }
      
      // Refetch rules to get the server-generated IDs for new rules
      const { data, error } = await supabase
        .from('logic_rules')
        .select('*')
        .eq('funnel_id', funnelId);
        
      if (error) throw error;
      
      setRules(data || []);
      
      if (onRulesChange) {
        onRulesChange(data || []);
      }
      
      toast({
        title: 'Rules saved',
        description: 'Logic rules have been saved successfully.'
      });
    } catch (error) {
      console.error('Error saving rules:', error);
      toast({
        title: 'Error saving rules',
        description: 'Could not save rules. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get all available form fields from elements
  const getAvailableFields = () => {
    const formFields: {id: string, label: string}[] = [];
    
    elements.forEach(element => {
      // For form elements, add each field
      if (element.type === 'form' && element.content) {
        try {
          const content = typeof element.content === 'string' 
            ? JSON.parse(element.content) 
            : element.content;
            
          if (content.fields && Array.isArray(content.fields)) {
            content.fields.forEach((field: any) => {
              if (field.name) {
                formFields.push({
                  id: field.name,
                  label: `${element.label} - ${field.label || field.name}`
                });
              }
            });
          }
        } catch (e) {
          console.error('Error parsing form fields:', e);
        }
      }
      
      // For quiz elements, add the question as a field
      if (element.type === 'quiz' && element.id) {
        formFields.push({
          id: element.id,
          label: element.label
        });
      }
    });
    
    return formFields;
  };

  const formFields = getAvailableFields();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Logic Rules</h3>
        <Button 
          onClick={addNewRule} 
          variant="outline" 
          size="sm"
          className="flex items-center"
        >
          <Plus size={16} className="mr-2" /> Add Rule
        </Button>
      </div>
      
      {rules.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
          <Code size={36} className="mx-auto text-gray-400 mb-2" />
          <h4 className="font-medium mb-1">No Logic Rules</h4>
          <p className="text-sm text-gray-500 mb-4">
            Logic rules help create interactive funnels with conditions.
          </p>
          <Button onClick={addNewRule} size="sm">
            <Plus size={16} className="mr-2" /> Create First Rule
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {rules.map((rule, index) => (
            <Card key={rule.id} className="relative">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>Rule {index + 1}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => deleteRule(index)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pb-2">
                {/* Element selector */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Element</label>
                  <Select
                    value={rule.element_id || ''}
                    onValueChange={(value) => updateRule(index, 'element_id', value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select element" />
                    </SelectTrigger>
                    <SelectContent>
                      {elements.map(element => (
                        <SelectItem key={element.id} value={element.id}>
                          {element.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Condition builder */}
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="text-sm font-medium text-gray-700 mb-2">When:</div>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="col-span-2">
                      <Select
                        value={rule.condition.field || ''}
                        onValueChange={(value) => updateRule(index, 'condition.field', value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent>
                          {formFields.map(field => (
                            <SelectItem key={field.id} value={field.id}>
                              {field.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select
                        value={rule.condition.operator || 'equals'}
                        onValueChange={(value) => updateRule(index, 'condition.operator', value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equals">equals</SelectItem>
                          <SelectItem value="notEquals">not equals</SelectItem>
                          <SelectItem value="contains">contains</SelectItem>
                          <SelectItem value="greaterThan">greater than</SelectItem>
                          <SelectItem value="lessThan">less than</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Input
                        value={rule.condition.value || ''}
                        onChange={(e) => updateRule(index, 'condition.value', e.target.value)}
                        placeholder="Value"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Action builder */}
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <ArrowRightLeft size={16} className="mr-2" /> Then:
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <div>
                      <Select
                        value={rule.action.type || 'show'}
                        onValueChange={(value) => updateRule(index, 'action.type', value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="show">Show</SelectItem>
                          <SelectItem value="hide">Hide</SelectItem>
                          <SelectItem value="navigate">Navigate to</SelectItem>
                          <SelectItem value="setValue">Set value</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-4">
                      {rule.action.type === 'navigate' ? (
                        <Select
                          value={rule.action.target || ''}
                          onValueChange={(value) => updateRule(index, 'action.target', value)}
                          disabled={isLoading}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select page" />
                          </SelectTrigger>
                          <SelectContent>
                            {pages.map(page => (
                              <SelectItem key={page.id} value={page.id}>
                                {page.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : rule.action.type === 'setValue' ? (
                        <div className="grid grid-cols-2 gap-2">
                          <Select
                            value={rule.action.target || ''}
                            onValueChange={(value) => updateRule(index, 'action.target', value)}
                            disabled={isLoading}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select field" />
                            </SelectTrigger>
                            <SelectContent>
                              {formFields.map(field => (
                                <SelectItem key={field.id} value={field.id}>
                                  {field.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            value={rule.action.value || ''}
                            onChange={(e) => updateRule(index, 'action.value', e.target.value)}
                            placeholder="Value"
                            disabled={isLoading}
                          />
                        </div>
                      ) : (
                        <Select
                          value={rule.action.target || ''}
                          onValueChange={(value) => updateRule(index, 'action.target', value)}
                          disabled={isLoading}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select element" />
                          </SelectTrigger>
                          <SelectContent>
                            {elements.map(element => (
                              <SelectItem key={element.id} value={element.id}>
                                {element.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              
              {(rule.isNew || rule.hasChanges) && (
                <CardFooter className="pt-1 pb-3 justify-end">
                  <div className="text-xs text-amber-500 font-medium">
                    * Unsaved changes
                  </div>
                </CardFooter>
              )}
            </Card>
          ))}
          
          <div className="flex justify-end">
            <Button 
              onClick={saveAllRules} 
              disabled={isLoading || !rules.some(rule => rule.isNew || rule.hasChanges)}
            >
              {isLoading ? 'Saving...' : 'Save All Rules'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogicRuleBuilder;
