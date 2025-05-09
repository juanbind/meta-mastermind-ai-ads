
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { useToast } from '@/hooks/use-toast';
import CampaignIntelligence from '@/components/campaign-builder/CampaignIntelligence';
import CampaignStructure from '@/components/campaign-builder/CampaignStructure';
import CreativeInjection from '@/components/campaign-builder/CreativeInjection';
import LaunchSection from '@/components/campaign-builder/LaunchSection';
import PostLaunchConfirmation from '@/components/campaign-builder/PostLaunchConfirmation';
import CampaignSummary from '@/components/campaign-builder/CampaignSummary';
import { useAuth } from '@/contexts/AuthContext';

// Define the step interfaces and campaign data structure
export type CampaignStep = 
  | 'intelligence'
  | 'structure'
  | 'creatives'
  | 'launch'
  | 'confirmation'
  | 'tracker';

export interface CampaignData {
  // Campaign Intelligence
  offerType: string;
  offerDescription: string;
  funnelUrl?: string;
  budgetRange: string;
  timeframe: string;
  
  // AI Generated Insights
  buyerPersona?: string;
  campaignObjective?: string;
  recommendedBudget?: string;
  recommendedStructure?: string;
  
  // Campaign Structure
  budgetType: string;
  dailyBudget?: string;
  lifetimeBudget?: string;
  optimizationEvent: string;
  attribution: string;
  campaignName: string;
  adSets: AdSetData[];
  
  // Launch Data
  scheduleType: 'now' | 'scheduled';
  scheduleDate?: Date;
  
  // Post Launch
  campaignId?: string;
  campaignStatus?: string;
  campaignLink?: string;
}

export interface AdSetData {
  name: string;
  targeting: string;
  budget: string;
  ads: AdData[];
}

export interface AdData {
  name: string;
  primaryText: string;
  headline: string;
  description: string;
  cta: string;
  destinationUrl: string;
  mediaType: 'image' | 'video';
  mediaUrl?: string;
  dynamicCreative: boolean;
}

