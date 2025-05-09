
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
  FILE_UPLOAD: 'FILE_UPLOAD',  // Adding this missing element type
  DATE_PICKER: 'DATE_PICKER',  // Adding this missing element type
  
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

const FunnelElement: React.FC<FunnelElementProps> = ({ type, icon, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FUNNEL_ELEMENT',
    item: { type },
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
