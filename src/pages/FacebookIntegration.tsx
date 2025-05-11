
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import FacebookConnection from '@/components/ai-tools/FacebookConnection';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';
import { Facebook, BarChart3, Users, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const FacebookIntegration: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [accountData, setAccountData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchFacebookConnection = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('facebook_integrations')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (error) {
          console.error("Error fetching Facebook connection:", error);
          // Not found is expected for new users
          if (error.code !== 'PGRST116') {
            toast({
              title: "Error checking connection",
              description: "Could not verify your Facebook connection status",
              variant: "destructive"
            });
          }
        } else if (data) {
          setIsConnected(true);
          setAccountData({
            id: data.account_id,
            name: "Facebook Ad Account",
            status: "ACTIVE",
            accessToken: data.access_token
          });
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFacebookConnection();
  }, [user, toast]);

  const handleConnection = async (connected: boolean, data?: any) => {
    if (!user) return;
    
    if (connected && data) {
      try {
        // Save the connection to Supabase
        const { error } = await supabase
          .from('facebook_integrations')
          .upsert({
            user_id: user.id,
            account_id: data.id,
            access_token: data.accessToken,
            metadata: data
          }, {
            onConflict: 'user_id'
          });
          
        if (error) {
          console.error("Error saving Facebook connection:", error);
          toast({
            title: "Connection Error",
            description: "Failed to save your Facebook connection",
            variant: "destructive"
          });
          return;
        }
        
        setIsConnected(true);
        setAccountData(data);
        setActiveTab('overview');
        
      } catch (error) {
        console.error("Unexpected error:", error);
        toast({
          title: "Connection Error",
          description: "An unexpected error occurred",
          variant: "destructive"
        });
      }
    } else {
      // Handle disconnection
      if (isConnected) {
        try {
          const { error } = await supabase
            .from('facebook_integrations')
            .delete()
            .eq('user_id', user.id);
            
          if (error) {
            console.error("Error removing Facebook connection:", error);
            toast({
              title: "Disconnection Error",
              description: "Failed to disconnect your Facebook account",
              variant: "destructive"
            });
            return;
          }
          
        } catch (error) {
          console.error("Unexpected error:", error);
        }
      }
      
      setIsConnected(false);
      setAccountData(null);
    }
  };

  return (
    <div className="min-h-screen bg-adking-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2 text-adking-dark">Facebook Integration</h1>
                <p className="text-adking-gray-700">Connect and manage your Facebook ad accounts</p>
              </div>
              <Button 
                variant="ghost" 
                className="text-adking-gray-600 hover:text-adking-gray-900"
                onClick={() => navigate('/integrations')}
              >
                Back to Integrations
              </Button>
            </div>
          </div>

          {!isConnected ? (
            <Card>
              <CardContent className="pt-6">
                <FacebookConnection 
                  onConnected={handleConnection} 
                  isConnected={isConnected} 
                  accountData={accountData}
                />
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <FacebookConnection 
                    onConnected={handleConnection} 
                    isConnected={isConnected} 
                    accountData={accountData}
                  />
                </CardContent>
              </Card>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-white border border-gray-200 rounded-lg mb-4">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-adking-primary data-[state=active]:text-white">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="leads" className="data-[state=active]:bg-adking-primary data-[state=active]:text-white">
                    <Users className="h-4 w-4 mr-2" />
                    Lead Integration
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Facebook Integration Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p>Your Facebook Ad Account is connected and ready to use with our platform.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="bg-adking-gray-50 border border-adking-gray-200 rounded-lg p-4">
                            <div className="font-medium text-adking-gray-700 mb-1">Account ID</div>
                            <div>{accountData?.id}</div>
                          </div>
                          <div className="bg-adking-gray-50 border border-adking-gray-200 rounded-lg p-4">
                            <div className="font-medium text-adking-gray-700 mb-1">Status</div>
                            <div className="flex items-center">
                              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                              {accountData?.status || "Active"}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <Button variant="outline" className="text-adking-primary border-adking-primary">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh Connection
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="leads">
                  <Card>
                    <CardHeader>
                      <CardTitle>Lead Integration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p>Automatically sync leads from Facebook Lead Forms to your CRM.</p>
                        
                        <div className="bg-adking-gray-50 border border-adking-gray-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium">Webhook URL</div>
                            <Button variant="ghost" size="sm" onClick={() => {
                              navigator.clipboard.writeText(`https://mbbfcjdfdkoggherfmff.supabase.co/functions/v1/fb-lead-sync`);
                              toast({
                                title: "Copied to clipboard",
                                description: "Webhook URL copied to clipboard",
                              });
                            }}>
                              Copy
                            </Button>
                          </div>
                          <code className="text-sm bg-adking-gray-100 p-2 rounded block overflow-x-auto">
                            https://mbbfcjdfdkoggherfmff.supabase.co/functions/v1/fb-lead-sync
                          </code>
                          <p className="text-sm text-adking-gray-600 mt-2">
                            Use this URL in Facebook Developer Console to receive lead notifications.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium">Setup Instructions:</h4>
                          <ol className="list-decimal list-inside space-y-2 text-sm pl-4">
                            <li>Go to <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook for Developers</a></li>
                            <li>Create a new app or select an existing app</li>
                            <li>Add the Lead Ads product to your app</li>
                            <li>Set up a webhook using the URL above</li>
                            <li>Subscribe to the "leadgen" field in the webhook setup</li>
                            <li>Test the webhook to ensure proper connection</li>
                          </ol>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacebookIntegration;
