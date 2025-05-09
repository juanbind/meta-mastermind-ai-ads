
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Save, Trash } from 'lucide-react';
import FunnelRenderedElement from './FunnelRenderedElement';
import { useToast } from '@/hooks/use-toast';
import { TEMPLATE_STRUCTURES } from './FunnelElement';

export interface CanvasItem {
  id: string;
  type: string;
  content: string;
  props?: Record<string, any>;
  position?: { x: number, y: number };
}

export interface FunnelCanvasProps {
  onSave: (items: CanvasItem[]) => Promise<void> | void;
  funnelId: string;
  initialItems?: any[];
  onCreatePages?: (pages: any[]) => Promise<void> | void;
}

const FunnelCanvas: React.FC<FunnelCanvasProps> = ({ onSave, funnelId, initialItems = [], onCreatePages }) => {
  const { toast } = useToast();
  const [items, setItems] = useState<CanvasItem[]>(() => {
    if (!initialItems || !Array.isArray(initialItems)) {
      return [];
    }
    
    try {
      return initialItems.map(item => {
        if (typeof item === 'string') {
          return JSON.parse(item);
        }
        return item;
      });
    } catch (e) {
      console.error('Error parsing initial items:', e);
      return [];
    }
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Set up the drop target for draggable elements
  const [{ isOver }, drop] = useDrop({
    accept: 'FUNNEL_ELEMENT',
    drop: (item: any, monitor) => {
      const offset = monitor.getSourceClientOffset();
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      
      // Handle template drops specially
      if (item.isTemplate && onCreatePages) {
        handleTemplateDropped(item.type, item.templatePages);
        return;
      }
      
      if (offset && canvasRect) {
        const x = offset.x - canvasRect.left;
        const y = offset.y - canvasRect.top;
        addItem(item.type, { x, y });
      } else {
        // If we can't get position, just add it to the end
        addItem(item.type);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  
  // Function to handle template drops
  const handleTemplateDropped = async (templateType: string, templatePages: any[]) => {
    if (!onCreatePages) return;
    
    try {
      // Create the pages based on the template structure
      await onCreatePages(templatePages);
      
      toast({
        title: 'Template created',
        description: `Created a new ${templateType.toLowerCase().replace('_', ' ')} with ${templatePages.length} pages.`
      });
      
    } catch (error) {
      console.error('Error creating template pages:', error);
      toast({
        title: 'Error creating template',
        description: 'There was a problem creating the template pages. Please try again.',
        variant: 'destructive'
      });
    }
  };
  
  // Function to add a new item to the canvas
  const addItem = (type: string, position?: { x: number, y: number }) => {
    // Create a new unique ID
    const newId = `${type}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    let content = '';
    let props = {};
    
    // Set default content and props based on type
    switch (type) {
      case 'HEADLINE':
        content = 'Enter your headline here';
        props = { level: 'h2', align: 'center' };
        break;
      case 'PARAGRAPH':
        content = 'Enter your paragraph text here';
        props = { size: 'medium' };
        break;
      case 'BUTTON':
        content = 'Click Me';
        props = { variant: 'primary', size: 'medium', url: '#', action: 'submit' };
        break;
      case 'IMAGE':
        content = '';
        props = { src: 'https://via.placeholder.com/600x400', alt: 'Placeholder Image', width: 600, height: 400 };
        break;
      case 'FORM':
        content = JSON.stringify({
          fields: [
            { name: 'name', label: 'Name', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true }
          ],
          buttonText: 'Submit'
        });
        props = { submitEndpoint: 'validate-contact' };
        break;
      case 'MULTIPLE_CHOICE':
        content = JSON.stringify({
          id: `question-${Date.now()}`,
          question: 'Your question here?',
          description: 'Optional description text',
          required: true,
          options: [
            { label: 'Option 1', value: 'option1', description: '' },
            { label: 'Option 2', value: 'option2', description: '' }
          ]
        });
        props = { };
        break;
      case 'DROPDOWN':
        content = JSON.stringify({
          id: `dropdown-${Date.now()}`,
          label: 'Select an option',
          placeholder: 'Choose...',
          required: true,
          options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' }
          ]
        });
        props = { };
        break;
      case 'CHECKBOX':
        content = JSON.stringify({
          id: `checkbox-${Date.now()}`,
          label: 'I agree to the terms',
          required: true
        });
        props = { };
        break;
      case 'DIVIDER':
        content = '';
        props = { style: 'solid', thickness: 1, color: '#e5e7eb' };
        break;
      case 'HERO_SECTION':
        content = JSON.stringify({
          headline: 'Your Bold Headline Here',
          subheadline: 'Supporting subheadline that adds more context',
          backgroundType: 'color',
          backgroundColor: '#f8f9fa',
          backgroundImage: '',
          alignment: 'center',
          cta: {
            text: 'Get Started',
            url: '#'
          }
        });
        props = { padding: 'large' };
        break;
      case 'IMAGE_TEXT_SECTION':
        content = JSON.stringify({
          heading: 'Image + Text Section',
          text: 'This is a combined image and text section that looks great on all devices.',
          imageUrl: 'https://via.placeholder.com/600x400',
          imageAlt: 'Placeholder image',
          layout: 'image-left', // or image-right
          mobileStack: 'image-top' // or image-bottom
        });
        props = { };
        break;
      case 'LIST_WITH_ICONS':
        content = JSON.stringify({
          title: 'Benefits',
          items: [
            { icon: 'check-circle', text: 'First benefit item' },
            { icon: 'check-circle', text: 'Second benefit item' },
            { icon: 'check-circle', text: 'Third benefit item' }
          ],
          iconColor: '#22c55e'
        });
        props = { alignment: 'left' };
        break;
      default:
        content = 'New Element';
    }
    
    const newItem: CanvasItem = {
      id: newId,
      type,
      content,
      props,
      position
    };
    
    setItems(prevItems => [...prevItems, newItem]);
    setActiveItemId(newId); // Set as active for immediate editing
    
    toast({
      title: 'Element added',
      description: `Added new ${type.toLowerCase()} element to your funnel.`
    });
  };
  
  // Function to update an item
  const updateItem = useCallback((id: string, updates: Partial<CanvasItem>) => {
    setItems(currentItems => 
      currentItems.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
    
    toast({
      title: 'Element updated',
      description: 'The changes were applied successfully.'
    });
  }, [toast]);
  
  // Function to delete an item
  const deleteItem = useCallback((id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    if (activeItemId === id) {
      setActiveItemId(null);
    }
    
    toast({
      title: 'Element removed',
      description: 'The element was deleted from your funnel.'
    });
  }, [activeItemId, toast]);
  
  // Function to move items up and down in the order
  const moveItem = useCallback((id: string, direction: 'up' | 'down') => {
    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex === -1) return;
    
    const newItems = [...items];
    
    if (direction === 'up' && itemIndex > 0) {
      // Swap with the item above
      [newItems[itemIndex], newItems[itemIndex - 1]] = [newItems[itemIndex - 1], newItems[itemIndex]];
    } else if (direction === 'down' && itemIndex < newItems.length - 1) {
      // Swap with the item below
      [newItems[itemIndex], newItems[itemIndex + 1]] = [newItems[itemIndex + 1], newItems[itemIndex]];
    }
    
    setItems(newItems);
  }, [items]);
  
  // Save the current canvas state
  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(items);
      setIsSaving(false);
      
      toast({
        title: 'Funnel saved',
        description: 'Your funnel has been saved successfully!'
      });
    } catch (error) {
      console.error('Error saving funnel:', error);
      setIsSaving(false);
      
      toast({
        title: 'Error saving funnel',
        description: 'There was a problem saving your funnel. Please try again.',
        variant: 'destructive'
      });
    }
  };
  
  // Placeholder content for empty canvas
  const renderEmptyState = () => (
    <div className="text-center p-8">
      <p className="text-lg text-gray-500 mb-4">
        Drag elements or templates from the sidebar to start building your funnel.
      </p>
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-10">
        <p className="text-gray-400">Drop elements or templates here</p>
      </div>
    </div>
  );
  
  // Render a toolbar at the bottom with save button
  const renderToolbar = () => (
    <div className="fixed bottom-4 right-4 z-10 flex space-x-2">
      <Button 
        onClick={() => setItems([])} 
        variant="outline"
        className="rounded-full h-12 w-12 bg-white"
      >
        <Trash size={20} />
      </Button>
      <Button 
        onClick={handleSave} 
        disabled={isSaving}
        className="rounded-full h-12 w-12 bg-metamaster-primary hover:bg-metamaster-secondary text-white"
      >
        <Save size={20} />
      </Button>
    </div>
  );
  
  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden min-h-[600px] flex flex-col">
      {/* Canvas header */}
      <div className="border-b border-gray-200 bg-gray-50 p-3 flex justify-between items-center">
        <h3 className="font-medium">Editor Canvas</h3>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Page'}
          </Button>
        </div>
      </div>
      
      {/* Canvas area */}
      <div 
        ref={(node) => {
          canvasRef.current = node;
          drop(node);
        }}
        className={`flex-1 p-4 overflow-y-auto ${isOver ? 'bg-gray-50' : 'bg-white'} relative`}
        style={{ minHeight: '400px' }}
      >
        {items.length === 0 ? renderEmptyState() : (
          <>
            <Alert variant="warning" className="mb-4">
              <AlertDescription>
                The visual builder is currently showing placeholders. 
                Elements will be fully rendered in the preview.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              {items.map((item) => (
                <FunnelRenderedElement
                  key={item.id}
                  item={item}
                  isEditing={activeItemId === item.id}
                  onEdit={() => setActiveItemId(item.id)}
                  onSave={(content, props) => {
                    updateItem(item.id, { content, props });
                    setActiveItemId(null);
                  }}
                  onCancel={() => setActiveItemId(null)}
                  onRemove={() => deleteItem(item.id)}
                  onMoveUp={() => moveItem(item.id, 'up')}
                  onMoveDown={() => moveItem(item.id, 'down')}
                  device="desktop"
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      {renderToolbar()}
    </div>
  );
};

export default FunnelCanvas;
