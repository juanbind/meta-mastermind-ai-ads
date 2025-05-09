
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { 
  PieChart, 
  Target, 
  BarChart3, 
  MessageSquare, 
  AlertTriangle, 
  Shield, 
  ZapOff, 
  TrendingUp,
  FileText,
  Settings,
  Calendar,
  ArrowUp,
  CheckCheck,
  Clock
} from 'lucide-react';

import AIMediaBuyerEnhanced from '@/components/ai-tools/AIMediaBuyerEnhanced';
import AdCopyGenerator from '@/components/ai-tools/AdCopyGenerator';
import CampaignStructureAnalysis from '@/components/ai-tools/CampaignStructureAnalysis';
import CampaignBuilder from '@/components/ai-tools/CampaignBuilder';
import AdCreativePreferences from '@/components/ai-tools/AdCreativePreferences';
import FacebookAdConnection from '@/components/ai-tools/FacebookAdConnection';
import CampaignLaunchConfirmation from '@/components/ai-tools/CampaignLaunchConfirmation';

const AIMediaBuyerPage: React.FC = () => {
  const { toast } = useToast();
  const [fbConnected, setFbConnected] = useState(false);
  const [stopLossRules, setStopLossRules] = useState({
    enabled: false,
    threshold: '5',
    notifyMe: true
  });
  const [fbAccessToken, setFbAccessToken] = useState('');
  const [fbAdAccountId, setFbAdAccountId] = useState('');
  const [activeMainTab, setActiveMainTab] = useState('campaigns');
  
  // New campaign data state
  const [campaignData, setCampaignData] = useState({
    // Campaign & Business Information
    businessName: '',
    campaignName: '',
    websiteUrl: '',
    salesFunnelUrl: '', // New field
    
    // Budget & Configuration
    budgetRange: [50, 150], // New field (min, max)
    timeframeUnit: 'days', // 'days' or 'weeks'
    timeframeValue: 7, // Number of days/weeks
    
    // Ad Copy
    mainOfferDescription: '', // New field
    adCopy: '',
    
    // Campaign Structure
    budgetType: 'CBO', // 'CBO' or 'ABO'
    dailyBudget: 50,
    lifetimeBudget: 0,
    optimizationEvent: 'LEAD', // Default to LEAD
    attribution: '7_DAY_CLICK', // Default to 7-day click
    campaignObjective: 'LEAD_GENERATION', // Default to lead generation
    adScheduling: {
      startDate: new Date(),
      endDate: null,
    },
    
    // Ad Creative Preferences
    adCreatives: [
      {
        primaryText: '',
        headline: '',
        description: '',
        callToAction: 'LEARN_MORE',
        destinationUrl: '',
        mediaUrl: '',
      }
    ],
    
    // Facebook Ad Account
    fbAccountConnected: false,
    fbAccountId: '',
    fbAccessToken: '',
    
    // Campaign Launch
    campaignId: '',
    campaignStatus: '',
    adPreviewUrl: '',
  });

  // Campaign analysis state
  const [campaignAnalysis, setCampaignAnalysis] = useState({
    buyerPersona: '',
    recommendedObjective: '',
    budgetDistribution: [],
    isAnalyzing: false,
    isComplete: false,
  });
  
  // Current step in campaign creation process
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
  // Handle campaign data changes
  const handleCampaignDataChange = (field, value, parentField = null) => {
    if (parentField) {
      setCampaignData(prev => ({
        ...prev,
        [parentField]: {
          ...prev[parentField],
          [field]: value
        }
      }));
    } else {
      setCampaignData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };
  
  // Handle StopLoss Configuration
  const handleStopLossChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'threshold') {
      setStopLossRules(prev => ({ ...prev, threshold: e.target.value }));
    } else if (e.target.name === 'notifyMe') {
      setStopLossRules(prev => ({ ...prev, notifyMe: e.target.checked }));
    }
  };
  
  // Save StopLoss Configuration
  const handleSaveStopLoss = () => {
    toast({
      title: "Stop-Loss Rules Saved",
      description: `Ads will be paused when ROAS drops below ${stopLossRules.threshold}x for 2 consecutive days.`,
    });
  };
  
  // Handle budget adjustment confirmation
  const handleBudgetConfirmation = () => {
    toast({
      title: "Budget Adjustment Confirmed",
      description: "Budget changes will be applied to your campaigns",
    });
  };
  
  // Connect to Facebook Ad Account
  const handleConnectFacebook = () => {
    if (!fbAccessToken || !fbAdAccountId) {
      toast({
        title: "Missing Information",
        description: "Please provide both Access Token and Ad Account ID",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate connecting to Facebook
    setFbConnected(true);
    handleCampaignDataChange('fbAccountConnected', true);
    handleCampaignDataChange('fbAccessToken', fbAccessToken);
    handleCampaignDataChange('fbAccountId', fbAdAccountId);
    
    toast({
      title: "Facebook Account Connected",
      description: "Your ad account has been successfully connected",
    });
  };
  
  // Analyze campaign data
  const analyzeCampaign = () => {
    // Validate required fields
    if (!campaignData.businessName || !campaignData.campaignName || !campaignData.mainOfferDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields before analyzing",
        variant: "destructive"
      });
      return;
    }
    
    setCampaignAnalysis(prev => ({ ...prev, isAnalyzing: true }));
    
    // Simulate AI analysis
    setTimeout(() => {
      setCampaignAnalysis({
        isAnalyzing: false,
        isComplete: true,
        buyerPersona: `Business professionals aged 30-55 who are looking to ${campaignData.mainOfferDescription.substring(0, 50)}...`,
        recommendedObjective: campaignData.mainOfferDescription.toLowerCase().includes('lead') ? 'LEAD_GENERATION' : 'CONVERSIONS',
        budgetDistribution: [
          { type: 'Cold Audience', allocation: 0.4, dailyBudget: campaignData.budgetRange[0] * 0.4 },
          { type: 'Warm Audience', allocation: 0.3, dailyBudget: campaignData.budgetRange[0] * 0.3 },
          { type: 'Lookalike Audience', allocation: 0.3, dailyBudget: campaignData.budgetRange[0] * 0.3 },
        ]
      });
      
      toast({
        title: "Campaign Analysis Complete",
        description: "AI has generated recommendations based on your inputs",
      });
    }, 2000);
  };
  
  // Navigate to next step
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Launch campaign to Facebook
  const launchCampaign = () => {
    // Validate connection to Facebook
    if (!campaignData.fbAccountConnected) {
      toast({
        title: "Not Connected",
        description: "Please connect to Facebook Ad Account before launching",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate API call to create campaign
    toast({
      title: "Creating Campaign",
      description: "Sending your campaign to Facebook...",
    });
    
    setTimeout(() => {
      // Simulate successful campaign creation
      const campaignId = `23847${Math.floor(Math.random() * 100000)}`;
      handleCampaignDataChange('campaignId', campaignId);
      handleCampaignDataChange('campaignStatus', 'IN_REVIEW');
      
      toast({
        title: "Campaign Created Successfully",
        description: `Campaign ID: ${campaignId} is now in review`,
      });
      
      // Move to confirmation screen
      setCurrentStep(totalSteps);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 text-metamaster-gray-800">AI Media Buyer</h1>
            <p className="text-metamaster-gray-600">Create optimized ad campaigns using AI algorithms trained on high-performing campaigns.</p>
          </div>
          
          <Tabs defaultValue="campaigns" value={activeMainTab} onValueChange={setActiveMainTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
              <TabsTrigger value="campaigns" className="flex items-center justify-center gap-2">
                <Target size={16} /> Campaigns
              </TabsTrigger>
              <TabsTrigger value="ad-copy" className="flex items-center justify-center gap-2">
                <FileText size={16} /> Ad Copy
              </TabsTrigger>
              <TabsTrigger value="automation" className="flex items-center justify-center gap-2">
                <ZapOff size={16} /> Automations
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center justify-center gap-2">
                <TrendingUp size={16} /> Performance
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center justify-center gap-2">
                <FileText size={16} /> Reports
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center justify-center gap-2">
                <Settings size={16} /> Settings
              </TabsTrigger>
            </TabsList>
            
            {/* Campaign Creation Tab */}
            <TabsContent value="campaigns" className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Create New Campaign</h2>
                
                {/* Step Progress */}
                <div className="mb-8">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    {Array.from({ length: totalSteps }).map((_, i) => (
                      <div key={i} className={`${i < currentStep ? 'text-metamaster-primary font-medium' : ''}`}>
                        Step {i + 1}
                      </div>
                    ))}
                  </div>
                  <div className="flex w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="bg-metamaster-primary h-full transition-all"
                      style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
                  </div>
                </div>
                
                {/* Step 1: Campaign & Business Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-700">Campaign & Business Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Business Name*
                        </label>
                        <Input 
                          value={campaignData.businessName} 
                          onChange={(e) => handleCampaignDataChange('businessName', e.target.value)}
                          placeholder="Your business name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Campaign Name*
                        </label>
                        <Input 
                          value={campaignData.campaignName} 
                          onChange={(e) => handleCampaignDataChange('campaignName', e.target.value)}
                          placeholder="Name your campaign"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Website URL
                        </label>
                        <Input 
                          value={campaignData.websiteUrl} 
                          onChange={(e) => handleCampaignDataChange('websiteUrl', e.target.value)}
                          placeholder="https://yourbusiness.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sales Funnel URL (Optional)
                        </label>
                        <Input 
                          value={campaignData.salesFunnelUrl} 
                          onChange={(e) => handleCampaignDataChange('salesFunnelUrl', e.target.value)}
                          placeholder="https://yourbusiness.com/funnel"
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-700 pt-4">Budget & Configuration</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Budget Range (Daily)
                        </label>
                        <div className="pt-6 pb-2">
                          <Slider 
                            value={campaignData.budgetRange}
                            onValueChange={(value) => handleCampaignDataChange('budgetRange', value)}
                            min={10}
                            max={500}
                            step={5}
                          />
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>${campaignData.budgetRange[0]}</span>
                          <span>${campaignData.budgetRange[1]}</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Timeframe
                        </label>
                        <div className="flex gap-2">
                          <Input 
                            type="number" 
                            value={campaignData.timeframeValue}
                            onChange={(e) => handleCampaignDataChange('timeframeValue', parseInt(e.target.value) || 1)}
                            className="max-w-[100px]"
                            min={1}
                          />
                          <select 
                            value={campaignData.timeframeUnit}
                            onChange={(e) => handleCampaignDataChange('timeframeUnit', e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2"
                          >
                            <option value="days">Days</option>
                            <option value="weeks">Weeks</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <div></div> {/* Placeholder for alignment */}
                      <Button onClick={nextStep}>
                        Next: Ad Copy
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Ad Copy */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-700">Ad Copy</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Main Offer Description* <span className="text-gray-500 text-xs">(Required)</span>
                        </label>
                        <Textarea 
                          value={campaignData.mainOfferDescription} 
                          onChange={(e) => handleCampaignDataChange('mainOfferDescription', e.target.value)}
                          placeholder="Describe your main offer in detail. What problem does it solve? What benefits does it provide?"
                          rows={4}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ad Copy
                        </label>
                        <Textarea 
                          value={campaignData.adCopy} 
                          onChange={(e) => handleCampaignDataChange('adCopy', e.target.value)}
                          placeholder="Enter your ad copy or let AI generate it for you"
                          rows={6}
                        />
                      </div>
                      
                      <div className="flex justify-center">
                        <Button variant="outline" className="flex items-center gap-2">
                          <MessageSquare size={16} /> Generate with AI
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={prevStep}>
                        Back
                      </Button>
                      <Button onClick={() => {
                        // First analyze the campaign
                        analyzeCampaign();
                        // Then proceed to next step
                        nextStep();
                      }}>
                        Next: Campaign Analysis
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Campaign Analysis */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-700">Campaign Analysis</h3>
                    
                    {campaignAnalysis.isAnalyzing ? (
                      <div className="p-12 text-center">
                        <div className="animate-spin w-12 h-12 border-4 border-metamaster-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-600">Analyzing your campaign data...</p>
                      </div>
                    ) : campaignAnalysis.isComplete ? (
                      <div className="space-y-6">
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                          <h4 className="font-medium text-blue-800 mb-2">Buyer Persona Analysis</h4>
                          <p className="text-blue-700">{campaignAnalysis.buyerPersona}</p>
                        </div>
                        
                        <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                          <h4 className="font-medium text-green-800 mb-2">Recommended Campaign Objective</h4>
                          <p className="text-green-700">{campaignAnalysis.recommendedObjective}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3">Recommended Budget Distribution</h4>
                          <div className="space-y-3">
                            {campaignAnalysis.budgetDistribution.map((budget, index) => (
                              <div key={index} className="flex items-center">
                                <div className="w-32">{budget.type}</div>
                                <div className="flex-1">
                                  <div className="w-full bg-gray-200 h-4 rounded-full">
                                    <div 
                                      className="bg-metamaster-primary h-full rounded-full"
                                      style={{ width: `${budget.allocation * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <div className="w-24 text-right">${budget.dailyBudget.toFixed(2)}/day</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <h4 className="font-medium mb-3">AI Recommendations</h4>
                          <ul className="space-y-2 list-disc list-inside text-gray-700">
                            <li>Use a {campaignAnalysis.recommendedObjective} objective for optimal results</li>
                            <li>Target mobile users primarily (70% of potential audience)</li>
                            <li>Focus on video ads for highest engagement rates</li>
                            <li>Include social proof in your ad copy</li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="p-12 text-center">
                        <Button onClick={analyzeCampaign}>
                          Start Analysis
                        </Button>
                      </div>
                    )}
                    
                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={prevStep}>
                        Back
                      </Button>
                      <Button 
                        onClick={nextStep}
                        disabled={!campaignAnalysis.isComplete}
                      >
                        Next: Campaign Structure
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 4: Campaign Structure */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-700">Campaign Structure</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Budget Type
                          </label>
                          <div className="flex gap-4">
                            <label className="flex items-center">
                              <input 
                                type="radio" 
                                checked={campaignData.budgetType === 'CBO'}
                                onChange={() => handleCampaignDataChange('budgetType', 'CBO')}
                                className="mr-2"
                              />
                              Campaign Budget Optimization (CBO)
                            </label>
                            <label className="flex items-center">
                              <input 
                                type="radio" 
                                checked={campaignData.budgetType === 'ABO'}
                                onChange={() => handleCampaignDataChange('budgetType', 'ABO')}
                                className="mr-2"
                              />
                              Ad Set Budget Optimization (ABO)
                            </label>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Daily Budget
                          </label>
                          <Input 
                            type="number"
                            value={campaignData.dailyBudget}
                            onChange={(e) => handleCampaignDataChange('dailyBudget', parseFloat(e.target.value) || 0)}
                            min={1}
                            placeholder="Daily budget amount"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Optimization Event
                          </label>
                          <select 
                            value={campaignData.optimizationEvent}
                            onChange={(e) => handleCampaignDataChange('optimizationEvent', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                          >
                            <option value="LEAD">Lead</option>
                            <option value="PURCHASE">Purchase</option>
                            <option value="LINK_CLICK">Link Click</option>
                            <option value="PAGE_VIEW">Page View</option>
                            <option value="ADD_TO_CART">Add to Cart</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Attribution Setting
                          </label>
                          <select 
                            value={campaignData.attribution}
                            onChange={(e) => handleCampaignDataChange('attribution', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                          >
                            <option value="1_DAY_CLICK">1-day click</option>
                            <option value="7_DAY_CLICK">7-day click</option>
                            <option value="28_DAY_CLICK">28-day click</option>
                            <option value="1_DAY_IMPRESSION">1-day impression</option>
                            <option value="7_DAY_IMPRESSION">7-day impression</option>
                            <option value="28_DAY_IMPRESSION">28-day impression</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Campaign Objective
                          </label>
                          <select 
                            value={campaignData.campaignObjective}
                            onChange={(e) => handleCampaignDataChange('campaignObjective', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                          >
                            <option value="LEAD_GENERATION">Lead Generation</option>
                            <option value="CONVERSIONS">Conversions</option>
                            <option value="TRAFFIC">Traffic</option>
                            <option value="ENGAGEMENT">Engagement</option>
                            <option value="AWARENESS">Awareness</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ad Set Naming Convention
                          </label>
                          <Input 
                            value={campaignData.adSetNamingConvention}
                            onChange={(e) => handleCampaignDataChange('adSetNamingConvention', e.target.value)}
                            placeholder="e.g., [Audience Type]_[Target]_[Budget]"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ad Scheduling
                          </label>
                          <div className="flex items-center gap-3">
                            <Calendar className="text-gray-400" size={18} />
                            <Input 
                              type="date"
                              value={campaignData.adScheduling.startDate ? campaignData.adScheduling.startDate.toISOString().split('T')[0] : ''}
                              onChange={(e) => {
                                const newDate = e.target.value ? new Date(e.target.value) : new Date();
                                handleCampaignDataChange('startDate', newDate, 'adScheduling');
                              }}
                            />
                            <span>to</span>
                            <Input 
                              type="date"
                              value={campaignData.adScheduling.endDate ? campaignData.adScheduling.endDate.toISOString().split('T')[0] : ''}
                              onChange={(e) => {
                                const newDate = e.target.value ? new Date(e.target.value) : null;
                                handleCampaignDataChange('endDate', newDate, 'adScheduling');
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-3">Ad Set Structure Preview</h4>
                      <div className="space-y-4">
                        {/* Cold Audience Ad Set */}
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium">Cold Audience</h5>
                            <span className="text-sm text-gray-500">${campaignAnalysis.budgetDistribution[0]?.dailyBudget.toFixed(2)}/day</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Targeting: Interest-based, similar to your business category</p>
                          <div className="flex gap-2">
                            <div className="border border-gray-200 rounded p-2 text-xs text-gray-600 bg-gray-50">Ad 1: Primary Offer</div>
                            <div className="border border-gray-200 rounded p-2 text-xs text-gray-600 bg-gray-50">Ad 2: Testimonial Based</div>
                          </div>
                        </div>
                        
                        {/* Warm Audience Ad Set */}
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium">Warm Audience</h5>
                            <span className="text-sm text-gray-500">${campaignAnalysis.budgetDistribution[1]?.dailyBudget.toFixed(2)}/day</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Targeting: 30-day website visitors, email list</p>
                          <div className="flex gap-2">
                            <div className="border border-gray-200 rounded p-2 text-xs text-gray-600 bg-gray-50">Ad 1: Special Offer</div>
                            <div className="border border-gray-200 rounded p-2 text-xs text-gray-600 bg-gray-50">Ad 2: Case Study</div>
                          </div>
                        </div>
                        
                        {/* Lookalike Audience Ad Set */}
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium">Lookalike Audience</h5>
                            <span className="text-sm text-gray-500">${campaignAnalysis.budgetDistribution[2]?.dailyBudget.toFixed(2)}/day</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Targeting: 1% Lookalike of past purchasers</p>
                          <div className="flex gap-2">
                            <div className="border border-gray-200 rounded p-2 text-xs text-gray-600 bg-gray-50">Ad 1: Problem/Solution</div>
                            <div className="border border-gray-200 rounded p-2 text-xs text-gray-600 bg-gray-50">Ad 2: Feature Highlight</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={prevStep}>
                        Back
                      </Button>
                      <Button onClick={nextStep}>
                        Next: Ad Creatives
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 5: Ad Creatives */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-700">Ad Creatives</h3>
                    
                    <div className="space-y-8">
                      {/* Ad Creative 1 */}
                      <div className="border border-gray-200 rounded-lg p-6">
                        <h4 className="font-medium mb-4 pb-2 border-b">Ad Creative 1: Primary Offer</h4>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Primary Text
                            </label>
                            <Textarea 
                              value={campaignData.adCreatives[0]?.primaryText || ''}
                              onChange={(e) => {
                                const updatedAdCreatives = [...campaignData.adCreatives];
                                if (updatedAdCreatives[0]) {
                                  updatedAdCreatives[0].primaryText = e.target.value;
                                }
                                handleCampaignDataChange('adCreatives', updatedAdCreatives);
                              }}
                              placeholder="Enter the main text for your ad"
                              rows={3}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Headline
                              </label>
                              <Input 
                                value={campaignData.adCreatives[0]?.headline || ''}
                                onChange={(e) => {
                                  const updatedAdCreatives = [...campaignData.adCreatives];
                                  if (updatedAdCreatives[0]) {
                                    updatedAdCreatives[0].headline = e.target.value;
                                  }
                                  handleCampaignDataChange('adCreatives', updatedAdCreatives);
                                }}
                                placeholder="Enter headline"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                              </label>
                              <Input 
                                value={campaignData.adCreatives[0]?.description || ''}
                                onChange={(e) => {
                                  const updatedAdCreatives = [...campaignData.adCreatives];
                                  if (updatedAdCreatives[0]) {
                                    updatedAdCreatives[0].description = e.target.value;
                                  }
                                  handleCampaignDataChange('adCreatives', updatedAdCreatives);
                                }}
                                placeholder="Enter description"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Call to Action
                              </label>
                              <select 
                                value={campaignData.adCreatives[0]?.callToAction || 'LEARN_MORE'}
                                onChange={(e) => {
                                  const updatedAdCreatives = [...campaignData.adCreatives];
                                  if (updatedAdCreatives[0]) {
                                    updatedAdCreatives[0].callToAction = e.target.value;
                                  }
                                  handleCampaignDataChange('adCreatives', updatedAdCreatives);
                                }}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                              >
                                <option value="LEARN_MORE">Learn More</option>
                                <option value="SIGN_UP">Sign Up</option>
                                <option value="SUBSCRIBE">Subscribe</option>
                                <option value="DOWNLOAD">Download</option>
                                <option value="GET_OFFER">Get Offer</option>
                                <option value="BOOK_NOW">Book Now</option>
                                <option value="GET_QUOTE">Get Quote</option>
                                <option value="CONTACT_US">Contact Us</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Destination URL
                              </label>
                              <Input 
                                value={campaignData.adCreatives[0]?.destinationUrl || ''}
                                onChange={(e) => {
                                  const updatedAdCreatives = [...campaignData.adCreatives];
                                  if (updatedAdCreatives[0]) {
                                    updatedAdCreatives[0].destinationUrl = e.target.value;
                                  }
                                  handleCampaignDataChange('adCreatives', updatedAdCreatives);
                                }}
                                placeholder="https://yourbusiness.com/landing"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Media Upload
                            </label>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <div className="mb-3 flex justify-center">
                                  <FileText className="h-8 w-8 text-gray-400" />
                                </div>
                                <p className="text-sm text-gray-600 mb-2">Upload image or video</p>
                                <Button variant="outline" size="sm">
                                  Upload Media
                                </Button>
                              </div>
                              
                              <div className="border border-gray-200 rounded-lg p-4">
                                <h5 className="text-sm font-medium mb-2">Ad Preview</h5>
                                <div className="aspect-video bg-gray-100 flex items-center justify-center rounded-md mb-2">
                                  <p className="text-gray-400 text-sm">Ad preview will appear here</p>
                                </div>
                                <div className="text-xs text-gray-500">
                                  {campaignData.adCreatives[0]?.headline ? (
                                    <>
                                      <p className="font-medium">{campaignData.adCreatives[0]?.headline}</p>
                                      <p className="truncate">{campaignData.adCreatives[0]?.description}</p>
                                    </>
                                  ) : (
                                    <p>Complete the form to see preview</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Add more ads button */}
                      <div className="text-center">
                        <Button variant="outline" className="flex items-center gap-2">
                          <span>Add Another Ad</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={prevStep}>
                        Back
                      </Button>
                      <div className="flex gap-3">
                        <Button variant="outline">
                          Save Draft
                        </Button>
                        {fbConnected ? (
                          <Button onClick={launchCampaign} className="bg-metamaster-primary hover:bg-metamaster-secondary">
                            Launch Campaign to Facebook
                          </Button>
                        ) : (
                          <Button onClick={() => toast({
                            title: "Facebook Account Required",
                            description: "Please connect your Facebook Ad Account in the Settings tab",
                          })}>
                            Connect Facebook to Launch
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Success Confirmation Screen */}
                {currentStep === 6 && (
                  <div className="space-y-6 py-8">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <CheckCheck size={32} className="text-green-600" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-800">Campaign Successfully Created!</h3>
                      <p className="text-gray-600 mt-1">Your campaign has been sent to Facebook and is now in review.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-6 mb-6">
                      <h4 className="font-medium mb-4">Campaign Details</h4>
                      <div className="grid grid-cols-2 gap-y-4 text-sm">
                        <div className="text-gray-600">Campaign ID:</div>
                        <div className="font-medium">{campaignData.campaignId || '23847xxxx'}</div>
                        
                        <div className="text-gray-600">Status:</div>
                        <div className="font-medium">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            In Review
                          </span>
                        </div>
                        
                        <div className="text-gray-600">Total Budget:</div>
                        <div className="font-medium">${campaignData.dailyBudget * campaignData.timeframeValue}</div>
                        
                        <div className="text-gray-600">Campaign Duration:</div>
                        <div className="font-medium">{campaignData.timeframeValue} {campaignData.timeframeUnit}</div>
                        
                        <div className="text-gray-600">Ad Sets Created:</div>
                        <div className="font-medium">3</div>
                        
                        <div className="text-gray-600">Ads Created:</div>
                        <div className="font-medium">6</div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 flex items-center gap-2 mb-2">
                        <Clock size={18} /> What happens next?
                      </h4>
                      <ul className="space-y-2 text-sm text-blue-700">
                        <li>Facebook will review your ads within the next few hours</li>
                        <li>Once approved, your campaign will start running automatically</li>
                        <li>You'll be able to track performance in the Performance tab</li>
                        <li>Our AI will analyze your results and suggest optimizations</li>
                      </ul>
                    </div>
                    
                    <div className="flex justify-center pt-6 gap-4">
                      <Button variant="outline" onClick={() => setCurrentStep(1)}>
                        Create Another Campaign
                      </Button>
                      <Button 
                        onClick={() => setActiveMainTab('performance')}
                        className="bg-metamaster-primary hover:bg-metamaster-secondary"
                      >
                        View Campaign Performance
                      </Button>
                    </div>
                  </div>
                )}

                {/* If not on the current step, show the AI Media Buyer Enhanced component */}
                {!fbConnected && currentStep === 1 && (
                  <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h3 className="text-amber-800 font-medium flex items-center gap-2">
                      <AlertTriangle size={18} /> Connect to Facebook Ads
                    </h3>
                    <p className="text-amber-700 text-sm mb-4">
                      To launch campaigns directly to Facebook, please connect your Facebook Ad account.
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Facebook Access Token
                        </label>
                        <Input 
                          value={fbAccessToken} 
                          onChange={(e) => setFbAccessToken(e.target.value)}
                          placeholder="Enter your Facebook access token"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ad Account ID
                        </label>
                        <Input 
                          value={fbAdAccountId} 
                          onChange={(e) => setFbAdAccountId(e.target.value)}
                          placeholder="Enter your Ad Account ID (e.g., act_123456789)"
                        />
                      </div>
                      
                      <Button onClick={handleConnectFacebook}>
                        Connect Facebook Account
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Ad Copy Generator Tab */}
            <TabsContent value="ad-copy" className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <AdCopyGenerator />
              </div>
            </TabsContent>
            
            {/* Automation Tab */}
            <TabsContent value="automation" className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Stop-Loss Automation</h2>
                <p className="text-gray-600 mb-4">
                  Automatically pause underperforming ads based on custom rules.
                </p>
                
                <div className="flex items-center space-x-2 mb-4">
                  <Switch
                    id="stop-loss-enable"
                    checked={stopLossRules.enabled}
                    onCheckedChange={(checked) => setStopLossRules(prev => ({...prev, enabled: checked}))}
                  />
                  <label htmlFor="stop-loss-enable" className="font-medium">
                    Enable Stop-Loss Rules
                  </label>
                </div>
                
                {stopLossRules.enabled && (
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pause ads when ROAS falls below
                      </label>
                      <div className="flex items-center">
                        <Input 
                          name="threshold"
                          type="number"
                          value={stopLossRules.threshold}
                          onChange={handleStopLossChange}
                          className="max-w-[100px]"
                        />
                        <span className="ml-2">for 2 consecutive days</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="notify-me"
                        name="notifyMe"
                        checked={stopLossRules.notifyMe}
                        onCheckedChange={(checked) => setStopLossRules(prev => ({...prev, notifyMe: checked}))}
                      />
                      <label htmlFor="notify-me">
                        Notify me when ads are paused
                      </label>
                    </div>
                    
                    <Button onClick={handleSaveStopLoss}>
                      Save Stop-Loss Rules
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Budget Optimization</h2>
                <p className="text-gray-600 mb-4">
                  Automatically adjust budgets based on performance metrics.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-scale" />
                    <label htmlFor="auto-scale">Scale winning ad sets (ROAS &gt; 3x)</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-reduce" />
                    <label htmlFor="auto-reduce">Reduce budget for underperforming ad sets</label>
                  </div>
                  
                  {fbConnected && (
                    <Button size="sm" onClick={handleBudgetConfirmation} className="mt-4">
                      Configure Budget Rules
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Ad Fatigue Detection</h2>
                <p className="text-gray-600 mb-4">
                  Automatically detect and alert you when your ads begin to show signs of fatigue.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="fatigue-detection" defaultChecked />
                    <label htmlFor="fatigue-detection">Enable ad fatigue detection</label>
                  </div>
                  
                  <div>
                    <p className="font-medium">Alert me when:</p>
                    <div className="ml-4 mt-2 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="frequency-trigger" defaultChecked />
                        <label htmlFor="frequency-trigger">Ad frequency exceeds 3</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="ctr-trigger" defaultChecked />
                        <label htmlFor="ctr-trigger">CTR drops by more than 20%</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="cpc-trigger" defaultChecked />
                        <label htmlFor="cpc-trigger">CPC increases by more than 30%</label>
                      </div>
                    </div>
                  </div>
                  
                  <Button>
                    Save Fatigue Detection Settings
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Campaign Performance</h2>
                
                {!fbConnected ? (
                  <div className="p-8 text-center">
                    <TrendingUp size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-lg font-medium text-gray-600 mb-2">No performance data available</p>
                    <p className="text-gray-500 mb-6">Connect your ad accounts to view performance metrics</p>
                    <Button 
                      onClick={() => setActiveMainTab('settings')}
                      variant="outline"
                    >
                      Connect Ad Accounts
                    </Button>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <BarChart3 size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-lg font-medium text-gray-600 mb-2">Performance data will appear here</p>
                    <p className="text-gray-500 mb-6">Your real campaign data will display once your campaigns are active</p>
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Targeting Optimization</h2>
                
                {!fbConnected ? (
                  <div className="p-6 text-center">
                    <Target size={36} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">Connect your ad accounts to receive AI-powered targeting recommendations</p>
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <Target size={36} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">Targeting recommendations will appear here once your campaigns have sufficient data</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Performance Reports</h2>
                <p className="text-gray-600 mb-4">
                  Generate detailed performance reports with actionable insights.
                </p>
                
                {!fbConnected ? (
                  <div className="p-6 text-center">
                    <FileText size={36} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">Connect your ad accounts to generate reports</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button variant="outline" className="flex items-center justify-center gap-2 h-24 flex-col">
                        <FileText size={24} />
                        <span>Daily Report</span>
                      </Button>
                      
                      <Button variant="outline" className="flex items-center justify-center gap-2 h-24 flex-col">
                        <FileText size={24} />
                        <span>Weekly Report</span>
                      </Button>
                      
                      <Button variant="outline" className="flex items-center justify-center gap-2 h-24 flex-col">
                        <FileText size={24} />
                        <span>Monthly Report</span>
                      </Button>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg mt-4">
                      <h4 className="font-medium mb-2">Custom Report</h4>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Report Name
                          </label>
                          <Input placeholder="E.g., Q3 Performance Summary" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Start Date
                            </label>
                            <Input type="date" />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              End Date
                            </label>
                            <Input type="date" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Metrics to Include
                          </label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="flex items-center space-x-2">
                              <Switch id="include-spend" defaultChecked />
                              <label htmlFor="include-spend">Ad Spend</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="include-roas" defaultChecked />
                              <label htmlFor="include-roas">ROAS</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="include-cpc" defaultChecked />
                              <label htmlFor="include-cpc">CPC</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="include-ctr" defaultChecked />
                              <label htmlFor="include-ctr">CTR</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="include-conv" defaultChecked />
                              <label htmlFor="include-conv">Conversions</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="include-freq" defaultChecked />
                              <label htmlFor="include-freq">Frequency</label>
                            </div>
                          </div>
                        </div>
                        
                        <Button>
                          Generate Custom Report
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Integration Settings</h2>
                
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="font-medium mb-3 flex items-center">
                      <Shield className="mr-2" size={18} /> Account Connections
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Facebook Ad Account</div>
                          <div className="text-sm text-gray-600">
                            {fbConnected ? "Connected" : "Not connected"}
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant={fbConnected ? "outline" : "default"}
                          onClick={() => fbConnected ? setFbConnected(false) : setActiveMainTab('campaigns')}
                        >
                          {fbConnected ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Google Ads</div>
                          <div className="text-sm text-gray-600">Not connected</div>
                        </div>
                        <Button size="sm">Connect</Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">TikTok Ads</div>
                          <div className="text-sm text-gray-600">Not connected</div>
                        </div>
                        <Button size="sm">Connect</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="font-medium mb-3">Notification Preferences</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor="notify-campaigns">Campaign status changes</label>
                        <Switch id="notify-campaigns" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label htmlFor="notify-budget">Budget adjustments</label>
                        <Switch id="notify-budget" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label htmlFor="notify-reports">Report generation</label>
                        <Switch id="notify-reports" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label htmlFor="notify-policy">Policy violations</label>
                        <Switch id="notify-policy" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">AI Assistant Preferences</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Default Ad Creation Style</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>Promotional</option>
                          <option>Educational</option>
                          <option>Testimonial-Based</option>
                          <option>Problem-Solution</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label htmlFor="auto-recommend">Automatic recommendations</label>
                        <Switch id="auto-recommend" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label htmlFor="ai-updates">Daily AI performance updates</label>
                        <Switch id="ai-updates" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AIMediaBuyerPage;
