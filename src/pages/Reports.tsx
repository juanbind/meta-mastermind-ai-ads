
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { BarChart, LineChart, PieChart, Activity, TrendingUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Reports: React.FC = () => {
  return (
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Reports & Analytics</h1>
            <p className="text-metamaster-gray-600">Track and analyze your marketing performance</p>
          </div>
          
          <Tabs defaultValue="overview">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="funnels">Funnels</TabsTrigger>
                <TabsTrigger value="leads">Leads</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Calendar size={16} className="mr-2" />
                  Last 30 Days
                </Button>
                <Button variant="outline" size="sm">Export</Button>
              </div>
            </div>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Campaign Performance</h3>
                    <TrendingUp size={18} className="text-green-500" />
                  </div>
                  <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg">
                    <BarChart size={36} className="text-metamaster-gray-400" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Lead Acquisition</h3>
                    <Activity size={18} className="text-blue-500" />
                  </div>
                  <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg">
                    <LineChart size={36} className="text-metamaster-gray-400" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Traffic Sources</h3>
                    <PieChart size={18} className="text-purple-500" />
                  </div>
                  <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg">
                    <PieChart size={36} className="text-metamaster-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="font-medium mb-4">Performance Overview</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <LineChart size={48} className="text-metamaster-gray-400" />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="campaigns" className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="font-medium mb-4">Campaign Analytics</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-metamaster-gray-500">Select a campaign to view detailed analytics</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="funnels" className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="font-medium mb-4">Funnel Analytics</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-metamaster-gray-500">Select a funnel to view detailed analytics</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="leads" className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="font-medium mb-4">Lead Analytics</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-metamaster-gray-500">View detailed lead analytics</p>
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
