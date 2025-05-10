import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ArrowRight, Check, X, Target, Sparkles, TrendingUp, DollarSign, Users } from "lucide-react";
import FacebookConnection from './FacebookConnection';
import AdCreativeForm, { AdCreativeData } from './AdCreativeForm';
import CampaignSuccessScreen from './CampaignSuccessScreen';

interface AIMediaBuyerProps {
  onClose: () => void;
}

// Updated Meta campaign objectives based on actual Meta options
const objectiveOptions = [
  { value: "awareness", label: "Brand Awareness" },
  { value: "reach", label: "Reach" },
  { value: "traffic", label: "Traffic" },
  { value: "engagement", label: "Engagement" },
  { value: "app_installs", label: "App Installs" },
  { value: "video_views", label: "Video Views" },
  { value: "lead_generation", label: "Lead Generation" },
  { value: "messages", label: "Messages" },
  { value: "conversions", label: "Conversions" },
  { value: "catalog_sales", label: "Catalog Sales" },
  { value: "store_traffic", label: "Store Traffic" }
];

const audienceTypes = [
  { value: "cold", label: "Cold Audience" },
  { value: "warm", label: "Warm Audience" },
  { value: "hot", label: "Hot Audience" }
];

const timeframeUnitOptions = [
  { value: "days", label: "Days" },
  { value: "weeks", label: "Weeks" }
];

type CampaignStrategy = {
  title: string;
  description: string;
  platforms: string[];
  budgetAllocation: { platform: string; percentage: number }[];
  audienceTargeting: { segment: string; approach: string }[];
  creativeRecommendations: string[];
  optimizationTips: string[];
};

