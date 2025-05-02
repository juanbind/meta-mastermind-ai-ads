
import React, { useState } from 'react';
import { Copy, Trash2, ChevronUp, ChevronDown, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { CanvasItem } from './FunnelCanvas';
import { ELEMENT_TYPES } from './FunnelElement';
import TextFormatToolbar from './TextFormatToolbar';
import ContentBlockRenderer from './ContentBlockRenderer';

interface FunnelRenderedElementProps {
  item: CanvasItem;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (content: string, props?: Record<string, any>) => void;
  onCancel: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  device?: 'mobile' | 'tablet' | 'desktop';
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
  device = 'desktop'
}) => {
  const [content, setContent] = useState(item.content);
  const [imageUrl, setImageUrl] = useState(item.props?.src || '');
  const [videoUrl, setVideoUrl] = useState(item.props?.src || '');
  
  // For content blocks
  const isContentBlock = [
    ELEMENT_TYPES.HERO_SECTION,
    ELEMENT_TYPES.FEATURES_BLOCK,
    ELEMENT_TYPES.TESTIMONIAL_BLOCK,
    ELEMENT_TYPES.CTA_BLOCK,
    ELEMENT_TYPES.FAQ_BLOCK,
    ELEMENT_TYPES.PRICING_BLOCK,
  ].includes(item.type);
  
  const handleSave = () => {
    let updatedProps = { ...item.props };
    
    // Update specific props based on element type
    if (item.type === ELEMENT_TYPES.IMAGE) {
      updatedProps = { ...updatedProps, src: imageUrl };
    } else if (item.type === ELEMENT_TYPES.VIDEO) {
      updatedProps = { ...updatedProps, src: videoUrl };
    }
    
    onSave(content, updatedProps);
  };
  
  const renderEditableContent = () => {
    switch (item.type) {
      case ELEMENT_TYPES.HEADLINE:
        return (
          <>
            <TextFormatToolbar 
              value={content} 
              onChange={setContent} 
            />
            <Input 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="font-bold text-lg"
            />
          </>
        );
      case ELEMENT_TYPES.PARAGRAPH:
        return (
          <>
            <TextFormatToolbar 
              value={content} 
              onChange={setContent} 
            />
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
            />
          </>
        );
      case ELEMENT_TYPES.BULLET_LIST:
        return (
          <>
            <TextFormatToolbar 
              value={content} 
              onChange={setContent} 
            />
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              placeholder="Enter one item per line"
            />
            <p className="text-xs text-gray-500 mt-1">Each line will be a bullet point</p>
          </>
        );
      case ELEMENT_TYPES.BUTTON:
        return (
          <>
            <TextFormatToolbar 
              value={content} 
              onChange={setContent} 
            />
            <Input 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mb-2"
            />
          </>
        );
      case ELEMENT_TYPES.IMAGE:
        return (
          <div className="space-y-2">
            <div>
              <label className="text-sm font-medium">Image URL</label>
              <Input 
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="text-xs text-gray-500">
              Enter a URL for your image or upload one
            </div>
          </div>
        );
      case ELEMENT_TYPES.VIDEO:
        return (
          <div className="space-y-2">
            <div>
              <label className="text-sm font-medium">Video URL</label>
              <Input 
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
            <div className="text-xs text-gray-500">
              Enter a YouTube or Vimeo URL
            </div>
          </div>
        );
      case ELEMENT_TYPES.HERO_SECTION:
      case ELEMENT_TYPES.FEATURES_BLOCK:
      case ELEMENT_TYPES.TESTIMONIAL_BLOCK:
      case ELEMENT_TYPES.CTA_BLOCK:
      case ELEMENT_TYPES.FAQ_BLOCK:
      case ELEMENT_TYPES.PRICING_BLOCK:
        return (
          <div className="space-y-2">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="font-mono text-sm"
            />
            <div className="text-xs text-gray-500">
              Edit the JSON configuration above to customize this content block
            </div>
          </div>
        );
      default:
        return (
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
          />
        );
    }
  };
  
  const renderViewContent = () => {
    if (isContentBlock) {
      return (
        <ContentBlockRenderer 
          type={item.type} 
          content={item.content} 
          props={item.props} 
          device={device} 
        />
      );
    }
    
    switch (item.type) {
      case ELEMENT_TYPES.HEADLINE:
        return <h2 className="font-bold text-xl">{item.content}</h2>;
      case ELEMENT_TYPES.PARAGRAPH:
        return <p>{item.content}</p>;
      case ELEMENT_TYPES.BULLET_LIST:
        return (
          <ul className="list-disc pl-5">
            {item.content.split('\n').map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
        );
      case ELEMENT_TYPES.BUTTON:
        return (
          <Button className="bg-metamaster-primary hover:bg-metamaster-secondary">
            {item.content}
          </Button>
        );
      case ELEMENT_TYPES.IMAGE:
        return (
          <img 
            src={item.props?.src || 'https://placehold.co/600x400?text=Image+placeholder'} 
            alt={item.props?.alt || 'Image'} 
            className="max-w-full h-auto rounded-md"
          />
        );
      case ELEMENT_TYPES.VIDEO:
        // Simple video placeholder
        return (
          <div 
            className="w-full aspect-video bg-gray-200 rounded-md flex items-center justify-center"
            style={{
              backgroundImage: `url(${item.props?.placeholder || ''})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {!item.props?.src && (
              <div className="text-white bg-black/50 px-3 py-1 rounded">
                Video placeholder
              </div>
            )}
          </div>
        );
      case ELEMENT_TYPES.DIVIDER:
        return <hr className="my-4" />;
      case ELEMENT_TYPES.SPACING:
        return <div style={{ height: `${item.props?.height || 20}px` }}></div>;
      default:
        return <div>{item.content || 'Element content'}</div>;
    }
  };

  return (
    <div className="group relative border border-dashed border-gray-300 rounded-md hover:border-metamaster-primary transition-colors p-2">
      {/* Element actions */}
      <div className="absolute right-2 top-2 flex space-x-1 bg-white shadow-sm border rounded-md">
        <Button 
          variant="ghost"
          size="icon"
          onClick={onMoveUp}
          className="h-6 w-6 rounded-none border-r"
        >
          <ChevronUp size={14} />
        </Button>
        <Button 
          variant="ghost"
          size="icon"
          onClick={onMoveDown}
          className="h-6 w-6 rounded-none border-r"
        >
          <ChevronDown size={14} />
        </Button>
        <Button 
          variant="ghost"
          size="icon"
          onClick={onEdit}
          className="h-6 w-6 rounded-none border-r"
        >
          <Settings size={14} />
        </Button>
        <Button 
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="h-6 w-6 rounded-none text-red-500 hover:text-red-700"
        >
          <Trash2 size={14} />
        </Button>
      </div>
      
      {/* Element type label */}
      <div className="absolute left-2 top-2 bg-metamaster-gray-100 px-2 py-1 text-xs rounded">
        {item.type}
      </div>
      
      {/* Content */}
      <div className="mt-8">
        {isEditing ? (
          <div className="space-y-4">
            {renderEditableContent()}
            
            <div className="flex justify-end space-x-2 pt-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button 
                size="sm"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="min-h-10">
            {renderViewContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default FunnelRenderedElement;
