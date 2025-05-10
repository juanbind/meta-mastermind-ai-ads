
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, ExternalLink, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CampaignSuccessScreenProps {
  campaignData: {
    id: string;
    name: string;
    status: string;
    adAccountId: string;
    budget: string;
    objective: string;
    adPreviewUrl?: string;
  };
  onClose: () => void;
}

const CampaignSuccessScreen: React.FC<CampaignSuccessScreenProps> = ({
  campaignData,
  onClose
}) => {
  const { toast } = useToast();

  const handleCopyId = () => {
    navigator.clipboard.writeText(campaignData.id);
    toast({
      title: "Copied to clipboard",
      description: "Campaign ID has been copied to your clipboard",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'paused':
        return 'bg-gray-500';
      default:
        return 'bg-blue-500';
    }
  };

  const facebookCampaignUrl = `https://business.facebook.com/adsmanager/manage/campaigns?act=${campaignData.adAccountId}&selected_campaign_ids=${campaignData.id}`;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Campaign Successfully Created!</h2>
        <p className="text-gray-600">
          Your campaign has been submitted to Facebook and is now being processed
        </p>
      </div>

      <Alert variant="success" className="bg-green-50">
        <AlertDescription className="flex items-center">
          <Check className="mr-2 h-4 w-4" />
          Campaign successfully submitted to Facebook
        </AlertDescription>
      </Alert>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Campaign ID</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 px-2"
                  onClick={handleCopyId}
                >
                  <Copy size={14} />
                </Button>
              </div>
              <p className="font-mono text-sm">{campaignData.id}</p>
            </div>
            
            <div>
              <span className="text-sm text-gray-500">Campaign Name</span>
              <p className="font-medium">{campaignData.name}</p>
            </div>
            
            <div>
              <span className="text-sm text-gray-500">Status</span>
              <div className="flex items-center mt-1">
                <span 
                  className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusColor(campaignData.status)}`}
                />
                <Badge variant="outline" className="font-normal">
                  {campaignData.status}
                </Badge>
              </div>
            </div>
            
            <div>
              <span className="text-sm text-gray-500">Objective</span>
              <p>{campaignData.objective}</p>
            </div>
            
            <div>
              <span className="text-sm text-gray-500">Budget</span>
              <p>{campaignData.budget}</p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t pt-6">
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => window.open(facebookCampaignUrl, '_blank')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View in Facebook Ads Manager
          </Button>
        </CardFooter>
      </Card>

      {campaignData.adPreviewUrl && (
        <div>
          <h3 className="text-lg font-medium mb-3">Ad Preview</h3>
          <div className="border rounded-lg overflow-hidden">
            <img 
              src={campaignData.adPreviewUrl} 
              alt="Ad preview" 
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
      
      <div className="pt-4 flex justify-end">
        <Button onClick={onClose}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default CampaignSuccessScreen;
