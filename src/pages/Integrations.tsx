
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Facebook, Mail, CreditCard, MessageSquare, Database, Globe, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isConnected: boolean;
  category: string;
  onConnect: () => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ 
  title, 
  description, 
  icon, 
  isConnected, 
  category,
  onConnect 
}) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-adking-gray-300">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="bg-adking-gray-100 p-3 rounded-lg border border-adking-gray-200">
            {icon}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-adking-dark">{title}</h3>
              <span className="text-xs bg-adking-gray-200 px-2 py-0.5 rounded-full text-adking-gray-800">
                {category}
              </span>
            </div>
            <p className="text-sm text-adking-gray-700 mt-1">{description}</p>
          </div>
        </div>
        <Button 
          variant={isConnected ? "outline" : "default"}
          size="sm"
          className={isConnected ? "border-green-500 text-green-600" : "bg-adking-primary hover:bg-adking-secondary text-adking-dark"}
          onClick={onConnect}
        >
          {isConnected ? "Connected" : "Connect"}
        </Button>
      </div>
    </div>
  );
};

const Integrations: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for existing integrations
  React.useEffect(() => {
    const checkIntegrations = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      try {
        // Check Facebook integration
        const { data: facebookData } = await supabase
          .from('facebook_integrations')
          .select('*')
          .eq('user_id', user.id);
          
        if (facebookData && facebookData.length > 0) {
          setConnectedIntegrations(prev => [...prev, 'Facebook Ads']);
        }
      } catch (error) {
        console.error("Error checking integrations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkIntegrations();
  }, [user]);
  
  const handleIntegrationClick = (integrationName: string) => {
    switch (integrationName) {
      case 'Facebook Ads':
        navigate('/facebook-integration');
        break;
      default:
        toast({
          title: `${integrationName} Integration`,
          description: "This integration will be available soon.",
        });
    }
  };
  
  const integrations = [
    {
      title: "Facebook Ads",
      description: "Connect your Facebook Ad account for ad analysis and optimization.",
      icon: <Facebook size={24} className="text-adking-dark" />,
      isConnected: connectedIntegrations.includes('Facebook Ads'),
      category: "Advertising"
    },
    {
      title: "Google Ads",
      description: "Import and analyze your Google Ad campaigns.",
      icon: <Search size={24} className="text-adking-dark" />,
      isConnected: false,
      category: "Advertising"
    },
    {
      title: "Mailchimp",
      description: "Sync your email lists and automate email campaigns.",
      icon: <Mail size={24} className="text-adking-dark" />,
      isConnected: false,
      category: "Email"
    },
    {
      title: "Stripe",
      description: "Process payments and track revenue from your funnels.",
      icon: <CreditCard size={24} className="text-adking-dark" />,
      isConnected: false,
      category: "Payment"
    },
    {
      title: "Intercom",
      description: "Manage customer conversations and support tickets.",
      icon: <MessageSquare size={24} className="text-adking-dark" />,
      isConnected: false,
      category: "Support"
    },
    {
      title: "Hubspot CRM",
      description: "Sync contacts and deal information with Hubspot.",
      icon: <Database size={24} className="text-adking-dark" />,
      isConnected: false,
      category: "CRM"
    },
    {
      title: "WordPress",
      description: "Connect your WordPress site to publish content.",
      icon: <Globe size={24} className="text-adking-dark" />,
      isConnected: false,
      category: "Website"
    },
    {
      title: "Zapier",
      description: "Connect with thousands of apps through Zapier.",
      icon: <Database size={24} className="text-adking-dark" />,
      isConnected: false,
      category: "Automation"
    }
  ];

  const filteredIntegrations = integrations.filter(integration =>
    integration.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    integration.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    integration.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-adking-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 text-adking-dark">Integrations</h1>
            <p className="text-adking-gray-700">Connect with your favorite marketing tools and services</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-5 mb-8 border border-adking-gray-300">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={18} className="text-adking-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search integrations..."
                className="pl-10 pr-4 py-2 w-full border border-adking-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-adking-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-adking-primary"></div>
            </div>
          ) : filteredIntegrations.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredIntegrations.map((integration, index) => (
                <IntegrationCard 
                  key={index}
                  title={integration.title}
                  description={integration.description}
                  icon={integration.icon}
                  isConnected={integration.isConnected}
                  category={integration.category}
                  onConnect={() => handleIntegrationClick(integration.title)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 shadow-md border border-adking-gray-300 text-center">
              <Search size={48} className="mx-auto text-adking-gray-400 mb-3" />
              <h3 className="text-lg font-bold text-adking-dark mb-2">No integrations found</h3>
              <p className="text-adking-gray-700">
                Try searching with different keywords or browse all available integrations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Integrations;
