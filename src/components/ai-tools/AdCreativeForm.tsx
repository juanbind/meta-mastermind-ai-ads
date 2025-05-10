
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud, ImagePlus, Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AdCreativeFormProps {
  onChange: (data: AdCreativeData) => void;
  initialData?: AdCreativeData;
}

export interface AdCreativeData {
  primaryText: string;
  headline: string;
  description: string;
  callToAction: string;
  destinationUrl: string;
  mediaType: 'manual' | 'ai';
  mediaUrl: string;
}

const callToActionOptions = [
  { value: 'shop_now', label: 'Shop Now' },
  { value: 'book_now', label: 'Book Now' },
  { value: 'learn_more', label: 'Learn More' },
  { value: 'sign_up', label: 'Sign Up' },
  { value: 'download', label: 'Download' },
  { value: 'get_offer', label: 'Get Offer' },
  { value: 'contact_us', label: 'Contact Us' },
];

const AdCreativeForm: React.FC<AdCreativeFormProps> = ({ onChange, initialData }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<AdCreativeData>(initialData || {
    primaryText: '',
    headline: '',
    description: '',
    callToAction: 'learn_more',
    destinationUrl: '',
    mediaType: 'manual',
    mediaUrl: '',
  });
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const handleChange = (field: keyof AdCreativeData, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onChange(updatedData);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Create a fake URL for the uploaded file in this demo
      const fakeUrl = URL.createObjectURL(file);
      handleChange('mediaUrl', fakeUrl);
      
      toast({
        title: "Media uploaded",
        description: `File "${file.name}" has been uploaded successfully.`
      });
    }
  };

  const handleGenerateAIMedia = () => {
    if (!formData.headline || !formData.primaryText) {
      toast({
        title: "Missing information",
        description: "Please provide at least a headline and primary text to generate AI media",
        variant: "destructive"
      });
      return;
    }
    
    setIsGeneratingAI(true);
    
    // Simulate AI generation with a timeout
    setTimeout(() => {
      // Generate a random placeholder image
      const placeholderUrl = `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}`;
      handleChange('mediaUrl', placeholderUrl);
      setIsGeneratingAI(false);
      
      toast({
        title: "Media generated",
        description: "AI-generated media is ready to use in your ad"
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Ad Creative</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="primaryText">Primary Text</Label>
            <Textarea 
              id="primaryText"
              value={formData.primaryText}
              onChange={(e) => handleChange('primaryText', e.target.value)}
              placeholder="Enter the main body text for your ad"
              className="min-h-[120px]"
            />
            <p className="text-xs text-gray-500">This is the main text of your ad</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input 
              id="headline"
              value={formData.headline}
              onChange={(e) => handleChange('headline', e.target.value)}
              placeholder="Enter an attention-grabbing headline"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Add more details about your offer"
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="callToAction">Call to Action</Label>
            <Select
              value={formData.callToAction}
              onValueChange={(value) => handleChange('callToAction', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a call to action" />
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
          
          <div className="space-y-2">
            <Label htmlFor="destinationUrl">Destination URL</Label>
            <Input 
              id="destinationUrl"
              value={formData.destinationUrl}
              onChange={(e) => handleChange('destinationUrl', e.target.value)}
              placeholder="https://www.example.com/landing-page"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Ad Media</Label>
            <RadioGroup 
              value={formData.mediaType}
              onValueChange={(value) => handleChange('mediaType', value as 'manual' | 'ai')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="manual" />
                <Label htmlFor="manual">Manual Upload</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ai" id="ai" />
                <Label htmlFor="ai">AI Generated</Label>
              </div>
            </RadioGroup>
          </div>
          
          {formData.mediaType === 'manual' ? (
            <div>
              <Card className="border-dashed border-2 hover:border-metamaster-primary transition-colors">
                <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                  <input 
                    type="file" 
                    id="media-upload" 
                    className="sr-only" 
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                  
                  {!formData.mediaUrl ? (
                    <label 
                      htmlFor="media-upload" 
                      className="flex flex-col items-center justify-center cursor-pointer w-full h-full text-gray-500 hover:text-metamaster-primary transition-colors"
                    >
                      <UploadCloud className="w-10 h-10 mb-2" />
                      <p className="font-medium">Click to upload image</p>
                      <p className="text-sm text-gray-400">SVG, PNG, JPG (max. 800x800px)</p>
                    </label>
                  ) : (
                    <div className="relative w-full">
                      <img 
                        src={formData.mediaUrl} 
                        alt="Ad media preview" 
                        className="max-h-[300px] max-w-full mx-auto object-contain" 
                      />
                      <Button 
                        variant="outline" 
                        className="absolute top-2 right-2"
                        size="sm"
                        onClick={() => handleChange('mediaUrl', '')}
                      >
                        Replace
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    {formData.mediaUrl ? (
                      <div className="relative w-full">
                        <img 
                          src={formData.mediaUrl} 
                          alt="AI generated media" 
                          className="max-h-[300px] max-w-full mx-auto object-contain" 
                        />
                        <Button 
                          variant="outline" 
                          className="absolute top-2 right-2"
                          size="sm"
                          onClick={() => handleChange('mediaUrl', '')}
                        >
                          Regenerate
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Wand2 className="w-10 h-10 text-purple-500" />
                        <p className="text-center">
                          Our AI will generate an image based on your ad copy. <br />
                          <span className="text-sm text-gray-500">
                            Fill in the headline and primary text first.
                          </span>
                        </p>
                        <Button 
                          onClick={handleGenerateAIMedia}
                          disabled={isGeneratingAI}
                        >
                          {isGeneratingAI ? "Generating..." : "Generate Image"}
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {formData.mediaUrl && (
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-sm font-medium mb-2">Ad Preview</h3>
              <div className="bg-white border rounded p-3 shadow-sm">
                <div className="text-xs text-gray-500 mb-1">YourBrand • Sponsored</div>
                <p className="text-sm line-clamp-3 mb-2">{formData.primaryText}</p>
                <img 
                  src={formData.mediaUrl} 
                  alt="Ad preview" 
                  className="w-full h-48 object-cover mb-2 rounded" 
                />
                <h4 className="font-bold text-sm">{formData.headline}</h4>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{formData.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 truncate">{formData.destinationUrl}</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    {callToActionOptions.find(option => option.value === formData.callToAction)?.label || 'Learn More'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdCreativeForm;
