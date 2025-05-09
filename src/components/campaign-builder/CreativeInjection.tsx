
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter 
} from '@/components/ui/card';
import { CampaignData, AdSetData, AdData } from '@/pages/CampaignBuilder';
import { useToast } from '@/hooks/use-toast';
import { Image, Video, Upload, Zap, AlertTriangle } from 'lucide-react';

interface CreativeInjectionProps {
  campaignData: CampaignData;
  updateCampaignData: (data: Partial<CampaignData>) => void;
  onBack: () => void;
  onNext: () => void;
}

const ctaOptions = [
  'Learn More',
  'Sign Up',
  'Shop Now',
  'Book Now',
  'Contact Us',
  'Download',
  'Get Offer',
  'Subscribe',
  'Watch More',
  'Apply Now'
];

const CreativeInjection: React.FC<CreativeInjectionProps> = ({
  campaignData,
  updateCampaignData,
  onBack,
  onNext
}) => {
  const { toast } = useToast();
  const [activeAdSetIndex, setActiveAdSetIndex] = useState(0);
  const [activeAdIndex, setActiveAdIndex] = useState(0);
  
  // Get the current ad set and ad
  const currentAdSet = campaignData.adSets[activeAdSetIndex];
  const currentAd = currentAdSet?.ads[activeAdIndex];
  
  const updateAd = (adData: Partial<AdData>) => {
    if (!currentAdSet) return;
    
    const newAdSets = [...campaignData.adSets];
    const newAds = [...currentAdSet.ads];
    newAds[activeAdIndex] = { ...newAds[activeAdIndex], ...adData };
    newAdSets[activeAdSetIndex].ads = newAds;
    
    updateCampaignData({ adSets: newAdSets });
  };
  
  const handleAddAd = () => {
    if (!currentAdSet) return;
    
    const newAdSets = [...campaignData.adSets];
    const newAd: AdData = {
      name: `Ad ${activeAdSetIndex + 1}.${currentAdSet.ads.length + 1}`,
      primaryText: '',
      headline: '',
      description: '',
      cta: 'Learn More',
      destinationUrl: campaignData.funnelUrl || 'https://example.com',
      mediaType: 'image',
      dynamicCreative: false
    };
    
    newAdSets[activeAdSetIndex].ads.push(newAd);
    updateCampaignData({ adSets: newAdSets });
    
    // Set the new ad as active
    setActiveAdIndex(currentAdSet.ads.length);
    
    toast({
      title: 'Ad Added',
      description: `New ad created in ad set: ${currentAdSet.name}`,
    });
  };
  
  const handleDeleteAd = () => {
    if (!currentAdSet || currentAdSet.ads.length <= 1) {
      toast({
        title: 'Cannot Delete',
        description: 'Each ad set must contain at least one ad',
        variant: 'destructive',
      });
      return;
    }
    
    const newAdSets = [...campaignData.adSets];
    const newAds = [...currentAdSet.ads];
    newAds.splice(activeAdIndex, 1);
    newAdSets[activeAdSetIndex].ads = newAds;
    
    updateCampaignData({ adSets: newAdSets });
    
    // Set the previous ad as active, or if this was the first ad, set the new first ad as active
    setActiveAdIndex(activeAdIndex > 0 ? activeAdIndex - 1 : 0);
    
    toast({
      title: 'Ad Deleted',
      description: 'The ad has been removed from the ad set',
    });
  };
  
  const handleMediaUpload = () => {
    // Simulating media upload with a sample image URL
    const sampleImageUrl = 'https://placehold.co/800x800/e6f7ff/0099cc?text=Sample+Ad+Image';
    updateAd({ mediaUrl: sampleImageUrl });
    
    toast({
      title: 'Media Uploaded',
      description: 'Your creative has been added to the ad',
    });
  };
  
  const generateAICreative = () => {
    // Simulate AI-generated creative
    updateAd({ 
      primaryText: `Stop wasting money on ineffective ads. Let AI create high-converting campaigns for your ${campaignData.offerType.toLowerCase()}.`,
      headline: 'AI-Powered Ad Results',
      description: 'Boost ROAS with smart targeting & creative optimization'
    });
    
    toast({
      title: 'AI Creative Generated',
      description: 'AI has created ad copy based on your offer details',
    });
  };
  
  const nextAd = () => {
    if (!currentAdSet) return;
    if (activeAdIndex < currentAdSet.ads.length - 1) {
      setActiveAdIndex(activeAdIndex + 1);
    } else if (activeAdSetIndex < campaignData.adSets.length - 1) {
      // Move to the first ad of the next ad set
      setActiveAdSetIndex(activeAdSetIndex + 1);
      setActiveAdIndex(0);
    }
  };
  
  const prevAd = () => {
    if (activeAdIndex > 0) {
      setActiveAdIndex(activeAdIndex - 1);
    } else if (activeAdSetIndex > 0) {
      // Move to the last ad of the previous ad set
      setActiveAdSetIndex(activeAdSetIndex - 1);
      setActiveAdIndex(campaignData.adSets[activeAdSetIndex - 1].ads.length - 1);
    }
  };
  
  if (!currentAdSet || !currentAd) {
    return (
      <div className="text-center py-8">
        <AlertTriangle className="mx-auto text-yellow-500 mb-4" size={48} />
        <h3 className="font-bold text-lg">No Ad Sets Found</h3>
        <p className="text-gray-600 mb-4">Please go back and create at least one ad set with an ad</p>
        <Button onClick={onBack}>Back to Campaign Structure</Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Creative Injection</h2>
      
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <div className="mr-auto flex items-center space-x-2">
          <Select value={`${activeAdSetIndex}`} onValueChange={(v) => setActiveAdSetIndex(parseInt(v))}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Ad Set" />
            </SelectTrigger>
            <SelectContent>
              {campaignData.adSets.map((adSet, index) => (
                <SelectItem key={index} value={`${index}`}>{adSet.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={`${activeAdIndex}`} onValueChange={(v) => setActiveAdIndex(parseInt(v))}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Ad" />
            </SelectTrigger>
            <SelectContent>
              {currentAdSet.ads.map((ad, index) => (
                <SelectItem key={index} value={`${index}`}>Ad {index + 1}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={prevAd} disabled={activeAdSetIndex === 0 && activeAdIndex === 0}>
            Previous Ad
          </Button>
          <Button variant="outline" size="sm" onClick={nextAd} 
            disabled={(activeAdSetIndex === campaignData.adSets.length - 1) && 
                    (activeAdIndex === currentAdSet.ads.length - 1)}>
            Next Ad
          </Button>
          <Button variant="outline" size="sm" onClick={handleAddAd}>
            Add New Ad
          </Button>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ad Details</CardTitle>
                <CardDescription>
                  Edit the content for {currentAdSet.name} / {currentAd.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="adName">Ad Name</Label>
                  <Input 
                    id="adName" 
                    value={currentAd.name}
                    onChange={(e) => updateAd({ name: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="primaryText">Primary Text</Label>
                  <Textarea 
                    id="primaryText" 
                    value={currentAd.primaryText}
                    onChange={(e) => updateAd({ primaryText: e.target.value })}
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="headline">Headline</Label>
                  <Input 
                    id="headline" 
                    value={currentAd.headline}
                    onChange={(e) => updateAd({ headline: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input 
                    id="description" 
                    value={currentAd.description}
                    onChange={(e) => updateAd({ description: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cta">Call to Action</Label>
                    <Select 
                      value={currentAd.cta} 
                      onValueChange={(v) => updateAd({ cta: v })}
                    >
                      <SelectTrigger id="cta">
                        <SelectValue placeholder="Select CTA" />
                      </SelectTrigger>
                      <SelectContent>
                        {ctaOptions.map(cta => (
                          <SelectItem key={cta} value={cta}>{cta}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="mediaType">Media Type</Label>
                    <Select 
                      value={currentAd.mediaType} 
                      onValueChange={(v: 'image' | 'video') => updateAd({ mediaType: v })}
                    >
                      <SelectTrigger id="mediaType">
                        <SelectValue placeholder="Select media type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">
                          <div className="flex items-center">
                            <Image className="mr-2" size={14} />
                            Image
                          </div>
                        </SelectItem>
                        <SelectItem value="video">
                          <div className="flex items-center">
                            <Video className="mr-2" size={14} />
                            Video
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="destinationUrl">Destination URL</Label>
                  <Input 
                    id="destinationUrl" 
                    type="url"
                    value={currentAd.destinationUrl}
                    onChange={(e) => updateAd({ destinationUrl: e.target.value })}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="dynamicCreative" 
                    checked={currentAd.dynamicCreative}
                    onCheckedChange={(checked) => updateAd({ dynamicCreative: checked })}
                  />
                  <Label htmlFor="dynamicCreative">Enable Dynamic Creative Optimization</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleDeleteAd} disabled={currentAdSet.ads.length <= 1}>
                  Delete Ad
                </Button>
                <Button onClick={generateAICreative} className="flex items-center">
                  <Zap className="mr-2" size={16} />
                  Generate AI Copy
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Ad Media</CardTitle>
                <CardDescription>
                  Upload or generate creative for your ad
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                {currentAd.mediaUrl ? (
                  <div className="w-full">
                    <img 
                      src={currentAd.mediaUrl} 
                      alt="Ad Preview" 
                      className="w-full h-auto rounded-md mb-4" 
                    />
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => updateAd({ mediaUrl: undefined })}
                    >
                      Remove Media
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-8 w-full text-center">
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-gray-600 mb-4">Drag and drop or click to upload</p>
                    <div className="flex flex-col space-y-2">
                      <Button onClick={handleMediaUpload}>
                        Upload {currentAd.mediaType === 'image' ? 'Image' : 'Video'}
                      </Button>
                      <Button variant="outline">
                        Generate with AI
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Ad Preview</CardTitle>
              <CardDescription>
                See how your ad will appear on Meta platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="feed">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="feed" className="flex-1">Feed</TabsTrigger>
                  <TabsTrigger value="stories" className="flex-1">Stories</TabsTrigger>
                  <TabsTrigger value="messenger" className="flex-1">Messenger</TabsTrigger>
                </TabsList>
                
                <TabsContent value="feed" className="mt-0">
                  <div className="border rounded-md overflow-hidden bg-white">
                    <div className="p-3 border-b flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                        FB
                      </div>
                      <div className="ml-2">
                        <div className="font-medium">Your Business Page</div>
                        <div className="text-xs text-gray-500">Sponsored · <span className="text-blue-600">Like Page</span></div>
                      </div>
                    </div>
                    
                    {currentAd.primaryText && (
                      <div className="px-3 py-2">
                        {currentAd.primaryText}
                      </div>
                    )}
                    
                    <div className="border-t border-b">
                      {currentAd.mediaUrl ? (
                        <img 
                          src={currentAd.mediaUrl} 
                          alt="Ad Preview" 
                          className="w-full h-auto" 
                        />
                      ) : (
                        <div className="bg-gray-100 flex items-center justify-center" style={{ height: '200px' }}>
                          {currentAd.mediaType === 'image' ? (
                            <Image className="text-gray-400" size={48} />
                          ) : (
                            <Video className="text-gray-400" size={48} />
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-3">
                      <div className="font-bold text-gray-800">
                        {currentAd.headline || 'Your Headline Will Appear Here'}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {currentAd.description || 'Your description will appear here'}
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="text-xs text-gray-500 mr-auto truncate">
                          {new URL(currentAd.destinationUrl).hostname}
                        </div>
                        <Button size="sm" className="ml-2 bg-blue-600 hover:bg-blue-700">
                          {currentAd.cta}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="px-3 py-2 border-t flex justify-between text-gray-500">
                      <span>Like</span>
                      <span>Comment</span>
                      <span>Share</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="stories">
                  <div className="bg-gray-100 rounded-md p-8 text-center">
                    <p className="text-gray-500">Stories preview coming soon</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="messenger">
                  <div className="bg-gray-100 rounded-md p-8 text-center">
                    <p className="text-gray-500">Messenger preview coming soon</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="pt-8 flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext} disabled={!currentAd.primaryText || !currentAd.headline}>
          Continue to Launch
        </Button>
      </div>
    </div>
  );
};

export default CreativeInjection;
