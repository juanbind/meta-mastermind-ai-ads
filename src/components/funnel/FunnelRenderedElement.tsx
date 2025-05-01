
import React, { useState, useEffect } from 'react';
import { X, ArrowUp, ArrowDown, Settings, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ELEMENT_TYPES } from './FunnelElement';
import TextFormatToolbar, { TextStyle } from './TextFormatToolbar';

interface FunnelRenderedElementProps {
  item: {
    id: string;
    type: string;
    content: string;
    props?: Record<string, any>;
  };
  isEditing: boolean;
  onEdit: () => void;
  onSave: (content: string, props?: Record<string, any>) => void;
  onCancel: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  device: 'mobile' | 'tablet' | 'desktop';
}

const FunnelRenderedElement: React.FC<FunnelRenderedElementProps> = ({
  item,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onRemove,
  onMoveUp,
  onMoveDown,
  device,
}) => {
  const [editedContent, setEditedContent] = useState(item.content);
  const [localProps, setLocalProps] = useState(item.props || {});
  const [textStyle, setTextStyle] = useState<TextStyle>({
    fontFamily: (item.props?.style?.fontFamily) || 'Arial, Helvetica, sans-serif',
    fontSize: (item.props?.style?.fontSize) || '16px',
    fontWeight: (item.props?.style?.fontWeight) || 'normal',
    fontStyle: (item.props?.style?.fontStyle) || 'normal',
    textDecoration: (item.props?.style?.textDecoration) || 'none',
    color: (item.props?.style?.color) || '#000000',
    textAlign: (item.props?.style?.textAlign as 'left' | 'center' | 'right' | 'justify') || 'left',
  });
  
  // Update text style when item props change
  useEffect(() => {
    if (item.props?.style) {
      setTextStyle(prevStyle => ({
        ...prevStyle,
        ...item.props?.style,
        textAlign: (item.props?.style?.textAlign as 'left' | 'center' | 'right' | 'justify') || 'left'
      }));
    }
  }, [item.props]);
  
  const handleStyleChange = (newStyle: Partial<TextStyle>) => {
    const updatedStyle = { ...textStyle, ...newStyle };
    setTextStyle(updatedStyle);
    
    // Update the localProps with the new style
    const updatedProps = {
      ...localProps,
      style: updatedStyle
    };
    setLocalProps(updatedProps);
  };
  
  const handleSave = () => {
    onSave(editedContent, localProps);
  };

  // Get a safe style object for React components
  const getStyledProps = () => {
    const { textAlign, ...rest } = textStyle;
    
    return {
      ...rest,
      textAlign: textAlign as 'left' | 'center' | 'right' | 'justify',
    };
  };

  // Renders the element based on its type
  const renderElement = () => {
    const styleProps = getStyledProps();
    
    switch (item.type) {
      case ELEMENT_TYPES.HEADLINE:
        return <h2 style={styleProps}>{item.content}</h2>;
      
      case ELEMENT_TYPES.PARAGRAPH:
        return <p style={styleProps}>{item.content}</p>;
      
      case ELEMENT_TYPES.IMAGE:
        return (
          <img 
            src={item.props?.src || 'https://placehold.co/600x400?text=Image'} 
            alt={item.props?.alt || 'Image'} 
            className="w-full" 
          />
        );
      
      case ELEMENT_TYPES.VIDEO:
        return (
          <div className="relative aspect-video w-full bg-gray-100 flex items-center justify-center">
            {item.props?.src ? (
              <iframe 
                src={item.props.src} 
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="text-center p-4">
                <p>Video Placeholder</p>
                <p className="text-sm text-gray-500">Edit to add a video URL</p>
              </div>
            )}
          </div>
        );
      
      case ELEMENT_TYPES.FORM:
        return (
          <div className="border border-gray-200 p-4 rounded">
            <h3 className="mb-2" style={styleProps}>{item.content}</h3>
            <div className="space-y-3">
              {(item.props?.fields || ['name', 'email']).map((field: string) => (
                <div key={field} className="space-y-1">
                  <label className="text-sm font-medium capitalize" style={styleProps}>{field}</label>
                  <input 
                    type={field === 'email' ? 'email' : 'text'} 
                    className="w-full px-3 py-2 border border-gray-300 rounded" 
                    placeholder={`Enter ${field}`} 
                    disabled
                  />
                </div>
              ))}
              <button 
                className="w-full bg-blue-600 text-white py-2 rounded mt-2"
                style={styleProps}
              >
                {item.props?.buttonText || 'Submit'}
              </button>
            </div>
          </div>
        );
      
      case ELEMENT_TYPES.BULLET_LIST:
        return (
          <ul className="list-disc pl-5 space-y-1" style={styleProps}>
            {item.content.split('\n').map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        );
      
      case ELEMENT_TYPES.BUTTON:
        return (
          <button 
            className={`px-4 py-2 rounded ${
              item.props?.variant === 'outline' 
                ? 'border border-blue-600 text-blue-600' 
                : 'bg-blue-600 text-white'
            }`}
            style={styleProps}
          >
            {item.content}
          </button>
        );
      
      case ELEMENT_TYPES.INPUT:
        return (
          <div className="space-y-1">
            <label className="text-sm font-medium" style={styleProps}>{item.content}</label>
            <input 
              type={item.props?.type || 'text'} 
              className="w-full px-3 py-2 border border-gray-300 rounded" 
              placeholder={item.props?.placeholder || `Enter ${item.content}`} 
              disabled
            />
          </div>
        );

      case ELEMENT_TYPES.DROPDOWN:
        return (
          <div className="space-y-1">
            <label className="text-sm font-medium" style={styleProps}>{item.content}</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded" disabled>
              <option>{item.props?.placeholder || 'Select an option'}</option>
              {item.content.split('\n').map((option, i) => (
                <option key={i} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      
      case ELEMENT_TYPES.DIVIDER:
        return (
          <hr className="my-4 border-t" style={{ 
            borderColor: item.props?.color || '#e2e8f0',
            borderTopWidth: `${item.props?.height || 1}px`,
            borderStyle: item.props?.style || 'solid'
          }} />
        );
      
      case ELEMENT_TYPES.SPACING:
        return <div style={{ height: `${item.props?.height || 20}px` }}></div>;
      
      case ELEMENT_TYPES.ICON:
        return (
          <div className="flex justify-center">
            <div 
              className="text-blue-500" 
              style={{ 
                fontSize: `${item.props?.size || 24}px`,
                color: item.props?.color || '#3B82F6'
              }}
            >
              {item.props?.name || '★'}
            </div>
          </div>
        );
      
      default:
        return <div style={styleProps}>{item.content}</div>;
    }
  };

  // Editor content based on element type
  const renderEditor = () => {
    switch (item.type) {
      case ELEMENT_TYPES.HEADLINE:
      case ELEMENT_TYPES.PARAGRAPH:
      case ELEMENT_TYPES.BUTTON:
      case ELEMENT_TYPES.BULLET_LIST:
        return (
          <>
            <TextFormatToolbar 
              style={textStyle} 
              onStyleChange={handleStyleChange}
            />
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full mt-2"
              rows={item.type === ELEMENT_TYPES.PARAGRAPH ? 4 : 2}
            />
          </>
        );
      
      case ELEMENT_TYPES.IMAGE:
        return (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">Image URL</label>
              <Input
                type="text"
                value={localProps.src || ''}
                onChange={(e) => setLocalProps({ ...localProps, src: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Alt Text</label>
              <Input
                type="text"
                value={localProps.alt || ''}
                onChange={(e) => setLocalProps({ ...localProps, alt: e.target.value })}
                placeholder="Image description"
              />
            </div>
          </div>
        );
      
      case ELEMENT_TYPES.VIDEO:
        return (
          <div className="space-y-1">
            <label className="text-sm font-medium">Video URL (YouTube or Vimeo)</label>
            <Input
              type="text"
              value={localProps.src || ''}
              onChange={(e) => setLocalProps({ ...localProps, src: e.target.value })}
              placeholder="https://www.youtube.com/embed/video_id"
            />
          </div>
        );
      
      case ELEMENT_TYPES.FORM:
        return (
          <div className="space-y-3">
            <TextFormatToolbar 
              style={textStyle} 
              onStyleChange={handleStyleChange}
            />
            <div className="space-y-1">
              <label className="text-sm font-medium">Form Title</label>
              <Input
                type="text"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                placeholder="Contact Form"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Form Fields (one per line)</label>
              <Textarea
                value={(localProps.fields || []).join('\n')}
                onChange={(e) => {
                  const fields = e.target.value.split('\n').filter(f => f.trim() !== '');
                  setLocalProps({ ...localProps, fields });
                }}
                placeholder="name\nemail\nphone"
                rows={4}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Button Text</label>
              <Input
                type="text"
                value={localProps.buttonText || ''}
                onChange={(e) => setLocalProps({ ...localProps, buttonText: e.target.value })}
                placeholder="Submit"
              />
            </div>
          </div>
        );
      
      case ELEMENT_TYPES.INPUT:
      case ELEMENT_TYPES.DROPDOWN:
        return (
          <>
            <TextFormatToolbar 
              style={textStyle} 
              onStyleChange={handleStyleChange}
            />
            <div className="space-y-3 mt-2">
              <div className="space-y-1">
                <label className="text-sm font-medium">Label Text</label>
                <Input
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  placeholder="Field Label"
                />
              </div>
              {item.type === ELEMENT_TYPES.DROPDOWN && (
                <div className="space-y-1">
                  <label className="text-sm font-medium">Options (one per line)</label>
                  <Textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    placeholder="Option 1\nOption 2\nOption 3"
                    rows={4}
                  />
                </div>
              )}
              <div className="space-y-1">
                <label className="text-sm font-medium">Placeholder</label>
                <Input
                  type="text"
                  value={localProps.placeholder || ''}
                  onChange={(e) => setLocalProps({ ...localProps, placeholder: e.target.value })}
                  placeholder="Enter placeholder text"
                />
              </div>
            </div>
          </>
        );
      
      default:
        return (
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full"
            rows={3}
          />
        );
    }
  };

  return (
    <div 
      className={`relative border-2 rounded-md transition-all ${
        isEditing ? 'border-blue-500 shadow-lg' : 'border-transparent hover:border-gray-300'
      }`}
    >
      {/* Editing interface */}
      {isEditing ? (
        <div className="p-4 bg-gray-50 rounded-md">
          <div className="mb-3 flex justify-between items-center">
            <h4 className="font-medium capitalize">Edit {item.type}</h4>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X size={18} />
            </Button>
          </div>
          
          {renderEditor()}
          
          <div className="flex justify-between mt-4">
            <Button variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Element display */}
          <div 
            className="p-4 cursor-pointer" 
            onClick={onEdit}
          >
            {renderElement()}
          </div>
          
          {/* Element controls (visible on hover) */}
          <div className="absolute -top-3 -right-3 hidden group-hover:flex space-x-1 bg-white shadow-md border border-gray-200 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveUp}>
              <ArrowUp size={14} />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveDown}>
              <ArrowDown size={14} />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onEdit}>
              <Settings size={14} />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={onRemove}>
              <Trash2 size={14} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FunnelRenderedElement;
