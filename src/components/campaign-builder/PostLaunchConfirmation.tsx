
import React from 'react';
import { Button } from '@/components/ui/button';
import { CampaignData } from '@/pages/CampaignBuilder';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, ExternalLink, FileText, BarChart3, Zap, Clock } from 'lucide-react';

interface PostLaunchConfirmationProps {
  campaignData: CampaignData;
  onTrackCampaign: () => void;
}

const PostLaunchConfirmation: React.FC<PostLaunchConfirmationProps> = ({ campaignData, onTrackCampaign }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
          <CheckCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Campaign Launched Successfully!</h2>
        <p className="text-gray-600">
          Your campaign has been submitted to Meta and is now in review.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-500">Campaign ID</div>
              <div className="font-medium">{campaignData.campaignId}</div>
            </div>
            <Badge className={`
              ${campaignData.campaignStatus === 'Active' ? 'bg-green-100 text-green-800' : 
                campaignData.campaignStatus === 'In Review' ? 'bg-amber-100 text-amber-800' :
                'bg-blue-100 text-blue-800'}
            `}>
              {campaignData.campaignStatus}
            </Badge>
          </div>
          
          <div>
            <div className="text-sm text-gray-500">Campaign Name</div>
            <div className="font-medium">{campaignData.campaignName}</div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Ad Sets</div>
              <div className="font-medium">{campaignData.adSets.length}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Ads</div>
              <div className="font-medium">
                {campaignData.adSets.reduce((total, adSet) => total + adSet.ads.length, 0)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Budget</div>
              <div className="font-medium">
                {campaignData.dailyBudget ? `$${parseFloat(campaignData.dailyBudget.replace(/[^0-9.]/g, '')) * parseInt(campaignData.timeframe)}` : 'N/A'}
              </div>
            </div>
          </div>
          
          <div className="pt-2 flex items-center justify-between">
            <Button variant="outline" size="sm" className="flex items-center" asChild>
              <a href={campaignData.campaignLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2" size={14} />
                View in Meta Ads Manager
              </a>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <FileText className="mr-2" size={14} />
              Export Details
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <div className="flex">
          <Clock className="text-blue-500 mt-1 mr-3 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-medium text-blue-800">What happens next?</h3>
            <p className="text-blue-700 text-sm mb-4">
              Your campaign is now in Meta's review process. Here's what to expect:
            </p>
            <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
              <li>Ad review typically takes 24 hours or less</li>
              <li>You'll receive a notification once your ads are approved</li>
              <li>Expect to see spend and impressions within 30 minutes after approval</li>
              <li>Initial performance data will be available in 24-48 hours</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Campaign Preview</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {campaignData.adSets.slice(0, 1).map((adSet, index) => (
                <div key={index}>
                  <h4 className="font-medium text-sm">{adSet.name}</h4>
                  <div className="mt-2 border rounded-md overflow-hidden">
                    {adSet.ads.slice(0, 1).map((ad, adIndex) => (
                      <div key={adIndex} className="flex flex-col">
                        {ad.mediaUrl ? (
                          <img src={ad.mediaUrl} alt="Ad Preview" className="w-full h-auto" />
                        ) : (
                          <div className="bg-gray-100 h-40 flex items-center justify-center">
                            <p className="text-gray-400">No media preview</p>
                          </div>
                        )}
                        <div className="p-3">
                          <div className="font-medium">{ad.headline}</div>
                          <div className="text-sm text-gray-600 line-clamp-2">{ad.primaryText}</div>
                          <Button size="sm" className="mt-2">{ad.cta}</Button>
                        </div>
                      </div>
                    ))}
                    {adSet.ads.length > 1 && (
                      <div className="px-3 py-2 bg-gray-50 text-xs text-center text-gray-500">
                        + {adSet.ads.length - 1} more ads in this ad set
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {campaignData.adSets.length > 1 && (
                <div className="text-xs text-center text-gray-500 pt-2">
                  + {campaignData.adSets.length - 1} more ad sets
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-start">
                <Zap className="text-amber-500 mr-2 mt-0.5" size={16} />
                <div>
                  <div className="font-medium text-sm">Initial Phase</div>
                  <p className="text-xs text-gray-600">
                    Allow 3-5 days learning period before making any campaign changes.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Zap className="text-amber-500 mr-2 mt-0.5" size={16} />
                <div>
                  <div className="font-medium text-sm">Optimization Check</div>
                  <p className="text-xs text-gray-600">
                    After 5 days, review performance and consider budget adjustments for top performers.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Zap className="text-amber-500 mr-2 mt-0.5" size={16} />
                <div>
                  <div className="font-medium text-sm">Creative Refresh</div>
                  <p className="text-xs text-gray-600">
                    Plan to introduce new ad creative after 10-14 days to prevent ad fatigue.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Create New Campaign
        </Button>
        <Button onClick={onTrackCampaign} className="flex items-center">
          <BarChart3 className="mr-2" size={16} />
          Track Campaign Performance
        </Button>
      </div>
    </div>
  );
};

export default PostLaunchConfirmation;
