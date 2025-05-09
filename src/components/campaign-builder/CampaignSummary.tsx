
import React from 'react';
import { Button } from '@/components/ui/button';
import { CampaignData } from '@/pages/CampaignBuilder';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, AlertCircle, Zap, Calendar } from 'lucide-react';

interface CampaignSummaryProps {
  campaignData: CampaignData;
  onCreateNew: () => void;
}

const CampaignSummary: React.FC<CampaignSummaryProps> = ({ campaignData, onCreateNew }) => {
  // Sample performance metrics for demonstration
  const performanceData = {
    dailyBudget: campaignData.dailyBudget || '$50.00',
    spend: '$132.45',
    impressions: '15,432',
    reach: '9,875',
    clicks: '342',
    ctr: '2.2%',
    cpc: '$0.39',
    conversions: '18',
    cpa: '$7.36',
    roas: '1.8x'
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Campaign Performance Tracker</h2>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex">
          <AlertCircle className="text-yellow-500 mt-1 mr-3 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-medium text-yellow-800">Campaign is in Learning Phase</h3>
            <p className="text-yellow-700 text-sm">
              The campaign has been running for less than 7 days. Meta's algorithm is still optimizing delivery.
              Performance metrics may fluctuate during this period.
            </p>
          </div>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{campaignData.campaignName}</CardTitle>
              <CardDescription>
                Campaign ID: {campaignData.campaignId} • Status: {campaignData.campaignStatus || 'Active'}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="flex items-center" asChild>
              <a href={campaignData.campaignLink} target="_blank" rel="noopener noreferrer">
                View in Meta
              </a>
            </Button>
          </div>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Daily Budget</div>
            <div className="text-2xl font-bold">{performanceData.dailyBudget}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Total Spend</div>
            <div className="text-2xl font-bold">{performanceData.spend}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Conversions</div>
            <div className="text-2xl font-bold">{performanceData.conversions}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">ROAS</div>
            <div className="text-2xl font-bold">{performanceData.roas}</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="metrics" className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="metrics" className="flex-1">Performance Metrics</TabsTrigger>
          <TabsTrigger value="adsets" className="flex-1">Ad Set Breakdown</TabsTrigger>
          <TabsTrigger value="creative" className="flex-1">Creative Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="metrics" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md mb-4">
                <BarChart3 className="text-gray-400" size={48} />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Impressions</div>
                  <div className="font-medium">{performanceData.impressions}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Reach</div>
                  <div className="font-medium">{performanceData.reach}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Clicks</div>
                  <div className="font-medium">{performanceData.clicks}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">CTR</div>
                  <div className="font-medium">{performanceData.ctr}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">CPC</div>
                  <div className="font-medium">{performanceData.cpc}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">CPA</div>
                  <div className="font-medium">{performanceData.cpa}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="adsets" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ad Set Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaignData.adSets.map((adSet, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{adSet.name}</h3>
                      <div>
                        <span className="text-xs text-gray-500">Budget: </span>
                        <span className="font-medium">{adSet.budget}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-3">{adSet.targeting}</div>
                    
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">Spend</div>
                        <div className="font-medium">${(30 + index * 5).toFixed(2)}</div>
                      </div>
                      
                      <div>
                        <div className="text-gray-500">CPC</div>
                        <div className="font-medium">$0.{35 + index}</div>
                      </div>
                      
                      <div>
                        <div className="text-gray-500">Conv.</div>
                        <div className="font-medium">{6 - index}</div>
                      </div>
                      
                      <div>
                        <div className="text-gray-500">ROAS</div>
                        <div className="font-medium">{2.2 - index * 0.3}x</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="creative" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Creative Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {campaignData.adSets.flatMap((adSet) => 
                  adSet.ads.map((ad, adIndex) => (
                    <div key={`${adSet.name}-${adIndex}`} className="border rounded-md overflow-hidden">
                      {ad.mediaUrl ? (
                        <img src={ad.mediaUrl} alt={ad.name} className="w-full h-40 object-cover" />
                      ) : (
                        <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                          <p className="text-gray-400">No media preview</p>
                        </div>
                      )}
                      
                      <div className="p-3">
                        <div className="font-medium mb-1">{ad.headline}</div>
                        <div className="text-sm text-gray-600 line-clamp-2 mb-3">{ad.primaryText}</div>
                        
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <div className="text-gray-500">CTR</div>
                            <div className="font-medium">{(1.5 + adIndex * 0.7).toFixed(1)}%</div>
                          </div>
                          
                          <div>
                            <div className="text-gray-500">Conv.</div>
                            <div className="font-medium">{3 - adIndex}</div>
                          </div>
                          
                          <div>
                            <div className="text-gray-500">CPA</div>
                            <div className="font-medium">${(5 + adIndex * 2).toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex">
          <Zap className="text-blue-500 mt-1 mr-3 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-medium text-blue-800">AI Optimization Suggestions</h3>
            <div className="space-y-2 mt-2">
              <div className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-amber-400 flex-shrink-0 mr-2 mt-1"></div>
                <div>
                  <p className="text-blue-800 text-sm font-medium">Increase budget for top performing ad set</p>
                  <p className="text-blue-600 text-xs">
                    "{campaignData.adSets[0]?.name}" is performing 30% better than other ad sets. Consider increasing daily budget by 20%.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-red-400 flex-shrink-0 mr-2 mt-1"></div>
                <div>
                  <p className="text-blue-800 text-sm font-medium">Ad fatigue detected</p>
                  <p className="text-blue-600 text-xs">
                    Frequency is reaching 3+ for cold audience. Consider refreshing creative within 3 days.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-green-400 flex-shrink-0 mr-2 mt-1"></div>
                <div>
                  <p className="text-blue-800 text-sm font-medium">Expand lookalike audience</p>
                  <p className="text-blue-600 text-xs">
                    Current 1% lookalike is performing well. Test expanding to 2% lookalike to increase reach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button onClick={onCreateNew} variant="outline" className="flex items-center">
          <Calendar className="mr-2" size={16} />
          Create New Campaign
        </Button>
        <Button className="flex items-center">
          <TrendingUp className="mr-2" size={16} />
          Apply AI Optimizations
        </Button>
      </div>
    </div>
  );
};

export default CampaignSummary;
