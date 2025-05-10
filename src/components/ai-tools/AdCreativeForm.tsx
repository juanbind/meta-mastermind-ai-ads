
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Image, PenLine } from "lucide-react";

interface AdCreativeFormProps {
  primaryText: string;
  headline: string;
  description: string;
  callToAction: string;
  destinationUrl: string;
  mediaUrl: string;
  onPrimaryTextChange: (value: string) => void;
  onHeadlineChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onCallToActionChange: (value: string) => void;
  onDestinationUrlChange: (value: string) => void;
  onMediaUrlChange: (value: string) => void;
}

const AdCreativeForm: React.FC<AdCreativeFormProps> = ({
  primaryText,
  headline,
  description,
  callToAction,
  destinationUrl,
  mediaUrl,
  onPrimaryTextChange,
  onHeadlineChange,
  onDescriptionChange,
  onCallToActionChange,
  onDestinationUrlChange,
  onMediaUrlChange
}) => {
  const [activeTab, setActiveTab] = useState('upload');
  
  // Simulating file upload functionality
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      onMediaUrlChange(fakeUrl);
    }
  };
  
  const handleAIGeneration = () => {
    // In a real implementation, this would call an API to generate an image
    // For now, we'll just set a placeholder
    onMediaUrlChange('https://placeholder.com/600x400');
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="primaryText" className="block mb-2">Primary Text</Label>
        <Textarea
          id="primaryText"
          placeholder="Enter the main text for your ad..."
          value={primaryText}
          onChange={(e) => onPrimaryTextChange(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
      
      <div>
        <Label htmlFor="headline" className="block mb-2">Headline</Label>
        <Input
          id="headline"
          placeholder="Enter a catchy headline"
          value={headline}
          onChange={(e) => onHeadlineChange(e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="description" className="block mb-2">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter a brief description..."
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="callToAction" className="block mb-2">Call To Action</Label>
        <Select value={callToAction} onValueChange={onCallToActionChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a call to action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Learn More">Learn More</SelectItem>
            <SelectItem value="Shop Now">Shop Now</SelectItem>
            <SelectItem value="Sign Up">Sign Up</SelectItem>
            <SelectItem value="Contact Us">Contact Us</SelectItem>
            <SelectItem value="Book Now">Book Now</SelectItem>
            <SelectItem value="Download">Download</SelectItem>
            <SelectItem value="Get Offer">Get Offer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="destinationUrl" className="block mb-2">Destination URL</Label>
        <Input
          id="destinationUrl"
          placeholder="https://yourlanding.page"
          value={destinationUrl}
          onChange={(e) => onDestinationUrlChange(e.target.value)}
        />
      </div>
      
      <div>
        <Label className="block mb-2">Ad Media</Label>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload size={16} /> Upload Media
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <PenLine size={16} /> AI Generate
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="border rounded-md p-4 mt-2">
            <div className="flex flex-col items-center justify-center gap-4">
              {mediaUrl ? (
                <div className="relative w-full">
                  <img 
                    src={mediaUrl} 
                    alt="Ad creative preview" 
                    className="w-full h-auto rounded-md max-h-[300px] object-contain"
                  />
                  <Button 
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => onMediaUrlChange('')}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <>
                  <div className="border-2 border-dashed rounded-md p-8 w-full text-center">
                    <Image className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-2">
                      Upload an image or video for your ad
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Recommended size: 1080×1080px (1:1)
                    </p>
                    <div>
                      <label htmlFor="media-upload">
                        <Button as="span" variant="outline" size="sm">
                          Choose File
                        </Button>
                        <input
                          type="file"
                          id="media-upload"
                          className="hidden"
                          accept="image/*,video/*"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="ai" className="border rounded-md p-4 mt-2">
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Let AI generate an image based on your ad copy and offer details.
              </p>
              
              <div>
                <Label htmlFor="aiPrompt" className="block mb-2">Image Description (optional)</Label>
                <Textarea
                  id="aiPrompt"
                  placeholder="Describe the image you want to generate..."
                  className="min-h-[80px]"
                />
              </div>
              
              <Button onClick={handleAIGeneration} className="w-full">
                Generate Image
              </Button>
              
              {mediaUrl && mediaUrl.includes('placeholder') && (
                <div className="mt-4">
                  <img 
                    src={mediaUrl} 
                    alt="AI generated preview" 
                    className="w-full h-auto rounded-md max-h-[300px] object-contain"
                  />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdCreativeForm;
