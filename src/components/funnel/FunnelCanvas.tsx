
import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { LayoutGrid, AlertCircle, Smartphone, Monitor, Tablet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import FunnelRenderedElement from './FunnelRenderedElement';
import { ELEMENT_TYPES } from './FunnelElement';
import { supabase } from '@/lib/supabase';
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
        const { data, error } = await supabase
          .from('funnels')
          .select('content')
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
        const { error } = await supabase
          .from('funnels')
          .update({ content: JSON.stringify(itemsToSave), updated_at: new Date() })
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
