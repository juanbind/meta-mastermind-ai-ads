
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CampaignData, AdSetData, AdData } from '@/pages/CampaignBuilder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, MessageSquare } from 'lucide-react';

interface CampaignStructureProps {
  campaignData: CampaignData;
  updateCampaignData: (data: Partial<CampaignData>) => void;
  onBack: () => void;
  onNext: () => void;
}

const optimizationEvents = [
  { value: 'LEAD', label: 'Lead Generation' },
  { value: 'LINK_CLICK', label: 'Link Clicks' },
  { value: 'PURCHASE', label: 'Purchases' },
  { value: 'PAGE_VIEW', label: 'Page Views' },
  { value: 'ADD_TO_CART', label: 'Add to Cart' }
];

const attributionOptions = [
  { value: '1d_click', label: '1-day click' },
  { value: '7d_click', label: '7-day click' },
  { value: '1d_view', label: '1-day view' },
  { value: '7d_view', label: '7-day view' }
];

const CampaignStructure: React.FC<CampaignStructureProps> = ({ 
  campaignData, 
  updateCampaignData, 
  onBack,
  onNext
}) => {
  const handleAdSetUpdate = (index: number, adSetData: Partial<AdSetData>) => {
    const newAdSets = [...campaignData.adSets];
    newAdSets[index] = { ...newAdSets[index], ...adSetData };
    updateCampaignData({ adSets: newAdSets });
  };
  
  const handleAddAdSet = () => {
    const newAdSet: AdSetData = {
      name: `Ad Set ${campaignData.adSets.length + 1}`,
      targeting: '',
      budget: '$20/day',
      ads: [{
        name: `Ad ${campaignData.adSets.length + 1}.1`,
        primaryText: '',
        headline: '',
        description: '',
        cta: 'Learn More',
        destinationUrl: campaignData.funnelUrl || 'https://example.com',
        mediaType: 'image',
        dynamicCreative: false
      }]
    };
    
    updateCampaignData({ adSets: [...campaignData.adSets, newAdSet] });
  };
  
  const handleDeleteAdSet = (index: number) => {
    const newAdSets = [...campaignData.adSets];
    newAdSets.splice(index, 1);
    updateCampaignData({ adSets: newAdSets });
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <MessageSquare className="text-blue-500 mt-1 mr-3 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-medium text-blue-800">AI Campaign Insights</h3>
            <p className="text-blue-700 text-sm mb-2">{campaignData.buyerPersona}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="secondary">{campaignData.campaignObjective === 'LEAD' ? 'Lead Generation' : campaignData.campaignObjective}</Badge>
              <Badge variant="secondary">Recommended Budget: {campaignData.recommendedBudget}</Badge>
              <Badge variant="secondary">Structure: {campaignData.adSets.length} Ad Sets</Badge>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Campaign Structure</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input 
                  id="campaignName" 
                  value={campaignData.campaignName} 
                  onChange={(e) => updateCampaignData({ campaignName: e.target.value })}
                />
              </div>
              
              <div>
                <Label>Budget Type</Label>
                <RadioGroup 
                  value={campaignData.budgetType} 
                  onValueChange={(value) => updateCampaignData({ budgetType: value })}
                  className="flex space-x-4 mt-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="CBO" id="cbo" />
                    <Label htmlFor="cbo" className="font-normal">Campaign Budget (CBO)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ABO" id="abo" />
                    <Label htmlFor="abo" className="font-normal">Ad Set Budget (ABO)</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label>Budget</Label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  <div>
                    <Label htmlFor="dailyBudget" className="text-sm font-normal">Daily Budget</Label>
                    <Input 
                      id="dailyBudget"
                      placeholder="$50.00"
                      value={campaignData.dailyBudget || ''}
                      onChange={(e) => updateCampaignData({ dailyBudget: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lifetimeBudget" className="text-sm font-normal">Lifetime Budget (Optional)</Label>
                    <Input 
                      id="lifetimeBudget"
                      placeholder="$500.00"
                      value={campaignData.lifetimeBudget || ''}
                      onChange={(e) => updateCampaignData({ lifetimeBudget: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="optimizationEvent">Optimization Event</Label>
                <Select 
                  value={campaignData.optimizationEvent} 
                  onValueChange={(value) => updateCampaignData({ optimizationEvent: value })}
                >
                  <SelectTrigger id="optimizationEvent">
                    <SelectValue placeholder="Select optimization event" />
                  </SelectTrigger>
                  <SelectContent>
                    {optimizationEvents.map(event => (
                      <SelectItem key={event.value} value={event.value}>
                        {event.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="attribution">Attribution Setting</Label>
                <Select 
                  value={campaignData.attribution} 
                  onValueChange={(value) => updateCampaignData({ attribution: value })}
                >
                  <SelectTrigger id="attribution">
                    <SelectValue placeholder="Select attribution model" />
                  </SelectTrigger>
                  <SelectContent>
                    {attributionOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Ad Scheduling</Label>
                <RadioGroup 
                  value={campaignData.scheduleType} 
                  onValueChange={(value: 'now' | 'scheduled') => updateCampaignData({ scheduleType: value })}
                  className="flex space-x-4 mt-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="now" id="now" />
                    <Label htmlFor="now" className="font-normal">Launch Now</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="scheduled" id="scheduled" />
                    <Label htmlFor="scheduled" className="font-normal">Schedule for Later</Label>
                  </div>
                </RadioGroup>
                
                {campaignData.scheduleType === 'scheduled' && (
                  <div className="mt-2">
                    <Input 
                      type="datetime-local" 
                      onChange={(e) => updateCampaignData({ scheduleDate: new Date(e.target.value) })}
                      min={new Date().toISOString().slice(0, -8)}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Ad Sets Structure</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAddAdSet}
              className="flex items-center"
            >
              <Plus className="mr-1" size={16} />
              Add Ad Set
            </Button>
          </div>
          
          {campaignData.adSets.length === 0 ? (
            <div className="text-center py-8 border border-dashed rounded-lg">
              <p className="text-gray-500">No ad sets defined yet.</p>
              <Button 
                variant="outline" 
                onClick={handleAddAdSet}
                className="mt-2"
              >
                Create Ad Set
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {campaignData.adSets.map((adSet, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-md font-medium">{adSet.name}</CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteAdSet(index)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">Ad Set Name</Label>
                        <Input 
                          value={adSet.name}
                          onChange={(e) => handleAdSetUpdate(index, { name: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Targeting</Label>
                        <Input 
                          value={adSet.targeting}
                          onChange={(e) => handleAdSetUpdate(index, { targeting: e.target.value })}
                          placeholder="e.g., Interest Stack, Lookalike 1%"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label className="text-sm">Budget {campaignData.budgetType === 'ABO' && '(per ad set)'}</Label>
                      <Input 
                        value={adSet.budget}
                        onChange={(e) => handleAdSetUpdate(index, { budget: e.target.value })}
                        placeholder="e.g., $20/day"
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm">Ads ({adSet.ads.length})</Label>
                      </div>
                      <div className="mt-2 p-3 bg-gray-50 rounded-md">
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          {adSet.ads.map((ad, adIndex) => (
                            <li key={adIndex} className="text-gray-700">
                              {ad.name} {ad.headline && `- "${ad.headline}"`}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        <div className="pt-6 flex justify-between">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button onClick={onNext} disabled={campaignData.adSets.length === 0}>Continue to Creatives</Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignStructure;
