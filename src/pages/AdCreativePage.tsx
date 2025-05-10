
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ImageIcon,
  FileText,
  Settings,
  Upload,
  Sparkles
} from 'lucide-react';
import AdCreativeForm from '@/components/ai-tools/AdCreativeForm';

const AdCreativePage: React.FC = () => {
  const { toast } = useToast();
  const [creativeData, setCreativeData] = useState({
    primaryText: '',
    headline: '',
    description: '',
    callToAction: 'learn_more',
    destinationUrl: '',
    mediaType: 'manual',
    mediaUrl: '',
  });

  const handleCreativeChange = (data: any) => {
    setCreativeData(data);
    console.log("Updated creative data:", data);
  };

  const handleSaveCreative = () => {
    toast({
      title: "Creative Saved",
      description: "Your ad creative has been saved successfully",
    });
  };

  return (
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 text-metamaster-gray-800">Ad Creative Builder</h1>
            <p className="text-metamaster-gray-600">Design compelling ad creatives for your campaigns with powerful AI assistance.</p>
          </div>
          
          <Tabs defaultValue="create" className="space-y-6">
            <TabsList className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <TabsTrigger value="create" className="flex items-center justify-center gap-2">
                <ImageIcon size={16} /> Create Creative
              </TabsTrigger>
              <TabsTrigger value="library" className="flex items-center justify-center gap-2">
                <FileText size={16} /> Creative Library
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center justify-center gap-2">
                <Settings size={16} /> Settings
              </TabsTrigger>
            </TabsList>
            
            {/* Create Tab */}
            <TabsContent value="create" className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Create New Ad Creative</h2>
                
                <div className="mb-6">
                  <AdCreativeForm 
                    onChange={handleCreativeChange}
                    initialData={creativeData}
                  />
                </div>
                
                <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
                  <Button 
                    className="bg-metamaster-primary hover:bg-metamaster-secondary"
                    onClick={handleSaveCreative}
                  >
                    Save Creative
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Library Tab */}
            <TabsContent value="library" className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Creative Library</h2>
                <p className="text-gray-600 mb-6">
                  View and manage your saved ad creatives.
                </p>
                
                <div className="text-center py-8">
                  <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-lg font-medium text-gray-600 mb-2">No saved creatives yet</p>
                  <p className="text-gray-500 mb-6">Create and save ad creatives to see them here</p>
                  <Button variant="outline">
                    Create New Creative
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Creative Settings</h2>
                <p className="text-gray-600 mb-6">
                  Customize your ad creative generator settings.
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-md">
                    <h3 className="font-medium mb-2">Default Image Generation Style</h3>
                    <select className="w-full p-2 border rounded-md">
                      <option>Photorealistic</option>
                      <option>Illustrated</option>
                      <option>3D Rendered</option>
                      <option>Minimal</option>
                      <option>Colorful</option>
                    </select>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-md">
                    <h3 className="font-medium mb-2">Image Resolution</h3>
                    <select className="w-full p-2 border rounded-md">
                      <option>Standard (1080x1080)</option>
                      <option>Landscape (1200x628)</option>
                      <option>Portrait (1080x1350)</option>
                      <option>Story (1080x1920)</option>
                    </select>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-md">
                    <h3 className="font-medium mb-2">Auto-Save Frequency</h3>
                    <select className="w-full p-2 border rounded-md">
                      <option>Every minute</option>
                      <option>Every 5 minutes</option>
                      <option>Every 10 minutes</option>
                      <option>Never (manual save only)</option>
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

export default AdCreativePage;
