
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  LayoutGrid, 
  Plus, 
  Settings, 
  Copy, 
  MoveHorizontal, 
  Image, 
  Type, 
  ListIcon,
  FormInput,
  Video,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FunnelElement from '@/components/funnel/FunnelElement';
import FunnelCanvas from '@/components/funnel/FunnelCanvas';
import { ELEMENT_TYPES } from '@/components/funnel/FunnelElement';

const TemplateCard: React.FC<{ name: string; image: string; tags: string[]; onClick: () => void }> = ({ name, image, tags, onClick }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={onClick}>
      <div className="h-48 bg-metamaster-gray-200 relative">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <span key={index} className="text-xs bg-black/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium">{name}</h3>
      </div>
    </div>
  );
};

const FunnelBuilder: React.FC = () => {
  const { toast } = useToast();
  const [showNewFunnelDialog, setShowNewFunnelDialog] = useState(false);
  const [newFunnelName, setNewFunnelName] = useState('');
  const [activeFunnel, setActiveFunnel] = useState<{ id: string; name: string } | null>(null);
  
  const templates = [
    {
      name: "Lead Generation Funnel",
      image: "https://placehold.co/600x400/1E88E5/FFFFFF?text=Lead+Gen+Funnel",
      tags: ["Lead Gen", "High Converting"]
    },
    {
      name: "Webinar Registration",
      image: "https://placehold.co/600x400/0D47A1/FFFFFF?text=Webinar+Funnel",
      tags: ["Webinar", "Events"]
    },
    {
      name: "E-commerce Product",
      image: "https://placehold.co/600x400/2A2A2A/FFFFFF?text=Ecom+Funnel",
      tags: ["E-commerce", "Sales"]
    },
    {
      name: "Coaching Application",
      image: "https://placehold.co/600x400/757575/FFFFFF?text=Coaching+Funnel",
      tags: ["Coaching", "Application"]
    },
    {
      name: "Real Estate Lead Capture",
      image: "https://placehold.co/600x400/1E88E5/FFFFFF?text=Real+Estate",
      tags: ["Real Estate", "Lead Gen"]
    },
    {
      name: "Free Download Optin",
      image: "https://placehold.co/600x400/0D47A1/FFFFFF?text=Download+Funnel",
      tags: ["Free Download", "Optin"]
    },
  ];

  const handleCreateNewFunnel = () => {
    if (!newFunnelName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your funnel.",
        variant: "destructive",
      });
      return;
    }

    const newFunnelId = `funnel-${Date.now()}`;
    setActiveFunnel({ id: newFunnelId, name: newFunnelName });
    toast({
      title: "Funnel created",
      description: `Your new funnel "${newFunnelName}" is ready to edit.`,
    });
    setShowNewFunnelDialog(false);
    setNewFunnelName('');
  };

  const handleSelectTemplate = (template: { name: string }) => {
    const newFunnelId = `funnel-${Date.now()}`;
    setActiveFunnel({ id: newFunnelId, name: `${template.name} (Copy)` });
    toast({
      title: "Template applied",
      description: `Template "${template.name}" has been applied. You can now customize it.`,
    });
  };

  const handleSaveFunnel = (items: any[]) => {
    toast({
      title: "Funnel saved",
      description: `Funnel "${activeFunnel?.name}" has been saved successfully with ${items.length} elements.`,
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-metamaster-gray-100">
        <Sidebar />
        <div className="md:ml-64 pt-8">
          <div className="container mx-auto px-4 pb-12">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2 text-metamaster-gray-800">Funnel Builder</h1>
              <p className="text-metamaster-gray-600">Create high-converting funnels with our drag-and-drop builder</p>
            </div>
            
            {/* Create New Funnel Button */}
            <div className="mb-8">
              <Button 
                className="bg-metamaster-primary hover:bg-metamaster-secondary text-white flex items-center"
                onClick={() => setShowNewFunnelDialog(true)}
              >
                <Plus size={18} className="mr-2" /> Create New Funnel
              </Button>
            </div>
            
            {activeFunnel ? (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-metamaster-gray-800">{activeFunnel.name}</h2>
                  <Button 
                    variant="outline"
                    onClick={() => setActiveFunnel(null)}
                  >
                    Back to All Funnels
                  </Button>
                </div>
                
                {/* Funnel Builder Interface */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Elements */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                      <h3 className="font-bold text-lg mb-4">Elements</h3>
                      <div className="space-y-3">
                        <FunnelElement 
                          type={ELEMENT_TYPES.HEADLINE} 
                          icon={<Type size={18} />} 
                          label="Headline" 
                        />
                        <FunnelElement 
                          type={ELEMENT_TYPES.PARAGRAPH} 
                          icon={<Type size={18} />} 
                          label="Paragraph" 
                        />
                        <FunnelElement 
                          type={ELEMENT_TYPES.IMAGE} 
                          icon={<Image size={18} />} 
                          label="Image" 
                        />
                        <FunnelElement 
                          type={ELEMENT_TYPES.VIDEO} 
                          icon={<Video size={18} />} 
                          label="Video" 
                        />
                        <FunnelElement 
                          type={ELEMENT_TYPES.FORM} 
                          icon={<FormInput size={18} />} 
                          label="Form" 
                        />
                        <FunnelElement 
                          type={ELEMENT_TYPES.BULLET_LIST} 
                          icon={<ListIcon size={18} />} 
                          label="Bullet List" 
                        />
                        <FunnelElement 
                          type={ELEMENT_TYPES.BUTTON} 
                          icon={<MoveHorizontal size={18} />} 
                          label="Button" 
                        />
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                      <h3 className="font-bold text-lg mb-4">Settings</h3>
                      <div className="space-y-4">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-metamaster-gray-800"
                          onClick={() => toast({
                            title: "Page Settings",
                            description: "Page settings panel opened.",
                          })}
                        >
                          <Settings size={18} className="mr-2" /> Page Settings
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-metamaster-gray-800"
                          onClick={() => toast({
                            title: "Page Duplicated",
                            description: "A copy of this page has been created.",
                          })}
                        >
                          <Copy size={18} className="mr-2" /> Duplicate Page
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Middle Column - Canvas */}
                  <FunnelCanvas onSave={handleSaveFunnel} />
                  
                  {/* Right Column - Templates */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                      <div className="mb-4 flex justify-between items-center">
                        <h3 className="font-bold text-lg">Templates</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-metamaster-primary"
                          onClick={() => toast({
                            title: "Template Library",
                            description: "Browsing all available templates.",
                          })}
                        >
                          View All
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {templates.slice(0, 3).map((template, index) => (
                          <div 
                            key={index} 
                            className="flex items-center space-x-3 p-2 hover:bg-metamaster-gray-100 rounded-lg transition-colors cursor-pointer"
                            onClick={() => handleSelectTemplate(template)}
                          >
                            <div className="w-16 h-16 bg-metamaster-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                              <img src={template.image} className="w-full h-full object-cover" alt={template.name} />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">{template.name}</h4>
                              <div className="flex gap-1 mt-1">
                                {template.tags.map((tag, i) => (
                                  <span key={i} className="text-xs bg-metamaster-gray-200 px-2 py-0.5 rounded-full">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-metamaster-primary to-metamaster-secondary rounded-xl p-6 shadow-md text-white">
                      <h3 className="font-bold text-lg mb-2">AI Funnel Builder</h3>
                      <p className="opacity-80 mb-4">Let AI build your entire funnel by answering a few simple questions about your business.</p>
                      <Button 
                        className="bg-white text-metamaster-primary hover:bg-white/90 flex items-center"
                        onClick={() => toast({
                          title: "AI Funnel Builder",
                          description: "AI Funnel Builder will be available soon.",
                        })}
                      >
                        Try AI Builder <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {/* Popular Templates Section */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-metamaster-gray-800">Popular Templates</h2>
                    <Button 
                      variant="ghost" 
                      className="text-metamaster-primary"
                      onClick={() => toast({
                        title: "All Templates",
                        description: "Viewing all available funnel templates.",
                      })}
                    >
                      View All Templates
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template, index) => (
                      <TemplateCard 
                        key={index} 
                        name={template.name} 
                        image={template.image}
                        tags={template.tags}
                        onClick={() => handleSelectTemplate(template)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* New Funnel Dialog */}
        <Dialog open={showNewFunnelDialog} onOpenChange={setShowNewFunnelDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Funnel</DialogTitle>
              <DialogDescription>
                Enter a name for your new funnel. You can change it later.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="funnel-name">Funnel Name</Label>
                <Input 
                  id="funnel-name" 
                  placeholder="e.g., Product Launch Funnel" 
                  value={newFunnelName}
                  onChange={(e) => setNewFunnelName(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewFunnelDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateNewFunnel}>
                Create Funnel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DndProvider>
  );
};

export default FunnelBuilder;
