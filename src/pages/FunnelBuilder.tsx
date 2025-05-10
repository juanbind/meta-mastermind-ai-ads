
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Layout, Layers, Settings, SlidersHorizontal, PlusCircle, Info } from 'lucide-react';

const FunnelBuilder: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Funnel Builder</h1>
      
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Funnel Progress</span>
          <span className="text-sm text-gray-500">2 of 5 steps completed</span>
        </div>
        <Progress value={40} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Funnel Builder Area */}
          <Card>
            <CardHeader>
              <CardTitle>Design Your Sales Funnel</CardTitle>
              <CardDescription>
                Create a high-converting sales funnel by customizing each step
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pages">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="pages">
                    <Layout className="mr-2 h-4 w-4" />
                    Pages
                  </TabsTrigger>
                  <TabsTrigger value="elements">
                    <Layers className="mr-2 h-4 w-4" />
                    Elements
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="pages" className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Landing Page</h3>
                      <Button variant="ghost" size="sm">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Section
                      </Button>
                    </div>
                    <div className="border rounded-md bg-white p-3 mb-2">
                      <div className="flex justify-between items-center">
                        <span>Header Section</span>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <SlidersHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-md bg-white p-3">
                      <div className="flex justify-between items-center">
                        <span>Hero Section</span>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <SlidersHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Page
                  </Button>
                </TabsContent>
                
                <TabsContent value="elements" className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start">
                      <Layout className="mr-2 h-4 w-4" />
                      Headline
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Layout className="mr-2 h-4 w-4" />
                      Image
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Layout className="mr-2 h-4 w-4" />
                      Button
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Layout className="mr-2 h-4 w-4" />
                      Text Block
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Layout className="mr-2 h-4 w-4" />
                      Form
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Layout className="mr-2 h-4 w-4" />
                      Video
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="funnelName">Funnel Name</Label>
                      <Input id="funnelName" placeholder="My Sales Funnel" />
                    </div>
                    <div>
                      <Label htmlFor="domainName">Domain</Label>
                      <Input id="domainName" placeholder="my-funnel.example.com" />
                    </div>
                    <div>
                      <Label htmlFor="funnelDesc">Description</Label>
                      <Input id="funnelDesc" placeholder="A brief description of your funnel" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Pro Tip</AlertTitle>
            <AlertDescription>
              Add analytics tracking to measure conversion rates between funnel steps.
            </AlertDescription>
          </Alert>
        </div>
        
        <div className="space-y-6">
          {/* Sidebar Components */}
          <Card>
            <CardHeader>
              <CardTitle>Funnel Structure</CardTitle>
              <CardDescription>
                Customize the flow of your sales funnel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="bg-primary/10 border-l-4 border-primary p-2 rounded">
                  Landing Page
                </div>
                <div className="border border-dashed border-gray-300 p-2 rounded">
                  Offer Page
                </div>
                <div className="border border-dashed border-gray-300 p-2 rounded">
                  Checkout Page
                </div>
                <div className="border border-dashed border-gray-300 p-2 rounded">
                  Thank You Page
                </div>
                
                <Button variant="outline" className="w-full mt-2">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Page
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Templates</CardTitle>
              <CardDescription>
                Start with pre-built funnel templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Sales Funnel
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Lead Generation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Webinar Registration
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FunnelBuilder;
