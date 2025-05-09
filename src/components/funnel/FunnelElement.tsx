
import React from 'react';
import { useDrag } from 'react-dnd';

export interface FunnelElementProps {
  type: string;
  icon: React.ReactNode;
  label: string;
  style?: React.CSSProperties;
}

export const ELEMENT_TYPES = {
  HEADLINE: 'headline',
  PARAGRAPH: 'paragraph',
  IMAGE: 'image',
  VIDEO: 'video',
  FORM: 'form',
  BULLET_LIST: 'bullet-list',
  BUTTON: 'button',
  INPUT: 'input',
  DROPDOWN: 'dropdown',
  CALENDAR: 'calendar',
  DIVIDER: 'divider',
  ICON: 'icon',
  SPACING: 'spacing',
  
  // Content block types
  HERO_SECTION: 'hero-section',
  IMAGE_TEXT_SECTION: 'image-text-section',
  FEATURES_BLOCK: 'features-block',
  TESTIMONIAL_BLOCK: 'testimonial-block',
  CTA_BLOCK: 'cta-block',
  FAQ_BLOCK: 'faq-block',
  PRICING_BLOCK: 'pricing-block',
  CONTACT_BLOCK: 'contact-block',
  LIST_WITH_ICONS: 'list-with-icons',
  
  // Conversion elements
  SOCIAL_PROOF: 'social-proof',
  COUNTDOWN: 'countdown',
  TRUST_BADGES: 'trust-badges',
  
  // Text & Typography elements
  DYNAMIC_TEXT: 'dynamic-text',
  CUSTOM_FONT_TEXT: 'custom-font-text',
  
  // Media & Visuals elements
  IMAGE_BLOCK: 'image-block',
  VIDEO_EMBED: 'video-embed',
  IMAGE_SLIDER: 'image-slider',
  
  // Interactive Components
  MULTIPLE_CHOICE: 'multiple-choice',
  DATE_PICKER: 'date-picker',
  FILE_UPLOAD: 'file-upload',
  
  // Forms & Data Collection
  FORM_BLOCK: 'form-block',
  PHONE_INPUT: 'phone-input',
  CHECKBOX: 'checkbox',
  
  // Layout & Design
  SECTION_TEMPLATE: 'section-template',
  CARD: 'card',
  BACKGROUND: 'background',
  
  // Navigation & Progress
  PROGRESS_BAR: 'progress-bar',
  
  // Advanced Features
  HTML_BLOCK: 'html-block',
  CONDITIONAL_BLOCK: 'conditional-block',
  LEAD_CAPTURE_FORM: 'lead-capture-form'
};

const FunnelElement: React.FC<FunnelElementProps> = ({ type, icon, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'funnel-element',
    item: { type, label },
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
    >
      <div className="mr-3 text-purple-600 flex-shrink-0">{icon}</div>
      <span className="font-medium text-gray-700 text-sm">{label}</span>
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
