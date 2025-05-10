
import React, { useState, useEffect } from 'react';
import { ELEMENT_TYPES, DEFAULT_ELEMENT_PROPS } from './FunnelElement';
import { useToast } from '@/hooks/use-toast';
import { CanvasItem } from './FunnelCanvas';
import ElementControls from './renderers/ElementControls';
import ElementEditor from './renderers/ElementEditor';
import ElementTypeIcon from './renderers/ElementTypeIcon';
import BasicElementRenderer from './renderers/BasicElementRenderer';
import FormElementRenderer from './renderers/FormElementRenderer';
import ContentElementRenderer from './renderers/ContentElementRenderer';

export interface FunnelRenderedElementProps {
  item: CanvasItem;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (content: any, props?: any) => void;
  onCancel: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate?: () => void;
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
  onDuplicate,
  device
}) => {
  const [editableContent, setEditableContent] = useState(item.content);
  const [editableProps, setEditableProps] = useState(item.props || {});
  const { toast } = useToast();
  
  // Reset editable content when item changes
  useEffect(() => {
    setEditableContent(item.content);
    setEditableProps(item.props || {});
  }, [item.id, item.content, item.props]);
  
  const handleSave = () => {
    try {
      // For elements with JSON content, validate it can be parsed
      if (typeof editableContent === 'string' && needsJsonValidation(item.type)) {
        JSON.parse(editableContent);
      }
      
      onSave(editableContent, editableProps);
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

  // Check if element type needs JSON validation
  const needsJsonValidation = (type: string): boolean => {
    const jsonTypes = [
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
      ELEMENT_TYPES.TRUST_BADGES,
      ELEMENT_TYPES.IMAGE_TEXT_SECTION,
      ELEMENT_TYPES.LIST_WITH_ICONS,
      ELEMENT_TYPES.LEAD_CAPTURE_FORM
    ];
    return jsonTypes.includes(type);
  };
  
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
    ELEMENT_TYPES.TRUST_BADGES,
    ELEMENT_TYPES.IMAGE_TEXT_SECTION,
    ELEMENT_TYPES.LIST_WITH_ICONS
  ];
  
  // Form elements
  const formElements = [
    ELEMENT_TYPES.FORM,
    ELEMENT_TYPES.FORM_BLOCK,
    ELEMENT_TYPES.MULTIPLE_CHOICE,
    ELEMENT_TYPES.DROPDOWN,
    ELEMENT_TYPES.FILE_UPLOAD,
    ELEMENT_TYPES.CALENDAR,
    ELEMENT_TYPES.DATE_PICKER,
    ELEMENT_TYPES.CHECKBOX,
    ELEMENT_TYPES.LEAD_CAPTURE_FORM
  ];

  const renderDisplayContent = () => {
    // Determine the category of the element and use the appropriate renderer
    if (contentBlocks.includes(item.type)) {
      return <ContentElementRenderer type={item.type} content={item.content} props={item.props} device={device} />;
    } else if (formElements.includes(item.type)) {
      return <FormElementRenderer type={item.type} content={item.content} props={item.props} />;
    } else {
      return <BasicElementRenderer type={item.type} content={item.content} props={item.props} />;
    }
  };

  // Get element category class for styling
  const getElementCategoryClass = () => {
    if (contentBlocks.includes(item.type)) {
      return 'border-blue-200 hover:border-blue-300';
    } else if (formElements.includes(item.type)) {
      return 'border-green-200 hover:border-green-300';
    } else {
      return 'border-purple-200 hover:border-purple-300';
    }
  };
  
  return (
    <div className="relative group mb-4">
      {/* Element controls */}
      <ElementControls 
        isEditing={isEditing}
        onEdit={onEdit}
        onSave={handleSave}
        onCancel={onCancel}
        onRemove={onRemove}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        onDuplicate={onDuplicate}
      />
      
      {/* Element content */}
      <div className={`relative border rounded p-2 transition-all ${
        isEditing ? 'border-purple-400 bg-white shadow-sm' : 
        `border-transparent ${getElementCategoryClass()}`
      }`}>
        <div className="absolute top-2 left-2 bg-metamaster-gray-100 rounded-full p-1 opacity-50">
          <ElementTypeIcon type={item.type} />
        </div>
        
        {isEditing ? (
          <div className="pt-8 pb-2 px-2">
            <ElementEditor 
              type={item.type} 
              content={editableContent}
              props={editableProps}
              onChange={setEditableContent}
              onPropsChange={setEditableProps}
            />
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
