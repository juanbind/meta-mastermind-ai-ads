
import React from 'react';
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

const TemplateCard: React.FC<{ name: string; image: string; tags: string[] }> = ({ name, image, tags }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
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

const ElementButton: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => {
  return (
    <Button 
      variant="outline" 
      className="flex items-center justify-start h-auto py-3 px-4 border-dashed border-2 w-full"
    >
      <div className="mr-3 text-metamaster-primary">{icon}</div>
      <span>{label}</span>
    </Button>
  );
};

const FunnelBuilder: React.FC = () => {
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
  
  return (
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Funnel Builder</h1>
            <p className="text-metamaster-gray-600">Create high-converting funnels with our drag-and-drop builder</p>
          </div>
          
          {/* Create New Funnel Button */}
          <div className="mb-8">
            <Button className="bg-metamaster-primary hover:bg-metamaster-secondary text-white flex items-center">
              <Plus size={18} className="mr-2" /> Create New Funnel
            </Button>
          </div>
          
          {/* Funnel Builder Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Elements */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-4">Elements</h3>
                <div className="space-y-3">
                  <ElementButton icon={<Type size={18} />} label="Headline" />
                  <ElementButton icon={<Type size={18} />} label="Paragraph" />
                  <ElementButton icon={<Image size={18} />} label="Image" />
                  <ElementButton icon={<Video size={18} />} label="Video" />
                  <ElementButton icon={<FormInput size={18} />} label="Form" />
                  <ElementButton icon={<ListIcon size={18} />} label="Bullet List" />
                  <ElementButton icon={<MoveHorizontal size={18} />} label="Button" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-4">Settings</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start text-metamaster-gray-800">
                    <Settings size={18} className="mr-2" /> Page Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-metamaster-gray-800">
                    <Copy size={18} className="mr-2" /> Duplicate Page
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Middle Column - Canvas */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="font-bold">Canvas</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Preview</Button>
                  <Button size="sm" className="bg-metamaster-primary hover:bg-metamaster-secondary">Save</Button>
                </div>
              </div>
              
              <div className="border-2 border-dashed border-metamaster-gray-200 rounded-lg h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <LayoutGrid size={48} className="mx-auto mb-4 text-metamaster-gray-400" />
                  <p className="text-metamaster-gray-500 mb-4">Drag and drop elements here<br/>or select a template to get started</p>
                  <Button variant="outline">Choose Template</Button>
                </div>
              </div>
            </div>
            
            {/* Right Column - Templates */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="font-bold text-lg">Templates</h3>
                  <Button variant="ghost" size="sm" className="text-metamaster-primary">
                    View All
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {templates.slice(0, 3).map((template, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 hover:bg-metamaster-gray-100 rounded-lg transition-colors">
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
                <Button className="bg-white text-metamaster-primary hover:bg-white/90 flex items-center">
                  Try AI Builder <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Popular Templates Section */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Popular Templates</h2>
              <Button variant="ghost" className="text-metamaster-primary">
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
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunnelBuilder;
