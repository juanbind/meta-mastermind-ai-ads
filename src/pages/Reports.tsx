
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { BarChart, LineChart, PieChart, Activity, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';

const EmptyChart: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-adking-gray-300 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-adking-dark">{title}</h3>
        {icon}
      </div>
      <div className="h-40 flex flex-col items-center justify-center bg-adking-gray-50 rounded-lg border border-adking-gray-200">
        <AlertCircle size={24} className="text-adking-gray-500 mb-2" />
        <p className="text-sm text-adking-gray-700">No data available</p>
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
    <div className="min-h-screen bg-adking-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 text-adking-dark">Reports & Analytics</h1>
            <p className="text-adking-gray-700">Track and analyze your marketing performance</p>
          </div>
          
          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-adking-gray-200">
                <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-adking-dark">Overview</TabsTrigger>
                <TabsTrigger value="campaigns" className="data-[state=active]:bg-white data-[state=active]:text-adking-dark">Campaigns</TabsTrigger>
                <TabsTrigger value="funnels" className="data-[state=active]:bg-white data-[state=active]:text-adking-dark">Funnels</TabsTrigger>
                <TabsTrigger value="leads" className="data-[state=active]:bg-white data-[state=active]:text-adking-dark">Leads</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleDateChange} className="border-adking-gray-300 text-adking-gray-700">
                  <Calendar size={16} className="mr-2" />
                  Last 30 Days
                </Button>
                <Button variant="outline" size="sm" onClick={handleExport} className="border-adking-gray-300 text-adking-gray-700">Export</Button>
              </div>
            </div>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <EmptyChart title="Campaign Performance" icon={<TrendingUp size={18} className="text-adking-gray-500" />} />
                <EmptyChart title="Lead Acquisition" icon={<Activity size={18} className="text-adking-gray-500" />} />
                <EmptyChart title="Traffic Sources" icon={<PieChart size={18} className="text-adking-gray-500" />} />
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-adking-gray-300">
                <h3 className="font-medium mb-4 text-adking-dark">Performance Overview</h3>
                <div className="h-64 flex flex-col items-center justify-center bg-adking-gray-50 rounded-lg border border-adking-gray-200">
                  <LineChart size={48} className="text-adking-gray-400 mb-3" />
                  <h4 className="font-medium text-adking-dark mb-2">No Data Available Yet</h4>
                  <p className="text-adking-gray-700 text-center max-w-md">
                    Connect your ad accounts or create campaigns to start seeing performance analytics here.
                  </p>
                  <Button className="mt-4 bg-adking-primary hover:bg-adking-secondary text-adking-dark">
                    Connect Ad Account
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="campaigns" className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-adking-gray-300">
                <h3 className="font-medium mb-4 text-adking-dark">Campaign Analytics</h3>
                <div className="h-64 flex flex-col items-center justify-center bg-adking-gray-50 rounded-lg border border-adking-gray-200">
                  <BarChart size={48} className="text-adking-gray-400 mb-3" />
                  <h4 className="font-medium text-adking-dark mb-2">No Campaigns Yet</h4>
                  <p className="text-adking-gray-700 text-center max-w-md">
                    Create or import campaigns to see detailed analytics and performance metrics.
                  </p>
                  <Button className="mt-4 bg-adking-primary hover:bg-adking-secondary text-adking-dark">
                    Create Campaign
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="funnels" className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-adking-gray-300">
                <h3 className="font-medium mb-4 text-adking-dark">Funnel Analytics</h3>
                <div className="h-64 flex flex-col items-center justify-center bg-adking-gray-50 rounded-lg border border-adking-gray-200">
                  <Activity size={48} className="text-adking-gray-400 mb-3" />
                  <h4 className="font-medium text-adking-dark mb-2">No Funnels Created Yet</h4>
                  <p className="text-adking-gray-700 text-center max-w-md">
                    Build your first funnel to start tracking conversion rates and user journeys.
                  </p>
                  <Button className="mt-4 bg-adking-primary hover:bg-adking-secondary text-adking-dark">
                    Build Funnel
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="leads" className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-adking-gray-300">
                <h3 className="font-medium mb-4 text-adking-dark">Lead Analytics</h3>
                <div className="h-64 flex flex-col items-center justify-center bg-adking-gray-50 rounded-lg border border-adking-gray-200">
                  <PieChart size={48} className="text-adking-gray-400 mb-3" />
                  <h4 className="font-medium text-adking-dark mb-2">No Leads Captured Yet</h4>
                  <p className="text-adking-gray-700 text-center max-w-md">
                    Connect your lead capture forms or import leads to see detailed analytics.
                  </p>
                  <Button className="mt-4 bg-adking-primary hover:bg-adking-secondary text-adking-dark">
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
