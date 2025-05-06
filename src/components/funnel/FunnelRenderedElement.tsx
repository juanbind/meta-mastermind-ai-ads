
import React, { useState } from 'react';
import { ELEMENT_TYPES } from './FunnelElement';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Image, Video, ListOrdered, Type, FormInput, Calendar, FileText, 
  LayoutGrid, Layout, CheckSquare, Upload, Phone, Edit, Check, Trash 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FunnelRenderedElementProps {
  element: {
    id: string;
    type: string;
    content: any;
    style?: any;
  };
  onUpdate: (id: string, content: any) => void;
  onDelete: (id: string) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

const FunnelRenderedElement: React.FC<FunnelRenderedElementProps> = ({
  element,
  onUpdate,
  onDelete,
  isEditing,
  setIsEditing
}) => {
  const [editableContent, setEditableContent] = useState(element.content);
  const { toast } = useToast();
  
  const handleSave = () => {
    try {
      // For elements with JSON content, validate it can be parsed
      if (typeof editableContent === 'string' && 
          [
            ELEMENT_TYPES.FORM, 
            ELEMENT_TYPES.MULTIPLE_CHOICE,
            ELEMENT_TYPES.DROPDOWN,
            ELEMENT_TYPES.IMAGE_SLIDER
          ].includes(element.type)) {
        JSON.parse(editableContent);
      }
      
      onUpdate(element.id, editableContent);
      setIsEditing(false);
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
  
  const handleCancel = () => {
    setEditableContent(element.content);
    setIsEditing(false);
  };
  
  const getElementIcon = () => {
    switch (element.type) {
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
      case ELEMENT_TYPES.SECTION:
      case ELEMENT_TYPES.SECTION_TEMPLATE:
      case ELEMENT_TYPES.CARD:
        return <Layout className="h-5 w-5" />;
      case ELEMENT_TYPES.COLUMNS:
        return <LayoutGrid className="h-5 w-5" />;
      case ELEMENT_TYPES.MULTIPLE_CHOICE:
        return <CheckSquare className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  const renderEditInterface = () => {
    // Different edit interfaces based on element type
    switch (element.type) {
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
    switch (element.type) {
      case ELEMENT_TYPES.HEADLINE:
        return <h2 className={`text-2xl font-bold ${element.style || ''}`}>{element.content}</h2>;
      
      case ELEMENT_TYPES.PARAGRAPH:
        return <p className={element.style || ''}>{element.content}</p>;
      
      case ELEMENT_TYPES.BUTTON:
        return (
          <Button className={element.style || ''}>
            {element.content}
          </Button>
        );
      
      case ELEMENT_TYPES.DYNAMIC_TEXT:
        // Fix: Properly handle the dynamic text element
        return (
          <div className="p-2 border border-dashed border-gray-300 rounded">
            <p>Dynamic Text: <span className="font-bold">{element.content}</span></p>
            <p className="text-xs text-gray-500">Will be replaced with dynamic values at runtime</p>
          </div>
        );
      
      case ELEMENT_TYPES.IMAGE:
      case ELEMENT_TYPES.IMAGE_BLOCK:
        return (
          <div className="relative">
            <img 
              src={element.content || "https://via.placeholder.com/400x300?text=Image+Placeholder"} 
              alt="Content" 
              className="max-w-full h-auto rounded"
            />
          </div>
        );
      
      case ELEMENT_TYPES.VIDEO:
      case ELEMENT_TYPES.VIDEO_EMBED:
        return (
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded flex items-center justify-center">
            {element.content ? (
              <div className="w-full">
                <iframe
                  src={element.content}
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
        return (
          <div className="p-4 border border-dashed border-gray-300 rounded">
            <h3 className="font-medium mb-2">Form Element</h3>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono overflow-auto max-h-40">
              {typeof element.content === 'object' 
                ? JSON.stringify(element.content, null, 2)
                : element.content || 'Form configuration will appear here'}
            </div>
          </div>
        );

      // Handle all other element types with reasonable defaults
      default:
        return (
          <div className="p-4 border border-dashed border-gray-300 rounded">
            <h3 className="font-medium mb-2">{element.type}</h3>
            <div className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-40">
              {typeof element.content === 'object' 
                ? JSON.stringify(element.content, null, 2)
                : element.content || 'Content placeholder'}
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
            <Button size="icon" variant="outline" onClick={handleCancel} className="h-7 w-7 bg-white">
              <Trash className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button size="icon" variant="outline" onClick={() => setIsEditing(true)} className="h-7 w-7 bg-white">
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="outline" 
              onClick={() => onDelete(element.id)} 
              className="h-7 w-7 bg-white text-red-500 hover:text-red-700"
            >
              <Trash className="h-4 w-4" />
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
