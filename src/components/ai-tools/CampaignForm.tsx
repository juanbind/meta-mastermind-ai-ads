
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface CampaignFormProps {
  businessName: string;
  campaignName: string;
  websiteUrl: string;
  salesFunnelUrl: string;
  budgetRange: number[];
  timeframeValue: number;
  timeframeUnit: string;
  onBusinessNameChange: (value: string) => void;
  onCampaignNameChange: (value: string) => void;
  onWebsiteUrlChange: (value: string) => void;
  onSalesFunnelUrlChange: (value: string) => void;
  onBudgetRangeChange: (value: number[]) => void;
  onTimeframeValueChange: (value: number) => void;
  onTimeframeUnitChange: (value: string) => void;
}

const CampaignForm: React.FC<CampaignFormProps> = ({
  businessName,
  campaignName,
  websiteUrl,
  salesFunnelUrl,
  budgetRange,
  timeframeValue,
  timeframeUnit,
  onBusinessNameChange,
  onCampaignNameChange,
  onWebsiteUrlChange,
  onSalesFunnelUrlChange,
  onBudgetRangeChange,
  onTimeframeValueChange,
  onTimeframeUnitChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="businessName" className="block mb-2">Business Name</Label>
        <Input
          id="businessName"
          placeholder="Enter your business name"
          value={businessName}
          onChange={(e) => onBusinessNameChange(e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="campaignName" className="block mb-2">Campaign Name</Label>
        <Input
          id="campaignName"
          placeholder="Enter campaign name"
          value={campaignName}
          onChange={(e) => onCampaignNameChange(e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="websiteUrl" className="block mb-2">Website URL</Label>
        <Input
          id="websiteUrl"
          placeholder="https://yourwebsite.com"
          value={websiteUrl}
          onChange={(e) => onWebsiteUrlChange(e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="salesFunnelUrl" className="block mb-2">Sales Funnel URL (optional)</Label>
        <Input
          id="salesFunnelUrl"
          placeholder="https://yourfunnel.com"
          value={salesFunnelUrl}
          onChange={(e) => onSalesFunnelUrlChange(e.target.value)}
        />
      </div>
      
      <div>
        <Label className="block mb-2">Budget Range (per day)</Label>
        <div className="pt-4 pb-2">
          <Slider
            defaultValue={[budgetRange[0], budgetRange[1]]} 
            min={5}
            max={1000}
            step={5}
            onValueChange={onBudgetRangeChange}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>${budgetRange[0]}</span>
          <span>${budgetRange[1]}</span>
        </div>
      </div>
      
      <div>
        <Label className="block mb-2">Campaign Timeframe</Label>
        <div className="flex items-center gap-3">
          <Input
            type="number"
            min={1}
            className="w-24"
            value={timeframeValue}
            onChange={(e) => onTimeframeValueChange(parseInt(e.target.value))}
          />
          <RadioGroup 
            value={timeframeUnit} 
            onValueChange={onTimeframeUnitChange}
            className="flex flex-row gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="days" id="days" />
              <Label htmlFor="days">Days</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weeks" id="weeks" />
              <Label htmlFor="weeks">Weeks</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;
