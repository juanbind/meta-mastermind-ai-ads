
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
  FEATURES_BLOCK: 'features-block',
  TESTIMONIAL_BLOCK: 'testimonial-block',
  CTA_BLOCK: 'cta-block',
  FAQ_BLOCK: 'faq-block',
  PRICING_BLOCK: 'pricing-block',
  CONTACT_BLOCK: 'contact-block',
  
  // Conversion elements
  SOCIAL_PROOF: 'social-proof',
  COUNTDOWN: 'countdown',
  TRUST_BADGES: 'trust-badges',
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
      className={`flex items-center justify-start h-auto py-3 px-4 border-dashed border-2 w-full rounded cursor-grab ${
        isDragging ? 'opacity-50 border-metamaster-primary bg-metamaster-primary/5' : 'border-gray-200'
      }`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="mr-3 text-metamaster-primary">{icon}</div>
      <span>{label}</span>
    </div>
  );
};

export default FunnelElement;
