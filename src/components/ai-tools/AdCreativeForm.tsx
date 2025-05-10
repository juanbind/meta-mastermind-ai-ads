
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Image, FileText } from "lucide-react";

interface AdCreativeFormProps {
  onChange: (data: any) => void;
  initialData?: any;
}

const AdCreativeForm: React.FC<AdCreativeFormProps> = ({ onChange, initialData = {} }) => {
  const [adCreativeData, setAdCreativeData] = useState({
    primaryText: initialData.primaryText || "",
    headline: initialData.headline || "",
    description: initialData.description || "",
    callToAction: initialData.callToAction || "learn_more",
    destinationUrl: initialData.destinationUrl || "",
    mediaType: initialData.mediaType || "manual",
    mediaUrl: initialData.mediaUrl || "",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const callToActionOptions = [
    { value: "apply_now", label: "Apply Now" },
    { value: "book_now", label: "Book Now" },
    { value: "call_now", label: "Call Now" },
    { value: "contact_us", label: "Contact Us" },
    { value: "donate_now", label: "Donate Now" },
    { value: "download", label: "Download" },
    { value: "get_directions", label: "Get Directions" },
    { value: "get_offer", label: "Get Offer" },
    { value: "get_quote", label: "Get Quote" },
    { value: "install_app", label: "Install App" },
    { value: "learn_more", label: "Learn More" },
    { value: "listen_now", label: "Listen Now" },
    { value: "play_game", label: "Play Game" },
    { value: "request_time", label: "Request Time" },
    { value: "see_menu", label: "See Menu" },
    { value: "shop_now", label: "Shop Now" },
    { value: "sign_up", label: "Sign Up" },
    { value: "subscribe", label: "Subscribe" },
    { value: "use_app", label: "Use App" },
    { value: "watch_more", label: "Watch More" },
    { value: "send_message", label: "Send Message" },
    { value: "send_whatsapp_message", label: "Send WhatsApp Message" },
  ];

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...adCreativeData, [field]: value };
    setAdCreativeData(updatedData);
    onChange(updatedData);
  };

  const handleGenerateAI = () => {
    setIsGenerating(true);
    // In a real implementation, this would call an API to generate creative content
    setTimeout(() => {
      const generatedData = {
        primaryText: "Experience the difference with our premium product line, now with special introductory pricing.",
        headline: "Transform Your Life Today",
        description: "Limited time offer: Get 20% off your first purchase. Learn more about how our products can help you achieve your goals."
      };
      
      const updatedData = { ...adCreativeData, ...generatedData };
      setAdCreativeData(updatedData);
      onChange(updatedData);
      setIsGenerating(false);
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Ad Creative</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="primaryText" className="mb-1">Primary Text</Label>
            <Textarea 
              id="primaryText"
              placeholder="Enter the main body text for your ad"
              value={adCreativeData.primaryText}
              onChange={(e) => handleInputChange('primaryText', e.target.value)}
              className="min-h-[100px]"
            />
            <p className="text-xs text-gray-500 mt-1">The main body text of your ad (recommended: 125 characters or less)</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="headline" className="mb-1">Headline</Label>
              <Input 
                id="headline"
                placeholder="Enter a compelling headline"
                value={adCreativeData.headline}
                onChange={(e) => handleInputChange('headline', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">A catchy headline (recommended: 40 characters or less)</p>
            </div>
            
            <div>
              <Label htmlFor="description" className="mb-1">Description</Label>
              <Textarea 
                id="description"
                placeholder="Enter additional details about your offer"
                value={adCreativeData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="min-h-[80px]"
              />
              <p className="text-xs text-gray-500 mt-1">Additional information (recommended: 30 characters or less)</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="callToAction" className="mb-1">Call to Action</Label>
            <Select 
              value={adCreativeData.callToAction} 
              onValueChange={(value) => handleInputChange('callToAction', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a call to action" />
              </SelectTrigger>
              <SelectContent>
                {callToActionOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">Button text for your ad</p>
          </div>
          
          <div>
            <Label htmlFor="destinationUrl" className="mb-1">Destination URL</Label>
            <Input 
              id="destinationUrl"
              placeholder="https://your-website.com/landing-page"
              value={adCreativeData.destinationUrl}
              onChange={(e) => handleInputChange('destinationUrl', e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">Where users will go when they click your ad</p>
          </div>
        </div>
        
        <div>
          <Label className="mb-2 block">Media</Label>
          <RadioGroup 
            value={adCreativeData.mediaType} 
            onValueChange={(value) => handleInputChange('mediaType', value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="manual" id="media-manual" />
              <Label htmlFor="media-manual">Upload or provide image URL</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ai" id="media-ai" />
              <Label htmlFor="media-ai">Generate with AI (coming soon)</Label>
            </div>
          </RadioGroup>
          
          {adCreativeData.mediaType === 'manual' && (
            <div className="mt-4">
              <Label htmlFor="mediaUrl" className="mb-1">Image URL</Label>
              <Input 
                id="mediaUrl"
                placeholder="https://example.com/image.jpg"
                value={adCreativeData.mediaUrl}
                onChange={(e) => handleInputChange('mediaUrl', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Direct link to an image (recommended size: 1080x1080px)</p>
              
              <div className="mt-4 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                <Image className="h-8 w-8 text-gray-400 mb-2" />
                <div className="text-center">
                  <p className="text-sm text-gray-500">Drag and drop an image, or</p>
                  <Button variant="outline" size="sm" className="mt-2">Upload</Button>
                </div>
                <p className="text-xs text-gray-400 mt-4">Supported formats: JPG, PNG, GIF</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-center pt-4">
          <Button 
            variant="outline" 
            onClick={handleGenerateAI}
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
                <FileText className="mr-2 h-4 w-4" /> 
                Generate Creative with AI
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdCreativeForm;
