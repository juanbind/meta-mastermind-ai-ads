
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Copy, 
  Sparkles, 
  Check, 
  RefreshCw, 
  Star, 
  StarOff, 
  ThumbsUp, 
  ThumbsDown, 
  ExternalLink
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { supabase } from '@/lib/supabase';

interface AdVersion {
  primaryText: string;
  headline: string;
  description: string;
  rating?: number;
}

interface GeneratedContent {
  versions: AdVersion[];
}

const AdCopyGenerator: React.FC = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [activeTab, setActiveTab] = useState('generate');
  
  // Generation form state
  const [productDetails, setProductDetails] = useState('');
  const [mainOffer, setMainOffer] = useState('');
  const [adType, setAdType] = useState<string | null>(null);
  const [platform, setPlatform] = useState('facebook');
  const [tone, setTone] = useState<string>('professional');
  const [industry, setIndustry] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  
  // Results state
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [selectedVersionIndex, setSelectedVersionIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [refinementFeedback, setRefinementFeedback] = useState('');

  const adTypes = [
    { label: 'Promotional', value: 'promotional' },
    { label: 'Educational', value: 'educational' },
    { label: 'Testimonial-Based', value: 'testimonial' },
    { label: 'Problem-Solution', value: 'problem-solution' },
    { label: 'FOMO (Fear of Missing Out)', value: 'fomo' },
    { label: 'Emotional Appeal', value: 'emotional' }
  ];

  const platformOptions = [
    { label: 'Facebook', value: 'facebook' },
    { label: 'Instagram', value: 'instagram' },
    { label: 'Twitter/X', value: 'twitter' },
    { label: 'LinkedIn', value: 'linkedin' },
    { label: 'Google Ads', value: 'google' },
  ];

  const toneOptions = [
    { label: 'Professional', value: 'professional' },
    { label: 'Casual', value: 'casual' },
    { label: 'Humorous', value: 'humorous' },
    { label: 'Urgent', value: 'urgent' },
    { label: 'Informative', value: 'informative' },
    { label: 'Luxury', value: 'luxury' },
  ];

  const handleGenerate = async () => {
    if (!productDetails || !mainOffer) {
      toast({
        title: "Missing information",
        description: "Please enter product details and main offer",
        variant: "destructive"
      });
      return;
    }

    if (!adType) {
      toast({
        title: "Missing information",
        description: "Please select an ad type",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-ad-copy', {
        body: { 
          productDetails, 
          mainOffer, 
          adType, 
          platform, 
          tone, 
          targetAudience, 
          industry 
        }
      });
      
      if (error) {
        throw error;
      }
      
      console.log('Generated content:', data);
      setGeneratedContent(data);
      setActiveTab('results');
      
      toast({
        title: "Ad copy generated",
        description: "Check out your new ad copy options",
      });
    } catch (error) {
      console.error('Error generating ad copy:', error);
      toast({
        title: "Generation failed",
        description: "Could not generate ad copy. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefine = async () => {
    if (selectedVersionIndex === null) {
      toast({
        title: "No version selected",
        description: "Please select a version to refine",
        variant: "destructive"
      });
      return;
    }

    if (!refinementFeedback) {
      toast({
        title: "Missing information",
        description: "Please provide feedback for refinement",
        variant: "destructive"
      });
      return;
    }

    setIsRefining(true);

    // In a real implementation, this would call the backend refinement API
    // For now, we'll simulate the refinement process
    try {
      // Simulate a delay for the refinement process
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Create a modified version based on the selected one
      if (generatedContent && selectedVersionIndex !== null) {
        const selectedVersion = generatedContent.versions[selectedVersionIndex];
        
        // This is a simplified simulation - in a real app, you would call your 
        // refine-ad-copy edge function with the feedback
        const refinedVersions = [...generatedContent.versions];
        refinedVersions[selectedVersionIndex] = {
          ...selectedVersion,
          primaryText: selectedVersion.primaryText + " [refined based on feedback]",
          headline: "Refined: " + selectedVersion.headline,
          description: selectedVersion.description + " [improved]"
        };
        
        setGeneratedContent({
          versions: refinedVersions
        });
        
        setRefinementFeedback('');
        
        toast({
          title: "Ad copy refined",
          description: "Check out your refined ad copy",
        });
      }
    } catch (error) {
      console.error('Error refining ad copy:', error);
      toast({
        title: "Refinement failed",
        description: "Could not refine ad copy. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefining(false);
    }
  };

  const handleCopyToClipboard = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    
    toast({
      title: "Copied to clipboard",
      description: "Ad copy has been copied to your clipboard",
    });
    
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  const handleRateVersion = (index: number, rating: number) => {
    if (!generatedContent) return;

    const updatedVersions = [...generatedContent.versions];
    updatedVersions[index] = {
      ...updatedVersions[index],
      rating,
    };

    setGeneratedContent({
      versions: updatedVersions,
    });

    toast({
      title: "Thanks for your feedback",
      description: "Your rating helps improve our ad copy generator",
    });
  };

  const renderAdPreview = (version: AdVersion, index: number) => {
    if (!version) return null;

    return (
      <div 
        className={`border rounded-lg p-4 mb-4 relative ${
          selectedVersionIndex === index ? 'border-metamaster-primary border-2' : ''
        }`}
      >
        <div className="flex justify-between mb-2">
          <Badge variant="outline">Version {index + 1}</Badge>
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`h-8 w-8 p-0 ${version.rating === 1 ? 'text-green-500' : ''}`}
              onClick={() => handleRateVersion(index, 1)}
            >
              <ThumbsUp size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`h-8 w-8 p-0 ${version.rating === -1 ? 'text-red-500' : ''}`}
              onClick={() => handleRateVersion(index, -1)}
            >
              <ThumbsDown size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => setSelectedVersionIndex(index)}
            >
              {selectedVersionIndex === index ? <Check size={16} /> : <Star size={16} />}
            </Button>
          </div>
        </div>

        <div className="bg-gray-100 p-3 rounded mb-2">
          <h4 className="text-sm font-bold mb-1">Primary Text</h4>
          <p className="text-sm">{version.primaryText}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-1"
            onClick={() => handleCopyToClipboard(version.primaryText, index * 3)}
          >
            {copiedIndex === index * 3 ? <Check size={14} /> : <Copy size={14} />}
            <span className="ml-1 text-xs">Copy</span>
          </Button>
        </div>

        <div className="bg-gray-100 p-3 rounded mb-2">
          <h4 className="text-sm font-bold mb-1">Headline</h4>
          <p className="text-sm font-medium">{version.headline}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-1"
            onClick={() => handleCopyToClipboard(version.headline, index * 3 + 1)}
          >
            {copiedIndex === index * 3 + 1 ? <Check size={14} /> : <Copy size={14} />}
            <span className="ml-1 text-xs">Copy</span>
          </Button>
        </div>

        <div className="bg-gray-100 p-3 rounded">
          <h4 className="text-sm font-bold mb-1">Description</h4>
          <p className="text-sm">{version.description}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-1"
            onClick={() => handleCopyToClipboard(version.description, index * 3 + 2)}
          >
            {copiedIndex === index * 3 + 2 ? <Check size={14} /> : <Copy size={14} />}
            <span className="ml-1 text-xs">Copy</span>
          </Button>
        </div>

        <div className="mt-3 text-right">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setSelectedVersionIndex(index);
              document.getElementById('refinement-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <RefreshCw size={14} className="mr-1" />
            Refine This Version
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generate">
            <span className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Create Ad Copy
            </span>
          </TabsTrigger>
          <TabsTrigger value="results" disabled={!generatedContent}>
            <span className="flex items-center">
              <Sparkles className="mr-2 h-4 w-4" />
              Results
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ad Copy Generator</CardTitle>
              <CardDescription>
                Create high-converting ad copy for your products or services
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product URL or Description*
                </label>
                <Textarea 
                  placeholder="Enter your product URL or describe what you're advertising"
                  className="min-h-[100px]"
                  value={productDetails}
                  onChange={(e) => setProductDetails(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main Offer Description*
                </label>
                <Textarea 
                  placeholder="What is your main offer, discount, or selling point?"
                  className="min-h-[100px]"
                  value={mainOffer}
                  onChange={(e) => setMainOffer(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Type*
                </label>
                <div className="flex flex-wrap gap-2">
                  {adTypes.map(type => (
                    <button
                      key={type.value}
                      onClick={() => setAdType(type.value)}
                      className={`px-3 py-1.5 rounded-md text-sm ${
                        adType === type.value 
                          ? 'bg-metamaster-primary text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Platform
                  </label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {platformOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tone
                  </label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {toneOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <Input 
                    placeholder="Industry or business category"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Audience
                  </label>
                  <Input 
                    placeholder="Who is your ad targeting?"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-metamaster-primary hover:bg-metamaster-secondary"
              >
                {isGenerating ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Generating...
                  </>
                ) : (
                  "Generate Ad Copy"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="results" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated Ad Copy</CardTitle>
              <CardDescription>
                Review the options and select a version to refine
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {generatedContent && generatedContent.versions ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-base font-semibold mb-3">Ad Previews</h3>
                    <div>
                      {generatedContent.versions.map((version, index) => 
                        renderAdPreview(version, index)
                      )}
                    </div>
                  </div>
                  
                  <div id="refinement-section" className="border-t pt-6">
                    <h3 className="text-base font-semibold mb-3">Refine Selected Version</h3>
                    
                    {selectedVersionIndex !== null ? (
                      <>
                        <p className="text-sm text-gray-600 mb-3">
                          You've selected Version {selectedVersionIndex + 1}. Provide feedback to refine this version.
                        </p>
                        
                        <Textarea
                          placeholder="What would you like to change? (e.g., 'Make it more urgent', 'Emphasize the discount more', 'Shorten the headline')"
                          className="min-h-[100px] mb-4"
                          value={refinementFeedback}
                          onChange={(e) => setRefinementFeedback(e.target.value)}
                        />
                        
                        <Button 
                          onClick={handleRefine}
                          disabled={isRefining}
                          className="bg-metamaster-primary hover:bg-metamaster-secondary"
                        >
                          {isRefining ? (
                            <>
                              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                              Refining...
                            </>
                          ) : (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Refine Ad Copy
                            </>
                          )}
                        </Button>
                      </>
                    ) : (
                      <p className="text-sm text-gray-600">
                        Select a version above to refine it.
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No ad copy has been generated yet.
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('generate')}
              >
                Edit Details
              </Button>
              
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="bg-metamaster-primary hover:bg-metamaster-secondary"
              >
                {isGenerating ? "Generating..." : "Generate More Variants"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdCopyGenerator;
