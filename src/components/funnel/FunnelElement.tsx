
import React from 'react';
import { useDrag } from 'react-dnd';

export interface FunnelElementProps {
  type: string;
  icon: React.ReactNode;
  label: string;
  style?: React.CSSProperties;
}

export const ELEMENT_TYPES = {
  // Basic elements
  HEADLINE: 'HEADLINE',
  PARAGRAPH: 'PARAGRAPH',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  FORM: 'FORM',
  BULLET_LIST: 'BULLET_LIST',
  BUTTON: 'BUTTON',
  INPUT: 'INPUT',
  DROPDOWN: 'DROPDOWN',
  CALENDAR: 'CALENDAR',
  DIVIDER: 'DIVIDER',
  ICON: 'ICON',
  SPACING: 'SPACING',
  
  // Content block types
  HERO_SECTION: 'HERO_SECTION',
  IMAGE_TEXT_SECTION: 'IMAGE_TEXT_SECTION',
  FEATURES_BLOCK: 'FEATURES_BLOCK',
  TESTIMONIAL_BLOCK: 'TESTIMONIAL_BLOCK',
  CTA_BLOCK: 'CTA_BLOCK',
  FAQ_BLOCK: 'FAQ_BLOCK',
  PRICING_BLOCK: 'PRICING_BLOCK',
  LIST_WITH_ICONS: 'LIST_WITH_ICONS',
  
  // Conversion elements
  SOCIAL_PROOF: 'SOCIAL_PROOF',
  COUNTDOWN: 'COUNTDOWN',
  TRUST_BADGES: 'TRUST_BADGES',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  CHECKBOX: 'CHECKBOX',
  
  // Text & Typography elements
  DYNAMIC_TEXT: 'DYNAMIC_TEXT',
  CUSTOM_FONT_TEXT: 'CUSTOM_FONT_TEXT',
  
  // Media & Visuals elements
  IMAGE_BLOCK: 'IMAGE_BLOCK',
  VIDEO_EMBED: 'VIDEO_EMBED',
  IMAGE_SLIDER: 'IMAGE_SLIDER',
  
  // Forms & Data Collection
  FORM_BLOCK: 'FORM_BLOCK',
  PHONE_INPUT: 'PHONE_INPUT',
  FILE_UPLOAD: 'FILE_UPLOAD',
  DATE_PICKER: 'DATE_PICKER',
  
  // Layout & Design
  SECTION_TEMPLATE: 'SECTION_TEMPLATE',
  CARD: 'CARD',
  BACKGROUND: 'BACKGROUND',
  
  // Navigation & Progress
  PROGRESS_BAR: 'PROGRESS_BAR',
  
  // Advanced Features
  HTML_BLOCK: 'HTML_BLOCK',
  CONDITIONAL_BLOCK: 'CONDITIONAL_BLOCK'
};

// Define template types with multi-page structures
export const TEMPLATE_TYPES = {
  SALES_FUNNEL: 'SALES_FUNNEL',
  LEAD_CAPTURE: 'LEAD_CAPTURE',
  WEBINAR_REGISTRATION: 'WEBINAR_REGISTRATION',
  PRODUCT_LAUNCH: 'PRODUCT_LAUNCH',
  SURVEY_FUNNEL: 'SURVEY_FUNNEL'
};

// Define the pre-built page structures for each template type
export const TEMPLATE_STRUCTURES = {
  SALES_FUNNEL: [
    { name: 'Landing', type: 'landing' },
    { name: 'Offer', type: 'offer' },
    { name: 'Checkout', type: 'checkout' },
    { name: 'Thank You', type: 'thank-you' }
  ],
  LEAD_CAPTURE: [
    { name: 'Lead Form', type: 'form' },
    { name: 'Thank You', type: 'thank-you' }
  ],
  WEBINAR_REGISTRATION: [
    { name: 'Registration', type: 'form' },
    { name: 'Confirmation', type: 'confirmation' },
    { name: 'Webinar Room', type: 'webinar' }
  ],
  PRODUCT_LAUNCH: [
    { name: 'Teaser', type: 'landing' },
    { name: 'Launch', type: 'launch' },
    { name: 'Pricing', type: 'pricing' },
    { name: 'Checkout', type: 'checkout' }
  ],
  SURVEY_FUNNEL: [
    { name: 'Welcome', type: 'welcome' },
    { name: 'Questions', type: 'survey' },
    { name: 'Results', type: 'results' }
  ]
};

const FunnelElement: React.FC<FunnelElementProps> = ({ type, icon, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FUNNEL_ELEMENT',
    item: { 
      type,
      isTemplate: Object.values(TEMPLATE_TYPES).includes(type as any),
      templatePages: TEMPLATE_STRUCTURES[type as keyof typeof TEMPLATE_STRUCTURES]
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex items-center justify-start h-auto py-3 px-4 border-dashed border-2 w-full rounded cursor-grab ${
        isDragging ? 'opacity-50 border-metamaster-primary bg-metamaster-primary/5' : 'border-gray-200'
      }`}
    >
      <div className="mr-3 text-metamaster-primary">{icon}</div>
      <span>{label}</span>
    </div>
  );
};

export default FunnelElement;
