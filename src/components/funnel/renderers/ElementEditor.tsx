
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ELEMENT_TYPES } from '../FunnelElement';

interface ElementEditorProps {
  type: string;
  content: any;
  onChange: (content: any) => void;
}

const ElementEditor: React.FC<ElementEditorProps> = ({ type, content, onChange }) => {
  // Different edit interfaces based on element type
  switch (type) {
    case ELEMENT_TYPES.HEADLINE:
    case ELEMENT_TYPES.PARAGRAPH:
    case ELEMENT_TYPES.BUTTON:
    case ELEMENT_TYPES.DYNAMIC_TEXT:
    case ELEMENT_TYPES.CUSTOM_FONT_TEXT:
      return (
        <Input
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="mb-2"
        />
      );
    
    case ELEMENT_TYPES.IMAGE:
    case ELEMENT_TYPES.IMAGE_BLOCK:
    case ELEMENT_TYPES.VIDEO:
    case ELEMENT_TYPES.VIDEO_EMBED:
      return (
        <Input
          value={content}
          onChange={(e) => onChange(e.target.value)}
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
          value={typeof content === 'object' ? JSON.stringify(content, null, 2) : content}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          className="mb-2 font-mono text-xs"
          placeholder="Enter JSON configuration"
        />
      );
    
    default:
      return (
        <Input
          value={typeof content === 'object' ? JSON.stringify(content) : content}
          onChange={(e) => onChange(e.target.value)}
          className="mb-2"
        />
      );
  }
};

export default ElementEditor;
