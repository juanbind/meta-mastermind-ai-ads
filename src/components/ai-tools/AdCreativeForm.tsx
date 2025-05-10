
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Sparkles, Image as ImageIcon } from "lucide-react";
import { AdCreativeData } from './AIMediaBuyer';

interface AdCreativeFormProps {
  onChange: (data: AdCreativeData) => void;
  initialData?: Partial<AdCreativeData>;
}

const callToActionOptions = [
  { value: "learn_more", label: "Learn More" },
  { value: "shop_now", label: "Shop Now" },
  { value: "sign_up", label: "Sign Up" },
  { value: "contact_us", label: "Contact Us" },
  { value: "download", label: "Download" },
  { value: "get_offer", label: "Get Offer" },
  { value: "subscribe", label: "Subscribe" },
];

const AdCreativeForm: React.FC<AdCreativeFormProps> = ({ onChange, initialData = {} }) => {
  const [adCreative, setAdCreative] = useState<AdCreativeData>({
    primaryText: initialData.primaryText || '',
    headline: initialData.headline || '',
    description: initialData.description || '',
    callToAction: initialData.callToAction || 'learn_more',
    destinationUrl: initialData.destinationUrl || '',
    mediaType: initialData.mediaType || 'manual',
    mediaUrl: initialData.mediaUrl || '',
    aiPrompt: initialData.aiPrompt || '',
    generatedMedia: initialData.generatedMedia || null,
  });

  const [mediaTab, setMediaTab] = useState<string>(adCreative.mediaType);

  const handleInputChange = (field: string, value: any) => {
    const updatedCreative = { ...adCreative, [field]: value };
    setAdCreative(updatedCreative);
    onChange(updatedCreative);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          handleInputChange('mediaUrl', event.target.result);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const generateAIMedia = () => {
    // In a real implementation, this would call an AI image generation service
    console.log("Generating AI media with prompt:", adCreative.aiPrompt);
    
    // Mock implementation - would be replaced with actual AI generation
    setTimeout(() => {
      const mockGeneratedImageUrl = "https://placehold.co/600x400/darkblue/white?text=AI+Generated+Image";
      handleInputChange('generatedMedia', mockGeneratedImageUrl);
      handleInputChange('mediaUrl', mockGeneratedImageUrl);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Ad Creative</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="primaryText">Primary Text</Label>
          <Textarea 
            id="primaryText"
            placeholder="Enter the main text for your ad" 
            value={adCreative.primaryText}
            onChange={(e) => handleInputChange('primaryText', e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        
        <div>
          <Label htmlFor="headline">Headline</Label>
          <Input 
            id="headline"
            placeholder="Enter a compelling headline" 
            value={adCreative.headline}
            onChange={(e) => handleInputChange('headline', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Input 
            id="description"
            placeholder="Add a short description" 
            value={adCreative.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="callToAction">Call to Action</Label>
          <Select 
            value={adCreative.callToAction}
            onValueChange={(value) => handleInputChange('callToAction', value)}
          >
            <SelectTrigger id="callToAction">
              <SelectValue placeholder="Select a call to action" />
            </SelectTrigger>
            <SelectContent>
              {callToActionOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="destinationUrl">Destination URL</Label>
          <Input 
            id="destinationUrl"
            placeholder="Where should users go when they click your ad?" 
            value={adCreative.destinationUrl}
            onChange={(e) => handleInputChange('destinationUrl', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Media</Label>
          <Tabs 
            defaultValue={adCreative.mediaType} 
            value={mediaTab}
            onValueChange={(value) => {
              setMediaTab(value);
              handleInputChange('mediaType', value);
            }}
          >
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="manual" className="flex items-center gap-2">
                <Upload size={16} /> Manual Upload
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center gap-2">
                <Sparkles size={16} /> AI Generation
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="manual" className="pt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {adCreative.mediaUrl && mediaTab === "manual" ? (
                      <div className="w-full">
                        <img 
                          src={adCreative.mediaUrl} 
                          alt="Uploaded media" 
                          className="mx-auto max-h-[200px] object-contain mb-4"
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="mt-2"
                          onClick={() => handleInputChange('mediaUrl', '')}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <ImageIcon size={48} className="text-gray-400 mb-4" />
                        <p className="text-sm text-gray-500 mb-4">
                          Upload an image for your ad
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById('media-upload')?.click()}
                        >
                          Choose File
                        </Button>
                        <input
                          id="media-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleMediaUpload}
                        />
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ai" className="pt-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  {adCreative.generatedMedia ? (
                    <div className="flex flex-col items-center">
                      <img 
                        src={adCreative.generatedMedia} 
                        alt="AI generated media" 
                        className="max-h-[200px] object-contain mb-4"
                      />
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            handleInputChange('generatedMedia', null);
                            handleInputChange('mediaUrl', '');
                          }}
                        >
                          Remove
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => generateAIMedia()}
                        >
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="aiPrompt">Describe the image you want</Label>
                        <Textarea
                          id="aiPrompt"
                          placeholder="Example: A professional looking image showcasing our product with a clean background"
                          value={adCreative.aiPrompt}
                          onChange={(e) => handleInputChange('aiPrompt', e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>
                      <Button 
                        onClick={generateAIMedia}
                        disabled={!adCreative.aiPrompt?.trim()}
                        className="w-full"
                      >
                        <Sparkles size={16} className="mr-2" /> Generate Image
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdCreativeForm;
