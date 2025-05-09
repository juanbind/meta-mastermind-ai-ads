
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { LogicRule } from '@/hooks/useFunnelLogic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Interface for field sources (questions or form fields)
interface FieldSource {
  id: string;
  label: string;
  type: string;
  content?: any; // Content property (optional)
}

// Interface for fields that can be used in logic rules
interface LogicField {
  id: string;
  name: string;
  label: string;
  type: string;
  options?: Array<{ value: string, label: string }>;
}

// Interface for the component props
interface LogicRuleBuilderProps {
  initialRules: LogicRule[];
  fieldSources: FieldSource[];
  targetElements: { id: string, label: string, type: string }[];
  onSave: (rules: LogicRule[]) => void;
  onCancel: () => void;
  funnelId: string;
}

const LogicRuleBuilder: React.FC<LogicRuleBuilderProps> = ({
  initialRules,
  fieldSources,
  targetElements,
  onSave,
  onCancel,
  funnelId
}) => {
  const [rules, setRules] = useState<LogicRule[]>(initialRules || []);
  const [logicFields, setLogicFields] = useState<LogicField[]>([]);

  // Set up available logic fields from the field sources
  useEffect(() => {
    const fields: LogicField[] = [];
    
    fieldSources.forEach(source => {
      try {
        // Try to parse content if it's a string
        let parsedContent = source.content;
        if (typeof source.content === 'string') {
          try {
            parsedContent = JSON.parse(source.content);
          } catch (e) {
            console.error('Failed to parse content:', e);
            // Continue with unparsed content
          }
        }
        
        if (source.type === 'MULTIPLE_CHOICE' && parsedContent) {
          // Handle quiz questions
          fields.push({
            id: parsedContent.id || source.id,
            name: parsedContent.id || source.id,
            label: parsedContent.question || source.label,
            type: 'select',
            options: parsedContent.options?.map((opt: any) => ({
              value: opt.value,
              label: opt.label
            }))
          });
        } else if ((source.type === 'FORM' || source.type === 'FORM_BLOCK') && parsedContent) {
          // Handle form fields
          if (parsedContent.fields && Array.isArray(parsedContent.fields)) {
            parsedContent.fields.forEach((field: any) => {
              fields.push({
                id: field.name,
                name: field.name,
                label: field.label,
                type: field.type,
                // Add options if it's a select field
                ...(field.options && {
                  options: field.options.map((opt: any) => ({
                    value: typeof opt === 'string' ? opt : opt.value,
                    label: typeof opt === 'string' ? opt : opt.label
                  }))
                })
              });
            });
          }
        }
      } catch (error) {
        console.error('Error processing field source:', error, source);
      }
    });
    
    setLogicFields(fields);
  }, [fieldSources]);

  // Add a new rule
  const addRule = () => {
    const newRule: LogicRule = {
      id: `temp-${Date.now()}`,
      element_id: '',
      condition: {
        field: '',
        operator: 'equals',
        value: ''
      },
      action: {
        type: 'show',
        target: ''
      },
      funnel_id: funnelId
    };
    
    setRules([...rules, newRule]);
  };

  // Update a rule
  const updateRule = (index: number, updates: Partial<LogicRule>) => {
    setRules(currentRules => 
      currentRules.map((rule, i) => 
        i === index ? { ...rule, ...updates } : rule
      )
    );
  };

  // Delete a rule
  const deleteRule = (index: number) => {
    setRules(currentRules => currentRules.filter((_, i) => i !== index));
  };

  // Get field options based on selected field
  const getFieldOptions = (fieldName: string) => {
    const field = logicFields.find(f => f.name === fieldName);
    return field?.options || [];
  };

  // Handle save
  const handleSave = () => {
    onSave(rules);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Logic Rules Builder</CardTitle>
        <CardDescription>Create rules to show or hide elements based on form responses</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="rules">
          <TabsList className="mb-4">
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="fields">Available Fields</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rules">
            {rules.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No logic rules defined yet. Click "Add Rule" to create one.
              </div>
            ) : (
              <div className="space-y-4">
                {rules.map((rule, index) => (
                  <Card key={index}>
                    <CardHeader className="py-2 px-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">Rule {index + 1}</CardTitle>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteRule(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-2 font-medium">If</div>
                        <div className="md:col-span-3">
                          <Select
                            value={rule.condition.field}
                            onValueChange={(value) => 
                              updateRule(index, {
                                condition: {
                                  ...rule.condition,
                                  field: value
                                }
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select field" />
                            </SelectTrigger>
                            <SelectContent>
                              {logicFields.map((field) => (
                                <SelectItem key={field.name} value={field.name}>
                                  {field.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="md:col-span-2">
                          <Select
                            value={rule.condition.operator}
                            onValueChange={(value) => 
                              updateRule(index, {
                                condition: {
                                  ...rule.condition,
                                  operator: value as LogicRule['condition']['operator']
                                }
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Operator" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="equals">Equals</SelectItem>
                              <SelectItem value="notEquals">Does not equal</SelectItem>
                              <SelectItem value="contains">Contains</SelectItem>
                              <SelectItem value="greaterThan">Greater than</SelectItem>
                              <SelectItem value="lessThan">Less than</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="md:col-span-3">
                          {getFieldOptions(rule.condition.field).length > 0 ? (
                            <Select
                              value={String(rule.condition.value)}
                              onValueChange={(value) => 
                                updateRule(index, {
                                  condition: {
                                    ...rule.condition,
                                    value
                                  }
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select value" />
                              </SelectTrigger>
                              <SelectContent>
                                {getFieldOptions(rule.condition.field).map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              value={String(rule.condition.value || '')}
                              onChange={(e) => 
                                updateRule(index, {
                                  condition: {
                                    ...rule.condition,
                                    value: e.target.value
                                  }
                                })
                              }
                              placeholder="Value"
                            />
                          )}
                        </div>
                        
                        <div className="md:col-span-2">
                          <Select
                            value={rule.action.type}
                            onValueChange={(value) => 
                              updateRule(index, {
                                action: {
                                  ...rule.action,
                                  type: value as LogicRule['action']['type']
                                }
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Action" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="show">Show</SelectItem>
                              <SelectItem value="hide">Hide</SelectItem>
                              <SelectItem value="navigate">Navigate to</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mt-2">
                        <div className="md:col-span-2 md:text-right font-medium">Then</div>
                        <div className="md:col-span-10">
                          <Select
                            value={rule.action.target}
                            onValueChange={(value) => 
                              updateRule(index, {
                                action: {
                                  ...rule.action,
                                  target: value
                                }
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select target" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Elements</SelectLabel>
                                {targetElements.map((element) => (
                                  <SelectItem key={element.id} value={element.id}>
                                    {element.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            <Button onClick={addRule} className="mt-4">
              Add Rule
            </Button>
          </TabsContent>
          
          <TabsContent value="fields">
            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Field Name</th>
                    <th className="text-left p-2">Type</th>
                    <th className="text-left p-2">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {logicFields.map((field) => (
                    <tr key={field.name} className="border-b">
                      <td className="p-2">{field.label}</td>
                      <td className="p-2">{field.type}</td>
                      <td className="p-2">
                        {field.options && field.options.length > 0 ? (
                          <div className="text-xs text-gray-500">
                            {field.options.map(opt => opt.label).join(', ')}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">No options</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save Rules
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LogicRuleBuilder;
