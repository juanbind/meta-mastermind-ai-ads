
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  MessageSquare 
} from 'lucide-react';
import AdCopyGenerator from '@/components/ai-tools/AdCopyGenerator';

const AdCopyGeneratorPage: React.FC = () => {
  const { toast } = useToast();
  const [fbConnected, setFbConnected] = useState(false);

  return (
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 text-metamaster-gray-800">Ad Copy Generator</h1>
            <p className="text-metamaster-gray-600">Create compelling ad copy that converts using our advanced AI model trained on high-performing ads.</p>
          </div>
          
          <Tabs defaultValue="generate" className="space-y-6">
            <TabsList className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <TabsTrigger value="generate" className="flex items-center justify-center gap-2">
                <MessageSquare size={16} /> Generate Copy
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center justify-center gap-2">
                <FileText size={16} /> Saved Copy
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center justify-center gap-2">
                <FileText size={16} /> Settings
              </TabsTrigger>
            </TabsList>
            
            {/* Generate Tab */}
            <TabsContent value="generate" className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Generate New Ad Copy</h2>
                <div className="mb-6">
                  <AdCopyGenerator />
                </div>
              </div>
            </TabsContent>
            
            {/* Saved Tab */}
            <TabsContent value="saved" className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Saved Ad Copy</h2>
                <p className="text-gray-600 mb-6">
                  View and manage your saved ad copies.
                </p>
                
                <div className="text-center py-8">
                  <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-lg font-medium text-gray-600 mb-2">No saved ad copies yet</p>
                  <p className="text-gray-500 mb-6">Generate and save ad copies to see them here</p>
                  <Button variant="outline">
                    Generate New Ad Copy
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Generator Settings</h2>
                <p className="text-gray-600 mb-6">
                  Customize your ad copy generator settings.
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-md">
                    <h3 className="font-medium mb-2">Default Tone</h3>
                    <select className="w-full p-2 border rounded-md">
                      <option>Professional</option>
                      <option>Conversational</option>
                      <option>Friendly</option>
                      <option>Formal</option>
                      <option>Persuasive</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-md">
                    <h3 className="font-medium mb-2">Maximum Length</h3>
                    <select className="w-full p-2 border rounded-md">
                      <option>Short (50-100 words)</option>
                      <option>Medium (100-200 words)</option>
                      <option>Long (200-300 words)</option>
                      <option>Extended (300+ words)</option>
                    </select>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-md">
                    <h3 className="font-medium mb-2">Industry Focus</h3>
                    <select className="w-full p-2 border rounded-md">
                      <option>General</option>
                      <option>E-Commerce</option>
                      <option>SaaS</option>
                      <option>Finance</option>
                      <option>Healthcare</option>
                      <option>Education</option>
                    </select>
                  </div>
                  
                  <Button className="w-full">
                    Save Settings
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

export default AdCopyGeneratorPage;
