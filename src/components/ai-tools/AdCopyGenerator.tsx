
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
import { FileText, Copy, Sparkles, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdCopyGenerator: React.FC = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('generate');
  const [productDetails, setProductDetails] = useState('');
  const [adType, setAdType] = useState<string | null>(null);
  const [generatedCopy, setGeneratedCopy] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const adTypes = [
    { label: 'Promotional', value: 'promotional' },
    { label: 'Educational', value: 'educational' },
    { label: 'Testimonial-Based', value: 'testimonial' },
    { label: 'Problem-Solution', value: 'problem-solution' },
    { label: 'FOMO (Fear of Missing Out)', value: 'fomo' },
    { label: 'Emotional Appeal', value: 'emotional' }
  ];

  const handleGenerate = async () => {
    if (!productDetails) {
      toast({
        title: "Missing information",
        description: "Please enter product details or URL",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    // Simulate generation process
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Mock generated copy (would be AI-generated in production)
      const mockCopyResults = [
        `"${adType}" ad: Experience the difference with our premium solution designed specifically for your needs. Limited time offer available now!`,
        `"${adType}" ad: Why settle for less when you can have the best? Our customers report 85% higher satisfaction after switching to our product.`,
        `"${adType}" ad: Transform your approach with our innovative solution. See results in just days, not weeks or months!`
      ];
      
      setGeneratedCopy(mockCopyResults);
      setActiveTab('results');
      
      toast({
        title: "Ad copy generated",
        description: "Check out your new high-converting ad copy",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Could not generate ad copy. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = (index: number) => {
    const textToCopy = generatedCopy[index];
    navigator.clipboard.writeText(textToCopy);
    setCopiedIndex(index);
    
    toast({
      title: "Copied to clipboard",
      description: "Ad copy has been copied to your clipboard",
    });
    
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
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
          <TabsTrigger value="results" disabled={generatedCopy.length === 0}>
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
                  Product URL or Description
                </label>
                <Textarea 
                  placeholder="Enter your product URL, paste previous ad content, or describe what you want"
                  className="min-h-[150px]"
                  value={productDetails}
                  onChange={(e) => setProductDetails(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Type
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
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating || !productDetails}
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
                Choose your favorite version or use elements from multiple versions
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {generatedCopy.length > 0 ? (
                generatedCopy.map((copy, index) => (
                  <div key={index} className="p-4 border rounded-lg relative">
                    <p>{copy}</p>
                    <div className="absolute top-2 right-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => handleCopyToClipboard(index)}
                      >
                        {copiedIndex === index ? <Check size={16} /> : <Copy size={16} />}
                      </Button>
                    </div>
                  </div>
                ))
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
                Generate More Variants
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdCopyGenerator;
