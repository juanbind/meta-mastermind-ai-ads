
import React from 'react';
import { useDrag } from 'react-dnd';

export interface FunnelElementProps {
  type: string;
  icon: React.ReactNode;
  label: string;
  style?: React.CSSProperties;
  category?: 'content' | 'basic' | 'conversion' | 'advanced';
  description?: string;
  defaultProps?: Record<string, any>;
}

export const ELEMENT_TYPES = {
  // Basic elements
  HEADLINE: 'headline',
  PARAGRAPH: 'paragraph',
  IMAGE: 'image',
  VIDEO: 'video',
  BUTTON: 'button',
  DIVIDER: 'divider',
  SPACING: 'spacing',
  ICON: 'icon',
  
  // Form elements
  FORM: 'form',
  INPUT: 'input',
  DROPDOWN: 'dropdown',
  CHECKBOX: 'checkbox',
  MULTIPLE_CHOICE: 'multiple-choice',
  CALENDAR: 'calendar',
  DATE_PICKER: 'date-picker',
  FILE_UPLOAD: 'file-upload',
  PHONE_INPUT: 'phone-input',
  
  // Content blocks
  HERO_SECTION: 'hero-section',
  IMAGE_TEXT_SECTION: 'image-text-section',
  FEATURES_BLOCK: 'features-block',
  TESTIMONIAL_BLOCK: 'testimonial-block',
  CTA_BLOCK: 'cta-block',
  FAQ_BLOCK: 'faq-block',
  PRICING_BLOCK: 'pricing-block',
  CONTACT_BLOCK: 'contact-block',
  LIST_WITH_ICONS: 'list-with-icons',
  
  // Advanced content elements
  BULLET_LIST: 'bullet-list',
  SOCIAL_PROOF: 'social-proof',
  COUNTDOWN: 'countdown',
  TRUST_BADGES: 'trust-badges',
  DYNAMIC_TEXT: 'dynamic-text',
  CUSTOM_FONT_TEXT: 'custom-font-text',
  
  // Media elements
  IMAGE_BLOCK: 'image-block',
  VIDEO_EMBED: 'video-embed',
  IMAGE_SLIDER: 'image-slider',
  
  // Advanced forms and logic
  LEAD_CAPTURE_FORM: 'lead-capture-form',
  FORM_BLOCK: 'form-block',
  CONDITIONAL_BLOCK: 'conditional-block',
  HTML_BLOCK: 'html-block',
  PROGRESS_BAR: 'progress-bar',
  
  // Layout elements
  SECTION_TEMPLATE: 'section-template',
  CARD: 'card',
  BACKGROUND: 'background',
};

// Group elements by categories for better organization
export const ELEMENT_CATEGORIES = {
  CONTENT_BLOCKS: [
    ELEMENT_TYPES.HERO_SECTION,
    ELEMENT_TYPES.IMAGE_TEXT_SECTION,
    ELEMENT_TYPES.FEATURES_BLOCK,
    ELEMENT_TYPES.TESTIMONIAL_BLOCK,
    ELEMENT_TYPES.CTA_BLOCK,
    ELEMENT_TYPES.FAQ_BLOCK,
    ELEMENT_TYPES.PRICING_BLOCK,
    ELEMENT_TYPES.LIST_WITH_ICONS,
  ],
  BASIC_ELEMENTS: [
    ELEMENT_TYPES.HEADLINE,
    ELEMENT_TYPES.PARAGRAPH,
    ELEMENT_TYPES.IMAGE,
    ELEMENT_TYPES.BUTTON,
    ELEMENT_TYPES.DIVIDER,
    ELEMENT_TYPES.SPACING,
    ELEMENT_TYPES.BULLET_LIST,
  ],
  CONVERSION_ELEMENTS: [
    ELEMENT_TYPES.FORM,
    ELEMENT_TYPES.LEAD_CAPTURE_FORM,
    ELEMENT_TYPES.INPUT,
    ELEMENT_TYPES.MULTIPLE_CHOICE,
    ELEMENT_TYPES.DROPDOWN,
    ELEMENT_TYPES.CHECKBOX,
  ],
  ADVANCED_ELEMENTS: [
    ELEMENT_TYPES.CONDITIONAL_BLOCK,
    ELEMENT_TYPES.HTML_BLOCK,
    ELEMENT_TYPES.DYNAMIC_TEXT,
    ELEMENT_TYPES.COUNTDOWN,
    ELEMENT_TYPES.SOCIAL_PROOF,
  ]
};

// Default props for each element type
export const DEFAULT_ELEMENT_PROPS = {
  [ELEMENT_TYPES.HEADLINE]: {
    level: 'h2',
    fontSize: 'text-2xl',
    fontWeight: 'font-bold',
    textAlign: 'text-left',
    color: '#1A1F2C'
  },
  [ELEMENT_TYPES.PARAGRAPH]: {
    fontSize: 'text-base',
    lineHeight: 'leading-relaxed',
    color: '#403E43'
  },
  [ELEMENT_TYPES.BUTTON]: {
    bgColor: '#9b87f5',
    textColor: 'white',
    size: 'md',
    borderRadius: 8
  },
  [ELEMENT_TYPES.HERO_SECTION]: {
    bgColor: '#f9fafb',
    layout: 'center'
  },
  [ELEMENT_TYPES.FEATURES_BLOCK]: {
    columns: 3
  },
  [ELEMENT_TYPES.IMAGE]: {
    borderRadius: 8,
    alignment: 'center'
  },
  [ELEMENT_TYPES.LEAD_CAPTURE_FORM]: {
    bgColor: '#ffffff',
    borderRadius: 8
  }
};

const FunnelElement: React.FC<FunnelElementProps> = ({ 
  type, 
  icon, 
  label, 
  category = 'basic',
  description
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'funnel-element',
    item: { 
      type, 
      label,
      defaultProps: DEFAULT_ELEMENT_PROPS[type as keyof typeof DEFAULT_ELEMENT_PROPS] || {}
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`relative flex items-center justify-start h-auto py-3 px-4 border border-gray-200 w-full rounded-lg cursor-grab transition-all ${
        isDragging ? 'opacity-50 border-purple-400 bg-purple-50' : 'bg-white hover:border-purple-300 hover:shadow-sm'
      }`}
      title={description}
    >
      <div className="mr-3 text-purple-600 flex-shrink-0">{icon}</div>
      <span className="font-medium text-gray-700 text-sm">{label}</span>
      {/* Category indicator */}
      <div className={`absolute top-0 right-0 w-2 h-2 rounded-full m-1 ${
        category === 'content' ? 'bg-blue-400' : 
        category === 'conversion' ? 'bg-green-400' : 
        category === 'advanced' ? 'bg-orange-400' : 
        'bg-purple-400'
      }`}></div>
      
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-60">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1H4V4H1V1Z" fill="#9b87f5" />
          <path d="M6 1H9V4H6V1Z" fill="#9b87f5" />
          <path d="M1 6H4V9H1V6Z" fill="#9b87f5" />
          <path d="M6 6H9V9H6V6Z" fill="#9b87f5" />
        </svg>
      </div>
    </div>
  );
};

export default FunnelElement;
