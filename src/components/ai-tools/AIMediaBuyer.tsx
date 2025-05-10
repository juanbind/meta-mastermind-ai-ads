import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { 
  Loader2, ArrowRight, Check, X, Target, Sparkles, TrendingUp, DollarSign, Users
} from 'lucide-react';
import FacebookConnection from './FacebookConnection';
import AdCreativeForm from './AdCreativeForm';
import CampaignSuccessScreen from './CampaignSuccessScreen';
import AdCopyGenerator from './AdCopyGenerator';
import { Switch } from "@/components/ui/switch";

interface AIMediaBuyerProps {
  onClose: () => void;
}

// Updated Meta campaign objectives based on actual Meta options
const objectiveOptions = [
  { value: "awareness", label: "Brand Awareness" },
  { value: "engagement", label: "Engagement" },
  { value: "sales", label: "Sales" },
  { value: "App promotion", label: "App promotion" },
  { value: "leads", label: "Lead Generation" },
  { value: "traffic", label: "Traffic" }
];

// Business type options
const businessTypes = [
  // Retail & E-commerce
  { value: 'apparel', label: 'Apparel & Fashion' },
  { value: 'beauty', label: 'Beauty & Cosmetics' },
  { value: 'electronics', label: 'Electronics & Technology' },
  { value: 'home_decor', label: 'Home Decor & Furniture' },
  { value: 'jewelry', label: 'Jewelry & Accessories' },
  { value: 'toys_hobbies', label: 'Toys & Hobbies' },
  { value: 'specialty_retail', label: 'Specialty Retail' },
  { value: 'general_ecommerce', label: 'General E-commerce' },
  
  // Health & Wellness
  { value: 'fitness', label: 'Fitness & Gyms' },
  { value: 'healthcare', label: 'Healthcare & Medical' },
  { value: 'mental_health', label: 'Mental Health Services' },
  { value: 'nutrition', label: 'Nutrition & Supplements' },
  { value: 'spa_wellness', label: 'Spa & Wellness Centers' },
  { value: 'pharmacy', label: 'Pharmacy' },
  
  // Services
  { value: 'accounting', label: 'Accounting & Financial Services' },
  { value: 'consulting', label: 'Consulting Services' },
  { value: 'cleaning', label: 'Cleaning Services' },
  { value: 'legal', label: 'Legal Services' },
  { value: 'marketing', label: 'Marketing & PR' },
  { value: 'photography', label: 'Photography & Videography' },
  { value: 'repair', label: 'Repair Services' },
  { value: 'security', label: 'Security Services' },
  { value: 'coaching', label: 'Coaching & Training' },
  
  // Technology
  { value: 'saas', label: 'SaaS & Software' },
  { value: 'app_development', label: 'App Development' },
  { value: 'it_services', label: 'IT Services & Support' },
  { value: 'web_design', label: 'Web Design & Development' },
  { value: 'data_analytics', label: 'Data & Analytics' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'ai_ml', label: 'AI & Machine Learning' },
  
  // Food & Beverage
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'cafe', label: 'Cafe & Coffee Shop' },
  { value: 'bakery', label: 'Bakery' },
  { value: 'food_truck', label: 'Food Truck' },
  { value: 'catering', label: 'Catering' },
  { value: 'bar_nightclub', label: 'Bar & Nightclub' },
  { value: 'food_delivery', label: 'Food Delivery Service' },
  
  // Education
  { value: 'higher_education', label: 'Higher Education' },
  { value: 'online_course', label: 'Online Courses & E-Learning' },
  { value: 'tutoring', label: 'Tutoring & Test Prep' },
  { value: 'vocational', label: 'Vocational Training' },
  { value: 'language', label: 'Language Schools' },
  { value: 'childhood_education', label: 'Early Childhood Education' },
  
  // Real Estate & Housing
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'property_management', label: 'Property Management' },
  { value: 'home_services', label: 'Home Services' },
  { value: 'interior_design', label: 'Interior Design' },
  { value: 'construction', label: 'Construction' },
  { value: 'architecture', label: 'Architecture' },
  
  // Entertainment & Events
  { value: 'event_planning', label: 'Event Planning & Services' },
  { value: 'entertainment', label: 'Entertainment Venue' },
  { value: 'film_production', label: 'Film & Production' },
  { value: 'music', label: 'Music & Recording' },
  { value: 'gaming', label: 'Gaming & eSports' },
  
  // Other Industries  
  { value: 'agriculture', label: 'Agriculture & Farming' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'charity', label: 'Charity & Non-profit' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'media_news', label: 'Media & News' },
  { value: 'pets', label: 'Pet Services & Supplies' },
  { value: 'sports', label: 'Sports & Recreation' },
  { value: 'transportation', label: 'Transportation & Logistics' },
  { value: 'travel', label: 'Travel & Tourism' },
  { value: 'other', label: 'Other' }
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