const AIMediaBuyer: React.FC<AIMediaBuyerProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    business: "",
    product: "",
    industry: "",
    websiteUrl: "",
    salesFunnelUrl: "", // Added Sales Funnel URL field
    platforms: ["facebook", "instagram"],
    objective: "conversions",
    budgetRange: [1000, 3000], // Budget range slider
    timeframeValue: 30,
    timeframeUnit: "days",
    audience: "",
    audienceTypes: ["cold", "warm"],
    mainOfferDescription: "", // Added Main Offer Description field
    idealCustomerProfile: "", // Added for Ideal Customer Profile step
    adCreative: {
      primaryText: "",
      headline: "",
      description: "",
      callToAction: "learn_more",
      destinationUrl: "",
      mediaType: "manual" as "manual" | "ai",
      mediaUrl: "",
      aiPrompt: "",
      generatedMedia: null,
    } as AdCreativeData
  });
  
  const [generatedStrategy, setGeneratedStrategy] = useState<CampaignStrategy | null>(null);
  const [fbConnected, setFbConnected] = useState(false);
  const [fbAccountData, setFbAccountData] = useState<any>(null);
  const [isSubmittingCampaign, setIsSubmittingCampaign] = useState(false);
  const [campaignCreated, setCampaignCreated] = useState(false);
  const [createdCampaignData, setCreatedCampaignData] = useState<any>(null);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field: string, value: string) => {
    setFormData((prev) => {
      const currentValues = prev[field as keyof typeof prev] as string[];
      
      if (currentValues.includes(value)) {
        return { ...prev, [field]: currentValues.filter(v => v !== value) };
      } else {
        return { ...prev, [field]: [...currentValues, value] };
      }
    });
  };

  const handleAdCreativeChange = (creativeData: AdCreativeData) => {
    setFormData((prev) => ({ ...prev, adCreative: creativeData }));
  };

  const handleFacebookConnection = (isConnected: boolean, accountData?: any) => {
    setFbConnected(isConnected);
    setFbAccountData(accountData);
  };

  const nextStep = () => {
    // Validation for each step
    if (currentStep === 1 && (!formData.business || !formData.product || !formData.industry)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 2 && !formData.audience) {
      toast({
        title: "Missing information",
        description: "Please provide target audience information.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 3 && !formData.idealCustomerProfile) {
      toast({
        title: "Missing information",
        description: "Please provide ideal customer profile information.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 4 && !formData.mainOfferDescription) {
      toast({
        title: "Missing information",
        description: "Main Offer Description is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateCampaignStrategy = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock generated strategy - in production this would come from your backend
      const mockStrategy: CampaignStrategy = {
        title: `${formData.objective.charAt(0).toUpperCase() + formData.objective.slice(1)} Campaign for ${formData.product}`,
        description: `AI-optimized strategy for ${formData.business} targeting ${formData.audience || "relevant audiences"} in the ${formData.industry} industry, focused on ${formData.objective} objectives.`,
        platforms: formData.platforms,
        budgetAllocation: formData.platforms.map((platform) => ({
          platform,
          percentage: Math.floor(100 / formData.platforms.length)
        })),
        audienceTargeting: formData.audienceTypes.map((type) => {
          let approach = "";
          if (type === "cold") {
            approach = "Lookalike audiences based on your best customers, interest-based targeting relevant to your industry.";
          } else if (type === "warm") {
            approach = "Website visitors within the last 30-60 days, video viewers, and social media engagers.";
          } else {
            approach = "Recent website visitors, cart abandoners, and previous customers due for repeat purchase.";
          }
          return { segment: type, approach };
        }),
        creativeRecommendations: [
          "Use lifestyle imagery showing your product in real-world situations",
          "Create video content demonstrating key product benefits",
          "Include user testimonials and reviews for social proof",
          "Highlight your unique value proposition in the first 3 seconds",
          "Test both emotion-based and logical/feature-based messaging"
        ],
        optimizationTips: [
          "Start with automatic placements but monitor performance to refine later",
          `Set up daily budget caps of $${Math.round(formData.budgetRange[0]/30)} - $${Math.round(formData.budgetRange[1]/30)}`,
          "Use CBO (Campaign Budget Optimization) for platforms that support it",
          "Implement a minimum 2-week testing period before major adjustments",
          "Monitor frequency caps to avoid ad fatigue (keep under 2.5 for cold traffic)"
        ]
      };
      
      setGeneratedStrategy(mockStrategy);
      setCurrentStep(7);
      
      toast({
        title: "Strategy generated!",
        description: "Your AI Media Buyer strategy has been created.",
      });
    } catch (error) {
      console.error("Error generating strategy:", error);
      toast({
        title: "Generation failed",
        description: "There was an error generating your campaign strategy. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitCampaign = async () => {
    if (!fbConnected || !fbAccountData) {
      toast({
        title: "Facebook account required",
        description: "Please connect your Facebook Ad Account before launching your campaign.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmittingCampaign(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock campaign creation response
      const mockCampaignData = {
        id: `23847${Math.floor(Math.random() * 10000000)}`,
        name: `${formData.product} - ${formData.objective} Campaign`,
        status: "PENDING",
        adAccountId: fbAccountData.id,
        budget: `$${formData.budgetRange[0]} - $${formData.budgetRange[1]} / ${formData.timeframeValue} ${formData.timeframeUnit}`,
        objective: objectiveOptions.find(obj => obj.value === formData.objective)?.label || formData.objective,
        adPreviewUrl: formData.adCreative.mediaUrl || "https://placehold.co/600x400/darkblue/white?text=Ad+Preview"
      };
      
      setCreatedCampaignData(mockCampaignData);
      setCampaignCreated(true);
      
      toast({
        title: "Campaign submitted!",
        description: "Your campaign has been successfully submitted to Facebook.",
      });
    } catch (error) {
      console.error("Error submitting campaign:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your campaign. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingCampaign(false);
    }
  };

  const renderStep = () => {
    if (campaignCreated && createdCampaignData) {
      return (
        <CampaignSuccessScreen
          campaignData={createdCampaignData}
          onClose={onClose}
        />
      );
    }
    
    switch (currentStep) {
      case 1: // Campaign & Business Information
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Campaign & Business Information</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Business Name</label>
              <Input 
                placeholder="E.g., Acme Fitness" 
                value={formData.business}
                onChange={(e) => handleInputChange('business', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Product or Service</label>
              <Input 
                placeholder="E.g., Fitness Membership" 
                value={formData.product}
                onChange={(e) => handleInputChange('product', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Industry</label>
              <Input 
                placeholder="E.g., Health & Fitness" 
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Website URL</label>
              <Input 
                placeholder="E.g., https://www.example.com" 
                value={formData.websiteUrl}
                onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sales Funnel URL (Optional)</label>
              <Input 
                placeholder="E.g., https://www.example.com/offer" 
                value={formData.salesFunnelUrl}
                onChange={(e) => handleInputChange('salesFunnelUrl', e.target.value)}
              />
            </div>
          </div>
        );
        
      case 2: // Target Audience
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Target Audience</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Audience Description</label>
              <Textarea 
                placeholder="Describe your target audience (age, interests, pain points, etc.)"
                value={formData.audience}
                onChange={(e) => handleInputChange('audience', e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Audience Types to Target</label>
              <div className="grid grid-cols-3 gap-2">
                {audienceTypes.map((type) => (
                  <Button
                    key={type.value}
                    type="button"
                    variant={formData.audienceTypes.includes(type.value) ? "default" : "outline"}
                    className={`justify-start ${formData.audienceTypes.includes(type.value) ? "bg-metamaster-primary text-white" : ""}`}
                    onClick={() => handleMultiSelect('audienceTypes', type.value)}
                  >
                    {formData.audienceTypes.includes(type.value) ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <div className="w-4 mr-2" />
                    )}
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3: // Ideal Customer Profile
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Ideal Customer Profile</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Describe Your Ideal Customer</label>
              <Textarea 
                placeholder="Describe your ideal customer in detail - their demographics, behaviors, motivations, and pain points"
                value={formData.idealCustomerProfile}
                onChange={(e) => handleInputChange('idealCustomerProfile', e.target.value)}
                className="min-h-[200px]"
              />
              <p className="text-xs text-gray-500 mt-1">
                The more specific you are, the better we can target your ads.
              </p>
            </div>
          </div>
        );

      case 4: // Ad Copy
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Ad Copy</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Product URL or Description</label>
              <Textarea 
                placeholder="Enter your product URL or description" 
                value={formData.websiteUrl}
                onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Main Offer Description <span className="text-red-500">*</span></label>
              <Textarea 
                placeholder="Describe your main offer (e.g., '20% discount on yearly subscriptions')" 
                value={formData.mainOfferDescription}
                onChange={(e) => handleInputChange('mainOfferDescription', e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </div>
        );

      case 5: // Ad Creative
        return (
          <div className="space-y-6">
            <AdCreativeForm 
              onChange={handleAdCreativeChange}
              initialData={formData.adCreative}
            />
          </div>
        );

      case 6: // Budget & Configuration
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Budget & Configuration</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Campaign Objective</label>
              <Select
                value={formData.objective}
                onValueChange={(value) => handleInputChange('objective', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an objective" />
                </SelectTrigger>
                <SelectContent>
                  {objectiveOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Budget Range (Monthly)</label>
              <div className="pt-6 pb-2">
                <Slider
                  value={formData.budgetRange}
                  min={500}
                  max={20000}
                  step={100}
                  onValueChange={(value) => handleInputChange('budgetRange', value)}
                  className="mb-6"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">${formData.budgetRange[0]}</span>
                  <span className="text-sm font-medium">${formData.budgetRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Timeframe</label>
              <div className="flex gap-2">
                <Input 
                  type="number"
                  value={formData.timeframeValue}
                  onChange={(e) => handleInputChange('timeframeValue', parseInt(e.target.value) || 0)}
                  className="w-20"
                  min={1}
                />
                <Select
                  value={formData.timeframeUnit}
                  onValueChange={(value) => handleInputChange('timeframeUnit', value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeframeUnitOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-6">
              <Button 
                onClick={generateCampaignStrategy}
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Campaign Strategy...
                  </>
                ) : (
                  <>Generate AI Campaign Strategy</>
                )}
              </Button>
            </div>
          </div>
        );

      case 7: // Campaign Strategy & Launch
        return generatedStrategy ? (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-metamaster-primary">{generatedStrategy.title}</h2>
              <p className="text-metamaster-gray-600">{generatedStrategy.description}</p>
            </div>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="audience">Audience</TabsTrigger>
                <TabsTrigger value="creative">Creative</TabsTrigger>
                <TabsTrigger value="optimization">Optimization</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="mr-2 h-5 w-5 text-metamaster-primary" />
                      Platform Strategy
                    </CardTitle>
                    <CardDescription>
                      Recommended platforms and budget allocation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Selected Platforms:</h4>
                        <div className="flex gap-2 flex-wrap">
                          {generatedStrategy.platforms.map(platform => (
                            <div key={platform} className="px-3 py-1 bg-metamaster-primary/10 text-metamaster-primary rounded-full text-sm">
                              {platform.charAt(0).toUpperCase() + platform.slice(1)}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Budget Allocation:</h4>
                        <div className="space-y-2">
                          {generatedStrategy.budgetAllocation.map(allocation => (
                            <div key={allocation.platform} className="flex justify-between items-center">
                              <span className="text-sm capitalize">{allocation.platform}:</span>
                              <div className="flex items-center">
                                <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                                  <div 
                                    className="h-full bg-metamaster-primary rounded-full" 
                                    style={{ width: `${allocation.percentage}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium">{allocation.percentage}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="audience" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="mr-2 h-5 w-5 text-metamaster-primary" />
                      Audience Strategy
                    </CardTitle>
                    <CardDescription>
                      Recommended audience targeting approaches
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {generatedStrategy.audienceTargeting.map(segment => (
                        <div key={segment.segment} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                          <h4 className="text-sm font-medium mb-2 capitalize">
                            {segment.segment} Audience Approach:
                          </h4>
                          <p className="text-sm text-metamaster-gray-600">{segment.approach}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="creative" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="mr-2 h-5 w-5 text-metamaster-primary" />
                      Creative Recommendations
                    </CardTitle>
                    <CardDescription>
                      Best practices for your ad creative
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {generatedStrategy.creativeRecommendations.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-metamaster-primary/10 text-metamaster-primary text-xs mr-2 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="optimization" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-metamaster-primary" />
                      Optimization Strategy
                    </CardTitle>
                    <CardDescription>
                      Tips to maximize campaign performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {generatedStrategy.optimizationTips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="pt-4 border-t border-gray-200 mt-6">
              <h3 className="text-lg font-medium mb-4">Launch Your Campaign</h3>
              <FacebookConnection 
                onConnected={handleFacebookConnection}
                isConnected={fbConnected}
                accountData={fbAccountData}
              />
              
              {fbConnected && (
                <div className="mt-6">
                  <Button
                    onClick={handleSubmitCampaign}
                    disabled={isSubmittingCampaign}
                    className="w-full"
                  >
                    {isSubmittingCampaign ? (
                      <>
                        <Loader2 className="animate-spin mr-2" /> 
                        Submitting Campaign...
                      </>
                    ) : (
                      <>Launch Campaign on Facebook</>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : null;
    }
  };

  return (
    <div className="py-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-metamaster-primary">AI Media Buyer</h2>
      </div>
      
      {/* Progress indicators - only show for steps 1-6 */}
      {currentStep < 7 && (
        <div className="flex mb-6">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div key={step} className="flex-1 relative">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mx-auto z-10 relative
                  ${currentStep >= step 
                    ? 'bg-metamaster-primary text-white'
                    : 'bg-gray-200 text-gray-500'}`
                }
              >
                {step}
              </div>
              <div className="text-xs text-center mt-2 text-metamaster-gray-600">
                {step === 1 && "Business Info"}
                {step === 2 && "Target Audience"}
                {step === 3 && "Ideal Customer"}
                {step === 4 && "Ad Copy"}
                {step === 5 && "Ad Creative"}
                {step === 6 && "Budget & Config"}
              </div>
              {step < 6 && (
                <div 
                  className={`absolute top-4 w-full h-0.5 
                    ${currentStep > step ? 'bg-metamaster-primary' : 'bg-gray-200'}`
                  }
                  style={{ left: '50%' }}
                />
              )}
            </div>
          ))}
        </div>
      )}
      
      <div className="mb-6">
        {renderStep()}
      </div>
      
      {/* Navigation buttons */}
      {!campaignCreated && currentStep < 7 && (
        <div className="flex justify-between pt-4 border-t border-gray-200">
          {currentStep > 1 && (
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={isGenerating}
            >
              Back
            </Button>
          )}
          
          <Button 
            onClick={nextStep} 
            disabled={isGenerating || (currentStep === 6)}
          >
            {currentStep < 6 ? (
              <>Continue <ArrowRight className="ml-2 h-4 w-4" /></>
            ) : (
              <>Generate Campaign</>
            )}
          </Button>
        </div>
      )}

      {/* Close button for campaign created or strategy step */}
      {(campaignCreated || currentStep === 7) && !fbConnected && (
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default AIMediaBuyer;
