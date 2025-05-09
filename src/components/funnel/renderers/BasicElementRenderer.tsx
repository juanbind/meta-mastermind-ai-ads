
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ELEMENT_TYPES } from '../FunnelElement';
import { Video, AlertCircle, Check } from 'lucide-react';

interface BasicElementRendererProps {
  type: string;
  content: any;
  props?: Record<string, any>;
}

const BasicElementRenderer: React.FC<BasicElementRendererProps> = ({ type, content, props = {} }) => {
  // Handle styling for headlines
  const getHeadlineElement = () => {
    const style = {
      color: props?.color,
      fontFamily: props?.fontFamily,
      lineHeight: props?.lineHeight,
    };
    
    const className = `
      ${props?.fontSize || 'text-2xl'}
      ${props?.fontWeight || 'font-bold'} 
      ${props?.textAlign || 'text-left'}
      ${props?.className || ''}
    `;
    
    switch (props?.level) {
      case 'h1':
        return <h1 style={style} className={className}>{content}</h1>;
      case 'h3':
        return <h3 style={style} className={className}>{content}</h3>;
      case 'h4':
        return <h4 style={style} className={className}>{content}</h4>;
      default:
        return <h2 style={style} className={className}>{content}</h2>;
    }
  };
  
  // Handle styling for paragraphs
  const getParagraphElement = () => {
    const style = {
      color: props?.color,
      fontFamily: props?.fontFamily,
    };
    
    const className = `
      ${props?.fontSize || 'text-base'}
      ${props?.lineHeight || 'leading-normal'}
      ${props?.textAlign || 'text-left'}
      ${props?.className || ''}
    `;
    
    return <p style={style} className={className}>{content}</p>;
  };
  
  // Handle styling for buttons
  const getButtonElement = () => {
    const buttonProps: any = {};
    
    if (props?.url && props?.action === 'link') {
      buttonProps.onClick = () => {
        window.open(props.url, '_blank');
      };
    }
    
    const buttonSizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg'
    };
    
    const size = props?.size || 'md';
    
    const style = {
      backgroundColor: props?.bgColor,
    };
    
    const className = `
      ${props?.variant === 'outline' ? 'border border-current bg-transparent' : ''}
      ${props?.variant === 'ghost' ? 'bg-transparent hover:bg-gray-100' : ''}
      ${buttonSizes[size as keyof typeof buttonSizes]}
      ${props?.fullWidth ? 'w-full' : ''}
      ${props?.className || ''}
    `;
    
    return (
      <Button 
        style={style} 
        className={className}
        {...buttonProps}
      >
        {content}
      </Button>
    );
  };
  
  // Handle styling for dividers
  const getDividerElement = () => {
    const style = {
      borderStyle: props?.style || 'solid',
      borderColor: props?.color || '#e2e8f0',
      borderWidth: `${props?.height || 1}px 0 0 0`,
      width: props?.width || '100%'
    };
    
    return <hr style={style} className="my-4" />;
  };

  switch (type) {
    case ELEMENT_TYPES.HEADLINE:
      return getHeadlineElement();
    
    case ELEMENT_TYPES.PARAGRAPH:
      return getParagraphElement();
    
    case ELEMENT_TYPES.BUTTON:
      return getButtonElement();
    
    case ELEMENT_TYPES.DYNAMIC_TEXT:
      return (
        <div className="p-2 border border-dashed border-gray-300 rounded">
          <p className={props?.style ? `text-${props.style.fontSize} text-${props.style.color}` : ''}>
            {content}
          </p>
          <p className="text-xs text-gray-500">Will be replaced with dynamic values at runtime</p>
        </div>
      );
    
    case ELEMENT_TYPES.IMAGE:
    case ELEMENT_TYPES.IMAGE_BLOCK:
      return (
        <div 
          className={`relative ${props?.alignment === 'center' ? 'mx-auto' : props?.alignment === 'right' ? 'ml-auto' : ''}`}
          style={{ maxWidth: props?.width ? `${props.width}px` : '100%' }}
        >
          <img 
            src={content || "https://via.placeholder.com/400x300?text=Image+Placeholder"} 
            alt={props?.alt || "Content image"} 
            className="max-w-full h-auto"
            style={{ 
              borderRadius: props?.borderRadius ? `${props.borderRadius}px` : '0',
              width: props?.width ? `${props.width}px` : '100%',
              height: props?.height ? `${props.height}px` : 'auto'
            }}
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
    case ELEMENT_TYPES.LIST_WITH_ICONS:
      try {
        let items: string[] = [];
        
        if (typeof content === 'string') {
          // Simple bullet list with each item on a new line
          items = content.split('\n');
        } else if (Array.isArray(content)) {
          // Already parsed array
          items = content;
        } else if (typeof content === 'object' && content.items) {
          // Object with items array
          items = content.items;
        }
        
        return (
          <ul className="list-disc pl-5 space-y-2">
            {items.map((listItem: string, index: number) => (
              <li key={index} className="flex items-start">
                {type === ELEMENT_TYPES.LIST_WITH_ICONS && (
                  <Check className="mr-2 text-green-500 flex-shrink-0 mt-1" size={16} />
                )}
                <span>{listItem}</span>
              </li>
            ))}
          </ul>
        );
      } catch (error) {
        return <div className="text-red-500">Error parsing list</div>;
      }
    
    case ELEMENT_TYPES.DIVIDER:
      return getDividerElement();
    
    case ELEMENT_TYPES.SPACING:
      const height = props?.height || 20;
      return <div style={{ height: `${height}px` }} aria-hidden="true"></div>;
      
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