// Gender options
const genderOptions = [
  { value: "all", label: "All Genders" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "custom", label: "Custom Gender" }
];

// Language options
const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "pt", label: "Portuguese" },
  { value: "zh", label: "Chinese" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "ar", label: "Arabic" },
  { value: "hi", label: "Hindi" },
  { value: "ru", label: "Russian" }
];

// Income level options
const incomeOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "affluent", label: "Affluent" }
];

// Industry vertical options
const industryOptions = [
  { value: "ecommerce", label: "E-commerce" },
  { value: "saas", label: "SaaS" },
  { value: "finance", label: "Finance & Insurance" },
  { value: "education", label: "Education" },
  { value: "healthcare", label: "Healthcare" },
  { value: "travel", label: "Travel & Hospitality" },
  { value: "realestate", label: "Real Estate" },
  { value: "retail", label: "Retail" },
  { value: "auto", label: "Automotive" },
  { value: "entertainment", label: "Entertainment" },
  { value: "nonprofit", label: "Non-profit" },
  { value: "other", label: "Other" }
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
  const [skipAdCopy, setSkipAdCopy] = useState(false);
  const [formData, setFormData] = useState({
    // Campaign basics
    campaignName: '',
    objective: 'conversions',
    
    // Business information
    businessName: '',
    businessType: '',
    businessDescription: '',
    businessWebsite: '',
    industryVertical: '',
    
    // Target audience
    targetAudience: '',
    targetLocation: '',
    ageRangeMin: '18',
    ageRangeMax: '65',
    gender: 'all',
    languages: [],
    income: [],
    
    // Ideal customer profile
    customerInterests: '',
    customerBehaviors: '',
    customerPainPoints: '',
    lookalikes: false,
    
    // Keep existing fields that might be used elsewhere
    platforms: ["facebook", "instagram"],
    budgetRange: [1000, 3000],
    timeframeValue: 30,
    timeframeUnit: "days",
    audienceTypes: ["cold", "warm"],
    mainOfferDescription: "",
    product: "",
    industry: "",
    websiteUrl: "",
    salesFunnelUrl: "",
    audience: "",
    idealCustomerProfile: "",
    adCreative: {
      primaryText: "",
      headline: "",
      description: "",
      callToAction: "learn_more",
      destinationUrl: "",
      mediaType: "manual",
      mediaUrl: "",
    }
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

  const handleAdCreativeChange = (creativeData: any) => {
    setFormData((prev) => ({ ...prev, adCreative: creativeData }));
  };

  const handleFacebookConnection = (isConnected: boolean, accountData?: any) => {
    setFbConnected(isConnected);
    setFbAccountData(accountData);
  };

  const nextStep = () => {
    // Validation for each step
    if (currentStep === 1 && (!formData.businessName || !formData.businessType || !formData.industryVertical)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 2 && (!formData.targetAudience || !formData.targetLocation)) {
      toast({
        title: "Missing information",
        description: "Please provide target audience and location information.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 3 && (!formData.customerInterests || !formData.customerPainPoints)) {
      toast({
        title: "Missing information",
        description: "Please provide customer interests and pain points information.",
        variant: "destructive"
      });
      return;
    }

    // Skip validation on step 4 if skipAdCopy is true
    if (currentStep === 4) {
      if (!skipAdCopy && !formData.mainOfferDescription) {
        toast({
          title: "Missing information",
          description: "Main Offer Description is required.",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    // When navigating back from step 6 and ad copy was skipped
    if (currentStep === 6 && skipAdCopy) {
      setCurrentStep(4);
    } else if (currentStep > 1) {
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
        description: `AI-optimized strategy for ${formData.businessName || formData.product} targeting ${formData.targetAudience || formData.audience || "relevant audiences"} in the ${formData.industryVertical || formData.industry} industry, focused on ${formData.objective} objectives.`,
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
        name: `${formData.campaignName || formData.product} - ${formData.objective} Campaign`,
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
      case 1: // Campaign & Business Information - UPDATED with new structure
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Campaign & Business Information</h2>

            <div className="space-y-2">
              <label className="text-sm font-medium">Campaign Name <span className="text-red-500">*</span></label>
              <Input 
                placeholder="E.g., Summer Sale 2025" 
                value={formData.campaignName}
                onChange={(e) => handleInputChange('campaignName', e.target.value)}
              />
              <p className="text-xs text-gray-500">A descriptive name for your campaign</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Campaign Objective <span className="text-red-500">*</span></label>
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
              <p className="text-xs text-gray-500">The primary goal of your advertising campaign</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Business Name <span className="text-red-500">*</span></label>
              <Input 
                placeholder="Enter your business name" 
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
              />
              <p className="text-xs text-gray-500">The name of your business or brand</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Business Type <span className="text-red-500">*</span></label>
              <Select
                value={formData.businessType}
                onValueChange={(value) => handleInputChange('businessType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent className="max-h-72 overflow-y-auto">
                  {businessTypes.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">The type or category of your business</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Industry Vertical <span className="text-red-500">*</span></label>
              <Input 
                placeholder="E.g., Fitness, Real Estate, Technology" 
                value={formData.industryVertical}
                onChange={(e) => handleInputChange('industryVertical', e.target.value)}
              />
              <p className="text-xs text-gray-500">The industry your business operates in</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Business Description</label>
              <Textarea 
                placeholder="Describe your business and what you offer" 
                value={formData.businessDescription}
                onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-xs text-gray-500">A brief description of your company and its products/services</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Business Website</label>
              <Input 
                placeholder="E.g., https://www.example.com" 
                value={formData.businessWebsite}
                onChange={(e) => handleInputChange('businessWebsite', e.target.value)}
              />
              <p className="text-xs text-gray-500">Your main business website address</p>
            </div>
          </div>
        );
        
      case 2: // Target Audience - UPDATED with new structure
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Target Audience</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Audience Description <span className="text-red-500">*</span></label>
              <Textarea 
                placeholder="Describe your target audience in detail"
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                className="min-h-[120px]"
              />
              <p className="text-xs text-gray-500">
                Describe who your ideal customers are, including their demographics, interests, and behaviors
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Location <span className="text-red-500">*</span></label>
              <Input 
                placeholder="E.g., United States, New York City, Europe" 
                value={formData.targetLocation}
                onChange={(e) => handleInputChange('targetLocation', e.target.value)}
              />
              <p className="text-xs text-gray-500">The geographic areas you want to target</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Age Range</label>
              <div className="flex items-center gap-3">
                <Input 
                  type="number" 
                  min="13" 
                  max="65" 
                  placeholder="Min Age"
                  value={formData.ageRangeMin}
                  onChange={(e) => handleInputChange('ageRangeMin', e.target.value)}
                  className="w-24"
                />
                <span>to</span>
                <Input 
                  type="number" 
                  min="13" 
                  max="65+" 
                  placeholder="Max Age"
                  value={formData.ageRangeMax}
                  onChange={(e) => handleInputChange('ageRangeMax', e.target.value)}
                  className="w-24"
                />
              </div>
              <p className="text-xs text-gray-500">The age range of your target audience</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Gender</label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender targeting" />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">The gender(s) you want to target</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Languages</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {languageOptions.map((lang) => (
                  <Button
                    key={lang.value}
                    type="button"
                    variant={formData.languages.includes(lang.value) ? "default" : "outline"}
                    className={formData.languages.includes(lang.value) ? "bg-metamaster-primary text-white" : ""}
                    onClick={() => handleMultiSelect('languages', lang.value)}
                  >
                    {formData.languages.includes(lang.value) ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <div className="w-4 mr-2" />
                    )}
                    {lang.label}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-gray-500">Languages spoken by your target audience</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Income Levels</label>
              <div className="grid grid-cols-2 gap-2">
                {incomeOptions.map((inc) => (
                  <Button
                    key={inc.value}
                    type="button"
                    variant={formData.income.includes(inc.value) ? "default" : "outline"}
                    className={formData.income.includes(inc.value) ? "bg-metamaster-primary text-white" : ""}
                    onClick={() => handleMultiSelect('income', inc.value)}
                  >
                    {formData.income.includes(inc.value) ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <div className="w-4 mr-2" />
                    )}
                    {inc.label}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-gray-500">Income levels to target (optional)</p>
            </div>
          </div>
        );

      case 3: // Ideal Customer Profile - UPDATED
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Ideal Customer Profile</h2>
            
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg mb-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Why this matters</h3>
              <p className="text-sm text-blue-700">
                Defining your ideal customer helps our AI create highly targeted campaigns that speak directly 
                to the people most likely to purchase from you. This leads to lower acquisition costs and higher conversion rates.
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Customer Interests <span className="text-red-500">*</span></label>
              <Textarea 
                placeholder="What are your ideal customers interested in?"
                value={formData.customerInterests}
                onChange={(e) => handleInputChange('customerInterests', e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-xs text-gray-500">
                List interests, hobbies, activities, and topics your ideal customers care about
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Customer Behaviors</label>
              <Textarea 
                placeholder="What online behaviors do your ideal customers exhibit?"
                value={formData.customerBehaviors}
                onChange={(e) => handleInputChange('customerBehaviors', e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-xs text-gray-500">
                Describe online behaviors like purchasing habits, content consumption, device usage, etc.
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Customer Pain Points <span className="text-red-500">*</span></label>
              <Textarea 
                placeholder="What problems or challenges does your ideal customer face?"
                value={formData.customerPainPoints}
                onChange={(e) => handleInputChange('customerPainPoints', e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-xs text-gray-500">
                Describe the problems your customers face that your product/service solves
              </p>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="lookalikes-switch"
                checked={formData.lookalikes}
                onCheckedChange={(checked) => handleInputChange('lookalikes', checked)}
              />
              <label htmlFor="lookalikes-switch" className="text-sm">
                Create lookalike audiences based on my existing customers
              </label>
            </div>
          </div>
        );

      case 4: // Ad Copy - UPDATED to include skip option
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Ad Copy</h2>
              <div className="flex items-center space-x-2">
                <Switch
                  id="skip-ad-copy"
                  checked={skipAdCopy}
                  onCheckedChange={setSkipAdCopy}
                />
                <label htmlFor="skip-ad-copy" className="text-sm font-medium">
                  Skip this step
                </label>
              </div>
            </div>
            
            {!skipAdCopy && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg mb-4">
                  <p className="text-sm text-blue-700">
                    Create compelling ad copy using our AI assistant. Fill in the following information to generate 
                    high-converting copy for your campaign.
                  </p>
                </div>

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
                
                {/* Embedded Ad Copy Generator */}
                <div className="pt-4 border-t border-gray-200 mt-6">
                  <AdCopyGenerator embedded={true} productDetails={formData.websiteUrl} offerDescription={formData.mainOfferDescription} />
                </div>
              </div>
            )}
            
            {skipAdCopy && (
              <div className="text-center py-8 text-gray-500">
                <p>You've chosen to skip the ad copy generation step.</p>
                <p className="text-sm mt-2">You can create ad copy later from the Ad Copy Generator tool.</p>
              </div>
            )}
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

      default:
        return null;
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
