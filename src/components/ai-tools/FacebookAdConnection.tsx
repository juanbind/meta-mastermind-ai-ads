
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle2, Facebook } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FacebookAdConnectionProps {
  connected: boolean;
  accessToken: string;
  adAccountId: string;
  onAccessTokenChange: (value: string) => void;
  onAdAccountIdChange: (value: string) => void;
  onConnect: () => void;
  onDisconnect: () => void;
}

const FacebookAdConnection: React.FC<FacebookAdConnectionProps> = ({
  connected,
  accessToken,
  adAccountId,
  onAccessTokenChange,
  onAdAccountIdChange,
  onConnect,
  onDisconnect,
}) => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  
  const handleConnect = () => {
    // Validate inputs
    if (!accessToken || !adAccountId) {
      toast({
        title: "Missing Information",
        description: "Please provide both Access Token and Ad Account ID",
        variant: "destructive"
      });
      return;
    }
    
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      onConnect();
      
      toast({
        title: "Facebook Account Connected",
        description: "Your ad account has been successfully connected",
      });
    }, 1500);
  };
  
  const handleDisconnect = () => {
    onDisconnect();
    
    toast({
      title: "Facebook Account Disconnected",
      description: "Your ad account has been disconnected",
    });
  };
  
  return (
    <Card className={`p-6 ${connected ? 'border-green-200' : 'border-gray-200'}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-full ${connected ? 'bg-green-100' : 'bg-blue-100'}`}>
          <Facebook size={20} className={connected ? 'text-green-600' : 'text-blue-600'} />
        </div>
        <h3 className="font-medium text-lg">Facebook Ad Account</h3>
        
        {connected && (
          <div className="ml-auto flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">
            <CheckCircle2 size={14} className="mr-1" />
            Connected
          </div>
        )}
      </div>
      
      {!connected ? (
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Connect your Facebook Ad account to launch campaigns directly from MetaMaster.
          </p>
          
          <div>
            <Label htmlFor="fb-token">Facebook Access Token</Label>
            <Input 
              id="fb-token"
              value={accessToken} 
              onChange={(e) => onAccessTokenChange(e.target.value)}
              placeholder="Enter your Facebook access token"
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Get this from Facebook Business Manager &gt; System User &gt; Generate Token
            </p>
          </div>
          
          <div>
            <Label htmlFor="ad-account">Ad Account ID</Label>
            <Input 
              id="ad-account"
              value={adAccountId} 
              onChange={(e) => onAdAccountIdChange(e.target.value)}
              placeholder="Enter your Ad Account ID (e.g., act_123456789)"
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Find this in Facebook Business Manager &gt; Ad Accounts
            </p>
          </div>
          
          <div className="flex justify-end">
            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="bg-metamaster-primary hover:bg-metamaster-secondary"
            >
              {isConnecting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Connecting...
                </>
              ) : (
                'Connect Facebook Account'
              )}
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2">
            <AlertCircle size={16} className="text-amber-500 mt-0.5" />
            <div className="text-xs text-amber-800">
              <p className="font-medium mb-1">Permission Requirements</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Ads Management Standard Access</li>
                <li>Page Admin Access (for Lead Ads)</li>
                <li>Pixel and Conversions API Access</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="text-gray-600">Account ID:</div>
            <div className="font-medium">{adAccountId}</div>
            
            <div className="text-gray-600">Access Level:</div>
            <div className="font-medium">Admin</div>
            
            <div className="text-gray-600">Status:</div>
            <div className="font-medium">Active</div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={handleDisconnect}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              Disconnect Account
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default FacebookAdConnection;