const CampaignBuilder: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<CampaignStep>('intelligence');
  const [campaignData, setCampaignData] = useState<CampaignData>({
    // Campaign Intelligence defaults
    offerType: '',
    offerDescription: '',
    funnelUrl: '',
    budgetRange: '500-1000',
    timeframe: '7',
    
    // Campaign Structure defaults
    budgetType: 'CBO',
    optimizationEvent: 'LEAD',
    attribution: '7d_click',
    campaignName: 'AI Generated Campaign',
    adSets: [],
    
    // Launch defaults
    scheduleType: 'now'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConnectedToFacebook, setIsConnectedToFacebook] = useState(false);
  
  // Handle data updates from each step
  const updateCampaignData = (data: Partial<CampaignData>) => {
    setCampaignData(prev => ({ ...prev, ...data }));
  };
  
  // Generate AI recommendations based on intelligence data
  const generateAIRecommendations = async () => {
    setIsProcessing(true);
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sample AI-generated data
      const aiData = {
        buyerPersona: `Business professionals aged 30-45 seeking to increase ROI from digital marketing. They're frustrated with low conversion rates and want a more automated solution.`,
        campaignObjective: 'LEAD',
        recommendedBudget: '$55/day',
        recommendedStructure: '3 ad sets targeting cold, warm, and lookalike audiences'
      };
      
      // Generate sample ad sets based on AI recommendations
      const sampleAdSets = [
        {
          name: 'Cold | Interest Stack',
          targeting: 'Digital Marketing, Business Owners',
          budget: '$20/day',
          ads: [
            {
              name: 'Ad 1 - Problem Focus',
              primaryText: 'Tired of wasting ad spend on campaigns that don\'t convert? Our AI-driven platform helps you create high-performing Meta ad campaigns in minutes.',
              headline: 'Stop Wasting Ad Spend',
              description: 'AI-powered campaign creation & optimization',
              cta: 'Learn More',
              destinationUrl: campaignData.funnelUrl || 'https://example.com',
              mediaType: 'image' as 'image',
              dynamicCreative: false
            },
            {
              name: 'Ad 2 - Solution Focus',
              primaryText: 'Create winning Meta ad campaigns without hiring expensive media buyers. Our AI does the heavy lifting for you.',
              headline: 'AI Media Buyer In Your Pocket',
              description: 'Get better ROAS in just days',
              cta: 'Sign Up Now',
              destinationUrl: campaignData.funnelUrl || 'https://example.com',
              mediaType: 'image' as 'image',
              dynamicCreative: false
            }
          ]
        },
        {
          name: 'Warm | 30-Day Visitors',
          targeting: 'Website visitors last 30 days',
          budget: '$15/day',
          ads: [
            {
              name: 'Ad 3 - Reminder',
              primaryText: 'You were exploring how to improve your Meta ad campaigns. Ready to let AI handle the optimization for you?',
              headline: 'Ready To Transform Your Ad Results?',
              description: 'Come back and finish setting up your account',
              cta: 'Continue',
              destinationUrl: campaignData.funnelUrl || 'https://example.com',
              mediaType: 'image' as 'image',
              dynamicCreative: false
            }
          ]
        },
        {
          name: 'LAL | 1% Purchasers',
          targeting: 'Lookalike 1% of past purchasers',
          budget: '$20/day',
          ads: [
            {
              name: 'Ad 4 - Social Proof',
              primaryText: 'Join thousands of marketers who have increased their ROAS by 30% using our AI media buying platform.',
              headline: 'AI-Driven Results For Businesses Like Yours',
              description: '7-day free trial, no credit card required',
              cta: 'Start Free Trial',
              destinationUrl: campaignData.funnelUrl || 'https://example.com',
              mediaType: 'image' as 'image',
              dynamicCreative: false
            }
          ]
        }
      ];
      
      updateCampaignData({
        ...aiData,
        adSets: sampleAdSets,
        campaignName: `${campaignData.offerType} - ${new Date().toLocaleDateString()}`
      });
      
      toast({
        title: 'AI Recommendations Generated',
        description: 'Campaign structure has been created based on your offer details.',
      });
      
      // Move to next step
      setCurrentStep('structure');
    } catch (error) {
      console.error('Error generating AI recommendations:', error);
      toast({
        title: 'Error Generating Recommendations',
        description: 'Please try again or contact support if the issue persists.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Submit campaign to Meta API
  const launchCampaign = async () => {
    if (!isConnectedToFacebook) {
      toast({
        title: 'Facebook Connection Required',
        description: 'Please connect your Facebook Ad account first.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsProcessing(true);
    try {
      // Simulate API calls to Facebook Marketing API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful campaign creation
      updateCampaignData({
        campaignId: '23851234567890',
        campaignStatus: 'In Review',
        campaignLink: 'https://business.facebook.com/adsmanager/manage/campaigns?act=12345678'
      });
      
      toast({
        title: 'Campaign Launched Successfully',
        description: 'Your campaign has been submitted to Meta and is now in review.',
      });
      
      setCurrentStep('confirmation');
    } catch (error) {
      console.error('Error launching campaign:', error);
      toast({
        title: 'Error Launching Campaign',
        description: 'There was an issue submitting your campaign to Meta. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const connectToFacebook = () => {
    // Simulate OAuth connection
    setIsConnectedToFacebook(true);
    toast({
      title: 'Connected to Facebook',
      description: 'Your Facebook Ad account has been successfully connected.',
    });
  };
  
  // Render the appropriate step component
  const renderStep = () => {
    switch (currentStep) {
      case 'intelligence':
        return (
          <CampaignIntelligence 
            campaignData={campaignData}
            updateCampaignData={updateCampaignData}
            onNext={generateAIRecommendations}
            isProcessing={isProcessing}
          />
        );
      case 'structure':
        return (
          <CampaignStructure 
            campaignData={campaignData}
            updateCampaignData={updateCampaignData}
            onBack={() => setCurrentStep('intelligence')}
            onNext={() => setCurrentStep('creatives')}
          />
        );
      case 'creatives':
        return (
          <CreativeInjection 
            campaignData={campaignData}
            updateCampaignData={updateCampaignData}
            onBack={() => setCurrentStep('structure')}
            onNext={() => setCurrentStep('launch')}
          />
        );
      case 'launch':
        return (
          <LaunchSection 
            campaignData={campaignData}
            isConnectedToFacebook={isConnectedToFacebook}
            connectToFacebook={connectToFacebook}
            onLaunch={launchCampaign}
            isProcessing={isProcessing}
            onBack={() => setCurrentStep('creatives')}
          />
        );
      case 'confirmation':
        return (
          <PostLaunchConfirmation 
            campaignData={campaignData}
            onTrackCampaign={() => setCurrentStep('tracker')}
          />
        );
      case 'tracker':
        return (
          <CampaignSummary 
            campaignData={campaignData}
            onCreateNew={() => {
              setCampaignData({
                offerType: '',
                offerDescription: '',
                funnelUrl: '',
                budgetRange: '500-1000',
                timeframe: '7',
                budgetType: 'CBO',
                optimizationEvent: 'LEAD',
                attribution: '7d_click',
                campaignName: 'AI Generated Campaign',
                adSets: [],
                scheduleType: 'now'
              });
              setCurrentStep('intelligence');
            }}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };
  
  return (
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 text-metamaster-gray-800">AI Campaign Builder</h1>
            <p className="text-metamaster-gray-600">
              Create optimized Meta ad campaigns using AI to maximize your ROAS
            </p>
          </div>
          
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
              {['Intelligence', 'Structure', 'Creatives', 'Launch', 'Live'].map((step, index) => {
                const stepKey = step.toLowerCase() as CampaignStep;
                const isCurrent = 
                  (stepKey === 'intelligence' && currentStep === 'intelligence') ||
                  (stepKey === 'structure' && currentStep === 'structure') ||
                  (stepKey === 'creatives' && currentStep === 'creatives') ||
                  (stepKey === 'launch' && currentStep === 'launch') ||
                  (stepKey === 'live' && (currentStep === 'confirmation' || currentStep === 'tracker'));
                
                const isCompleted = 
                  (index === 0 && currentStep !== 'intelligence') ||
                  (index === 1 && currentStep !== 'structure' && currentStep !== 'intelligence') ||
                  (index === 2 && currentStep !== 'creatives' && currentStep !== 'structure' && currentStep !== 'intelligence') ||
                  (index === 3 && (currentStep === 'confirmation' || currentStep === 'tracker'));
                
                return (
                  <React.Fragment key={step}>
                    {index > 0 && (
                      <div className={`h-1 flex-1 ${isCompleted ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    )}
                    <div className="relative flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCurrent ? 'bg-blue-500 text-white' : 
                        isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
                      }`}>
                        {isCompleted ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span className={`text-xs mt-1 ${isCurrent ? 'font-medium text-blue-500' : ''}`}>{step}</span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignBuilder;
