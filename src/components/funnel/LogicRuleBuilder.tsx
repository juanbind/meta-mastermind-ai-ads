
import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { AlertCircle, Plus, Save, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface LogicRuleBuilderProps {
  funnelId: string;
  pages: { id: any; name: any; }[];
  elements: any[];
}

const LogicRuleBuilder: React.FC<LogicRuleBuilderProps> = ({ funnelId, pages, elements = [] }) => {
  const [open, setOpen] = useState(false);
  const [rules, setRules] = useState([]);
  const [selectedElement, setSelectedElement] = useState('');
  const [selectedConditionField, setSelectedConditionField] = useState('');
  const [conditionOperator, setConditionOperator] = useState('');
  const [conditionValue, setConditionValue] = useState('');
  const [actionType, setActionType] = useState('');
  const [actionTarget, setActionTarget] = useState('');
  const [actionValue, setActionValue] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const { data, error } = await supabase
          .from('logic_rules')
          .select('*')
          .eq('funnel_id', funnelId);

        if (error) {
          throw error;
        }

        setRules(data || []);
      } catch (error: any) {
        console.error('Error fetching logic rules:', error);
        toast({
          title: 'Error fetching rules',
          description: error.message || 'Failed to load logic rules.',
          variant: 'destructive',
        });
      }
    };

    if (funnelId) {
      fetchRules();
    }
  }, [funnelId, toast]);

  const addRule = async () => {
    if (!selectedElement || !conditionOperator || !actionType || !actionTarget) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    const newRule = {
      element_id: selectedElement,
      condition: {
        field: selectedConditionField,
        operator: conditionOperator,
        value: conditionValue,
      },
      action: {
        type: actionType,
        target: actionTarget,
        value: actionValue,
      },
      funnel_id: funnelId,
    };

    try {
      const { data, error } = await supabase
        .from('logic_rules')
        .insert([newRule])
        .select();

      if (error) {
        throw error;
      }

      setRules([...rules, data[0]]);
      setOpen(false);
      toast({
        title: 'Rule added',
        description: 'New logic rule has been added successfully.',
      });
    } catch (error: any) {
      console.error('Error adding logic rule:', error);
      toast({
        title: 'Error adding rule',
        description: error.message || 'Failed to add logic rule.',
        variant: 'destructive',
      });
    }
  };

  const deleteRule = async (ruleId: string) => {
    try {
      const { error } = await supabase
        .from('logic_rules')
        .delete()
        .eq('id', ruleId);

      if (error) {
        throw error;
      }

      setRules(rules.filter((rule) => rule.id !== ruleId));
      toast({
        title: 'Rule deleted',
        description: 'Logic rule has been deleted successfully.',
      });
    } catch (error: any) {
      console.error('Error deleting logic rule:', error);
      toast({
        title: 'Error deleting rule',
        description: error.message || 'Failed to delete logic rule.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Logic Rule
        </Button>
      </div>

      {rules.length > 0 ? (
        <div className="space-y-2">
          {rules.map((rule: any) => (
            <div key={rule.id} className="border rounded-md p-3 flex items-center justify-between">
              <div>
                <p>
                  <strong>Element:</strong> {rule.element_id}, <strong>Condition:</strong> {rule.condition?.field} {rule.condition?.operator} {rule.condition?.value}, <strong>Action:</strong> {rule.action?.type} to {rule.action?.target}
                </p>
              </div>
              <Button variant="outline" size="icon" onClick={() => deleteRule(rule.id)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="border rounded-md p-3 text-center">
          <AlertCircle className="mx-auto h-6 w-6 text-gray-500 mb-2" />
          <p className="text-gray-500">No logic rules defined yet.</p>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Logic Rule</DialogTitle>
            <DialogDescription>
              Define the logic for your funnel elements.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="element" className="text-right">
                Element
              </label>
              <Select onValueChange={(value) => setSelectedElement(value)} defaultValue={selectedElement}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select an element" />
                </SelectTrigger>
                <SelectContent>
                  {elements.map((element: any) => (
                    <SelectItem key={element.id} value={element.id}>
                      {element.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="conditionField" className="text-right">
                Condition Field
              </label>
              <Input id="conditionField" value={selectedConditionField} onChange={(e) => setSelectedConditionField(e.target.value)} className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="conditionOperator" className="text-right">
                Condition Operator
              </label>
              <Select onValueChange={(value) => setConditionOperator(value)} defaultValue={conditionOperator}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select an operator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equals">Equals</SelectItem>
                  <SelectItem value="notEquals">Not Equals</SelectItem>
                  <SelectItem value="contains">Contains</SelectItem>
                  <SelectItem value="greaterThan">Greater Than</SelectItem>
                  <SelectItem value="lessThan">Less Than</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="conditionValue" className="text-right">
                Condition Value
              </label>
              <Input id="conditionValue" value={conditionValue} onChange={(e) => setConditionValue(e.target.value)} className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="actionType" className="text-right">
                Action Type
              </label>
              <Select onValueChange={(value) => setActionType(value)} defaultValue={actionType}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select an action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="show">Show</SelectItem>
                  <SelectItem value="hide">Hide</SelectItem>
                  <SelectItem value="navigate">Navigate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="actionTarget" className="text-right">
                Action Target
              </label>
              <Select onValueChange={(value) => setActionTarget(value)} defaultValue={actionTarget}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a page" />
                </SelectTrigger>
                <SelectContent>
                  {pages.map((page: any) => (
                    <SelectItem key={page.id} value={page.id}>
                      {page.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="actionValue" className="text-right">
                Action Value
              </label>
              <Input id="actionValue" value={actionValue} onChange={(e) => setActionValue(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <Button onClick={addRule}>Add Rule</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LogicRuleBuilder;
