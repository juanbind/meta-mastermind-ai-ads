
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ELEMENT_TYPES } from '../FunnelElement';
import { Video, AlertCircle, CheckCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BasicElementRendererProps {
  type: string;
  content: any;
  props?: Record<string, any>;
}

const BasicElementRenderer: React.FC<BasicElementRendererProps> = ({ type, content, props = {} }) => {
  // Parse content if it's a string JSON
  const parsedContent = React.useMemo(() => {
    if (typeof content === 'string' && (content.startsWith('{') || content.startsWith('['))) {
      try {
        return JSON.parse(content);
      } catch (e) {
        console.error(`Failed to parse content for ${type}:`, e);
        return null;
      }
    }
    return content;
  }, [content, type]);

  switch (type) {
    case ELEMENT_TYPES.HEADLINE:
      const HeadingTag = props?.level || 'h2';
      return <HeadingTag className={`font-bold ${props?.align ? `text-${props.align}` : ''} ${props?.style || ''}`}>{content}</HeadingTag>;
    
    case ELEMENT_TYPES.PARAGRAPH:
      return <p className={`${props?.size === 'small' ? 'text-sm' : props?.size === 'large' ? 'text-lg' : 'text-base'} ${props?.style || ''}`}>{content}</p>;
    
    case ELEMENT_TYPES.BUTTON:
      return (
        <Button 
          className={`${props?.size === 'small' ? 'text-sm py-1 px-3' : props?.size === 'large' ? 'text-lg py-3 px-6' : ''} ${props?.fullWidth ? 'w-full' : ''} ${props?.style || ''}`}
          variant={props?.variant || 'default'}
        >
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
            src={content || props?.src || "https://via.placeholder.com/400x300?text=Image+Placeholder"} 
            alt={props?.alt || "Content"} 
            className="max-w-full h-auto rounded"
            style={{
              width: props?.width ? `${props.width}px` : 'auto',
              height: props?.height ? `${props.height}px` : 'auto',
              borderRadius: props?.borderRadius ? `${props.borderRadius}px` : '4px'
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
      const items = typeof content === 'string' ? content.split('\n') : 
                    Array.isArray(parsedContent) ? parsedContent : [];
      return (
        <ul className="list-disc pl-5">
          {items.map((listItem: string, index: number) => (
            <li key={index}>{listItem}</li>
          ))}
        </ul>
      );
    
    case ELEMENT_TYPES.DIVIDER:
      const thickness = props?.thickness || 1;
      const style = props?.style || 'solid';
      const color = props?.color || '#e5e7eb';
      return <hr className={`my-4`} style={{ borderTopWidth: `${thickness}px`, borderStyle: style, borderColor: color }} />;
    
    case ELEMENT_TYPES.SPACING:
      const height = props?.height || 20;
      return <div style={{ height: `${height}px` }}></div>;

    case ELEMENT_TYPES.CHECKBOX:
      if (parsedContent) {
        return (
          <div className="flex items-start space-x-2">
            <Checkbox id={parsedContent.id} />
            <label htmlFor={parsedContent.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {parsedContent.label}
              {parsedContent.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
        );
      }
      return <div>Invalid checkbox configuration</div>;

    case ELEMENT_TYPES.DROPDOWN:
      if (parsedContent) {
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {parsedContent.label}
              {parsedContent.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={parsedContent.placeholder || "Select..."} />
              </SelectTrigger>
              <SelectContent>
                {parsedContent.options?.map((option: any, index: number) => (
                  <SelectItem key={index} value={option.value || option}>
                    {option.label || option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      }
      return <div>Invalid dropdown configuration</div>;

    case ELEMENT_TYPES.MULTIPLE_CHOICE:
      if (parsedContent) {
        return (
          <div className="space-y-4">
            <h3 className="font-medium">{parsedContent.question}</h3>
            {parsedContent.description && <p className="text-gray-500 text-sm">{parsedContent.description}</p>}
            <div className="space-y-2">
              {parsedContent.options?.map((option: any, index: number) => (
                <div key={index} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                  <div className="w-5 h-5 rounded-full border border-gray-300"></div>
                  <div>
                    <p>{option.label}</p>
                    {option.description && <p className="text-sm text-gray-500">{option.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
      return <div>Invalid multiple choice configuration</div>;

    case ELEMENT_TYPES.LIST_WITH_ICONS:
      if (parsedContent) {
        return (
          <div>
            {parsedContent.title && <h3 className="font-medium mb-3">{parsedContent.title}</h3>}
            <ul className={`space-y-3 ${parsedContent.alignment === 'center' ? 'text-center' : ''}`}>
              {parsedContent.items?.map((item: any, index: number) => (
                <li key={index} className="flex items-center">
                  <CheckCircle size={20} color={parsedContent.iconColor || '#22c55e'} className="mr-2 shrink-0" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }
      return <div>Invalid list with icons configuration</div>;

    case ELEMENT_TYPES.HERO_SECTION:
      if (parsedContent) {
        return (
          <div 
            className="p-8 text-center" 
            style={{
              backgroundColor: parsedContent.backgroundType === 'color' ? parsedContent.backgroundColor : 'transparent',
              backgroundImage: parsedContent.backgroundType === 'image' && parsedContent.backgroundImage ? `url(${parsedContent.backgroundImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <h1 className="text-3xl font-bold mb-4">{parsedContent.headline}</h1>
            <p className="mb-6">{parsedContent.subheadline}</p>
            {parsedContent.cta && (
              <Button>{parsedContent.cta.text}</Button>
            )}
          </div>
        );
      }
      return <div>Invalid hero section configuration</div>;

    case ELEMENT_TYPES.IMAGE_TEXT_SECTION:
      if (parsedContent) {
        const isImageLeft = parsedContent.layout === 'image-left';
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className={isImageLeft ? 'order-1' : 'order-1 md:order-2'}>
              <img 
                src={parsedContent.imageUrl || "https://via.placeholder.com/600x400"} 
                alt={parsedContent.imageAlt || ""}
                className="w-full h-auto rounded"
              />
            </div>
            <div className={isImageLeft ? 'order-2' : 'order-2 md:order-1'}>
              <h2 className="text-2xl font-bold mb-3">{parsedContent.heading}</h2>
              <p>{parsedContent.text}</p>
            </div>
          </div>
        );
      }
      return <div>Invalid image+text section configuration</div>;
      
    default:
      return (
        <div className="p-4 border border-dashed border-gray-300 rounded">
          <div className="flex items-center text-amber-700">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>Unknown element type: {type}</span>
          </div>
          <pre className="mt-2 text-xs bg-gray-50 p-2 rounded overflow-auto max-h-32">
            {typeof content === 'object' ? JSON.stringify(content, null, 2) : content}
          </pre>
        </div>
      );
  }
};

export default BasicElementRenderer;
