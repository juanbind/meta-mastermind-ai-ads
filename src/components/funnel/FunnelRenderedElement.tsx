
import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Edit, Trash, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ELEMENT_TYPES } from './FunnelElement';

interface RenderedElementProps {
  item: {
    id: string;
    type: string;
    content: string;
    props?: Record<string, any>;
  };
  isEditing: boolean;
  onEdit: () => void;
  onSave: (content: string) => void;
  onCancel: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const FunnelRenderedElement: React.FC<RenderedElementProps> = ({
  item,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onRemove,
  onMoveUp,
  onMoveDown,
}) => {
  const [editingContent, setEditingContent] = useState(item.content);

  const handleSave = () => {
    onSave(editingContent);
  };

  const renderElement = () => {
    switch (item.type) {
      case ELEMENT_TYPES.HEADLINE:
        return <h2 className="text-2xl font-bold">{item.content}</h2>;
      case ELEMENT_TYPES.PARAGRAPH:
        return <p className="text-metamaster-gray-700">{item.content}</p>;
      case ELEMENT_TYPES.IMAGE:
        return (
          <div className="relative">
            <img
              src={item.props?.src || 'https://placehold.co/600x400?text=Image'}
              alt={item.props?.alt || 'Funnel image'}
              className="w-full h-auto rounded"
            />
            {item.content && <p className="text-sm text-center mt-2">{item.content}</p>}
          </div>
        );
      case ELEMENT_TYPES.VIDEO:
        return (
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9 bg-black rounded overflow-hidden">
              {item.props?.src ? (
                <iframe
                  src={item.props.src}
                  title={item.content || 'Video'}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <img 
                    src={item.props?.placeholder || 'https://placehold.co/600x400/2A2A2A/FFFFFF?text=Video+Placeholder'} 
                    alt="Video placeholder"
                    className="max-w-full max-h-full"
                  />
                </div>
              )}
            </div>
            {item.content && <p className="text-sm text-center mt-2">{item.content}</p>}
          </div>
        );
      case ELEMENT_TYPES.FORM:
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">{item.content || 'Contact Form'}</h3>
            <div className="space-y-3">
              {item.props?.fields?.includes('name') && (
                <Input type="text" placeholder="Name" />
              )}
              {item.props?.fields?.includes('email') && (
                <Input type="email" placeholder="Email" />
              )}
              <Button className="w-full bg-metamaster-primary hover:bg-metamaster-secondary">
                {item.props?.buttonText || 'Submit'}
              </Button>
            </div>
          </div>
        );
      case ELEMENT_TYPES.BULLET_LIST:
        return (
          <ul className="list-disc pl-5">
            {item.content.split('\n').map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        );
      case ELEMENT_TYPES.BUTTON:
        return (
          <div className="text-center">
            <Button className="bg-metamaster-primary hover:bg-metamaster-secondary">
              {item.content}
            </Button>
          </div>
        );
      default:
        return <div>Unknown element type</div>;
    }
  };

  const renderEditForm = () => {
    switch (item.type) {
      case ELEMENT_TYPES.BULLET_LIST:
        return (
          <Textarea
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
            placeholder="Enter list items, one per line"
            rows={5}
            className="w-full"
          />
        );
      case ELEMENT_TYPES.IMAGE:
      case ELEMENT_TYPES.VIDEO:
        return (
          <div className="space-y-2">
            <Input
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
              placeholder="Enter caption (optional)"
            />
          </div>
        );
      case ELEMENT_TYPES.PARAGRAPH:
        return (
          <Textarea
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
            placeholder="Enter text"
            rows={4}
            className="w-full"
          />
        );
      default:
        return (
          <Input
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
            placeholder="Enter content"
          />
        );
    }
  };

  return (
    <div className="group relative border border-gray-200 hover:border-metamaster-primary rounded-lg p-4">
      {isEditing ? (
        <div className="space-y-4">
          {renderEditForm()}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={onCancel}>
              <X size={16} className="mr-1" /> Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save size={16} className="mr-1" /> Save
            </Button>
          </div>
        </div>
      ) : (
        <>
          {renderElement()}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 bg-white"
              onClick={onMoveUp}
            >
              <ArrowUp size={14} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 bg-white"
              onClick={onMoveDown}
            >
              <ArrowDown size={14} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 bg-white"
              onClick={onEdit}
            >
              <Edit size={14} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 bg-white text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={onRemove}
            >
              <Trash size={14} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FunnelRenderedElement;
