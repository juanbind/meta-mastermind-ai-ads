
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { LayoutGrid, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import FunnelRenderedElement from './FunnelRenderedElement';
import { ELEMENT_TYPES } from './FunnelElement';

interface CanvasItem {
  id: string;
  type: string;
  content: string;
  props?: Record<string, any>;
}

interface FunnelCanvasProps {
  onSave: (items: CanvasItem[]) => void;
}

const FunnelCanvas: React.FC<FunnelCanvasProps> = ({ onSave }) => {
  const [items, setItems] = useState<CanvasItem[]>([]);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const { toast } = useToast();

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
        return { variant: 'primary', url: '#' };
      default:
        return {};
    }
  };

  const addItem = (item: CanvasItem) => {
    setItems((prev) => [...prev, item]);
  };

  const updateItem = (id: string, updates: Partial<CanvasItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
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
      return newItems;
    });
  };

  const handleSave = () => {
    onSave(items);
    toast({
      title: "Funnel saved",
      description: "Your funnel changes have been saved.",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="font-bold">Canvas</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Preview</Button>
          <Button 
            size="sm" 
            className="bg-metamaster-primary hover:bg-metamaster-secondary"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
      
      <div
        ref={drop}
        className={`border-2 ${
          isOver ? 'border-metamaster-primary border-solid' : 'border-dashed'
        } border-metamaster-gray-200 rounded-lg min-h-[500px] p-4 transition-colors`}
      >
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
                onSave={(content) => {
                  updateItem(item.id, { content });
                  setEditingItem(null);
                }}
                onCancel={() => setEditingItem(null)}
                onRemove={() => removeItem(item.id)}
                onMoveUp={() => moveItem(item.id, 'up')}
                onMoveDown={() => moveItem(item.id, 'down')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FunnelCanvas;
