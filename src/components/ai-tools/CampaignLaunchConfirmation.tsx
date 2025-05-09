
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ExternalLink, Clock, AlertCircle } from 'lucide-react';

interface CampaignLaunchConfirmationProps {
  campaignId: string;
  campaignName: string;
  campaignStatus: string;
  dailyBudget: number;
  timeframe: {
    value: number;
    unit: string;
  };
  adSetsCount: number;
  adsCount: number;
  onCreateNew: () => void;
  onViewPerformance: () => void;
}

const CampaignLaunchConfirmation: React.FC<CampaignLaunchConfirmationProps> = ({
  campaignId,
  campaignName,
  campaignStatus,
  dailyBudget,
  timeframe,
  adSetsCount,
  adsCount,
  onCreateNew,
  onViewPerformance,
}) => {
  const getStatusBadge = () => {
    switch (campaignStatus) {
      case 'ACTIVE':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">
            Active
          </Badge>
        );
      case 'IN_REVIEW':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            In Review
          </Badge>
        );
      case 'REJECTED':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-200">
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            {campaignStatus}
          </Badge>
        );
    }
  };
  
  return (
    <div className="space-y-6 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle2 size={32} className="text-green-600" />
        </div>
        <h3 className="text-xl font-medium text-gray-800">Campaign Successfully Created!</h3>
        <p className="text-gray-600 mt-1">Your campaign has been sent to Facebook and is now in review.</p>
      </div>
      
      <Card className="p-6 mb-6">
        <h4 className="font-medium mb-4">Campaign Details</h4>
        <div className="grid grid-cols-2 gap-y-4 text-sm">
          <div className="text-gray-600">Campaign ID:</div>
          <div className="font-medium flex items-center">
            {campaignId}
            <a href={`https://business.facebook.com/adsmanager/manage/campaigns?act=${campaignId}`} target="_blank" rel="noopener noreferrer" className="ml-2 text-metamaster-primary hover:text-metamaster-secondary">
              <ExternalLink size={14} />
            </a>
          </div>
          
          <div className="text-gray-600">Campaign Name:</div>
          <div className="font-medium">{campaignName}</div>
          
          <div className="text-gray-600">Status:</div>
          <div className="font-medium">
            {getStatusBadge()}
          </div>
          
          <div className="text-gray-600">Daily Budget:</div>
          <div className="font-medium">${dailyBudget}</div>
          
          <div className="text-gray-600">Campaign Duration:</div>
          <div className="font-medium">{timeframe.value} {timeframe.unit}</div>
          
          <div className="text-gray-600">Ad Sets Created:</div>
          <div className="font-medium">{adSetsCount}</div>
          
          <div className="text-gray-600">Ads Created:</div>
          <div className="font-medium">{adsCount}</div>
        </div>
      </Card>
      
      <Card className="p-6 bg-blue-50 border-blue-100">
        <h4 className="font-medium text-blue-800 flex items-center gap-2 mb-4">
          <Clock size={18} /> What happens next?
        </h4>
        <ul className="space-y-3 text-sm text-blue-700">
          <li className="flex items-start gap-2">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>Facebook will review your ads within the next few hours</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>Once approved, your campaign will start running automatically</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>You'll be able to track performance in the Performance tab</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>Our AI will analyze your results and suggest optimizations</span>
          </li>
        </ul>
      </Card>
      
      <div className="flex justify-center pt-6 gap-4">
        <Button variant="outline" onClick={onCreateNew}>
          Create Another Campaign
        </Button>
        <Button 
          onClick={onViewPerformance}
          className="bg-metamaster-primary hover:bg-metamaster-secondary"
        >
          View Campaign Performance
        </Button>
      </div>
    </div>
  );
};

export default CampaignLaunchConfirmation;
