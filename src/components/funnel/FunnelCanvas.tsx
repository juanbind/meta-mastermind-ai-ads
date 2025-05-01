
import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { LayoutGrid, AlertCircle, Smartphone, Monitor, Tablet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import FunnelRenderedElement from './FunnelRenderedElement';
import { ELEMENT_TYPES } from './FunnelElement';
import { supabase, FunnelData } from '@/lib/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface CanvasItem {
  id: string;
  type: string;
  content: string;
  props?: Record<string, any>;
  conditions?: ConditionRule[];
}

export interface ConditionRule {
  id: string;
  sourceId: string;
  type: 'show' | 'hide' | 'goto';
  conditions: {
    field: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'empty' | 'not_empty';
    value: string;
  }[];
  targetId?: string;
  isActive: boolean;
}

interface FunnelCanvasProps {
  onSave: (items: CanvasItem[]) => void;
  funnelId?: string;
}

const FunnelCanvas: React.FC<FunnelCanvasProps> = ({ onSave, funnelId }) => {
  const [items, setItems] = useState<CanvasItem[]>([]);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDevice, setCurrentDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const { toast } = useToast();

  // Load funnel data if funnelId is provided
  useEffect(() => {
    const loadFunnelData = async () => {
      if (!funnelId) return;
      
      setIsLoading(true);
      try {
        // Using raw SQL query to get around TypeScript issues
        const { data, error } = await supabase
          .from('funnels')
          .select('*')
          .eq('id', funnelId)
          .single();
          
        if (error) {
          throw error;
        }
        
        if (data && data.content) {
          setItems(JSON.parse(data.content));
          toast({
            title: "Funnel loaded",
            description: "Your funnel has been loaded successfully.",
          });
        }
      } catch (error) {
        console.error('Error loading funnel:', error);
        toast({
          title: "Error loading funnel",
          description: "There was an error loading your funnel.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFunnelData();
  }, [funnelId, toast]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'funnel-element',
    drop: (item: { type: string; label: string }, monitor) => {
      const id = `${item.type}-${Date.now()}`;
      const defaultContent = getDefaultContent(item.type);
      
      addItem({
        id,
        type: item.type,
        content: defaultContent,
        props: getDefaultProps(item.type),
      });
      
      toast({
        title: "Element added",
        description: `Added a new ${item.label} element to your funnel.`,
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const getDefaultContent = (type: string): string => {
    switch (type) {
      case ELEMENT_TYPES.HEADLINE:
        return 'Your Headline Here';
      case ELEMENT_TYPES.PARAGRAPH:
        return 'This is a paragraph. Click to edit this text.';
      case ELEMENT_TYPES.BULLET_LIST:
        return 'Item 1\nItem 2\nItem 3';
      case ELEMENT_TYPES.BUTTON:
        return 'Click Here';
      case ELEMENT_TYPES.INPUT:
        return 'Name';
      case ELEMENT_TYPES.DROPDOWN:
        return 'Option 1\nOption 2\nOption 3';
      case ELEMENT_TYPES.CALENDAR:
        return 'Select a date';
      case ELEMENT_TYPES.DIVIDER:
        return '';
      case ELEMENT_TYPES.SPACING:
        return '';
      case ELEMENT_TYPES.ICON:
        return 'star';
      
      // New content block defaults
      case ELEMENT_TYPES.HERO_SECTION:
        return JSON.stringify({
          headline: 'Powerful Headline That Converts',
          subheadline: 'Supporting text that explains your offer and removes objections',
          buttonText: 'Get Started Now',
          trustBadges: ['Trusted by 10,000+ customers', 'Satisfaction Guaranteed', 'Award-winning Support']
        });
      case ELEMENT_TYPES.FEATURES_BLOCK:
        return JSON.stringify({
          headline: 'Why Choose Our Solution',
          features: [
            {
              icon: 'check',
              title: 'Feature One',
              description: 'Description of how this feature benefits the customer.'
            },
            {
              icon: 'star',
              title: 'Feature Two',
              description: 'Description of how this feature benefits the customer.'
            },
            {
              icon: 'heart',
              title: 'Feature Three',
              description: 'Description of how this feature benefits the customer.'
            }
          ]
        });
      case ELEMENT_TYPES.TESTIMONIAL_BLOCK:
        return JSON.stringify({
          testimonials: [
            {
              quote: 'This product completely transformed how we operate. The results were immediate and impressive.',
              name: 'Jane Smith',
              role: 'CEO, Company Name',
              rating: 5
            },
            {
              quote: 'I was skeptical at first, but after using it for a month, I can't imagine going back.',
              name: 'John Doe',
              role: 'Marketing Director',
              rating: 5
            }
          ]
        });
      case ELEMENT_TYPES.CTA_BLOCK:
        return JSON.stringify({
          headline: 'Ready to Get Started?',
          subheadline: 'Join thousands of satisfied customers today.',
          buttonText: 'Sign Up Now',
          hasCountdown: false,
          countdownDate: ''
        });
      case ELEMENT_TYPES.FAQ_BLOCK:
        return JSON.stringify({
          headline: 'Frequently Asked Questions',
          faqs: [
            {
              question: 'How does your product work?',
              answer: 'Our product works by implementing cutting-edge technology to solve your specific problems efficiently.'
            },
            {
              question: 'What kind of support do you offer?',
              answer: 'We offer 24/7 customer support via email, live chat, and phone.'
            },
            {
              question: 'How long does implementation take?',
              answer: 'Most customers are up and running within 24 hours of signing up.'
            }
          ]
        });
      case ELEMENT_TYPES.PRICING_BLOCK:
        return JSON.stringify({
          headline: 'Simple, Transparent Pricing',
          subheadline: 'No hidden fees or long-term contracts.',
          isYearly: false,
          plans: [
            {
              name: 'Basic',
              monthlyPrice: 9.99,
              yearlyPrice: 99,
              description: 'Perfect for individuals',
              features: ['Feature 1', 'Feature 2', 'Feature 3'],
              isPopular: false,
              buttonText: 'Choose Basic'
            },
            {
              name: 'Pro',
              monthlyPrice: 29.99,
              yearlyPrice: 299,
              description: 'Ideal for small teams',
              features: ['All Basic Features', 'Feature 4', 'Feature 5', 'Feature 6'],
              isPopular: true,
              buttonText: 'Choose Pro'
            },
            {
              name: 'Enterprise',
              monthlyPrice: 99.99,
              yearlyPrice: 999,
              description: 'For growing organizations',
              features: ['All Pro Features', 'Feature 7', 'Feature 8', 'Feature 9', 'Feature 10'],
              isPopular: false,
              buttonText: 'Choose Enterprise'
            }
          ]
        });
      case ELEMENT_TYPES.SOCIAL_PROOF:
        return JSON.stringify({
          type: 'counter', // 'counter', 'logos', 'reviews', 'activity'
          headline: 'Trusted by Thousands',
          stats: [
            { label: 'Customers', value: '10,000+' },
            { label: 'Countries', value: '50+' },
            { label: 'Satisfaction', value: '99%' }
          ],
          logos: []
        });
      case ELEMENT_TYPES.COUNTDOWN:
        return JSON.stringify({
          type: 'fixed', // 'fixed' or 'evergreen'
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
          evergreeDuration: 3600, // 1 hour in seconds
          message: 'Special Offer Ends In:',
          expiredMessage: 'Offer Expired'
        });
      case ELEMENT_TYPES.TRUST_BADGES:
        return JSON.stringify({
          badges: [
            { type: 'guarantee', text: '30-Day Money Back Guarantee' },
            { type: 'security', text: 'Secure Payment' },
            { type: 'certification', text: 'GDPR Compliant' },
          ]
        });
      default:
        return '';
    }
  };

  const getDefaultProps = (type: string): Record<string, any> => {
    switch (type) {
      case ELEMENT_TYPES.IMAGE:
        return { src: 'https://placehold.co/600x400?text=Drop+image+here', alt: 'Placeholder image' };
      case ELEMENT_TYPES.VIDEO:
        return { src: '', placeholder: 'https://placehold.co/600x400/2A2A2A/FFFFFF?text=Video+Placeholder' };
      case ELEMENT_TYPES.FORM:
        return { fields: ['name', 'email'], buttonText: 'Submit' };
      case ELEMENT_TYPES.BUTTON:
        return { variant: 'primary', url: '#', action: 'link' };
      case ELEMENT_TYPES.INPUT:
        return { placeholder: 'Enter your name', required: false, type: 'text' };
      case ELEMENT_TYPES.DROPDOWN:
        return { placeholder: 'Select an option', required: false };
      case ELEMENT_TYPES.CALENDAR:
        return { minDate: '', maxDate: '', timeSlots: [] };
      case ELEMENT_TYPES.DIVIDER:
        return { style: 'solid', color: '#e2e8f0', height: 1 };
      case ELEMENT_TYPES.SPACING:
        return { height: 20 };
      case ELEMENT_TYPES.ICON:
        return { name: 'star', color: '#3B82F6', size: 24 };
      
      // New content block props
      case ELEMENT_TYPES.HERO_SECTION:
        return { 
          bgType: 'color', // 'color', 'image', 'video'
          bgColor: '#f9fafb',
          bgImage: '',
          bgVideo: '',
          layout: 'center', // 'left', 'center', 'right'
          style: {
            fontFamily: 'Arial, Helvetica, sans-serif',
            headingSize: '48px',
            subheadingSize: '20px',
            color: '#111827',
            buttonColor: '#3B82F6',
            buttonTextColor: '#ffffff'
          }
        };
      case ELEMENT_TYPES.FEATURES_BLOCK:
        return { 
          layout: 'grid', // 'grid', 'alternating'
          columns: 3, // 2, 3, 4
          style: {
            bgColor: '#ffffff',
            iconColor: '#3B82F6',
            headingColor: '#111827',
            textColor: '#4b5563'
          }
        };
      case ELEMENT_TYPES.TESTIMONIAL_BLOCK:
        return { 
          layout: 'grid', // 'grid', 'slider'
          showPhotos: true,
          showRatings: true,
          style: {
            bgColor: '#f9fafb',
            textColor: '#111827',
            quoteColor: '#6b7280',
            accentColor: '#3B82F6'
          }
        };
      case ELEMENT_TYPES.CTA_BLOCK:
        return { 
          bgType: 'color', // 'color', 'image', 'gradient'
          bgColor: '#3B82F6',
          bgImage: '',
          gradient: 'linear-gradient(90deg, #3B82F6, #6366F1)',
          style: {
            textColor: '#ffffff',
            buttonColor: '#ffffff',
            buttonTextColor: '#3B82F6',
            padding: '60px'
          }
        };
      case ELEMENT_TYPES.FAQ_BLOCK:
        return { 
          layout: 'accordion', // 'accordion', 'grid'
          enableSearch: false,
          style: {
            bgColor: '#ffffff',
            textColor: '#111827',
            accentColor: '#3B82F6',
            borderColor: '#e5e7eb'
          }
        };
      case ELEMENT_TYPES.PRICING_BLOCK:
        return { 
          layout: 'horizontal', // 'horizontal', 'vertical'
          showToggle: true,
          style: {
            bgColor: '#ffffff',
            textColor: '#111827',
            accentColor: '#3B82F6',
            popularHighlightColor: '#eef2ff',
            borderColor: '#e5e7eb'
          }
        };
      case ELEMENT_TYPES.SOCIAL_PROOF:
        return { 
          style: {
            bgColor: '#ffffff',
            textColor: '#111827',
            accentColor: '#3B82F6',
            logoOpacity: 0.8
          }
        };
      case ELEMENT_TYPES.COUNTDOWN:
        return { 
          style: {
            bgColor: '#f9fafb',
            textColor: '#111827',
            accentColor: '#ef4444',
            timerColor: '#ffffff',
            timerBgColor: '#ef4444'
          }
        };
      case ELEMENT_TYPES.TRUST_BADGES:
        return { 
          layout: 'horizontal', // 'horizontal', 'grid'
          style: {
            bgColor: '#ffffff',
            iconColor: '#3B82F6',
            textColor: '#6b7280'
          }
        };
      default:
        return {};
    }
  };

  const addItem = (item: CanvasItem) => {
    setItems((prev) => [...prev, item]);
    // Auto-save whenever an item is added
    autoSave([...items, item]);
  };

  const updateItem = (id: string, updates: Partial<CanvasItem>) => {
    const updatedItems = items.map((item) => (item.id === id ? { ...item, ...updates } : item));
    setItems(updatedItems);
    // Auto-save whenever an item is updated
    autoSave(updatedItems);
  };

  const removeItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    // Auto-save whenever an item is removed
    autoSave(updatedItems);
    toast({
      title: "Element removed",
      description: "Element has been removed from your funnel.",
    });
  };

  const moveItem = (id: string, direction: 'up' | 'down') => {
    setItems((prev) => {
      const currentIndex = prev.findIndex((item) => item.id === id);
      if (
        (direction === 'up' && currentIndex === 0) ||
        (direction === 'down' && currentIndex === prev.length - 1)
      ) {
        return prev;
      }

      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      const newItems = [...prev];
      const [removed] = newItems.splice(currentIndex, 1);
      newItems.splice(newIndex, 0, removed);
      
      // Auto-save whenever items are reordered
      autoSave(newItems);
      return newItems;
    });
  };

  // Add auto-save functionality with debounce
  const autoSave = (itemsToSave: CanvasItem[]) => {
    if (!funnelId) return;
    
    // We'd normally implement a proper debounce here, but for simplicity:
    const saveChanges = async () => {
      try {
        // Using raw SQL query to get around TypeScript issues
        const { error } = await supabase
          .from('funnels')
          .update({ 
            content: JSON.stringify(itemsToSave), 
            updated_at: new Date().toISOString() 
          })
          .eq('id', funnelId);
          
        if (error) throw error;
        
        console.log('Auto-saved funnel changes');
      } catch (err) {
        console.error('Error auto-saving:', err);
      }
    };
    
    saveChanges();
  };

  const handleSave = () => {
    onSave(items);
    toast({
      title: "Funnel saved",
      description: "Your funnel changes have been saved.",
    });
  };

  const renderDevicePreview = () => {
    let containerClass = "w-full min-h-[500px]";
    
    if (currentDevice === 'mobile') {
      containerClass += " max-w-[375px] mx-auto";
    } else if (currentDevice === 'tablet') {
      containerClass += " max-w-[768px] mx-auto";
    }
    
    return (
      <div className={containerClass}>
        {items.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <LayoutGrid size={48} className="mx-auto mb-4 text-metamaster-gray-400" />
              <p className="text-metamaster-gray-500 mb-4">Drag and drop elements here<br/>to start building your funnel</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <FunnelRenderedElement
                key={item.id}
                item={item}
                isEditing={editingItem === item.id}
                onEdit={() => setEditingItem(item.id)}
                onSave={(content, props) => {
                  const updates: Partial<CanvasItem> = { content };
                  if (props) {
                    updates.props = { ...item.props, ...props };
                  }
                  updateItem(item.id, updates);
                  setEditingItem(null);
                }}
                onCancel={() => setEditingItem(null)}
                onRemove={() => removeItem(item.id)}
                onMoveUp={() => moveItem(item.id, 'up')}
                onMoveDown={() => moveItem(item.id, 'down')}
                device={currentDevice}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="font-bold">Canvas</h3>
        <div className="flex space-x-2">
          <Tabs value={currentDevice} onValueChange={(value) => setCurrentDevice(value as any)}>
            <TabsList className="bg-metamaster-gray-100">
              <TabsTrigger value="mobile" className="flex items-center gap-1">
                <Smartphone size={14} />
                <span className="hidden sm:inline">Mobile</span>
              </TabsTrigger>
              <TabsTrigger value="tablet" className="flex items-center gap-1">
                <Tablet size={14} />
                <span className="hidden sm:inline">Tablet</span>
              </TabsTrigger>
              <TabsTrigger value="desktop" className="flex items-center gap-1">
                <Monitor size={14} />
                <span className="hidden sm:inline">Desktop</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button 
            size="sm" 
            className="bg-metamaster-primary hover:bg-metamaster-secondary"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
      
      <div
        ref={drop}
        className={`border-2 ${
          isOver ? 'border-metamaster-primary border-solid' : 'border-dashed'
        } border-metamaster-gray-200 rounded-lg p-4 transition-colors overflow-auto`}
        style={{ minHeight: "500px" }}
      >
        {renderDevicePreview()}
      </div>
    </div>
  );
};

export default FunnelCanvas;
