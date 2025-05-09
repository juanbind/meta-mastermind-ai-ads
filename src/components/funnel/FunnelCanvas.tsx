
import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

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
}

const FunnelCanvas: React.FC<FunnelCanvasProps> = ({ onSave, funnelId, initialItems = [] }) => {
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
        content = 'Contact Form';
        props = { 
          fields: [
            { name: 'name', label: 'Name', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true }
          ],
          buttonText: 'Submit'
        };
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
    
    setItems([...items, newItem]);
    setActiveItemId(newId); // Set as active for immediate editing
  };
  
  // Function to update an item
  const updateItem = useCallback((id: string, updates: Partial<CanvasItem>) => {
    setItems(currentItems => 
      currentItems.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  }, []);
  
  // Function to delete an item
  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    if (activeItemId === id) {
      setActiveItemId(null);
    }
  };
  
  // Function to move items up and down in the order
  const moveItem = (id: string, direction: 'up' | 'down') => {
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
  };
  
  // Save the current canvas state
  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(items);
      setIsSaving(false);
    } catch (error) {
      console.error('Error saving funnel:', error);
      setIsSaving(false);
    }
  };
  
  // Placeholder content for empty canvas
  const renderEmptyState = () => (
    <div className="text-center p-8">
      <p className="text-lg text-gray-500 mb-4">
        Drag elements from the sidebar to start building your funnel.
      </p>
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-10">
        <p className="text-gray-400">Drop elements here</p>
      </div>
    </div>
  );
  
  // Render a toolbar at the bottom with save button
  const renderToolbar = () => (
    <div className="fixed bottom-4 right-4 z-10">
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
          <Alert variant="warning" className="mb-4">
            <AlertDescription>
              The visual builder is currently showing placeholders. 
              Elements will be fully rendered in the preview.
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      {renderToolbar()}
    </div>
  );
};

export default FunnelCanvas;
