
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Check, Loader } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FacebookAdAccountConnectionProps {
  isConnected: boolean;
  onConnect: (token: string, accountId: string) => void;
  onDisconnect: () => void;
  accessToken: string;
  adAccountId: string;
  setAccessToken: (token: string) => void;
  setAdAccountId: (id: string) => void;
}

const FacebookAdAccountConnection: React.FC<FacebookAdAccountConnectionProps> = ({
  isConnected,
  onConnect,
  onDisconnect,
  accessToken,
  adAccountId,
  setAccessToken,
  setAdAccountId,
}) => {
  const { toast } = useToast();
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    if (!accessToken || !adAccountId) {
      setError("Please provide both Access Token and Ad Account ID");
      return;
    }

    setError(null);
    setConnecting(true);
    
    // Simulating API call to verify credentials
    setTimeout(() => {
      setConnecting(false);
      onConnect(accessToken, adAccountId);
      toast({
        title: "Facebook Ad Account Connected",
        description: "Your ad account is now connected and ready to use",
      });
    }, 1500);
  };

  const handleDisconnect = () => {
    onDisconnect();
    setAccessToken('');
    setAdAccountId('');
    toast({
      title: "Facebook Ad Account Disconnected",
      description: "Your ad account has been disconnected",
    });
  };

  if (isConnected) {
    return (
      <div className="space-y-4">
        <Alert variant="success" className="bg-green-50 border-green-200">
          <Check className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-800">Facebook Ad Account Connected</AlertTitle>
          <AlertDescription className="text-green-700">
            Your Facebook Ad Account (ID: {adAccountId.substring(0, 6)}...) is connected and ready to launch campaigns.
          </AlertDescription>
        </Alert>
        
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            onClick={handleDisconnect}
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            Disconnect Account
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div>
        <Label htmlFor="access-token" className="block mb-2">
          Facebook Access Token
        </Label>
        <Input
          id="access-token"
          value={accessToken}
          onChange={(e) => setAccessToken(e.target.value)}
          placeholder="Enter your Facebook access token"
          type="password"
        />
        <p className="mt-1 text-xs text-gray-500">
          You can get your access token from the{" "}
          <a
            href="https://developers.facebook.com/tools/explorer/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            Graph API Explorer
          </a>
        </p>
      </div>

      <div>
        <Label htmlFor="ad-account-id" className="block mb-2">
          Ad Account ID
        </Label>
        <Input
          id="ad-account-id"
          value={adAccountId}
          onChange={(e) => setAdAccountId(e.target.value)}
          placeholder="Enter your Ad Account ID (e.g., act_123456789)"
        />
        <p className="mt-1 text-xs text-gray-500">
          You can find this in your{" "}
          <a
            href="https://business.facebook.com/settings/ad-accounts"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            Facebook Business Manager
          </a>
        </p>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleConnect} disabled={connecting}>
          {connecting ? (
            <>
              <Loader size={16} className="mr-2 animate-spin" /> Connecting...
            </>
          ) : (
            "Connect Facebook Account"
          )}
        </Button>
      </div>
    </div>
  );
};

export default FacebookAdAccountConnection;
