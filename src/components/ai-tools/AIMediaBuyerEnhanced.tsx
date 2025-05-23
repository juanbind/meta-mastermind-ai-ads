import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { 
  Target, 
  FileText, 
  BarChart, 
  Users, 
  Sparkles, 
  Link,
  Settings,
  Bell,
  TrendingUp
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AIMediaBuyerProps {
  onClose?: () => void;
}

const AIMediaBuyerEnhanced: React.FC<AIMediaBuyerProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
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
    education: [],
    income: [],
    
    // Ideal customer profile
    customerInterests: '',
    customerBehaviors: '',
    customerPainPoints: '',
    customAudiences: [],
    lookalikes: false,
    
    // Ad creative preferences
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    tone: 'professional',
    adFormat: 'image',
    callToAction: 'Learn More',
    
    // Budget & settings
    budget: '',
    duration: '30',
    bidStrategy: 'lowest_cost',
    stopLossThreshold: '200',
    enableStopLoss: true,
    autoOptimize: true,
    confirmBudgetChanges: true,
    copyGeneration: true,
    platformConnected: false
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isConnectingFacebook, setIsConnectingFacebook] = useState(false);
  const [activeTab, setActiveTab] = useState('setup');

  const objectives = [
    { value: 'awareness', label: 'Brand Awareness' },
    { value: 'traffic', label: 'Website Traffic' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'conversions', label: 'Conversions' },
    { value: 'leads', label: 'Lead Generation' },
    { value: 'sales', label: 'Sales' },
    { value: 'app_installs', label: 'App Installs' },
    { value: 'reach', label: 'Reach' },
    { value: 'video_views', label: 'Video Views' }
  ];

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

  const genderOptions = [
    { value: 'all', label: 'All' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];
  
  const educationOptions = [
    { value: 'high_school', label: 'High School' },
    { value: 'college', label: 'College' },
    { value: 'graduate', label: 'Graduate School' },
    { value: 'doctorate', label: 'Doctorate' }
  ];
  
  const incomeOptions = [
    { value: 'low', label: '$0 - $50,000' },
    { value: 'medium', label: '$50,000 - $100,000' },
    { value: 'high', label: '$100,000 - $150,000' },
    { value: 'very_high', label: '$150,000+' }
  ];
  
  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'italian', label: 'Italian' },
    { value: 'portuguese', label: 'Portuguese' },
    { value: 'russian', label: 'Russian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'korean', label: 'Korean' },
    { value: 'arabic', label: 'Arabic' },
    { value: 'hindi', label: 'Hindi' }
  ];
  
  const adFormatOptions = [
    { value: 'image', label: 'Single Image' },
    { value: 'carousel', label: 'Carousel' },
    { value: 'video', label: 'Video' },
    { value: 'collection', label: 'Collection' },
    { value: 'slideshow', label: 'Slideshow' },
    { value: 'stories', label: 'Stories' }
  ];
  
  const toneOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'serious', label: 'Serious' },
    { value: 'inspirational', label: 'Inspirational' },
    { value: 'educational', label: 'Educational' },
    { value: 'dramatic', label: 'Dramatic' },
    { value: 'urgent', label: 'Urgent' }
  ];
  
  const callToActionOptions = [
    { value: 'learn_more', label: 'Learn More' },
    { value: 'shop_now', label: 'Shop Now' },
    { value: 'sign_up', label: 'Sign Up' },
    { value: 'subscribe', label: 'Subscribe' },
    { value: 'download', label: 'Download' },
    { value: 'get_quote', label: 'Get Quote' },
    { value: 'contact_us', label: 'Contact Us' },
    { value: 'book_now', label: 'Book Now' },
    { value: 'apply_now', label: 'Apply Now' },
    { value: 'get_offer', label: 'Get Offer' }
  ];
  
  const bidStrategyOptions = [
    { value: 'lowest_cost', label: 'Lowest Cost' },
    { value: 'cost_cap', label: 'Cost Cap' },
    { value: 'bid_cap', label: 'Bid Cap' },
    { value: 'target_cost', label: 'Target Cost' }
  ];

  const handleStepChange = (newStep: number) => {
    // Validate form fields before proceeding
    if (step === 1) {
      if (!formData.campaignName) {
        toast({
          title: "Campaign name required",
          description: "Please enter a name for your campaign",
          variant: "destructive",
        });
        return;
      }
      
      if (!formData.businessName || !formData.businessType) {
        toast({
          title: "Business information required",
          description: "Please enter your business name and type",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (step === 2) {
      if (!formData.targetAudience || !formData.targetLocation) {
        toast({
          title: "Target information required",
          description: "Please provide target audience and location details",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (step === 3) {
      if (!formData.customerInterests) {
        toast({
          title: "Customer profile required",
          description: "Please provide at least some customer interests",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (step === 5) {
      if (!formData.budget) {
        toast({
          title: "Budget required",
          description: "Please enter your campaign budget",
          variant: "destructive",
        });
        return;
      }
    }
    
    setStep(newStep);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked
    });
  };
  
  const handleMultiSelectChange = (name: string, value: string, isChecked: boolean) => {
    setFormData(prev => {
      const currentValues = prev[name] as string[] || [];
      const updatedValues = isChecked 
        ? [...currentValues, value]
        : currentValues.filter(item => item !== value);
      
      return {
        ...prev,
        [name]: updatedValues
      };
    });
  };
  
  const handleConnectFacebook = async () => {
    setIsConnectingFacebook(true);
    
    // Simulate connection process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormData({
        ...formData,
        platformConnected: true
      });
      
      toast({
        title: "Facebook Ads connected",
        description: "Your Facebook Ads account has been connected successfully",
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Could not connect to Facebook Ads. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnectingFacebook(false);
    }
  };
  
  const handleGenerateCampaign = async () => {
    setIsGenerating(true);
    
    // Simulate campaign generation
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Campaign generated",
        description: "Your AI campaign has been created successfully",
      });
      
      // Move to the management tab after generation
      setActiveTab('manage');
    } catch (error) {
      toast({
        title: "Campaign generation failed",
        description: "Could not generate campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Campaign & Business Information</h3>
            
            <div>
              <label htmlFor="campaignName" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                Campaign Name
              </label>
              <Input
                id="campaignName"
                name="campaignName"
                value={formData.campaignName}
                onChange={handleInputChange}
                placeholder="Enter campaign name"
              />
            </div>
            
            <div>
              <label htmlFor="objective" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                Campaign Objective
              </label>
              <Select
                value={formData.objective}
                onValueChange={(value) => handleSelectChange('objective', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select objective" />
                </SelectTrigger>
                <SelectContent>
                  {objectives.map((objective) => (
                    <SelectItem key={objective.value} value={objective.value}>
                      {objective.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                Business Name
              </label>
              <Input
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                placeholder="Enter your business name"
              />
            </div>
            
            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                Business Type
              </label>
              <Select
                value={formData.businessType}
                onValueChange={(value) => handleSelectChange('businessType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] overflow-y-auto">
                  <div className="sticky top-0 bg-white px-2 py-1 border-b font-semibold">Retail & E-commerce</div>
                  {businessTypes.slice(0, 8).map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                  
                  <div className="sticky top-0 bg-white px-2 py-1 border-b border-t font-semibold">Health & Wellness</div>
                  {businessTypes.slice(8, 14).map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                  
                  <div className="sticky top-0 bg-white px-2 py-1 border-b border-t font-semibold">Services</div>
                  {businessTypes.slice(14, 23).map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                  
                  <div className="sticky top-0 bg-white px-2 py-1 border-b border-t font-semibold">Technology</div>
                  {businessTypes.slice(23, 30).map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                  
                  <div className="sticky top-0 bg-white px-2 py-1 border-b border-t font-semibold">Food & Beverage</div>
                  {businessTypes.slice(30, 37).map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                  
                  <div className="sticky top-0 bg-white px-2 py-1 border-b border-t font-semibold">Education</div>
                  {businessTypes.slice(37, 43).map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                  
                  <div className="sticky top-0 bg-white px-2 py-1 border-b border-t font-semibold">Real Estate & Housing</div>
                  {businessTypes.slice(43, 49).map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                  
                  <div className="sticky top-0 bg-white px-2 py-1 border-b border-t font-semibold">Entertainment & Events</div>
                  {businessTypes.slice(49, 54).map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                  
                  <div className="sticky top-0 bg-white px-2 py-1 border-b border-t font-semibold">Other Industries</div>
                  {businessTypes.slice(54).map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="industryVertical" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                Industry Vertical
              </label>
              <Input
                id="industryVertical"
                name="industryVertical"
                value={formData.industryVertical}
                onChange={handleInputChange}
                placeholder="E.g., Luxury Retail, B2B SaaS, Healthcare"
              />
            </div>
            
            <div>
              <label htmlFor="businessDescription" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                Business Description
              </label>
              <Textarea
                id="businessDescription"
                name="businessDescription"
                value={formData.businessDescription}
                onChange={handleInputChange}
                placeholder="Briefly describe your business, products, or services"
                className="min-h-[80px]"
              />
            </div>
            
            <div>
              <label htmlFor="businessWebsite" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                Business Website
              </label>
              <Input
                id="businessWebsite"
                name="businessWebsite"
                value={formData.businessWebsite}
                onChange={handleInputChange}
                placeholder="Enter your business website URL"
              />
            </div>
            
            <div className="flex justify-end">
              <Button
                onClick={() => handleStepChange(2)}
                className="bg-metamaster-primary hover:bg-metamaster-secondary"
              >
                Next
              </Button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Target Audience</h3>
            
            <div>
              <label htmlFor="targetAudience" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                Target Audience Description
              </label>
              <Textarea
                id="targetAudience"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                placeholder="Describe your target audience (e.g., professionals in finance, parents with young children)"
                className="min-h-[80px]"
              />
            </div>
            
            <div>
              <label htmlFor="targetLocation" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                Target Location
              </label>
              <Input
                id="targetLocation"
                name="targetLocation"
                value={formData.targetLocation}
                onChange={handleInputChange}
                placeholder="Enter location(s) to target (e.g., New York City, California)"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="ageRangeMin" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                  Age Range (Minimum)
                </label>
                <Input
                  id="ageRangeMin"
                  name="ageRangeMin"
                  type="number"
                  min="13"
                  max="65"
                  value={formData.ageRangeMin}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="ageRangeMax" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                  Age Range (Maximum)
                </label>
                <Input
                  id="ageRangeMax"
                  name="ageRangeMax"
                  type="number"
                  min="13"
                  max="65"
                  value={formData.ageRangeMax}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                Gender
              </label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleSelectChange('gender', value)}
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
            </div>
            
            <div>
              <label className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                Languages
              </label>
              <div className="grid grid-cols-3 gap-2 p-3 border rounded-md">
                {languageOptions.map((language) => (
                  <div key={language.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`language-${language.value}`} 
                      checked={formData.languages.includes(language.value)}
                      onCheckedChange={(checked) => 
                        handleMultiSelectChange('languages', language.value, checked === true)
                      }
                    />
                    <label 
                      htmlFor={`language-${language.value}`}
                      className="text-sm cursor-pointer"
                    >
                      {language.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="advanced">
                <AccordionTrigger>Advanced Audience Options</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                      Education Level
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-3 border rounded-md">
                      {educationOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`education-${option.value}`} 
                            checked={formData.education.includes(option.value)}
                            onCheckedChange={(checked) => 
                              handleMultiSelectChange('education', option.value, checked === true)
                            }
                          />
                          <label 
                            htmlFor={`education-${option.value}`}
                            className="text-sm cursor-pointer"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                      Income Level
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-3 border rounded-md">
                      {incomeOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`income-${option.value}`} 
                            checked={formData.income.includes(option.value)}
                            onCheckedChange={(checked) => 
                              handleMultiSelectChange('income', option.value, checked === true)
                            }
                          />
                          <label 
                            htmlFor={`income-${option.value}`}
                            className="text-sm cursor-pointer"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => handleStepChange(1)}
              >
                Previous
              </Button>
              <Button
                onClick={() => handleStepChange(3)}
                className="bg-metamaster-primary hover:bg-metamaster-secondary"
              >
                Next
              </Button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Ideal Customer Profile</h3>
            
            <div>
              <label htmlFor="customerInterests" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                Customer Interests
              </label>
              <Textarea
                id="customerInterests"
                name="customerInterests"
                value={formData.customerInterests}
                onChange={handleInputChange}
                placeholder="What interests, hobbies, or topics is your ideal customer passionate about?"
                className="min-h-[80px]"
              />
            </div>
            
            <div>
              <label htmlFor="customerBehaviors" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                Customer Behaviors
              </label>
              <Textarea
                id="customerBehaviors"
                name="customerBehaviors"
                value={formData.customerBehaviors}
                onChange={handleInputChange}
                placeholder="What actions does your ideal customer take online? (e.g., frequent online shoppers, watches DIY videos)"
                className="min-h-[80px]"
              />
            </div>
            
            <div>
              <label htmlFor="customerPainPoints" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                Customer Pain Points
              </label>
              <Textarea
                id="customerPainPoints"
                name="customerPainPoints"
                value={formData.customerPainPoints}
                onChange={handleInputChange}
                placeholder="What problems or challenges does your ideal customer face that your product/service solves?"
                className="min-h-[80px]"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="lookalikes" 
                  checked={formData.lookalikes} 
                  onCheckedChange={(checked) => handleCheckboxChange('lookalikes', checked as boolean)}
                />
                <label htmlFor="lookalikes" className="text-sm font-medium text-metamaster-gray-700 cursor-pointer">
                  Create lookalike audiences based on your existing customers
                </label>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => handleStepChange(2)}
              >
                Previous
              </Button>
              <Button
                onClick={() => handleStepChange(4)}
                className="bg-metamaster-primary hover:bg-metamaster-secondary"
              >
                Next
              </Button>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Ad Creative Preferences</h3>
            
            <div>
              <label htmlFor="adFormat" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                Ad Format
              </label>
              <Select
                value={formData.adFormat}
                onValueChange={(value) => handleSelectChange('adFormat', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select ad format" />
                </SelectTrigger>
                <SelectContent>
                  {adFormatOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                Content Tone
              </label>
              <Select
                value={formData.tone}
                onValueChange={(value) => handleSelectChange('tone', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {toneOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="callToAction" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                Call to Action
              </label>
              <Select
                value={formData.callToAction}
                onValueChange={(value) => handleSelectChange('callToAction', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select call to action" />
                </SelectTrigger>
                <SelectContent>
                  {callToActionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="primaryColor" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                  Primary Brand Color
                </label>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-10 h-10 rounded-md border" 
                    style={{ backgroundColor: formData.primaryColor }}
                  ></div>
                  <Input
                    id="primaryColor"
                    name="primaryColor"
                    type="color"
                    value={formData.primaryColor}
                    onChange={handleInputChange}
                    className="w-full h-10"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="secondaryColor" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                  Secondary Brand Color
                </label>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-10 h-10 rounded-md border" 
                    style={{ backgroundColor: formData.secondaryColor }}
                  ></div>
                  <Input
                    id="secondaryColor"
                    name="secondaryColor"
                    type="color"
                    value={formData.secondaryColor}
                    onChange={handleInputChange}
                    className="w-full h-10"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => handleStepChange(3)}
              >
                Previous
              </Button>
              <Button
                onClick={() => handleStepChange(5)}
                className="bg-metamaster-primary hover:bg-metamaster-secondary"
              >
                Next
              </Button>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Budget & Configuration</h3>
            
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                Daily Budget
              </label>
              <Input
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="Enter amount in USD"
                type="number"
                min="1"
              />
            </div>
            
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                Campaign Duration (days)
              </label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="Number of days to run the campaign"
                type="number"
                min="1"
              />
            </div>
            
            <div>
              <label htmlFor="bidStrategy" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                Bid Strategy
              </label>
              <Select
                value={formData.bidStrategy}
                onValueChange={(value) => handleSelectChange('bidStrategy', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select bid strategy" />
                </SelectTrigger>
                <SelectContent>
                  {bidStrategyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="enableStopLoss" 
                  checked={formData.enableStopLoss} 
                  onCheckedChange={(checked) => handleCheckboxChange('enableStopLoss', checked as boolean)}
                />
                <label htmlFor="enableStopLoss" className="text-sm font-medium text-metamaster-gray-700 cursor-pointer">
                  Enable stop-loss automation
                </label>
              </div>
              
              {formData.enableStopLoss && (
                <div className="ml-6">
                  <label htmlFor="stopLossThreshold" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                    Stop-loss threshold (% of budget spent without results)
                  </label>
                  <Input
                    id="stopLossThreshold"
                    name="stopLossThreshold"
                    value={formData.stopLossThreshold}
                    onChange={handleInputChange}
                    type="number"
                    min="1"
                    max="1000"
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="autoOptimize" 
                  checked={formData.autoOptimize} 
                  onCheckedChange={(checked) => handleCheckboxChange('autoOptimize', checked as boolean)}
                />
                <label htmlFor="autoOptimize" className="text-sm font-medium text-metamaster-gray-700 cursor-pointer">
                  Automatically optimize campaigns over time
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="confirmBudgetChanges" 
                  checked={formData.confirmBudgetChanges} 
                  onCheckedChange={(checked) => handleCheckboxChange('confirmBudgetChanges', checked as boolean)}
                />
                <label htmlFor="confirmBudgetChanges" className="text-sm font-medium text-metamaster-gray-700 cursor-pointer">
                  Require confirmation before adjusting budget
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="copyGeneration" 
                  checked={formData.copyGeneration} 
                  onCheckedChange={(checked) => handleCheckboxChange('copyGeneration', checked as boolean)}
                />
                <label htmlFor="copyGeneration" className="text-sm font-medium text-metamaster-gray-700 cursor-pointer">
                  Generate high-converting ad copy
                </label>
              </div>
            </div>
            
            <div className="pt-4">
              {!formData.platformConnected ? (
                <Button
                  onClick={handleConnectFacebook}
                  className="bg-[#1877F2] hover:bg-[#0E5FCB] mb-4 w-full"
                  disabled={isConnectingFacebook}
                >
                  {isConnectingFacebook ? "Connecting..." : "Connect Facebook Ads Account"}
                </Button>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-full p-1 mr-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <span className="text-sm text-green-600 font-medium">Facebook Ads Account Connected</span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => handleStepChange(4)}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleGenerateCampaign}
                  className="bg-metamaster-primary hover:bg-metamaster-secondary"
                  disabled={isGenerating || !formData.platformConnected}
                >
                  {isGenerating ? "Generating..." : "Generate AI Campaign"}
                </Button>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="setup">
            <span className="flex items-center">
              <Target className="mr-2 h-4 w-4" />
              Setup
            </span>
          </TabsTrigger>
          <TabsTrigger value="manage">
            <span className="flex items-center">
              <BarChart className="mr-2 h-4 w-4" />
              Manage
            </span>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <span className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="setup" className="space-y-4 mt-4">
          <div className="bg-white rounded-lg p-4">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-1">Create AI Campaign</h2>
              <p className="text-sm text-metamaster-gray-600">
                Our AI will analyze your inputs and generate the optimal campaign structure and settings
              </p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${step >= 1 ? 'bg-metamaster-primary text-white' : 'bg-white text-metamaster-gray-400'}`}>
                  1
                </div>
                <div className={`flex-1 h-0.5 mx-2 ${step > 1 ? 'bg-metamaster-primary' : 'bg-metamaster-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${step >= 2 ? 'bg-metamaster-primary text-white' : 'bg-white text-metamaster-gray-400'}`}>
                  2
                </div>
                <div className={`flex-1 h-0.5 mx-2 ${step > 2 ? 'bg-metamaster-primary' : 'bg-metamaster-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${step >= 3 ? 'bg-metamaster-primary text-white' : 'bg-white text-metamaster-gray-400'}`}>
                  3
                </div>
                <div className={`flex-1 h-0.5 mx-2 ${step > 3 ? 'bg-metamaster-primary' : 'bg-metamaster-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${step >= 4 ? 'bg-metamaster-primary text-white' : 'bg-white text-metamaster-gray-400'}`}>
                  4
                </div>
                <div className={`flex-1 h-0.5 mx-2 ${step > 4 ? 'bg-metamaster-primary' : 'bg-metamaster-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${step >= 5 ? 'bg-metamaster-primary text-white' : 'bg-white text-metamaster-gray-400'}`}>
                  5
                </div>
              </div>
            </div>
            
            {renderStepContent()}
          </div>
        </TabsContent>
        
        <TabsContent value="manage" className="space-y-4 mt-4">
          {isGenerating ? (
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-metamaster-primary mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Generating Your AI Campaign</h3>
              <p className="text-metamaster-gray-600">Please wait while our AI creates your optimized campaign...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Campaign Performance</h2>
                
                {formData.campaignName ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-metamaster-gray-500">Spend</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">$0.00</div>
                          <p className="text-xs text-metamaster-gray-500">of ${formData.budget} daily budget</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-metamaster-gray-500">Results</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">0</div>
                          <p className="text-xs text-metamaster-gray-500">conversions</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-metamaster-gray-500">Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm font-medium px-2 py-1 rounded-full bg-green-100 text-green-800 inline-block">
                            Active
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="border rounded-lg p-4 bg-metamaster-gray-50">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Bell size={16} className="mr-2" />
                        AI Recommendations
                      </h3>
                      <div className="text-sm text-metamaster-gray-600">
                        <p>Your campaign is newly created. Check back in 24 hours for optimization recommendations.</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <Button variant="outline" className="flex items-center">
                        <FileText size={16} className="mr-2" />
                        View Ad Copy
                      </Button>
                      <Button variant="outline" className="flex items-center">
                        <Users size={16} className="mr-2" />
                        Audience Insights
                      </Button>
                      <Button variant="outline" className="flex items-center">
                        <TrendingUp size={16} className="mr-2" />
                        Generate Report
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Sparkles className="h-12 w-12 text-metamaster-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Active Campaigns</h3>
                    <p className="text-metamaster-gray-500 mb-4">Create a campaign to start optimizing your Facebook ads</p>
                    <Button onClick={() => setActiveTab('setup')} className="bg-metamaster-primary hover:bg-metamaster-secondary">
                      Create Campaign
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4 mt-4">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">AI Media Buyer Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium mb-3">Platform Connections</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-[#1877F2] text-white p-1 rounded-md mr-3">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Facebook Ads</h4>
                        <p className="text-sm text-metamaster-gray-500">
                          {formData.platformConnected 
                            ? "Connected to Ad Account" 
                            : "Connect to launch campaigns directly"}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant={formData.platformConnected ? "outline" : "default"}
                      onClick={formData.platformConnected ? () => {} : handleConnectFacebook}
                      className={formData.platformConnected ? "" : "bg-metamaster-primary hover:bg-metamaster-secondary"}
                    >
                      {formData.platformConnected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-[#4285F4] text-white p-1 rounded-md mr-3">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.541 7.526H12v3.364h5.952c-.564 2.433-2.957 3.761-5.428 3.761a6.472 6.472 0 0 1-6.47-6.499 6.47 6.47 0 0 1 6.47-6.499c1.57 0 2.982.603 4.065 1.586l2.535-2.535A10.693 10.693 0 0 0 12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c6 0 11.306-4.314 11.306-12 0-1.47-.215-2.606-.765-4.474Z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Google Ads</h4>
                        <p className="text-sm text-metamaster-gray-500">Coming Soon</p>
                      </div>
                    </div>
                    <Button variant="outline" disabled>
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-md font-medium mb-3">AI Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-optimize" className="font-medium">Auto-Optimization</Label>
                      <p className="text-sm text-metamaster-gray-500">
                        Allow AI to automatically optimize campaigns based on performance
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="auto-optimize" 
                        checked={formData.autoOptimize}
                        onCheckedChange={(checked) => handleCheckboxChange('autoOptimize', checked as boolean)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="stop-loss" className="font-medium">Stop-Loss Protection</Label>
                      <p className="text-sm text-metamaster-gray-500">
                        Automatically pause underperforming ads
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="stop-loss" 
                        checked={formData.enableStopLoss}
                        onCheckedChange={(checked) => handleCheckboxChange('enableStopLoss', checked as boolean)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="confirm-budget" className="font-medium">Budget Confirmation</Label>
                      <p className="text-sm text-metamaster-gray-500">
                        Require confirmation before increasing ad spend
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="confirm-budget" 
                        checked={formData.confirmBudgetChanges}
                        onCheckedChange={(checked) => handleCheckboxChange('confirmBudgetChanges', checked as boolean)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="ad-copy" className="font-medium">AI Ad Copy Generation</Label>
                      <p className="text-sm text-metamaster-gray-500">
                        Generate high-converting ad copy based on your product
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="ad-copy" 
                        checked={formData.copyGeneration}
                        onCheckedChange={(checked) => handleCheckboxChange('copyGeneration', checked as boolean)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-md font-medium mb-3">Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="performance-alerts" className="font-medium">Performance Alerts</Label>
                      <p className="text-sm text-metamaster-gray-500">
                        Get notified about significant performance changes
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="performance-alerts" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="budget-alerts" className="font-medium">Budget Alerts</Label>
                      <p className="text-sm text-metamaster-gray-500">
                        Get notified when budget is depleted or increased
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="budget-alerts" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-reports" className="font-medium">Weekly Reports</Label>
                      <p className="text-sm text-metamaster-gray-500">
                        Receive weekly performance summary reports
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="weekly-reports" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-metamaster-primary hover:bg-metamaster-secondary">
                  Save Settings
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIMediaBuyerEnhanced;
