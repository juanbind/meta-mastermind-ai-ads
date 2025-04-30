import React, { useState, useEffect } from 'react';
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
  ArrowRight,
  Calendar,
  Scissors,
  MoveDiagonal,
  CircleDot,
  SeparatorHorizontal,
  Zap,
  Trash
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import FunnelElement from '@/components/funnel/FunnelElement';
import FunnelCanvas, { CanvasItem } from '@/components/funnel/FunnelCanvas';
import { ELEMENT_TYPES } from '@/components/funnel/FunnelElement';
import { supabase, FunnelData } from '@/lib/supabase';

interface Template {
  id: string;
  name: string;
  image: string;
  tags: string[];
  content: string;
  description?: string;
}

// Use our FunnelData type for the Funnel interface
type Funnel = FunnelData;

const TemplateCard: React.FC<{ template: Template; onClick: () => void }> = ({ template, onClick }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={onClick}>
      <div className="h-48 bg-metamaster-gray-200 relative">
        <img src={template.image} alt={template.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex flex-wrap gap-1">
            {template.tags.map((tag, index) => (
              <span key={index} className="text-xs bg-black/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium">{template.name}</h3>
        {template.description && <p className="text-sm text-gray-500 mt-1">{template.description}</p>}
      </div>
    </div>
  );
};

const FunnelBuilder: React.FC = () => {
  const { toast } = useToast();
  const [showNewFunnelDialog, setShowNewFunnelDialog] = useState(false);
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [newFunnelName, setNewFunnelName] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [activeFunnel, setActiveFunnel] = useState<Funnel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [funnels, setFunnels] = useState<Funnel[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  
  const templates: Template[] = [
    {
      id: "template-1",
      name: "Lead Generation Funnel",
      image: "https://placehold.co/600x400/1E88E5/FFFFFF?text=Lead+Gen+Funnel",
      tags: ["Lead Gen", "High Converting"],
      description: "Perfect for capturing leads for your business",
      content: JSON.stringify([
        {
          id: "headline-123",
          type: ELEMENT_TYPES.HEADLINE,
          content: "Get Your Free Guide To Increasing Sales"
        },
        {
          id: "paragraph-123",
          type: ELEMENT_TYPES.PARAGRAPH,
          content: "Enter your details below to receive our expert tips and strategies."
        },
        {
          id: "form-123",
          type: ELEMENT_TYPES.FORM,
          content: "Lead Capture Form",
          props: { fields: ['name', 'email'], buttonText: 'Get Free Guide' }
        }
      ])
    },
    {
      id: "template-2",
      name: "Webinar Registration",
      image: "https://placehold.co/600x400/0D47A1/FFFFFF?text=Webinar+Funnel",
      tags: ["Webinar", "Events"],
      description: "Convert visitors into webinar registrations",
      content: JSON.stringify([
        {
          id: "headline-234",
          type: ELEMENT_TYPES.HEADLINE,
          content: "Register For Our Exclusive Webinar"
        },
        {
          id: "paragraph-234",
          type: ELEMENT_TYPES.PARAGRAPH,
          content: "Join us for this live training event where we'll reveal our best strategies."
        },
        {
          id: "image-234",
          type: ELEMENT_TYPES.IMAGE,
          content: "Speaker Image",
          props: { src: "https://placehold.co/600x400/1E88E5/FFFFFF?text=Speaker", alt: "Webinar Speaker" }
        },
        {
          id: "form-234",
          type: ELEMENT_TYPES.FORM,
          content: "Webinar Registration",
          props: { fields: ['name', 'email'], buttonText: 'Register Now' }
        }
      ])
    },
    {
      id: "template-3",
      name: "E-commerce Product",
      image: "https://placehold.co/600x400/2A2A2A/FFFFFF?text=Ecom+Funnel",
      tags: ["E-commerce", "Sales"],
      description: "Showcase your products and convert visitors into buyers",
      content: JSON.stringify([
        {
          id: "headline-345",
          type: ELEMENT_TYPES.HEADLINE,
          content: "Limited Time Offer: 25% Off Our Best Seller"
        },
        {
          id: "image-345",
          type: ELEMENT_TYPES.IMAGE,
          content: "",
          props: { src: "https://placehold.co/600x400/2A2A2A/FFFFFF?text=Product", alt: "Product Image" }
        },
        {
          id: "paragraph-345",
          type: ELEMENT_TYPES.PARAGRAPH,
          content: "Our premium product is now available at a special discount. Don't miss this opportunity!"
        },
        {
          id: "button-345",
          type: ELEMENT_TYPES.BUTTON,
          content: "Buy Now",
          props: { variant: 'primary', url: '#', action: 'link' }
        }
      ])
    },
    {
      id: "template-4",
      name: "Coaching Application",
      image: "https://placehold.co/600x400/757575/FFFFFF?text=Coaching+Funnel",
      tags: ["Coaching", "Application"],
      description: "Perfect for coaches to qualify potential clients",
      content: JSON.stringify([
        {
          id: "headline-456",
          type: ELEMENT_TYPES.HEADLINE,
          content: "Apply For Our Exclusive Coaching Program"
        },
        {
          id: "paragraph-456",
          type: ELEMENT_TYPES.PARAGRAPH,
          content: "We only work with serious clients who are ready to transform their lives. Fill out the application below to get started."
        },
        {
          id: "form-456",
          type: ELEMENT_TYPES.FORM,
          content: "Coaching Application",
          props: { fields: ['name', 'email', 'phone', 'message'], buttonText: 'Submit Application' }
        }
      ])
    },
    {
      id: "template-5",
      name: "Real Estate Lead Capture",
      image: "https://placehold.co/600x400/1E88E5/FFFFFF?text=Real+Estate",
      tags: ["Real Estate", "Lead Gen"],
      description: "Generate high-quality real estate leads",
      content: JSON.stringify([
        {
          id: "headline-567",
          type: ELEMENT_TYPES.HEADLINE,
          content: "Find Out What Your Home Is Worth"
        },
        {
          id: "paragraph-567",
          type: ELEMENT_TYPES.PARAGRAPH,
          content: "Get a free, no-obligation home valuation from our team of experts."
        },
        {
          id: "form-567",
          type: ELEMENT_TYPES.FORM,
          content: "Property Valuation Request",
          props: { fields: ['name', 'email', 'phone', 'message'], buttonText: 'Get My Valuation' }
        }
      ])
    },
    {
      id: "template-6",
      name: "Free Download Optin",
      image: "https://placehold.co/600x400/0D47A1/FFFFFF?text=Download+Funnel",
      tags: ["Free Download", "Optin"],
      description: "Give away valuable content to build your email list",
      content: JSON.stringify([
        {
          id: "headline-678",
          type: ELEMENT_TYPES.HEADLINE,
          content: "Download Your Free Marketing Checklist"
        },
        {
          id: "paragraph-678",
          type: ELEMENT_TYPES.PARAGRAPH,
          content: "Get instant access to our 27-point checklist that will boost your marketing results."
        },
        {
          id: "image-678",
          type: ELEMENT_TYPES.IMAGE,
          content: "",
          props: { src: "https://placehold.co/600x400/0D47A1/FFFFFF?text=E-book+Cover", alt: "E-book Cover" }
        },
        {
          id: "form-678",
          type: ELEMENT_TYPES.FORM,
          content: "Download Form",
          props: { fields: ['name', 'email'], buttonText: 'Get My Free Checklist' }
        }
      ])
    },
  ];

  // Load user's funnels on component mount
  useEffect(() => {
    const fetchFunnels = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('funnels')
          .select('*')
          .order('updated_at', { ascending: false });
          
        if (error) throw error;
        
        if (data) {
          setFunnels(data as Funnel[]);
        }
      } catch (error) {
        console.error('Error fetching funnels:', error);
        toast({
          title: "Error loading funnels",
          description: "There was a problem loading your funnels.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFunnels();
  }, [toast]);

  const handleCreateNewFunnel = async () => {
    if (!newFunnelName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your funnel.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('funnels')
        .insert({
          name: newFunnelName,
          content: JSON.stringify([]),
          is_published: false,
          user_id: (await supabase.auth.getUser()).data.user?.id || 'anonymous'
        })
        .select()
        .single();
        
      if (error) throw error;
      
      if (data) {
        setFunnels([data as Funnel, ...funnels]);
        setActiveFunnel(data as Funnel);
        toast({
          title: "Funnel created",
          description: `Your new funnel "${newFunnelName}" is ready to edit.`,
        });
      }
    } catch (error) {
      console.error('Error creating funnel:', error);
      toast({
        title: "Error creating funnel",
        description: "There was a problem creating your funnel.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowNewFunnelDialog(false);
      setNewFunnelName('');
    }
  };

  const handleSelectTemplate = async (template: Template) => {
    setIsLoading(true);
    try {
      const templateName = `${template.name} (Copy)`;
      
      const { data, error } = await supabase
        .from('funnels')
        .insert({
          name: templateName,
          content: template.content,
          is_published: false,
          user_id: (await supabase.auth.getUser()).data.user?.id || 'anonymous'
        })
        .select()
        .single();
        
      if (error) throw error;
      
      if (data) {
        setFunnels([data as Funnel, ...funnels]);
        setActiveFunnel(data as Funnel);
        toast({
          title: "Template applied",
          description: `Template "${template.name}" has been applied. You can now customize it.`,
        });
      }
    } catch (error) {
      console.error('Error applying template:', error);
      toast({
        title: "Error applying template",
        description: "There was a problem applying the template.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveFunnel = async (items: CanvasItem[]) => {
    if (!activeFunnel) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('funnels')
        .update({ 
          content: JSON.stringify(items),
          updated_at: new Date()
        })
        .eq('id', activeFunnel.id);
        
      if (error) throw error;
      
      // Update the local state
      setActiveFunnel({
        ...activeFunnel,
        content: JSON.stringify(items),
        updated_at: new Date().toISOString()
      });
      
      toast({
        title: "Funnel saved",
        description: `Funnel "${activeFunnel.name}" has been saved successfully with ${items.length} elements.`,
      });
    } catch (error) {
      console.error('Error saving funnel:', error);
      toast({
        title: "Error saving funnel",
        description: "There was a problem saving your funnel.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePublishFunnel = async () => {
    if (!activeFunnel) return;
    
    setIsLoading(true);
    try {
      const publishedUrl = activeFunnel.published_url || `funnel-${activeFunnel.id}`;
      
      const { error } = await supabase
        .from('funnels')
        .update({ 
          is_published: true,
          published_url: publishedUrl,
          updated_at: new Date()
        })
        .eq('id', activeFunnel.id);
        
      if (error) throw error;
      
      // Update the local state
      setActiveFunnel({
        ...activeFunnel,
        is_published: true,
        published_url: publishedUrl,
        updated_at: new Date().toISOString()
      });
      
      toast({
        title: "Funnel published",
        description: `Your funnel is now live at: ${window.location.origin}/f/${publishedUrl}`,
      });
    } catch (error) {
      console.error('Error publishing funnel:', error);
      toast({
        title: "Error publishing funnel",
        description: "There was a problem publishing your funnel.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a description for your funnel.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingAI(true);
    try {
      // Here we would normally call an AI service to generate a funnel
      // For demo purposes, we'll just select a random template and customize it slightly

      setTimeout(() => {
        const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
        let content = JSON.parse(randomTemplate.content);
        
        // Customize the template based on the prompt
        if (content.length > 0 && content[0].type === ELEMENT_TYPES.HEADLINE) {
          const keywords = aiPrompt.split(' ').filter(word => word.length > 4);
          if (keywords.length > 0) {
            const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
            content[0].content = `Get Your Free Guide to ${randomKeyword.charAt(0).toUpperCase() + randomKeyword.slice(1)}`;
          }
        }
        
        createFunnelFromAI(`AI Generated: ${aiPrompt.substring(0, 30)}...`, JSON.stringify(content));
      }, 2000); // Simulate API call delay

    } catch (error) {
      console.error('Error generating AI funnel:', error);
      toast({
        title: "AI Generation failed",
        description: "There was an error generating your AI funnel.",
        variant: "destructive",
      });
      setIsGeneratingAI(false);
    }
  };

  const createFunnelFromAI = async (name: string, content: string) => {
    try {
      const { data, error } = await supabase
        .from('funnels')
        .insert({
          name,
          content,
          is_published: false
        })
        .select()
        .single();
        
      if (error) throw error;
      
      if (data) {
        setFunnels([data as Funnel, ...funnels]);
        setActiveFunnel(data as Funnel);
        toast({
          title: "AI Funnel created",
          description: "Your AI-generated funnel is ready to customize.",
        });
        
        setShowAIDialog(false);
        setAiPrompt('');
      }
    } catch (error) {
      console.error('Error creating AI funnel:', error);
      toast({
        title: "Error creating funnel",
        description: "There was a problem creating your AI funnel.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleDeleteFunnel = async (funnelId: string) => {
    if (!window.confirm("Are you sure you want to delete this funnel? This action cannot be undone.")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('funnels')
        .delete()
        .eq('id', funnelId);
        
      if (error) throw error;
      
      // Update local state
      setFunnels(funnels.filter(funnel => funnel.id !== funnelId));
      
      if (activeFunnel && activeFunnel.id === funnelId) {
        setActiveFunnel(null);
      }
      
      toast({
        title: "Funnel deleted",
        description: "The funnel has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting funnel:', error);
      toast({
        title: "Error deleting funnel",
        description: "There was a problem deleting the funnel.",
        variant: "destructive",
      });
    }
  };

  const handleDuplicateFunnel = async (funnel: Funnel) => {
    try {
      const { data, error } = await supabase
        .from('funnels')
        .insert({
          name: `${funnel.name} (Copy)`,
          content: funnel.content,
          is_published: false,
          user_id: (await supabase.auth.getUser()).data.user?.id || 'anonymous'
        })
        .select()
        .single();
        
      if (error) throw error;
      
      if (data) {
        setFunnels([data as Funnel, ...funnels]);
        toast({
          title: "Funnel duplicated",
          description: `A copy of "${funnel.name}" has been created.`,
        });
      }
    } catch (error) {
      console.error('Error duplicating funnel:', error);
      toast({
        title: "Error duplicating funnel",
        description: "There was a problem duplicating the funnel.",
        variant: "destructive",
      });
    }
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
            <div className="flex flex-wrap gap-3 mb-8">
              <Button 
                className="bg-metamaster-primary hover:bg-metamaster-secondary text-white flex items-center"
                onClick={() => setShowNewFunnelDialog(true)}
              >
                <Plus size={18} className="mr-2" /> Create New Funnel
              </Button>
              <Button 
                className="bg-metamaster-secondary hover:bg-metamaster-primary text-white flex items-center"
                onClick={() => setShowAIDialog(true)}
              >
                <Zap size={18} className="mr-2" /> AI Funnel Builder
              </Button>
            </div>
            
            {activeFunnel ? (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-metamaster-gray-800">{activeFunnel.name}</h2>
                  <div className="flex space-x-2">
                    {activeFunnel.is_published ? (
                      <Button 
                        variant="outline"
                        className="flex items-center"
                        onClick={() => {
                          if (activeFunnel.published_url) {
                            window.open(`/f/${activeFunnel.published_url}`, '_blank');
                          }
                        }}
                      >
                        <ArrowRight size={16} className="mr-2" /> View Published Funnel
                      </Button>
                    ) : (
                      <Button 
                        variant="secondary"
                        className="flex items-center"
                        onClick={handlePublishFunnel}
                        disabled={isLoading}
                      >
                        <ArrowRight size={16} className="mr-2" /> Publish Funnel
                      </Button>
                    )}
                    <Button 
                      variant="outline"
                      onClick={() => setActiveFunnel(null)}
                    >
                      Back to All Funnels
                    </Button>
                  </div>
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
                        <FunnelElement 
                          type={ELEMENT_TYPES.INPUT} 
                          icon={<FormInput size={18} />} 
                          label="Input Field" 
                        />
                        <FunnelElement 
                          type={ELEMENT_TYPES.DROPDOWN} 
                          icon={<ListIcon size={18} />} 
                          label="Dropdown" 
                        />
                        <FunnelElement 
                          type={ELEMENT_TYPES.CALENDAR} 
                          icon={<Calendar size={18} />} 
                          label="Calendar" 
                        />
                        <FunnelElement 
                          type={ELEMENT_TYPES.DIVIDER} 
                          icon={<SeparatorHorizontal size={18} />} 
                          label="Divider" 
                        />
                        <FunnelElement 
                          type={ELEMENT_TYPES.SPACING} 
                          icon={<MoveDiagonal size={18} />} 
                          label="Spacing" 
                        />
                        <FunnelElement 
                          type={ELEMENT_TYPES.ICON} 
                          icon={<CircleDot size={18} />} 
                          label="Icon" 
                        />
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                      <h3 className="font-bold text-lg mb-4">Funnel Settings</h3>
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
                          onClick={() => handleDuplicateFunnel(activeFunnel)}
                        >
                          <Copy size={18} className="mr-2" /> Duplicate Funnel
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteFunnel(activeFunnel.id)}
                        >
                          <Trash size={18} className="mr-2" /> Delete Funnel
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Middle Column - Canvas */}
                  <FunnelCanvas 
                    onSave={handleSaveFunnel} 
                    funnelId={activeFunnel.id}
                  />
                  
                  {/* Right Column - Templates */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                      <div className="mb-4 flex justify-between items-center">
                        <h3 className="font-bold text-lg">Templates</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-metamaster-primary"
                          onClick={() => {
                            setActiveFunnel(null);
                            setActiveTab('templates');
                          }}
                        >
                          View All
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {templates.slice(0, 3).map((template) => (
                          <div 
                            key={template.id} 
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
                        onClick={() => setShowAIDialog(true)}
                      >
                        Try AI Builder <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {/* Tabs for All/Templates */}
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <div className="flex justify-between items-center mb-6">
                    <TabsList>
                      <TabsTrigger value="all">My Funnels</TabsTrigger>
                      <TabsTrigger value="templates">Templates</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="all">
                    {isLoading ? (
                      <div className="text-center py-12">
                        <p>Loading your funnels...</p>
                      </div>
                    ) : funnels.length === 0 ? (
                      <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div className="max-w-md mx-auto">
                          <LayoutGrid size={64} className="mx-auto mb-4 text-metamaster-gray-400" />
                          <h3 className="text-xl font-bold mb-2">No funnels yet</h3>
                          <p className="text-metamaster-gray-500 mb-6">
                            Create your first funnel or use one of our templates to get started quickly.
                          </p>
                          <div className="flex flex-wrap justify-center gap-3">
                            <Button
                              onClick={() => setShowNewFunnelDialog(true)}
                              className="bg-metamaster-primary hover:bg-metamaster-secondary"
                            >
                              <Plus size={18} className="mr-2" /> Create New Funnel
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setActiveTab('templates')}
                            >
                              Browse Templates
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {funnels.map((funnel) => (
                          <div key={funnel.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="h-48 bg-metamaster-gray-200 relative flex items-center justify-center">
                              {/* Preview of first element or placeholder */}
                              <div className="text-center p-4">
                                {funnel.content && JSON.parse(funnel.content).length > 0 ? (
                                  <div className="overflow-hidden h-full">
                                    {JSON.parse(funnel.content)[0]?.type === ELEMENT_TYPES.HEADLINE && (
                                      <h3 className="font-bold text-xl">{JSON.parse(funnel.content)[0]?.content}</h3>
                                    )}
                                  </div>
                                ) : (
                                  <LayoutGrid size={48} className="mx-auto mb-2 text-metamaster-gray-400" />
                                )}
                              </div>
                              
                              {/* Status badge */}
                              <div className="absolute top-2 right-2">
                                {funnel.is_published ? (
                                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                    Published
                                  </span>
                                ) : (
                                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                                    Draft
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium truncate">{funnel.name}</h3>
                                <div className="text-xs text-metamaster-gray-500">
                                  {new Date(funnel.updated_at).toLocaleDateString()}
                                </div>
                              </div>
                              
                              <div className="flex space-x-2 mt-3">
                                <Button 
                                  onClick={() => setActiveFunnel(funnel)}
                                  className="flex-1 bg-metamaster-primary hover:bg-metamaster-secondary"
                                  size="sm"
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="px-2"
                                  onClick={() => handleDuplicateFunnel(funnel)}
                                >
                                  <Copy size={16} />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => handleDeleteFunnel(funnel.id)}
                                >
                                  <Trash size={16} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="templates">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {templates.map((template) => (
                        <TemplateCard 
                          key={template.id} 
                          template={template} 
                          onClick={() => handleSelectTemplate(template)}
                        />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
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
              <Button variant="outline" onClick={() => setShowNewFunnelDialog(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button onClick={handleCreateNewFunnel} disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Funnel"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* AI Funnel Builder Dialog */}
        <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>AI Funnel Builder</DialogTitle>
              <DialogDescription>
                Describe your business and what you want to achieve with this funnel, and our AI will build it for you.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="ai-prompt">Describe your funnel</Label>
                <Textarea 
                  id="ai-prompt" 
                  placeholder="e.g., I need a lead generation funnel for my real estate business targeting home sellers. I want to offer a free home valuation report." 
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows={5}
                />
              </div>
              <div className="text-sm text-metamaster-gray-500">
                <p>Include details about:</p>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li>Your business niche (e.g., real estate, coaching, e-commerce)</li>
                  <li>Your target audience</li>
                  <li>The goal of your funnel (leads, sales, registrations)</li>
                  <li>Any specific offers or lead magnets</li>
                </ul>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAIDialog(false)} disabled={isGeneratingAI}>
                Cancel
              </Button>
              <Button onClick={handleAIGenerate} disabled={isGeneratingAI} className="bg-metamaster-primary hover:bg-metamaster-secondary">
                {isGeneratingAI ? "Generating..." : "Generate Funnel"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DndProvider>
  );
};

export default FunnelBuilder;
