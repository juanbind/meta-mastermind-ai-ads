
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { CampaignData } from '@/pages/CampaignBuilder';
import { Loader } from 'lucide-react';

interface CampaignIntelligenceProps {
  campaignData: CampaignData;
  updateCampaignData: (data: Partial<CampaignData>) => void;
  onNext: () => void;
  isProcessing: boolean;
}

const offerTypes = [
  'Lead Magnet',
  'Webinar',
  'Product',
  'Service',
  'Consultation',
  'Free Trial',
  'Discount',
  'Event'
];

const budgetRanges = [
  '0-500',
  '500-1000',
  '1000-2500',
  '2500-5000',
  '5000-10000',
  '10000+'
];

const timeframeOptions = [
  { value: '3', label: '3 days' },
  { value: '7', label: '1 week' },
  { value: '14', label: '2 weeks' },
  { value: '30', label: '30 days' },
  { value: '60', label: '60 days' },
  { value: '90', label: '90 days' }
];

const CampaignIntelligence: React.FC<CampaignIntelligenceProps> = ({ 
  campaignData, 
  updateCampaignData, 
  onNext,
  isProcessing 
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };
  
  const isFormValid = campaignData.offerType && campaignData.offerDescription && campaignData.budgetRange && campaignData.timeframe;
  
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-center">Campaign Intelligence</h2>
      <p className="text-gray-600 mb-8 text-center">
        Tell us about your offer, and our AI will craft the perfect campaign structure
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="offerType">Offer Type</Label>
            <Select 
              value={campaignData.offerType}
              onValueChange={(value) => updateCampaignData({ offerType: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select offer type" />
              </SelectTrigger>
              <SelectContent>
                {offerTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="offerDescription">Main Offer Description</Label>
            <Textarea 
              id="offerDescription"
              placeholder="Describe your offer in detail. What problem does it solve? Who is it for? What makes it unique?"
              value={campaignData.offerDescription}
              onChange={(e) => updateCampaignData({ offerDescription: e.target.value })}
              className="h-32"
            />
            <p className="text-xs text-gray-500 mt-1">
              Our AI will use this to extract your ideal buyer persona, pain points, and hooks.
            </p>
          </div>
          
          <div>
            <Label htmlFor="funnelUrl">Sales Funnel URL (optional)</Label>
            <Input 
              id="funnelUrl"
              placeholder="https://your-landing-page.com"
              type="url"
              value={campaignData.funnelUrl}
              onChange={(e) => updateCampaignData({ funnelUrl: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="budgetRange">Budget Range</Label>
            <Select 
              value={campaignData.budgetRange}
              onValueChange={(value) => updateCampaignData({ budgetRange: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map(range => (
                  <SelectItem key={range} value={range}>${range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="timeframe">Campaign Timeframe</Label>
            <Select 
              value={campaignData.timeframe}
              onValueChange={(value) => updateCampaignData({ timeframe: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select campaign duration" />
              </SelectTrigger>
              <SelectContent>
                {timeframeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={!isFormValid || isProcessing} className="w-full md:w-auto">
            {isProcessing ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Generating AI Recommendations...
              </>
            ) : (
              'Generate Campaign Structure'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CampaignIntelligence;
