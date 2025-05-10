
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdCopyFormProps {
  productUrl: string;
  mainOfferDescription: string;
  adType: string;
  onProductUrlChange: (value: string) => void;
  onMainOfferDescriptionChange: (value: string) => void;
  onAdTypeChange: (value: string) => void;
}

const AdCopyForm: React.FC<AdCopyFormProps> = ({
  productUrl,
  mainOfferDescription,
  adType,
  onProductUrlChange,
  onMainOfferDescriptionChange,
  onAdTypeChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="productUrl" className="block mb-2">Product URL or Description</Label>
        <Input
          id="productUrl"
          placeholder="https://yourproduct.com or describe your product"
          value={productUrl}
          onChange={(e) => onProductUrlChange(e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="mainOfferDescription" className="block mb-2">
          Main Offer Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="mainOfferDescription"
          placeholder="Describe your main offer in detail..."
          value={mainOfferDescription}
          onChange={(e) => onMainOfferDescriptionChange(e.target.value)}
          className="min-h-[120px]"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="adType" className="block mb-2">Ad Type</Label>
        <Select value={adType} onValueChange={onAdTypeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select ad type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="promotional">Promotional</SelectItem>
            <SelectItem value="educational">Educational</SelectItem>
            <SelectItem value="testimonial">Testimonial</SelectItem>
            <SelectItem value="problem-solution">Problem-Solution</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AdCopyForm;
