
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  Loader2, Copy, CheckCircle2, RefreshCw, Sparkles, MessageSquare, Facebook, Instagram, 
  Clipboard, Zap
} from 'lucide-react';

interface AdCopyGeneratorProps {
  embedded?: boolean;
  productDetails?: string;
  offerDescription?: string;
}

const AdCopyGenerator: React.FC<AdCopyGeneratorProps> = ({ 
  embedded = false,
  productDetails: initialProductDetails = "",
  offerDescription: initialOfferDescription = ""
}) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    productDetails: initialProductDetails,
    offerDescription: initialOfferDescription,
    adType: "promotional",
    platform: "facebook",
    toneOfVoice: "professional",
    targetAudience: "",
    industry: "ecommerce"
  });
  
  const [generatedAds, setGeneratedAds] = useState<any[]>([]);
  const [selectedAd, setSelectedAd] = useState<number | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  
  const adTypeOptions = [
    { value: "promotional", label: "Promotional" },
    { value: "educational", label: "Educational" },
    { value: "testimonial", label: "Testimonial" },
    { value: "problem_solution", label: "Problem-Solution" },
    { value: "announcement", label: "Announcement" }
  ];
  
  const platformOptions = [
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "twitter", label: "Twitter" },
    { value: "tiktok", label: "TikTok" }
  ];
  
  const toneOptions = [
    { value: "professional", label: "Professional" },
    { value: "conversational", label: "Conversational" },
    { value: "humorous", label: "Humorous" },
    { value: "formal", label: "Formal" },
    { value: "inspirational", label: "Inspirational" },
    { value: "urgent", label: "Urgent" }
  ];
  
  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };
  
  const handleGenerate = async () => {
    if (!formData.productDetails || !formData.offerDescription) {
      toast({
        title: "Missing information",
        description: "Please provide product details and offer description",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/generate-ad-copy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          productDetails: formData.productDetails,
          mainOffer: formData.offerDescription,
          adType: formData.adType,
          platform: formData.platform,
          tone: formData.toneOfVoice,
          targetAudience: formData.targetAudience,
          industry: formData.industry
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Generated ad copy:", data);
      
      if (data.versions && data.versions.length > 0) {
        setGeneratedAds(data.versions);
        setSelectedAd(0);
        setStep(2);
        
        // Scroll to results if in embedded mode
        if (embedded && resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        
        toast({
          title: "Ad copy generated",
          description: "We've created compelling ad copy variants for you",
        });
      } else {
        throw new Error("No ad copy variants were generated");
      }
    } catch (error) {
      console.error("Failed to generate ad copy:", error);
      
      // If API fails, use mock data for demonstration
      const mockAds = [
        {
          primaryText: "🔥 Transform your business with our innovative solution! Our customers report 35% improved efficiency in just 30 days. Limited-time offer: Get 15% off your first month when you sign up today.",
          headline: "Boost Efficiency By 35%",
          description: "Start your free trial today. No credit card required."
        },
        {
          primaryText: "Tired of wasting time on manual processes? Our platform automates your workflow, saving you hours each week. Join thousands of satisfied customers who've transformed their business.",
          headline: "Save 10+ Hours Every Week",
          description: "Try risk-free for 14 days with our money-back guarantee."
        },
        {
          primaryText: "\"Since implementing this solution, we've seen a 40% increase in productivity and cut costs by 25%.\" - Sarah J., Marketing Director. See what our platform can do for you.",
          headline: "Real Results, Real Customers",
          description: "Book a personalized demo to see how it works for your business."
        }
      ];
      
      setGeneratedAds(mockAds);
      setSelectedAd(0);
      setStep(2);
      
      toast({
        title: "Using demo content",
        description: "We're showing example ad copy since we couldn't connect to the API",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleCopyToClipboard = (adIndex: number, content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(`${adIndex}-${content.substring(0, 20)}`);
    
    toast({
      title: "Copied to clipboard",
      description: "Ad copy has been copied to your clipboard",
    });
    
    setTimeout(() => setCopied(null), 2000);
  };
  
  const handleRefresh = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Randomize some aspects of the copy to simulate regeneration
      const refreshedAds = generatedAds.map(ad => ({
        ...ad,
        primaryText: "REFRESHED: " + ad.primaryText,
      }));
      
      setGeneratedAds(refreshedAds);
      setIsGenerating(false);
    }, 1500);
  };
  
  const renderPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook size={16} />;
      case 'instagram':
        return <Instagram size={16} />;
      default:
        return <MessageSquare size={16} />;
    }
  };
  
  const renderAdPreview = (ad: any, index: number) => {
    return (
      <div 
        key={index}
        className={`border rounded-lg p-4 mb-4 cursor-pointer transition-all ${
          selectedAd === index ? 'border-metamaster-primary bg-metamaster-primary/5' : 'border-gray-200'
        }`}
        onClick={() => setSelectedAd(index)}
      >
        <div className="flex justify-between items-start">
          <h4 className="font-medium mb-2">Ad Variation {index + 1}</h4>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={(e) => {
                e.stopPropagation();
                handleCopyToClipboard(index, ad.primaryText);
              }}
            >
              {copied === `${index}-${ad.primaryText.substring(0, 20)}` ? 
                <CheckCircle2 className="h-4 w-4 text-green-500" /> : 
                <Copy className="h-4 w-4" />
              }
            </Button>
          </div>
        </div>
        
        <div className="mt-2 space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-gray-500">Primary Text</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyToClipboard(index, ad.primaryText);
                }}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-sm">{ad.primaryText}</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-gray-500">Headline</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyToClipboard(index, ad.headline);
                }}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-sm font-medium">{ad.headline}</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-gray-500">Description</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyToClipboard(index, ad.description);
                }}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-sm">{ad.description}</p>
          </div>
        </div>
      </div>
    );
  };
  
  // Content for Step 1: Generate
  const renderGenerateForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="productDetails" className="mb-1">Product URL or Description</Label>
        <Textarea 
          id="productDetails"
          placeholder="Enter your product URL or description"
          value={formData.productDetails}
          onChange={(e) => handleInputChange('productDetails', e.target.value)}
          className="min-h-[80px]"
        />
        <p className="text-xs text-gray-500 mt-1">
          Provide a link to your product page or describe your product/service in detail
        </p>
      </div>
      
      <div>
        <Label htmlFor="offerDescription" className="mb-1">Main Offer Description <span className="text-red-500">*</span></Label>
        <Textarea 
          id="offerDescription"
          placeholder="Describe your main offer (e.g., '20% discount on yearly subscriptions')"
          value={formData.offerDescription}
          onChange={(e) => handleInputChange('offerDescription', e.target.value)}
          className="min-h-[80px]"
        />
        <p className="text-xs text-gray-500 mt-1">
          Clearly describe your offer, promotion, or value proposition
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="adType" className="mb-1">Ad Type</Label>
          <Select 
            value={formData.adType} 
            onValueChange={(value) => handleInputChange('adType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select ad type" />
            </SelectTrigger>
            <SelectContent>
              {adTypeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="platform" className="mb-1">Platform</Label>
          <Select 
            value={formData.platform} 
            onValueChange={(value) => handleInputChange('platform', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              {platformOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="toneOfVoice" className="mb-1">Tone of Voice</Label>
          <Select 
            value={formData.toneOfVoice} 
            onValueChange={(value) => handleInputChange('toneOfVoice', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              {toneOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="industry" className="mb-1">Industry</Label>
          <Input 
            id="industry"
            placeholder="Enter your industry (e.g., E-commerce, Healthcare)"
            value={formData.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="targetAudience" className="mb-1">Target Audience (Optional)</Label>
        <Textarea 
          id="targetAudience"
          placeholder="Describe your target audience"
          value={formData.targetAudience}
          onChange={(e) => handleInputChange('targetAudience', e.target.value)}
          className="min-h-[60px]"
        />
        <p className="text-xs text-gray-500 mt-1">
          Describe your ideal customers (e.g., age, gender, interests, pain points)
        </p>
      </div>
      
      <div className="pt-4">
        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating}
          className="w-full md:w-auto"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Ad Copy
            </>
          )}
        </Button>
      </div>
    </div>
  );
  
  // Content for Step 2: Results
  const renderResults = () => (
    <div ref={resultRef} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium">Generated Ad Copy</h3>
          <p className="text-sm text-gray-600">Select the ad variation you prefer</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isGenerating}>
            {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-1" />}
            Regenerate
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="list-view">
        <TabsList className="mb-4">
          <TabsTrigger value="list-view">List View</TabsTrigger>
          <TabsTrigger value="platform-preview">Platform Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list-view" className="space-y-4">
          {generatedAds.map((ad, index) => renderAdPreview(ad, index))}
        </TabsContent>
        
        <TabsContent value="platform-preview">
          {selectedAd !== null && (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-3 border-b flex items-center gap-2">
                {renderPlatformIcon(formData.platform)}
                <span className="text-sm font-medium capitalize">{formData.platform} Ad Preview</span>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border">
                  <div className="p-3 border-b">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium">Your Business Name</div>
                        <div className="text-xs text-gray-500">Sponsored</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <p className="text-sm mb-3">{generatedAds[selectedAd].primaryText}</p>
                    <div className="aspect-video bg-gray-200 rounded-md mb-3 flex items-center justify-center text-gray-400">
                      [Ad Image]
                    </div>
                    <h4 className="font-medium">{generatedAds[selectedAd].headline}</h4>
                    <p className="text-sm text-gray-600">{generatedAds[selectedAd].description}</p>
                    <Button size="sm" className="mt-3 w-full">Learn More</Button>
                  </div>
                </div>
                
                <div className="mt-6 border-t pt-4">
                  <h4 className="font-medium mb-2">Ad Copy Elements:</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Primary Text</Label>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleCopyToClipboard(selectedAd, generatedAds[selectedAd].primaryText)}
                        >
                          <Clipboard className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <div className="p-2 bg-gray-50 rounded border text-sm">
                        {generatedAds[selectedAd].primaryText}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Headline</Label>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleCopyToClipboard(selectedAd, generatedAds[selectedAd].headline)}
                        >
                          <Clipboard className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <div className="p-2 bg-gray-50 rounded border text-sm font-medium">
                        {generatedAds[selectedAd].headline}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Description</Label>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleCopyToClipboard(selectedAd, generatedAds[selectedAd].description)}
                        >
                          <Clipboard className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <div className="p-2 bg-gray-50 rounded border text-sm">
                        {generatedAds[selectedAd].description}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-2" 
                      onClick={() => handleCopyToClipboard(
                        selectedAd, 
                        `Primary Text:\n${generatedAds[selectedAd].primaryText}\n\nHeadline:\n${generatedAds[selectedAd].headline}\n\nDescription:\n${generatedAds[selectedAd].description}`
                      )}
                    >
                      <Clipboard className="h-4 w-4 mr-2" />
                      Copy All Ad Copy Elements
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {!embedded && (
        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => setStep(1)}
          >
            Back to Generator
          </Button>
          
          <Button>
            <Zap className="mr-2 h-4 w-4" />
            Create New Ad Copy
          </Button>
        </div>
      )}
    </div>
  );
  
  // Main render
  return (
    <div className={`${embedded ? '' : 'bg-white rounded-xl shadow-md border border-gray-100 p-6'}`}>
      {!embedded && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Ad Copy Generator</h2>
          <p className="text-metamaster-gray-600">
            Create compelling ad copy optimized for different platforms
          </p>
        </div>
      )}
      
      {step === 1 && renderGenerateForm()}
      {step === 2 && renderResults()}
    </div>
  );
};

export default AdCopyGenerator;
