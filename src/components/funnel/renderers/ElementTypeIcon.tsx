
import React from 'react';
import { 
  Image, Video, ListOrdered, Type, FormInput, Calendar, FileText, 
  Layout, CheckSquare, Upload, Phone
} from 'lucide-react';
import { ELEMENT_TYPES } from '../FunnelElement';

interface ElementTypeIconProps {
  type: string;
}

const ElementTypeIcon: React.FC<ElementTypeIconProps> = ({ type }) => {
  switch (type) {
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

export default ElementTypeIcon;
