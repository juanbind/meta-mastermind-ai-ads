
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FileText, FileImage } from 'lucide-react';

interface AdCreative {
  primaryText: string;
  headline: string;
  description: string;
  callToAction: string;
  destinationUrl: string;
  mediaUrl: string;
}

interface AdCreativePreferencesProps {
  adCreative: AdCreative;
  onAdCreativeChange: (field: keyof AdCreative, value: string) => void;
  onMediaUpload: (file: File) => void;
}

const AdCreativePreferences: React.FC<AdCreativePreferencesProps> = ({
  adCreative,
  onAdCreativeChange,
  onMediaUpload,
}) => {
  // Hidden file input for media upload
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onMediaUpload(file);
    }
  };
  
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <Card className="p-6">
      <h3 className="font-medium text-lg mb-4">Ad Creative</h3>
      
      <div className="space-y-5">
        <div>
          <Label htmlFor="primary-text">Primary Text</Label>
          <Textarea
            id="primary-text"
            value={adCreative.primaryText}
            onChange={(e) => onAdCreativeChange('primaryText', e.target.value)}
            placeholder="Enter the main text for your ad"
            className="mt-1"
            rows={3}
          />
          <p className="text-xs text-gray-500 mt-1">
            This is the main body text of your ad. Aim for 125 characters or less for optimal display.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              value={adCreative.headline}
              onChange={(e) => onAdCreativeChange('headline', e.target.value)}
              placeholder="Enter headline (25-40 characters)"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={adCreative.description}
              onChange={(e) => onAdCreativeChange('description', e.target.value)}
              placeholder="Enter description (30-60 characters)"
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cta">Call to Action</Label>
            <Select 
              value={adCreative.callToAction}
              onValueChange={(value) => onAdCreativeChange('callToAction', value)}
            >
              <SelectTrigger id="cta" className="mt-1">
                <SelectValue placeholder="Select a CTA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LEARN_MORE">Learn More</SelectItem>
                <SelectItem value="SIGN_UP">Sign Up</SelectItem>
                <SelectItem value="SUBSCRIBE">Subscribe</SelectItem>
                <SelectItem value="DOWNLOAD">Download</SelectItem>
                <SelectItem value="GET_OFFER">Get Offer</SelectItem>
                <SelectItem value="BOOK_NOW">Book Now</SelectItem>
                <SelectItem value="GET_QUOTE">Get Quote</SelectItem>
                <SelectItem value="CONTACT_US">Contact Us</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="destination-url">Destination URL</Label>
            <Input
              id="destination-url"
              value={adCreative.destinationUrl}
              onChange={(e) => onAdCreativeChange('destinationUrl', e.target.value)}
              placeholder="https://yourbusiness.com/landing"
              className="mt-1"
            />
          </div>
        </div>
        
        <div>
          <Label>Media Upload</Label>
          
          <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={triggerFileUpload}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,video/*"
                className="hidden"
              />
              
              <div className="mb-3 flex justify-center">
                <FileImage className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-2">Click to upload image or video</p>
              <p className="text-xs text-gray-500">Recommended size: 1080x1080px (1:1)</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={(e) => {
                e.stopPropagation();
                triggerFileUpload();
              }}>
                Upload Media
              </Button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="text-sm font-medium mb-2">Ad Preview</h5>
              {adCreative.mediaUrl ? (
                <img 
                  src={adCreative.mediaUrl} 
                  alt="Ad preview" 
                  className="w-full aspect-square object-cover rounded-md mb-2" 
                />
              ) : (
                <div className="aspect-square bg-gray-100 flex items-center justify-center rounded-md mb-2">
                  <p className="text-gray-400 text-sm">Ad preview will appear here</p>
                </div>
              )}
              
              <div className="text-xs text-gray-500 space-y-1">
                {adCreative.headline ? (
                  <>
                    <p className="font-medium">{adCreative.headline}</p>
                    <p className="truncate">{adCreative.description}</p>
                    <p className="text-blue-500 uppercase text-[10px] font-semibold">
                      {adCreative.callToAction.replace('_', ' ')}
                    </p>
                  </>
                ) : (
                  <p>Complete the form to see preview</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdCreativePreferences;
