
import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Edit, Trash, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import TextFormatToolbar from './TextFormatToolbar';
import ContentBlockRenderer from './ContentBlockRenderer';
import { ELEMENT_TYPES } from './FunnelElement';
import { CanvasItem } from './FunnelCanvas';

interface FunnelRenderedElementProps {
  item: CanvasItem;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (content: string, props?: Record<string, any>) => void;
  onCancel: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  device: 'mobile' | 'tablet' | 'desktop';
}

// Check if the element type is a content block
const isContentBlock = (type: string): boolean => {
  return [
    ELEMENT_TYPES.HERO_SECTION,
    ELEMENT_TYPES.FEATURES_BLOCK,
    ELEMENT_TYPES.TESTIMONIAL_BLOCK,
    ELEMENT_TYPES.CTA_BLOCK,
    ELEMENT_TYPES.FAQ_BLOCK,
    ELEMENT_TYPES.PRICING_BLOCK,
    ELEMENT_TYPES.CONTACT_BLOCK,
    ELEMENT_TYPES.SOCIAL_PROOF,
    ELEMENT_TYPES.COUNTDOWN,
    ELEMENT_TYPES.TRUST_BADGES
  ].includes(type);
};

const FunnelRenderedElement: React.FC<FunnelRenderedElementProps> = ({
  item,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onRemove,
  onMoveUp,
  onMoveDown,
  device
}) => {
  const [editingContent, setEditingContent] = useState(item.content);
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = () => {
    setIsSaving(true);
    try {
      onSave(editingContent);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleChange = (value: string) => {
    setEditingContent(value);
  };

  // Rendering for content blocks
  if (isContentBlock(item.type)) {
    return (
      <div className="group relative border border-transparent hover:border-metamaster-primary rounded-lg transition-colors overflow-hidden">
        {/* Toolbar for content blocks */}
        <div className="absolute top-2 right-2 z-10 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm p-1 rounded-md shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onEdit}
          >
            <Edit size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onMoveUp}
          >
            <ArrowUp size={16} />
          </Button>
          <Button
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            onClick={onMoveDown}
          >
            <ArrowDown size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={onRemove}
          >
            <Trash size={16} />
          </Button>
        </div>

        {/* Content Block Renderer */}
        <ContentBlockRenderer
          type={item.type}
          content={item.content}
          props={item.props}
          device={device}
        />
      </div>
    );
  }

  // Original rendering for basic elements
  return (
    <div className={cn("relative group border border-gray-200 hover:border-metamaster-primary rounded-lg p-4", 
      isEditing ? "bg-metamaster-gray-50 border-metamaster-primary" : "")}>
      
      {/* Toolbar for standard elements */}
      <div className="absolute top-2 right-2 z-10 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isEditing ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onEdit}
            >
              <Edit size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onMoveUp}
            >
              <ArrowUp size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onMoveDown}
            >
              <ArrowDown size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={onRemove}
            >
              <Trash size={16} />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
              className="text-sm"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              className="text-sm"
              disabled={isSaving}
            >
              {isSaving ? <Loader2 size={14} className="animate-spin mr-1" /> : null}
              Save
            </Button>
          </>
        )}
      </div>
      
      {/* Element Content */}
      {isEditing ? (
        <div className="mt-4">
          {item.type === ELEMENT_TYPES.HEADLINE && (
            <>
              <TextFormatToolbar text={editingContent} onTextChange={handleChange} />
              <div className="mt-2">
                <textarea
                  value={editingContent}
                  onChange={(e) => handleChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded min-h-[100px]"
                  placeholder="Enter headline text..."
                />
              </div>
            </>
          )}
          
          {item.type === ELEMENT_TYPES.PARAGRAPH && (
            <>
              <TextFormatToolbar text={editingContent} onTextChange={handleChange} />
              <div className="mt-2">
                <textarea
                  value={editingContent}
                  onChange={(e) => handleChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded min-h-[150px]"
                  placeholder="Enter paragraph text..."
                />
              </div>
            </>
          )}
          
          {item.type === ELEMENT_TYPES.BULLET_LIST && (
            <>
              <TextFormatToolbar text={editingContent} onTextChange={handleChange} />
              <div className="mt-2">
                <textarea
                  value={editingContent}
                  onChange={(e) => handleChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded min-h-[150px]"
                  placeholder="Enter list items (one per line)..."
                />
              </div>
            </>
          )}
          
          {item.type === ELEMENT_TYPES.BUTTON && (
            <>
              <TextFormatToolbar text={editingContent} onTextChange={handleChange} />
              <div className="mt-2">
                <input
                  type="text"
                  value={editingContent}
                  onChange={(e) => handleChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Button text..."
                />
              </div>
            </>
          )}
          
          {/* Add other element type editors as needed */}
          
          {/* Fallback for types without specific editor */}
          {![
            ELEMENT_TYPES.HEADLINE,
            ELEMENT_TYPES.PARAGRAPH,
            ELEMENT_TYPES.BULLET_LIST,
            ELEMENT_TYPES.BUTTON,
            // Add other handled types here
          ].includes(item.type) && (
            <div className="mt-2">
              <textarea
                value={editingContent}
                onChange={(e) => handleChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded min-h-[100px]"
                placeholder={`Enter ${item.type} content...`}
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          {item.type === ELEMENT_TYPES.HEADLINE && (
            <h2 className="text-2xl font-bold">{item.content}</h2>
          )}
          
          {item.type === ELEMENT_TYPES.PARAGRAPH && (
            <p>{item.content}</p>
          )}
          
          {item.type === ELEMENT_TYPES.BULLET_LIST && (
            <ul className="list-disc pl-5">
              {item.content.split('\n').map((listItem, index) => (
                <li key={index}>{listItem}</li>
              ))}
            </ul>
          )}
          
          {item.type === ELEMENT_TYPES.BUTTON && (
            <Button>{item.content}</Button>
          )}
          
          {item.type === ELEMENT_TYPES.IMAGE && item.props?.src && (
            <div className="flex justify-center">
              <img 
                src={item.props.src} 
                alt={item.props.alt || 'Image'} 
                className="max-w-full h-auto" 
              />
            </div>
          )}
          
          {/* Add other element type renderers as needed */}
          
          {/* Fallback for types without specific renderer */}
          {![
            ELEMENT_TYPES.HEADLINE,
            ELEMENT_TYPES.PARAGRAPH,
            ELEMENT_TYPES.BULLET_LIST,
            ELEMENT_TYPES.BUTTON,
            ELEMENT_TYPES.IMAGE,
            // Add other handled types here
          ].includes(item.type) && (
            <div className="p-4 border border-dashed border-gray-300 rounded text-gray-500 text-center">
              {item.type} element: {item.content || "[No content]"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FunnelRenderedElement;
