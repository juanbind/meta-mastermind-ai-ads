
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, AlertTriangle, Facebook, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FacebookConnectionProps {
  onConnected: (isConnected: boolean, accountData?: any) => void;
  isConnected: boolean;
  accountData?: any;
}

const FacebookConnection: React.FC<FacebookConnectionProps> = ({ 
  onConnected, 
  isConnected,
  accountData 
}) => {
  const { toast } = useToast();
  const [accessToken, setAccessToken] = useState('');
  const [adAccountId, setAdAccountId] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [connectionError, setConnectionError] = useState('');

  const handleConnect = async () => {
    if (!accessToken || !adAccountId) {
      toast({
        title: "Missing Information",
        description: "Please provide both Access Token and Ad Account ID",
        variant: "destructive"
      });
      return;
    }

    setIsConnecting(true);
    setConnectionError('');
    setConnectionProgress(10);

    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 500));
      setConnectionProgress(30);
      
      // Validate token format
      if (!accessToken.startsWith('EAA') && accessToken.length < 20) {
        throw new Error("Invalid Facebook access token format");
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setConnectionProgress(50);
      
      // Validate ad account ID format
      if (!adAccountId.includes('act_') && !adAccountId.match(/^\d+$/)) {
        throw new Error("Invalid Ad Account ID format");
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setConnectionProgress(80);
      
      // In a real implementation, we would make an API call to Facebook here
      // For now, we'll simulate a successful connection
      const mockAccountData = {
        id: adAccountId.includes('act_') ? adAccountId : `act_${adAccountId}`,
        name: "Your Facebook Ad Account",
        currency: "USD",
        timezone: "America/Los_Angeles",
        status: "ACTIVE",
        accessToken: accessToken
      };
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setConnectionProgress(100);
      
      toast({
        title: "Account Connected",
        description: "Your Facebook Ad Account has been successfully connected",
      });
      
      onConnected(true, mockAccountData);
    } catch (error: any) {
      setConnectionError(error.message || "Failed to connect to Facebook");
      toast({
        title: "Connection Failed",
        description: error.message || "Unable to connect to your Facebook Ad Account",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
      // Reset progress after showing 100% briefly
      setTimeout(() => {
        if (connectionProgress === 100) setConnectionProgress(0);
      }, 1000);
    }
  };

  const handleDisconnect = () => {
    onConnected(false);
    setAccessToken('');
    setAdAccountId('');
    
    toast({
      title: "Account Disconnected",
      description: "Your Facebook Ad Account has been disconnected",
    });
  };

  if (isConnected && accountData) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
              <Facebook className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-medium">Connected to Facebook</h3>
              <p className="text-sm text-gray-500">{accountData.name || accountData.id}</p>
            </div>
            <div className="ml-auto">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDisconnect}
              >
                Disconnect
              </Button>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              <span>Account status: {accountData.status || "Active"}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              <span>Ready to launch campaigns</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <Facebook className="mr-2 text-blue-600" />
        <h3 className="font-medium">Connect Facebook Ad Account</h3>
      </div>

      {connectionError && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{connectionError}</AlertDescription>
        </Alert>
      )}

      <div>
        <Label htmlFor="accessToken">Facebook Access Token</Label>
        <div className="mt-1">
          <Input
            id="accessToken"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            placeholder="EAAxxxxx..."
            disabled={isConnecting}
          />
          <p className="text-xs text-gray-500 mt-1">
            <a 
              href="https://business.facebook.com/settings/system-users" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center"
            >
              Get your token from Facebook Business Settings <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </p>
        </div>
      </div>

      <div>
        <Label htmlFor="adAccountId">Ad Account ID</Label>
        <div className="mt-1">
          <Input
            id="adAccountId"
            value={adAccountId}
            onChange={(e) => setAdAccountId(e.target.value)}
            placeholder="act_123456789"
            disabled={isConnecting}
          />
          <p className="text-xs text-gray-500 mt-1">
            Find in Facebook Business Manager under Ad Account Settings
          </p>
        </div>
      </div>

      {isConnecting && (
        <div className="space-y-2 py-2">
          <Label>Connecting to Facebook</Label>
          <Progress value={connectionProgress} className="h-2" />
          <p className="text-xs text-gray-500">
            {connectionProgress < 30 && "Validating credentials..."}
            {connectionProgress >= 30 && connectionProgress < 60 && "Checking permissions..."}
            {connectionProgress >= 60 && connectionProgress < 90 && "Establishing connection..."}
            {connectionProgress >= 90 && "Finalizing setup..."}
          </p>
        </div>
      )}

      <Button 
        onClick={handleConnect}
        disabled={isConnecting || !accessToken || !adAccountId}
        className="w-full"
      >
        {isConnecting ? "Connecting..." : "Connect to Facebook"}
      </Button>
    </div>
  );
};

export default FacebookConnection;
