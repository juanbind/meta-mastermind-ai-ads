
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ELEMENT_TYPES } from '../FunnelElement';
import { Video, AlertCircle } from 'lucide-react';

interface BasicElementRendererProps {
  type: string;
  content: any;
  props?: Record<string, any>;
}

const BasicElementRenderer: React.FC<BasicElementRendererProps> = ({ type, content, props = {} }) => {
  switch (type) {
    case ELEMENT_TYPES.HEADLINE:
      return <h2 className={`text-2xl font-bold ${props?.style || ''}`}>{content}</h2>;
    
    case ELEMENT_TYPES.PARAGRAPH:
      return <p className={props?.style || ''}>{content}</p>;
    
    case ELEMENT_TYPES.BUTTON:
      return (
        <Button className={props?.style || ''}>
          {content}
        </Button>
      );
    
    case ELEMENT_TYPES.DYNAMIC_TEXT:
      return (
        <div className="p-2 border border-dashed border-gray-300 rounded">
          <p>Dynamic Text: <span className="font-bold">{content}</span></p>
          <p className="text-xs text-gray-500">Will be replaced with dynamic values at runtime</p>
        </div>
      );
    
    case ELEMENT_TYPES.IMAGE:
    case ELEMENT_TYPES.IMAGE_BLOCK:
      return (
        <div className="relative">
          <img 
            src={content || "https://via.placeholder.com/400x300?text=Image+Placeholder"} 
            alt="Content" 
            className="max-w-full h-auto rounded"
          />
        </div>
      );
    
    case ELEMENT_TYPES.VIDEO:
    case ELEMENT_TYPES.VIDEO_EMBED:
      return (
        <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded flex items-center justify-center">
          {content ? (
            <div className="w-full">
              <iframe
                src={content}
                className="w-full h-full min-h-[200px]"
                allowFullScreen
                title="Video embed"
              ></iframe>
            </div>
          ) : (
            <div className="text-center p-4">
              <Video className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-500">Video Placeholder</p>
            </div>
          )}
        </div>
      );
    
    case ELEMENT_TYPES.BULLET_LIST:
      const items = typeof content === 'string' ? content.split('\n') : [];
      return (
        <ul className="list-disc pl-5">
          {items.map((listItem: string, index: number) => (
            <li key={index}>{listItem}</li>
          ))}
        </ul>
      );
    
    case ELEMENT_TYPES.DIVIDER:
      return <hr className="my-4 border-t border-gray-200" />;
    
    case ELEMENT_TYPES.SPACING:
      const height = props?.height || 20;
      return <div style={{ height: `${height}px` }}></div>;
      
    default:
      return (
        <div className="p-4 border border-dashed border-gray-300 rounded">
          <div className="flex items-center text-amber-700">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>Unknown basic element type: {type}</span>
          </div>
        </div>
      );
  }
};

export default BasicElementRenderer;
