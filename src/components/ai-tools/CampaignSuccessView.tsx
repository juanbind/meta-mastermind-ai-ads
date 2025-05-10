
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ExternalLink, Eye, Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CampaignSuccessViewProps {
  campaignId: string;
  campaignStatus: 'active' | 'pending' | 'error';
  campaignName: string;
  adPreviewUrl: string;
  metaLink: string;
  onViewCampaigns: () => void;
  onCreateNew: () => void;
}

const CampaignSuccessView: React.FC<CampaignSuccessViewProps> = ({
  campaignId,
  campaignStatus,
  campaignName,
  adPreviewUrl,
  metaLink,
  onViewCampaigns,
  onCreateNew,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <Check size={32} className="text-green-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">Campaign Successfully Created!</h3>
        <p className="text-gray-600">
          Your campaign has been submitted to Facebook and is now being processed.
        </p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Campaign ID</span>
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{campaignId}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="font-medium">Campaign Name</span>
              <span>{campaignName}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="font-medium">Status</span>
              <Badge 
                variant={
                  campaignStatus === 'active' ? 'success' : 
                  campaignStatus === 'pending' ? 'warning' : 'destructive'
                }
                className={
                  campaignStatus === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                  campaignStatus === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                  'bg-red-100 text-red-800 hover:bg-red-200'
                }
              >
                {campaignStatus === 'active' && (
                  <>
                    <Check size={14} className="mr-1" /> Active
                  </>
                )}
                {campaignStatus === 'pending' && (
                  <>
                    <Loader size={14} className="mr-1 animate-spin" /> Pending Review
                  </>
                )}
                {campaignStatus === 'error' && (
                  <>
                    <ExternalLink size={14} className="mr-1" /> Error
                  </>
                )}
              </Badge>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-3">Ad Preview</h4>
              
              <div className="border rounded-md overflow-hidden">
                {adPreviewUrl ? (
                  <img 
                    src={adPreviewUrl} 
                    alt="Ad preview" 
                    className="w-full h-auto max-h-[240px] object-contain"
                  />
                ) : (
                  <div className="h-48 flex items-center justify-center bg-gray-100">
                    <p className="text-gray-500">Preview not available yet</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between border-t pt-4 mt-4">
              <Button variant="outline" onClick={onCreateNew}>
                Create New Campaign
              </Button>
              
              <div className="flex gap-3">
                {metaLink && (
                  <a href={metaLink} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="flex items-center gap-2">
                      <ExternalLink size={16} /> View in Meta Ads Manager
                    </Button>
                  </a>
                )}
                
                <Button onClick={onViewCampaigns} className="flex items-center gap-2">
                  <Eye size={16} /> View My Campaigns
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignSuccessView;
