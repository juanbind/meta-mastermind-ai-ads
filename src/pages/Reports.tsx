
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { BarChart, LineChart, PieChart, Activity, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';

const EmptyChart: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-metamaster-gray-800">{title}</h3>
        {icon}
      </div>
      <div className="h-40 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
        <AlertCircle size={24} className="text-metamaster-gray-400 mb-2" />
        <p className="text-sm text-metamaster-gray-500">No data available</p>
      </div>
    </div>
  );
};

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  
  const handleExport = () => {
    toast({
      title: "Export Feature",
      description: "The export functionality will be available once you have data to export.",
    });
  };
  
  const handleDateChange = () => {
    toast({
      title: "Date Range",
      description: "Date range selection will be available in an upcoming update.",
    });
  };
  
  return (
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 text-metamaster-gray-800">Reports & Analytics</h1>
            <p className="text-metamaster-gray-600">Track and analyze your marketing performance</p>
          </div>
          
          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="funnels">Funnels</TabsTrigger>
                <TabsTrigger value="leads">Leads</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleDateChange}>
                  <Calendar size={16} className="mr-2" />
                  Last 30 Days
                </Button>
                <Button variant="outline" size="sm" onClick={handleExport}>Export</Button>
              </div>
            </div>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <EmptyChart title="Campaign Performance" icon={<TrendingUp size={18} className="text-metamaster-gray-400" />} />
                <EmptyChart title="Lead Acquisition" icon={<Activity size={18} className="text-metamaster-gray-400" />} />
                <EmptyChart title="Traffic Sources" icon={<PieChart size={18} className="text-metamaster-gray-400" />} />
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="font-medium mb-4 text-metamaster-gray-800">Performance Overview</h3>
                <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
                  <LineChart size={48} className="text-metamaster-gray-300 mb-3" />
                  <h4 className="font-medium text-metamaster-gray-700 mb-2">No Data Available Yet</h4>
                  <p className="text-metamaster-gray-500 text-center max-w-md">
                    Connect your ad accounts or create campaigns to start seeing performance analytics here.
                  </p>
                  <Button className="mt-4 bg-metamaster-primary hover:bg-metamaster-secondary">
                    Connect Ad Account
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="campaigns" className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="font-medium mb-4 text-metamaster-gray-800">Campaign Analytics</h3>
                <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
                  <BarChart size={48} className="text-metamaster-gray-300 mb-3" />
                  <h4 className="font-medium text-metamaster-gray-700 mb-2">No Campaigns Yet</h4>
                  <p className="text-metamaster-gray-500 text-center max-w-md">
                    Create or import campaigns to see detailed analytics and performance metrics.
                  </p>
                  <Button className="mt-4 bg-metamaster-primary hover:bg-metamaster-secondary">
                    Create Campaign
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="funnels" className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="font-medium mb-4 text-metamaster-gray-800">Funnel Analytics</h3>
                <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
                  <Activity size={48} className="text-metamaster-gray-300 mb-3" />
                  <h4 className="font-medium text-metamaster-gray-700 mb-2">No Funnels Created Yet</h4>
                  <p className="text-metamaster-gray-500 text-center max-w-md">
                    Build your first funnel to start tracking conversion rates and user journeys.
                  </p>
                  <Button className="mt-4 bg-metamaster-primary hover:bg-metamaster-secondary">
                    Build Funnel
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="leads" className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="font-medium mb-4 text-metamaster-gray-800">Lead Analytics</h3>
                <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
                  <PieChart size={48} className="text-metamaster-gray-300 mb-3" />
                  <h4 className="font-medium text-metamaster-gray-700 mb-2">No Leads Captured Yet</h4>
                  <p className="text-metamaster-gray-500 text-center max-w-md">
                    Connect your lead capture forms or import leads to see detailed analytics.
                  </p>
                  <Button className="mt-4 bg-metamaster-primary hover:bg-metamaster-secondary">
                    Set Up Lead Capture
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Reports;
