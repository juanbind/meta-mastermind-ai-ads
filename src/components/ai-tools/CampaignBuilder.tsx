
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, ArrowDown } from 'lucide-react';

interface CampaignBuilderProps {
  budgetType: string;
  dailyBudget: number;
  optimizationEvent: string;
  attribution: string;
  campaignObjective: string;
  adSetNaming?: string;
  adScheduling: {
    startDate: Date;
    endDate: Date | null;
  };
  onBudgetTypeChange: (value: string) => void;
  onDailyBudgetChange: (value: number) => void;
  onOptimizationEventChange: (value: string) => void;
  onAttributionChange: (value: string) => void;
  onCampaignObjectiveChange: (value: string) => void;
  onAdSetNamingChange: (value: string) => void;
  onSchedulingChange: (field: string, value: Date | null) => void;
}

const CampaignBuilder: React.FC<CampaignBuilderProps> = ({
  budgetType,
  dailyBudget,
  optimizationEvent,
  attribution,
  campaignObjective,
  adSetNaming,
  adScheduling,
  onBudgetTypeChange,
  onDailyBudgetChange,
  onOptimizationEventChange,
  onAttributionChange,
  onCampaignObjectiveChange,
  onAdSetNamingChange,
  onSchedulingChange,
}) => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-medium text-lg mb-4">Budget Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <Label>Budget Type</Label>
            <RadioGroup
              value={budgetType}
              onValueChange={onBudgetTypeChange}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="CBO" id="cbo" />
                <Label htmlFor="cbo" className="cursor-pointer">Campaign Budget Optimization (CBO)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ABO" id="abo" />
                <Label htmlFor="abo" className="cursor-pointer">Ad Set Budget Optimization (ABO)</Label>
              </div>
            </RadioGroup>
            <p className="text-xs text-gray-500 mt-1">
              {budgetType === 'CBO' ? 
                'Facebook will automatically distribute your budget across ad sets to get the best overall results.' :
                'You control exactly how much budget each ad set receives.'}
            </p>
          </div>
          
          <div>
            <Label htmlFor="daily-budget">Daily Budget</Label>
            <div className="flex items-center mt-1">
              <span className="text-gray-500 mr-2">$</span>
              <Input
                id="daily-budget"
                type="number"
                value={dailyBudget}
                onChange={(e) => onDailyBudgetChange(parseFloat(e.target.value) || 0)}
                min={1}
                step={1}
              />
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="font-medium text-lg mb-4">Campaign Settings</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="objective">Campaign Objective</Label>
            <Select 
              value={campaignObjective}
              onValueChange={onCampaignObjectiveChange}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select objective" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LEAD_GENERATION">Lead Generation</SelectItem>
                <SelectItem value="CONVERSIONS">Conversions</SelectItem>
                <SelectItem value="TRAFFIC">Traffic</SelectItem>
                <SelectItem value="ENGAGEMENT">Engagement</SelectItem>
                <SelectItem value="AWARENESS">Brand Awareness</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="optimization">Optimization Event</Label>
            <Select 
              value={optimizationEvent}
              onValueChange={onOptimizationEventChange}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select optimization event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LEAD">Lead</SelectItem>
                <SelectItem value="PURCHASE">Purchase</SelectItem>
                <SelectItem value="LINK_CLICK">Link Click</SelectItem>
                <SelectItem value="PAGE_VIEW">Page View</SelectItem>
                <SelectItem value="ADD_TO_CART">Add to Cart</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="attribution">Attribution Setting</Label>
            <Select 
              value={attribution}
              onValueChange={onAttributionChange}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select attribution setting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1_DAY_CLICK">1-day click</SelectItem>
                <SelectItem value="7_DAY_CLICK">7-day click</SelectItem>
                <SelectItem value="28_DAY_CLICK">28-day click</SelectItem>
                <SelectItem value="1_DAY_IMPRESSION">1-day impression</SelectItem>
                <SelectItem value="7_DAY_IMPRESSION">7-day impression</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="naming">Ad Set Naming Convention</Label>
            <Input
              id="naming"
              value={adSetNaming}
              onChange={(e) => onAdSetNamingChange(e.target.value)}
              placeholder="e.g., [Audience Type]_[Target]_[Budget]"
              className="mt-1"
            />
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="font-medium text-lg mb-4">Ad Scheduling</h3>
        
        <div className="space-y-4">
          <div>
            <Label>Campaign Timeline</Label>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex-1 flex items-center gap-2 border p-2 rounded-md">
                <Calendar size={16} className="text-gray-400" />
                <Input
                  type="date"
                  value={adScheduling.startDate ? adScheduling.startDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : new Date();
                    onSchedulingChange('startDate', date);
                  }}
                  className="border-0 p-0 focus-visible:ring-0"
                />
              </div>
              
              <ArrowDown size={16} className="text-gray-400" />
              
              <div className="flex-1 flex items-center gap-2 border p-2 rounded-md">
                <Calendar size={16} className="text-gray-400" />
                <Input
                  type="date"
                  value={adScheduling.endDate ? adScheduling.endDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : null;
                    onSchedulingChange('endDate', date);
                  }}
                  className="border-0 p-0 focus-visible:ring-0"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CampaignBuilder;
