
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CampaignData } from '@/pages/CampaignBuilder';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter 
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  AlertTriangle, Check, CheckCircle, Loader, ShieldAlert, Facebook 
} from 'lucide-react';

interface LaunchSectionProps {
  campaignData: CampaignData;
  isConnectedToFacebook: boolean;
  connectToFacebook: () => void;
  onLaunch: () => void;
  isProcessing: boolean;
  onBack: () => void;
}

const LaunchSection: React.FC<LaunchSectionProps> = ({ 
  campaignData, 
  isConnectedToFacebook,
  connectToFacebook,
  onLaunch,
  isProcessing,
  onBack
}) => {
  const [isValidationChecked, setIsValidationChecked] = useState(false);
  const [validationResults, setValidationResults] = useState({
    budget: true,
    pixelTracking: true,
    adPermissions: true,
    pageAccess: true
  });
  
  // Calculate total budget
  const calculateBudget = () => {
    if (campaignData.budgetType === 'CBO' && campaignData.dailyBudget) {
      const dailyBudget = parseFloat(campaignData.dailyBudget.replace(/[^0-9.]/g, ''));
      const days = parseInt(campaignData.timeframe);
      return isNaN(dailyBudget) || isNaN(days) ? 'N/A' : `$${(dailyBudget * days).toFixed(2)}`;
    } else if (campaignData.lifetimeBudget) {
      return campaignData.lifetimeBudget;
    } else {
      return 'N/A';
    }
  };
  
  const handleValidate = () => {
    // Simulate validation check
    setIsValidationChecked(true);
    setValidationResults({
      budget: true,
      pixelTracking: true,
      adPermissions: true,
      pageAccess: true
    });
  };
  
  const allValidationsPassed = Object.values(validationResults).every(Boolean);
  
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-center">Launch Campaign</h2>
      
      <div className="mb-8">
        {!isConnectedToFacebook ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Facebook className="mr-2" size={20} />
                Connect to Facebook Ads
              </CardTitle>
              <CardDescription>
                Connect your Facebook Ad Account to launch your campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="warning">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Connection Required</AlertTitle>
                <AlertDescription>
                  You need to authenticate with Facebook before launching any campaigns.
                </AlertDescription>
              </Alert>
              
              <div className="rounded-md bg-gray-50 p-4 mt-4">
                <h3 className="text-sm font-medium mb-2">The following permissions will be requested:</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  <li>Access to your Facebook Ad accounts</li>
                  <li>Permission to create and manage campaigns</li>
                  <li>Access to page insights and engagement data</li>
                  <li>Ability to upload creative assets</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-[#1877F2] hover:bg-[#0d6efd]" 
                onClick={connectToFacebook}
              >
                <Facebook className="mr-2" size={16} />
                Connect with Facebook
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-green-700">
                  <CheckCircle className="mr-2" size={20} />
                  Connected to Facebook Ads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-green-800 text-sm">
                  Your account has been successfully authenticated. You can now launch your campaign.
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Campaign Summary</CardTitle>
                <CardDescription>
                  Review your campaign settings before launching
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Campaign Structure</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{campaignData.campaignName}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Objective:</span>
                      <span className="font-medium">{campaignData.campaignObjective || 'Lead Generation'}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Budget Type:</span>
                      <span className="font-medium">{campaignData.budgetType}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Daily Budget:</span>
                      <span className="font-medium">{campaignData.dailyBudget || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Total Budget:</span>
                      <span className="font-medium">{calculateBudget()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{campaignData.timeframe} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Optimization:</span>
                      <span className="font-medium">{campaignData.optimizationEvent}</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Ad Sets ({campaignData.adSets.length})</h3>
                  <div className="space-y-3">
                    {campaignData.adSets.map((adSet, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-md">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{adSet.name}</span>
                          <Badge variant="outline">{adSet.budget}</Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">Targeting: {adSet.targeting}</div>
                        <div className="text-sm text-gray-600">Ads: {adSet.ads.length}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Launch Settings</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Schedule:</span>
                      <span className="font-medium">
                        {campaignData.scheduleType === 'now' ? 'Launch immediately' : 
                          `Scheduled for ${campaignData.scheduleDate?.toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                </div>
                
                {!isValidationChecked ? (
                  <Button onClick={handleValidate} className="w-full">
                    <ShieldAlert className="mr-2" size={16} />
                    Validate Campaign Settings
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <h3 className="font-medium">Validation Results</h3>
                    {Object.entries(validationResults).map(([key, passed]) => (
                      <div key={key} className={`flex items-start p-2 rounded-md ${passed ? 'bg-green-50' : 'bg-red-50'}`}>
                        {passed ? (
                          <Check className="text-green-600 mr-2 mt-0.5" size={16} />
                        ) : (
                          <AlertTriangle className="text-red-600 mr-2 mt-0.5" size={16} />
                        )}
                        <div>
                          <div className={`font-medium ${passed ? 'text-green-700' : 'text-red-700'}`}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </div>
                          <div className="text-xs">
                            {passed ? 'Passed validation check' : 'Failed validation check'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      <div className="pt-6 flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button 
          onClick={onLaunch} 
          disabled={!isConnectedToFacebook || !isValidationChecked || !allValidationsPassed || isProcessing}
          className="bg-metamaster-primary hover:bg-metamaster-primary/90"
        >
          {isProcessing ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Launching...
            </>
          ) : (
            'Launch Campaign'
          )}
        </Button>
      </div>
    </div>
  );
};

export default LaunchSection;
