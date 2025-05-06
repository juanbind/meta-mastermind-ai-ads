import React, { useState } from 'react';
import { ELEMENT_TYPES } from './FunnelElement';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Image, Video, ListOrdered, Type, FormInput, Calendar, FileText, 
  Layout, CheckSquare, Upload, Phone, Edit, Check, Trash, ArrowUp, ArrowDown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CanvasItem } from './FunnelCanvas';
import ContentBlockRenderer from './ContentBlockRenderer';

export interface FunnelRenderedElementProps {
  item: CanvasItem;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (content: any, props?: any) => void;
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
  device
}) => {
  const [editableContent, setEditableContent] = useState(item.content);
  const { toast } = useToast();
  
  const handleSave = () => {
    try {
      // For elements with JSON content, validate it can be parsed
      if (typeof editableContent === 'string' && 
          [
            ELEMENT_TYPES.FORM, 
            ELEMENT_TYPES.MULTIPLE_CHOICE,
            ELEMENT_TYPES.DROPDOWN,
            ELEMENT_TYPES.IMAGE_SLIDER,
            ELEMENT_TYPES.HERO_SECTION,
            ELEMENT_TYPES.FEATURES_BLOCK,
            ELEMENT_TYPES.TESTIMONIAL_BLOCK,
            ELEMENT_TYPES.CTA_BLOCK,
            ELEMENT_TYPES.FAQ_BLOCK,
            ELEMENT_TYPES.PRICING_BLOCK,
            ELEMENT_TYPES.SOCIAL_PROOF,
            ELEMENT_TYPES.COUNTDOWN,
            ELEMENT_TYPES.TRUST_BADGES
          ].includes(item.type)) {
        JSON.parse(editableContent);
      }
      
      onSave(editableContent, item.props);
      toast({
        title: "Changes saved",
        description: "Your element has been updated."
      });
    } catch (error) {
      toast({
        title: "Invalid format",
        description: "Please check your input format.",
        variant: "destructive"
      });
    }
  };
  
  const getElementIcon = () => {
    switch (item.type) {
      case ELEMENT_TYPES.HEADLINE:
      case ELEMENT_TYPES.PARAGRAPH:
      case ELEMENT_TYPES.DYNAMIC_TEXT:
      case ELEMENT_TYPES.CUSTOM_FONT_TEXT:
        return <Type className="h-5 w-5" />;
      case ELEMENT_TYPES.IMAGE:
      case ELEMENT_TYPES.IMAGE_BLOCK:
      case ELEMENT_TYPES.IMAGE_SLIDER:
        return <Image className="h-5 w-5" />;
      case ELEMENT_TYPES.VIDEO:
      case ELEMENT_TYPES.VIDEO_EMBED:
        return <Video className="h-5 w-5" />;
      case ELEMENT_TYPES.BULLET_LIST:
        return <ListOrdered className="h-5 w-5" />;
      case ELEMENT_TYPES.FORM:
      case ELEMENT_TYPES.FORM_BLOCK:
        return <FormInput className="h-5 w-5" />;
      case ELEMENT_TYPES.INPUT:
      case ELEMENT_TYPES.PHONE_INPUT:
        return <FormInput className="h-5 w-5" />;
      case ELEMENT_TYPES.DROPDOWN:
        return <FormInput className="h-5 w-5" />;
      case ELEMENT_TYPES.CALENDAR:
      case ELEMENT_TYPES.DATE_PICKER:
        return <Calendar className="h-5 w-5" />;
      case ELEMENT_TYPES.FILE_UPLOAD:
        return <Upload className="h-5 w-5" />;
      case "SECTION":
      case "SECTION_TEMPLATE": 
        return <Layout className="h-5 w-5" />;
      case "COLUMNS":
      case "CARD":
        return <Layout className="h-5 w-5" />;
      case ELEMENT_TYPES.MULTIPLE_CHOICE:
        return <CheckSquare className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  const renderEditInterface = () => {
    // Different edit interfaces based on element type
    switch (item.type) {
      case ELEMENT_TYPES.HEADLINE:
      case ELEMENT_TYPES.PARAGRAPH:
      case ELEMENT_TYPES.BUTTON:
      case ELEMENT_TYPES.DYNAMIC_TEXT:
      case ELEMENT_TYPES.CUSTOM_FONT_TEXT:
        return (
          <Input
            value={editableContent}
            onChange={(e) => setEditableContent(e.target.value)}
            className="mb-2"
          />
        );
      
      case ELEMENT_TYPES.IMAGE:
      case ELEMENT_TYPES.IMAGE_BLOCK:
      case ELEMENT_TYPES.VIDEO:
      case ELEMENT_TYPES.VIDEO_EMBED:
        return (
          <Input
            value={editableContent}
            onChange={(e) => setEditableContent(e.target.value)}
            placeholder="Enter image or video URL"
            className="mb-2"
          />
        );
      
      case ELEMENT_TYPES.FORM:
      case ELEMENT_TYPES.FORM_BLOCK:
      case ELEMENT_TYPES.MULTIPLE_CHOICE:
      case ELEMENT_TYPES.DROPDOWN:
      case ELEMENT_TYPES.IMAGE_SLIDER:
      case ELEMENT_TYPES.HTML_BLOCK:
      case ELEMENT_TYPES.CONDITIONAL_BLOCK:
        return (
          <Textarea
            value={typeof editableContent === 'object' ? JSON.stringify(editableContent, null, 2) : editableContent}
            onChange={(e) => setEditableContent(e.target.value)}
            rows={5}
            className="mb-2 font-mono text-xs"
            placeholder="Enter JSON configuration"
          />
        );
      
      case ELEMENT_TYPES.HERO_SECTION:
      case ELEMENT_TYPES.FEATURES_BLOCK:
      case ELEMENT_TYPES.TESTIMONIAL_BLOCK:
      case ELEMENT_TYPES.CTA_BLOCK:
      case ELEMENT_TYPES.FAQ_BLOCK:
      case ELEMENT_TYPES.PRICING_BLOCK:
      case ELEMENT_TYPES.SOCIAL_PROOF:
      case ELEMENT_TYPES.COUNTDOWN:
      case ELEMENT_TYPES.TRUST_BADGES:
        return (
          <Textarea
            value={typeof editableContent === 'object' ? JSON.stringify(editableContent, null, 2) : editableContent}
            onChange={(e) => setEditableContent(e.target.value)}
            rows={5}
            className="mb-2 font-mono text-xs"
            placeholder="Enter JSON configuration"
          />
        );
      
      default:
        return (
          <Input
            value={typeof editableContent === 'object' ? JSON.stringify(editableContent) : editableContent}
            onChange={(e) => setEditableContent(e.target.value)}
            className="mb-2"
          />
        );
    }
  };
  
  const renderDisplayContent = () => {
    // Content blocks that should use ContentBlockRenderer
    const contentBlocks = [
      ELEMENT_TYPES.HERO_SECTION,
      ELEMENT_TYPES.FEATURES_BLOCK,
      ELEMENT_TYPES.TESTIMONIAL_BLOCK,
      ELEMENT_TYPES.CTA_BLOCK,
      ELEMENT_TYPES.FAQ_BLOCK,
      ELEMENT_TYPES.PRICING_BLOCK,
      ELEMENT_TYPES.SOCIAL_PROOF,
      ELEMENT_TYPES.COUNTDOWN,
      ELEMENT_TYPES.TRUST_BADGES
    ];

    // Render using ContentBlockRenderer if it's a content block
    if (contentBlocks.includes(item.type)) {
      try {
        return <ContentBlockRenderer type={item.type} content={item.content} props={item.props} device={device} />;
      } catch (error) {
        console.error("Error rendering content block:", error);
        return (
          <div className="p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-red-700">Error rendering {item.type}</p>
          </div>
        );
      }
    }

    // For regular elements, use the existing switch case
    switch (item.type) {
      case ELEMENT_TYPES.HEADLINE:
        return <h2 className={`text-2xl font-bold ${item.props?.style || ''}`}>{item.content}</h2>;
      
      case ELEMENT_TYPES.PARAGRAPH:
        return <p className={item.props?.style || ''}>{item.content}</p>;
      
      case ELEMENT_TYPES.BUTTON:
        return (
          <Button className={item.props?.style || ''}>
            {item.content}
          </Button>
        );
      
      case ELEMENT_TYPES.DYNAMIC_TEXT:
        // Fix: Properly handle the dynamic text element
        return (
          <div className="p-2 border border-dashed border-gray-300 rounded">
            <p>Dynamic Text: <span className="font-bold">{item.content}</span></p>
            <p className="text-xs text-gray-500">Will be replaced with dynamic values at runtime</p>
          </div>
        );
      
      case ELEMENT_TYPES.IMAGE:
      case ELEMENT_TYPES.IMAGE_BLOCK:
        return (
          <div className="relative">
            <img 
              src={item.content || "https://via.placeholder.com/400x300?text=Image+Placeholder"} 
              alt="Content" 
              className="max-w-full h-auto rounded"
            />
          </div>
        );
      
      case ELEMENT_TYPES.VIDEO:
      case ELEMENT_TYPES.VIDEO_EMBED:
        return (
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded flex items-center justify-center">
            {item.content ? (
              <div className="w-full">
                <iframe
                  src={item.content}
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
      
      case ELEMENT_TYPES.FORM:
      case ELEMENT_TYPES.FORM_BLOCK:
        const formContent = typeof item.content === 'string' ? item.content : JSON.stringify(item.content, null, 2);
        return (
          <div className="p-4 border border-dashed border-gray-300 rounded">
            <h3 className="font-medium mb-2">Form Element</h3>
            <div className="flex flex-col gap-2 mb-4">
              <Input placeholder="Name" className="w-full" />
              <Input placeholder="Email" type="email" className="w-full" />
              <Button>Submit</Button>
            </div>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono overflow-auto max-h-40 mt-4">
              {formContent || 'Form configuration'}
            </div>
          </div>
        );
      
      case ELEMENT_TYPES.BULLET_LIST:
        const items = typeof item.content === 'string' ? item.content.split('\n') : [];
        return (
          <ul className="list-disc pl-5">
            {items.map((listItem, index) => (
              <li key={index}>{listItem}</li>
            ))}
          </ul>
        );
      
      case ELEMENT_TYPES.MULTIPLE_CHOICE:
        try {
          const mcContent = typeof item.content === 'string' 
            ? JSON.parse(item.content) 
            : item.content;
          
          return (
            <div className="p-4 border border-dashed border-gray-300 rounded">
              <h3 className="font-medium mb-2">{mcContent.question || "Multiple Choice"}</h3>
              <div className="space-y-2">
                {mcContent.options?.map((option: string, idx: number) => (
                  <div key={idx} className="flex items-center">
                    <input 
                      type={mcContent.allowMultiple ? "checkbox" : "radio"} 
                      id={`option-${idx}`}
                      name="option"
                      className="mr-2"
                    />
                    <label htmlFor={`option-${idx}`}>{option}</label>
                  </div>
                ))}
              </div>
            </div>
          );
        } catch (error) {
          return <div className="p-2 text-red-500">Invalid multiple choice format</div>;
        }
      
      case ELEMENT_TYPES.DROPDOWN:
        try {
          const options = typeof item.content === 'string' 
            ? item.content.split('\n')
            : Array.isArray(item.content) ? item.content : [];
          
          return (
            <div className="p-2">
              <select className="w-full border border-gray-300 rounded p-2">
                <option value="" disabled selected>Select an option</option>
                {options.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            </div>
          );
        } catch (error) {
          return <div className="p-2 text-red-500">Invalid dropdown format</div>;
        }
      
      case ELEMENT_TYPES.FILE_UPLOAD:
        return (
          <div className="p-4 border border-dashed border-gray-300 rounded">
            <h3 className="font-medium mb-2">File Upload</h3>
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-500" />
                <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
              </div>
              <input type="file" className="hidden" />
            </label>
          </div>
        );
      
      case ELEMENT_TYPES.CALENDAR:
      case ELEMENT_TYPES.DATE_PICKER:
        return (
          <div className="p-4 border border-dashed border-gray-300 rounded">
            <h3 className="font-medium mb-2">Date Selection</h3>
            <div className="relative">
              <Input 
                type="date" 
                className="w-full p-2"
                placeholder={item.content || "Select a date"} 
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        );
      
      case ELEMENT_TYPES.DIVIDER:
        return <hr className="my-4 border-t border-gray-200" />;
      
      case ELEMENT_TYPES.SPACING:
        const height = item.props?.height || 20;
        return <div style={{ height: `${height}px` }}></div>;

      default:
        return (
          <div className="p-4 border border-dashed border-gray-300 rounded">
            <h3 className="font-medium mb-2">{item.type}</h3>
            <div className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-40">
              {typeof item.content === 'object' 
                ? JSON.stringify(item.content, null, 2)
                : item.content || 'Content placeholder'}
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="relative group mb-4">
      {/* Element controls */}
      <div className="absolute -top-3 -right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {isEditing ? (
          <>
            <Button size="icon" variant="outline" onClick={handleSave} className="h-7 w-7 bg-white">
              <Check className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={onCancel} className="h-7 w-7 bg-white">
              <Trash className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button size="icon" variant="outline" onClick={onEdit} className="h-7 w-7 bg-white">
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="outline" 
              onClick={onRemove} 
              className="h-7 w-7 bg-white text-red-500 hover:text-red-700"
            >
              <Trash className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="outline" 
              onClick={onMoveUp} 
              className="h-7 w-7 bg-white"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="outline" 
              onClick={onMoveDown} 
              className="h-7 w-7 bg-white"
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      
      {/* Element content */}
      <div className="relative border border-transparent hover:border-gray-300 rounded p-2 transition-all">
        <div className="absolute top-2 left-2 bg-gray-100 rounded-full p-1 opacity-50">
          {getElementIcon()}
        </div>
        
        {isEditing ? (
          <div className="pt-8 pb-2 px-2">
            {renderEditInterface()}
          </div>
        ) : (
          <div className="pt-8 pb-2 px-2">
            {renderDisplayContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default FunnelRenderedElement;
