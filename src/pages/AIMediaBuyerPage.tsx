
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  PieChart, 
  Target, 
  BarChart3, 
  MessageSquare, 
  AlertTriangle, 
  Shield, 
  ZapOff, 
  TrendingUp,
  FileText,
  Settings
} from 'lucide-react';
import AIMediaBuyerEnhanced from '@/components/ai-tools/AIMediaBuyerEnhanced';

const AIMediaBuyerPage: React.FC = () => {
  const { toast } = useToast();
  const [fbConnected, setFbConnected] = useState(false);
  const [stopLossRules, setStopLossRules] = useState({
    enabled: false,
    threshold: '5',
    notifyMe: true
  });
  const [fbAccessToken, setFbAccessToken] = useState('');
  const [fbAdAccountId, setFbAdAccountId] = useState('');

  // Connect to Facebook Ad Account
  const handleConnectFacebook = () => {
    if (!fbAccessToken || !fbAdAccountId) {
      toast({
        title: "Missing Information",
        description: "Please provide both Access Token and Ad Account ID",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate connecting to Facebook
    setFbConnected(true);
    toast({
      title: "Facebook Account Connected",
      description: "Your ad account has been successfully connected",
    });
  };

  // Handle StopLoss Configuration
  const handleStopLossChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'threshold') {
      setStopLossRules(prev => ({ ...prev, threshold: e.target.value }));
    } else if (e.target.name === 'notifyMe') {
      setStopLossRules(prev => ({ ...prev, notifyMe: e.target.checked }));
    }
  };

  // Save StopLoss Configuration
  const handleSaveStopLoss = () => {
    toast({
      title: "Stop-Loss Rules Saved",
      description: `Ads will be paused when ROAS drops below ${stopLossRules.threshold}x for 2 consecutive days.`,
    });
  };

  // Handle budget adjustment confirmation
  const handleBudgetConfirmation = () => {
    toast({
      title: "Budget Adjustment Confirmed",
      description: "Budget changes will be applied to your campaigns",
    });
  };

  return (
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 text-metamaster-gray-800">AI Media Buyer</h1>
            <p className="text-metamaster-gray-600">Create optimized ad campaigns using AI algorithms trained on high-performing campaigns.</p>
          </div>
          
          <Tabs defaultValue="campaign" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="campaign" className="flex items-center justify-center gap-2">
                <Target size={16} /> Campaigns
              </TabsTrigger>
              <TabsTrigger value="automation" className="flex items-center justify-center gap-2">
                <ZapOff size={16} /> Automations
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center justify-center gap-2">
                <TrendingUp size={16} /> Performance
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center justify-center gap-2">
                <FileText size={16} /> Reports
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center justify-center gap-2">
                <Settings size={16} /> Settings
              </TabsTrigger>
            </TabsList>
            
            {/* Campaign Creation Tab */}
            <TabsContent value="campaign" className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Create New Campaign</h2>
                <div className="mb-6">
                  <AIMediaBuyerEnhanced />
                </div>
                
                {!fbConnected && (
                  <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h3 className="text-amber-800 font-medium flex items-center gap-2">
                      <AlertTriangle size={18} /> Connect to Facebook Ads
                    </h3>
                    <p className="text-amber-700 text-sm mb-4">
                      To launch campaigns directly to Facebook, please connect your Facebook Ad account.
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Facebook Access Token
                        </label>
                        <Input 
                          value={fbAccessToken} 
                          onChange={(e) => setFbAccessToken(e.target.value)}
                          placeholder="Enter your Facebook access token"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ad Account ID
                        </label>
                        <Input 
                          value={fbAdAccountId} 
                          onChange={(e) => setFbAdAccountId(e.target.value)}
                          placeholder="Enter your Ad Account ID (e.g., act_123456789)"
                        />
                      </div>
                      
                      <Button onClick={handleConnectFacebook}>
                        Connect Facebook Account
                      </Button>
                    </div>
                  </div>
                )}
                
                {fbConnected && (
                  <div className="mt-4">
                    <Button className="bg-metamaster-primary hover:bg-metamaster-secondary">
                      Launch Campaign to Facebook
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Ad Copy Generator</h2>
                <p className="text-gray-600 mb-4">
                  Write high-converting ad copy based on your product pages, past ads, or specific requirements.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product URL or Description
                    </label>
                    <Textarea 
                      placeholder="Enter your product URL, paste previous ad content, or describe what you want"
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">Promotional</Button>
                    <Button variant="outline" size="sm">Educational</Button>
                    <Button variant="outline" size="sm">Testimonial-Based</Button>
                    <Button variant="outline" size="sm">Problem-Solution</Button>
                  </div>
                  
                  <Button className="mt-2">
                    Generate Ad Copy
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Automation Tab */}
            <TabsContent value="automation" className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Stop-Loss Automation</h2>
                <p className="text-gray-600 mb-4">
                  Automatically pause underperforming ads based on custom rules.
                </p>
                
                <div className="flex items-center space-x-2 mb-4">
                  <Switch
                    id="stop-loss-enable"
                    checked={stopLossRules.enabled}
                    onCheckedChange={(checked) => setStopLossRules(prev => ({...prev, enabled: checked}))}
                  />
                  <label htmlFor="stop-loss-enable" className="font-medium">
                    Enable Stop-Loss Rules
                  </label>
                </div>
                
                {stopLossRules.enabled && (
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pause ads when ROAS falls below
                      </label>
                      <div className="flex items-center">
                        <Input 
                          name="threshold"
                          type="number"
                          value={stopLossRules.threshold}
                          onChange={handleStopLossChange}
                          className="max-w-[100px]"
                        />
                        <span className="ml-2">for 2 consecutive days</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="notify-me"
                        name="notifyMe"
                        checked={stopLossRules.notifyMe}
                        onCheckedChange={(checked) => setStopLossRules(prev => ({...prev, notifyMe: checked}))}
                      />
                      <label htmlFor="notify-me">
                        Notify me when ads are paused
                      </label>
                    </div>
                    
                    <Button onClick={handleSaveStopLoss}>
                      Save Stop-Loss Rules
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Budget Optimization</h2>
                <p className="text-gray-600 mb-4">
                  Automatically adjust budgets based on performance metrics.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-scale" />
                    <label htmlFor="auto-scale">Scale winning ad sets (ROAS > 3x)</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-reduce" />
                    <label htmlFor="auto-reduce">Reduce budget for underperforming ad sets</label>
                  </div>
                  
                  <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg mt-4">
                    <h4 className="font-medium text-blue-800 mb-2">Budget Adjustment Recommendation</h4>
                    <p className="text-sm text-blue-700 mb-2">
                      Based on the last 7 days of performance data, we recommend:
                    </p>
                    <ul className="text-sm text-blue-700 list-disc pl-5 mb-3">
                      <li>Increase "Summer Collection" ad set budget by 20%</li>
                      <li>Decrease "Spring Sale" ad set budget by 15%</li>
                    </ul>
                    <Button size="sm" onClick={handleBudgetConfirmation}>
                      Confirm Budget Changes
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Ad Fatigue Detection</h2>
                <p className="text-gray-600 mb-4">
                  Automatically detect and alert you when your ads begin to show signs of fatigue.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="fatigue-detection" defaultChecked />
                    <label htmlFor="fatigue-detection">Enable ad fatigue detection</label>
                  </div>
                  
                  <div>
                    <p className="font-medium">Alert me when:</p>
                    <div className="ml-4 mt-2 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="frequency-trigger" defaultChecked />
                        <label htmlFor="frequency-trigger">Ad frequency exceeds 3</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="ctr-trigger" defaultChecked />
                        <label htmlFor="ctr-trigger">CTR drops by more than 20%</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="cpc-trigger" defaultChecked />
                        <label htmlFor="cpc-trigger">CPC increases by more than 30%</label>
                      </div>
                    </div>
                  </div>
                  
                  <Button>
                    Save Fatigue Detection Settings
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Campaign Performance</h2>
                <p className="text-gray-600 mb-4">
                  Monitor your campaign performance in real-time and receive AI-powered recommendations.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500">Total Spend</p>
                      <PieChart size={18} className="text-metamaster-primary" />
                    </div>
                    <p className="text-2xl font-bold mt-2">$1,245.67</p>
                    <p className="text-green-600 text-sm">+12% vs last week</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500">ROAS</p>
                      <TrendingUp size={18} className="text-metamaster-primary" />
                    </div>
                    <p className="text-2xl font-bold mt-2">2.7x</p>
                    <p className="text-green-600 text-sm">+0.3 vs last week</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500">Total Conversions</p>
                      <BarChart3 size={18} className="text-metamaster-primary" />
                    </div>
                    <p className="text-2xl font-bold mt-2">86</p>
                    <p className="text-green-600 text-sm">+24% vs last week</p>
                  </div>
                </div>
                
                <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg mb-4">
                  <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                    <MessageSquare size={18} /> AI Recommendations
                  </h4>
                  <ul className="text-sm text-blue-700 list-disc pl-5">
                    <li>Try adjusting placement to include more Stories format based on current performance</li>
                    <li>Your lookalike audience 3% is outperforming the 1% audience - consider reallocating budget</li>
                    <li>Video creatives are showing 32% higher engagement than image ads</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-amber-100 bg-amber-50 rounded-lg">
                  <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                    <AlertTriangle size={18} /> Active Alerts
                  </h4>
                  <ul className="text-sm text-amber-700 list-disc pl-5">
                    <li>Ad "Summer Collection Promo" rejected - Policy violation detected</li>
                    <li>"Spring Sale" ad set showing signs of fatigue - Consider refreshing creatives</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Targeting Optimization</h2>
                <p className="text-gray-600 mb-4">
                  AI-powered targeting recommendations based on your campaign performance.
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 border border-green-100 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">Audience Recommendations</h4>
                    <p className="text-sm text-green-700 mt-1 mb-2">
                      Based on your best performing campaigns, we recommend these changes:
                    </p>
                    <ul className="text-sm text-green-700 list-disc pl-5">
                      <li>Create a new lookalike audience based on recent purchasers (30-day window)</li>
                      <li>Expand age range to include 45-54 demographics</li>
                      <li>Add interest targeting for "outdoor activities" and "sustainable products"</li>
                    </ul>
                    <Button size="sm" className="mt-3">
                      Apply These Changes
                    </Button>
                  </div>
                  
                  <div className="p-4 border border-purple-100 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800">Placement Optimization</h4>
                    <p className="text-sm text-purple-700 mt-1 mb-2">
                      Your ads are performing best in these placements:
                    </p>
                    <ul className="text-sm text-purple-700 list-disc pl-5">
                      <li>Instagram Stories (42% of conversions)</li>
                      <li>Facebook Feed (31% of conversions)</li>
                      <li>Instagram Feed (18% of conversions)</li>
                    </ul>
                    <Button size="sm" className="mt-3">
                      Optimize Placements
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Performance Reports</h2>
                <p className="text-gray-600 mb-4">
                  Generate detailed performance reports with actionable insights.
                </p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="flex items-center justify-center gap-2 h-24 flex-col">
                      <FileText size={24} />
                      <span>Daily Report</span>
                    </Button>
                    
                    <Button variant="outline" className="flex items-center justify-center gap-2 h-24 flex-col">
                      <FileText size={24} />
                      <span>Weekly Report</span>
                    </Button>
                    
                    <Button variant="outline" className="flex items-center justify-center gap-2 h-24 flex-col">
                      <FileText size={24} />
                      <span>Monthly Report</span>
                    </Button>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg mt-4">
                    <h4 className="font-medium mb-2">Custom Report</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Report Name
                        </label>
                        <Input placeholder="E.g., Q3 Performance Summary" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                          </label>
                          <Input type="date" />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Date
                          </label>
                          <Input type="date" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Metrics to Include
                        </label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="flex items-center space-x-2">
                            <Switch id="include-spend" defaultChecked />
                            <label htmlFor="include-spend">Ad Spend</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="include-roas" defaultChecked />
                            <label htmlFor="include-roas">ROAS</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="include-cpc" defaultChecked />
                            <label htmlFor="include-cpc">CPC</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="include-ctr" defaultChecked />
                            <label htmlFor="include-ctr">CTR</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="include-conv" defaultChecked />
                            <label htmlFor="include-conv">Conversions</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="include-freq" defaultChecked />
                            <label htmlFor="include-freq">Frequency</label>
                          </div>
                        </div>
                      </div>
                      
                      <Button>
                        Generate Custom Report
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Advanced Analytics</h2>
                <p className="text-gray-600 mb-4">
                  Connect with your store or CRM to track advanced eCommerce metrics.
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Connected Data Sources</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                      <div className="p-3 border border-blue-200 rounded-md bg-white">
                        <div className="font-medium">Shopify Store</div>
                        <p className="text-sm text-gray-600">Connected: Yes</p>
                        <Button size="sm" variant="outline" className="mt-2">Manage</Button>
                      </div>
                      
                      <div className="p-3 border border-blue-200 rounded-md bg-white">
                        <div className="font-medium">Google Analytics</div>
                        <p className="text-sm text-gray-600">Connected: Yes</p>
                        <Button size="sm" variant="outline" className="mt-2">Manage</Button>
                      </div>
                      
                      <div className="p-3 border border-gray-200 rounded-md bg-white">
                        <div className="font-medium">CRM</div>
                        <p className="text-sm text-gray-600">Connected: No</p>
                        <Button size="sm" variant="outline" className="mt-2">Connect</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">eCommerce Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Average Order Value</span>
                          <span className="font-medium">$87.35</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Customer Acquisition Cost</span>
                          <span className="font-medium">$32.18</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Lifetime Value</span>
                          <span className="font-medium">$210.45</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Attribution Insights</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">First Click</span>
                          <span className="font-medium">23%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Click</span>
                          <span className="font-medium">45%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Linear</span>
                          <span className="font-medium">32%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Integration Settings</h2>
                
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="font-medium mb-3 flex items-center">
                      <Shield className="mr-2" size={18} /> Account Connections
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Facebook Ad Account</div>
                          <div className="text-sm text-gray-600">
                            {fbConnected ? "Connected" : "Not connected"}
                          </div>
                        </div>
                        <Button size="sm" variant={fbConnected ? "outline" : "default"}>
                          {fbConnected ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Google Ads</div>
                          <div className="text-sm text-gray-600">Not connected</div>
                        </div>
                        <Button size="sm">Connect</Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">TikTok Ads</div>
                          <div className="text-sm text-gray-600">Not connected</div>
                        </div>
                        <Button size="sm">Connect</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="font-medium mb-3">Notification Preferences</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor="notify-campaigns">Campaign status changes</label>
                        <Switch id="notify-campaigns" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label htmlFor="notify-budget">Budget adjustments</label>
                        <Switch id="notify-budget" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label htmlFor="notify-reports">Report generation</label>
                        <Switch id="notify-reports" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label htmlFor="notify-policy">Policy violations</label>
                        <Switch id="notify-policy" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">AI Assistant Preferences</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Default Ad Creation Style</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>Promotional</option>
                          <option>Educational</option>
                          <option>Testimonial-Based</option>
                          <option>Problem-Solution</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label htmlFor="auto-recommend">Automatic recommendations</label>
                        <Switch id="auto-recommend" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label htmlFor="ai-updates">Daily AI performance updates</label>
                        <Switch id="ai-updates" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AIMediaBuyerPage;
