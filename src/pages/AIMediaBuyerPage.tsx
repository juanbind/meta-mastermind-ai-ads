import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
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
  CheckCircle
} from 'lucide-react';

import CampaignForm from '@/components/ai-tools/CampaignForm';
import AdCopyForm from '@/components/ai-tools/AdCopyForm';
import AdCreativeForm from '@/components/ai-tools/AdCreativeForm';
import FacebookAdAccountConnection from '@/components/ai-tools/FacebookAdAccountConnection';
import CampaignSuccessView from '@/components/ai-tools/CampaignSuccessView';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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
  const [currentStep, setCurrentStep] = useState(0);
  const [campaignSubmitted, setCampaignSubmitted] = useState(false);

  // Campaign Data State
  const [campaignData, setCampaignData] = useState({
    // Campaign & Business Information
    businessName: '',
    campaignName: '',
    websiteUrl: '',
    salesFunnelUrl: '',
    
    // Budget & Configuration
    budgetRange: [50, 100], // Min and max budget
    timeframeValue: 7,
    timeframeUnit: 'days',
    
    // Ad Copy
    productUrl: '',
    mainOfferDescription: '',
    adType: 'promotional',
    
    // Ad Creative
    primaryText: '',
    headline: '',
    description: '',
    callToAction: 'Learn More',
    destinationUrl: '',
    mediaUrl: '',
    
    // Results
    campaignId: '',
    campaignStatus: 'pending' as 'active' | 'pending' | 'error',
    metaLink: '',
    adPreviewUrl: '',
  });

  // Connect to Facebook Ad Account
  const handleConnectFacebook = (token: string, accountId: string) => {
    setFbConnected(true);
    setFbAccessToken(token);
    setFbAdAccountId(accountId);
  };
  
  // Disconnect Facebook Ad Account
  const handleDisconnectFacebook = () => {
    setFbConnected(false);
    setFbAccessToken('');
    setFbAdAccountId('');
  };

  // Handle campaign form updates
  const updateCampaignField = <K extends keyof typeof campaignData>(field: K, value: typeof campaignData[K]) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
  };

  // Go to next step
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      launchCampaign();
    }
  };

  // Go to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Launch the campaign
  const launchCampaign = () => {
    if (!fbConnected) {
      toast({
        title: "Facebook Account Not Connected",
        description: "Please connect your Facebook ad account before launching the campaign",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate campaign launch
    toast({
      title: "Launching Campaign",
      description: "Your campaign is being submitted to Facebook...",
    });

    setTimeout(() => {
      setCampaignData(prev => ({
        ...prev,
        campaignId: `CM_${Math.floor(Math.random() * 1000000)}`,
        campaignStatus: 'pending',
        metaLink: 'https://business.facebook.com/adsmanager',
        adPreviewUrl: prev.mediaUrl || 'https://placeholder.com/600x400',
      }));

      setCampaignSubmitted(true);
      toast({
        title: "Campaign Launch Successful",
        description: "Your campaign was successfully submitted to Facebook",
      });
    }, 2000);
  };

  // Create a new campaign
  const createNewCampaign = () => {
    setCampaignSubmitted(false);
    setCurrentStep(0);
    setCampaignData({
      businessName: '',
      campaignName: '',
      websiteUrl: '',
      salesFunnelUrl: '',
      budgetRange: [50, 100],
      timeframeValue: 7,
      timeframeUnit: 'days',
      productUrl: '',
      mainOfferDescription: '',
      adType: 'promotional',
      primaryText: '',
      headline: '',
      description: '',
      callToAction: 'Learn More',
      destinationUrl: '',
      mediaUrl: '',
      campaignId: '',
      campaignStatus: 'pending',
      metaLink: '',
      adPreviewUrl: '',
    });
  };

  // View my campaigns (placeholder for now)
  const viewMyCampaigns = () => {
    toast({
      title: "View Campaigns",
      description: "This feature is coming soon!",
    });
  };
  
  // Validate current step
  const validateStep = (): boolean => {
    switch (currentStep) {
      case 0: // Campaign Info
        if (!campaignData.businessName || !campaignData.campaignName || !campaignData.websiteUrl) {
          toast({
            title: "Missing Information",
            description: "Please fill in all required fields",
            variant: "destructive"
          });
          return false;
        }
        return true;
      
      case 1: // Ad Copy
        if (!campaignData.mainOfferDescription) {
          toast({
            title: "Missing Information",
            description: "Please provide your main offer description",
            variant: "destructive"
          });
          return false;
        }
        return true;
      
      case 2: // Ad Creative
        if (!campaignData.headline || !campaignData.primaryText) {
          toast({
            title: "Missing Information",
            description: "Please provide both headline and primary text for your ad",
            variant: "destructive"
          });
          return false;
        }
        return true;
      
      case 3: // Review & Launch
        if (!fbConnected) {
          toast({
            title: "Facebook Account Not Connected",
            description: "Please connect your Facebook ad account before launching the campaign",
            variant: "destructive"
          });
          return false;
        }
        return true;
      
      default:
        return true;
    }
  };
  
  // Handle next button click
  const handleNext = () => {
    if (validateStep()) {
      nextStep();
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

  // Step titles and components
  const steps = [
    {
      title: "Campaign Information",
      description: "Set up your campaign details",
      component: (
        <CampaignForm
          businessName={campaignData.businessName}
          campaignName={campaignData.campaignName}
          websiteUrl={campaignData.websiteUrl}
          salesFunnelUrl={campaignData.salesFunnelUrl}
          budgetRange={campaignData.budgetRange}
          timeframeValue={campaignData.timeframeValue}
          timeframeUnit={campaignData.timeframeUnit}
          onBusinessNameChange={(value) => updateCampaignField('businessName', value)}
          onCampaignNameChange={(value) => updateCampaignField('campaignName', value)}
          onWebsiteUrlChange={(value) => updateCampaignField('websiteUrl', value)}
          onSalesFunnelUrlChange={(value) => updateCampaignField('salesFunnelUrl', value)}
          onBudgetRangeChange={(value) => updateCampaignField('budgetRange', value)}
          onTimeframeValueChange={(value) => updateCampaignField('timeframeValue', value)}
          onTimeframeUnitChange={(value) => updateCampaignField('timeframeUnit', value)}
        />
      )
    },
    {
      title: "Ad Copy",
      description: "Create your ad copy",
      component: (
        <AdCopyForm
          productUrl={campaignData.productUrl}
          mainOfferDescription={campaignData.mainOfferDescription}
          adType={campaignData.adType}
          onProductUrlChange={(value) => updateCampaignField('productUrl', value)}
          onMainOfferDescriptionChange={(value) => updateCampaignField('mainOfferDescription', value)}
          onAdTypeChange={(value) => updateCampaignField('adType', value)}
        />
      )
    },
    {
      title: "Ad Creative",
      description: "Design your ad creative",
      component: (
        <AdCreativeForm
          primaryText={campaignData.primaryText}
          headline={campaignData.headline}
          description={campaignData.description}
          callToAction={campaignData.callToAction}
          destinationUrl={campaignData.destinationUrl}
          mediaUrl={campaignData.mediaUrl}
          onPrimaryTextChange={(value) => updateCampaignField('primaryText', value)}
          onHeadlineChange={(value) => updateCampaignField('headline', value)}
          onDescriptionChange={(value) => updateCampaignField('description', value)}
          onCallToActionChange={(value) => updateCampaignField('callToAction', value)}
          onDestinationUrlChange={(value) => updateCampaignField('destinationUrl', value)}
          onMediaUrlChange={(value) => updateCampaignField('mediaUrl', value)}
        />
      )
    },
    {
      title: "Review & Launch",
      description: "Connect your Facebook account and launch",
      component: (
        <div className="space-y-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Campaign Summary</h3>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Business Name</p>
                    <p className="font-medium">{campaignData.businessName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Campaign Name</p>
                    <p className="font-medium">{campaignData.campaignName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Budget Range</p>
                    <p className="font-medium">${campaignData.budgetRange[0]} - ${campaignData.budgetRange[1]} / day</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{campaignData.timeframeValue} {campaignData.timeframeUnit}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Facebook Ad Account</h3>
            <FacebookAdAccountConnection
              isConnected={fbConnected}
              onConnect={handleConnectFacebook}
              onDisconnect={handleDisconnectFacebook}
              accessToken={fbAccessToken}
              adAccountId={fbAdAccountId}
              setAccessToken={setFbAccessToken}
              setAdAccountId={setFbAdAccountId}
            />
          </div>
        </div>
      )
    },
  ];

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
                {!campaignSubmitted ? (
                  <>
                    <div className="mb-8">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Create New Campaign</h2>
                        <div className="text-sm text-gray-500">Step {currentStep + 1} of {steps.length}</div>
                      </div>
                      <Progress 
                        value={((currentStep + 1) / steps.length) * 100} 
                        className="mt-2 h-1" 
                      />
                      <div className="mt-2 flex justify-between">
                        {steps.map((step, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div 
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                index < currentStep
                                  ? 'bg-green-100 text-green-600'
                                  : index === currentStep
                                  ? 'bg-blue-100 text-blue-600'
                                  : 'bg-gray-100 text-gray-400'
                              }`}
                            >
                              {index < currentStep ? (
                                <CheckCircle size={16} />
                              ) : (
                                <span>{index + 1}</span>
                              )}
                            </div>
                            <span className="text-xs mt-1 text-gray-500 hidden md:block">
                              {step.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">{steps[currentStep].title}</h3>
                      <p className="text-gray-600 text-sm mb-6">{steps[currentStep].description}</p>
                      
                      {steps[currentStep].component}
                    </div>
                    
                    <div className="flex justify-between pt-4 border-t">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                      >
                        Back
                      </Button>
                      
                      <Button 
                        onClick={handleNext}
                      >
                        {currentStep < steps.length - 1 ? "Continue" : "Launch Campaign"}
                      </Button>
                    </div>
                  </>
                ) : (
                  <CampaignSuccessView
                    campaignId={campaignData.campaignId}
                    campaignStatus={campaignData.campaignStatus}
                    campaignName={campaignData.campaignName}
                    adPreviewUrl={campaignData.adPreviewUrl}
                    metaLink={campaignData.metaLink}
                    onViewCampaigns={viewMyCampaigns}
                    onCreateNew={createNewCampaign}
                  />
                )}
              </div>
            </TabsContent>
            
            {/* Ad Copy Tab */}
            <TabsContent value="ad-copy" className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Ad Copy Generator</h2>
                <p className="text-gray-600 mb-6">
                  Generate high-converting ad copy for your campaigns.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <AdCopyForm
                      productUrl={campaignData.productUrl}
                      mainOfferDescription={campaignData.mainOfferDescription}
                      adType={campaignData.adType}
                      onProductUrlChange={(value) => updateCampaignField('productUrl', value)}
                      onMainOfferDescriptionChange={(value) => updateCampaignField('mainOfferDescription', value)}
                      onAdTypeChange={(value) => updateCampaignField('adType', value)}
                    />
                  </div>
                  
                  <Button className="mt-4">
                    Generate Ad Copy
                  </Button>
                  
                  <div className="mt-6 p-6 border rounded-md bg-gray-50">
                    <h3 className="text-lg font-medium mb-3">Generated Ad Copy</h3>
                    <p className="text-gray-500 italic mb-2">
                      Your generated ad copy will appear here...
                    </p>
                  </div>
                </div>
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
                          <label className="block text-sm font-medium mb-1">
                            Report Name
                          </label>
                          <Input placeholder="E.g., Q3 Performance Summary" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Start Date
                            </label>
                            <Input type="date" />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              End Date
                            </label>
                            <Input type="date" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">
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
