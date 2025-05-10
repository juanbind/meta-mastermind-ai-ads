
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Facebook, Mail, CreditCard, MessageSquare, Database, Globe, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isConnected: boolean;
  category: string;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ title, description, icon, isConnected, category }) => {
  const { toast } = useToast();
  
  const handleIntegrationClick = () => {
    if (isConnected) {
      toast({
        title: `${title} is already connected`,
        description: "You can manage your connection in the settings page.",
      });
    } else {
      toast({
        title: `${title} Integration`,
        description: "This integration will be available soon.",
      });
    }
  };
  
  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="bg-metamaster-gray-100 p-3 rounded-lg">
            {icon}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-metamaster-gray-800">{title}</h3>
              <span className="text-xs bg-metamaster-gray-200 px-2 py-0.5 rounded-full text-metamaster-gray-700">
                {category}
              </span>
            </div>
            <p className="text-sm text-metamaster-gray-600 mt-1">{description}</p>
          </div>
        </div>
        <Button 
          variant={isConnected ? "outline" : "default"}
          size="sm"
          className={isConnected ? "border-green-500 text-green-600" : "bg-metamaster-primary hover:bg-metamaster-secondary"}
          onClick={handleIntegrationClick}
        >
          {isConnected ? "Connected" : "Connect"}
        </Button>
      </div>
    </div>
  );
};

const Integrations: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const integrations = [
    {
      title: "Facebook Ads",
      description: "Connect your Facebook Ad account for ad analysis and optimization.",
      icon: <Facebook size={24} />,
      isConnected: false, // Changed to false to match our "no mock data" approach
      category: "Advertising"
    },
    {
      title: "Google Ads",
      description: "Import and analyze your Google Ad campaigns.",
      icon: <Search size={24} />,
      isConnected: false,
      category: "Advertising"
    },
    {
      title: "Mailchimp",
      description: "Sync your email lists and automate email campaigns.",
      icon: <Mail size={24} />,
      isConnected: false,
      category: "Email"
    },
    {
      title: "Stripe",
      description: "Process payments and track revenue from your funnels.",
      icon: <CreditCard size={24} />,
      isConnected: false,
      category: "Payment"
    },
    {
      title: "Intercom",
      description: "Manage customer conversations and support tickets.",
      icon: <MessageSquare size={24} />,
      isConnected: false,
      category: "Support"
    },
    {
      title: "Hubspot CRM",
      description: "Sync contacts and deal information with Hubspot.",
      icon: <Database size={24} />,
      isConnected: false,
      category: "CRM"
    },
    {
      title: "WordPress",
      description: "Connect your WordPress site to publish content.",
      icon: <Globe size={24} />,
      isConnected: false,
      category: "Website"
    },
    {
      title: "Zapier",
      description: "Connect with thousands of apps through Zapier.",
      icon: <Database size={24} />,
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
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 text-metamaster-gray-800">Integrations</h1>
            <p className="text-metamaster-gray-600">Connect with your favorite marketing tools and services</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-5 mb-8 border border-gray-100">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={18} className="text-metamaster-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search integrations..."
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-metamaster-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {filteredIntegrations.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredIntegrations.map((integration, index) => (
                <IntegrationCard 
                  key={index}
                  title={integration.title}
                  description={integration.description}
                  icon={integration.icon}
                  isConnected={integration.isConnected}
                  category={integration.category}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 text-center">
              <Search size={48} className="mx-auto text-metamaster-gray-300 mb-3" />
              <h3 className="text-lg font-bold text-metamaster-gray-800 mb-2">No integrations found</h3>
              <p className="text-metamaster-gray-600">
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
