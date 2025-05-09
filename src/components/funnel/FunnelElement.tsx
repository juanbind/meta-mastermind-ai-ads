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
    { 
      name: 'Landing',
      type: 'landing',
      content: [
        {
          id: 'hero-1',
          type: 'HERO_SECTION',
          content: JSON.stringify({
            headline: 'Your Bold Sales Headline Here',
            subheadline: 'Supporting subheadline that adds more context and builds interest',
            backgroundType: 'color',
            backgroundColor: '#f8f9fa',
            alignment: 'center',
            cta: { text: 'Get Started', url: 'next-page' }
          }),
          props: { padding: 'large' }
        },
        {
          id: 'features-1',
          type: 'FEATURES_BLOCK',
          content: JSON.stringify({
            heading: 'Benefits',
            features: [
              { title: 'Benefit 1', description: 'Description of this amazing benefit', icon: 'check-circle' },
              { title: 'Benefit 2', description: 'Description of this amazing benefit', icon: 'check-circle' },
              { title: 'Benefit 3', description: 'Description of this amazing benefit', icon: 'check-circle' }
            ]
          }),
          props: { columns: 3 }
        },
        {
          id: 'cta-1',
          type: 'BUTTON',
          content: 'Continue to Offer',
          props: { variant: 'primary', size: 'large', url: 'next-page', action: 'navigate' }
        }
      ]
    },
    { 
      name: 'Offer', 
      type: 'offer',
      content: [
        {
          id: 'headline-1',
          type: 'HEADLINE',
          content: 'Special Limited Time Offer',
          props: { level: 'h2', align: 'center' }
        },
        {
          id: 'pricing-1',
          type: 'PRICING_BLOCK',
          content: JSON.stringify({
            pricing: {
              price: '97',
              currency: '$',
              period: 'one-time',
              originalPrice: '197'
            },
            features: [
              'Feature 1 of your product',
              'Feature 2 of your product',
              'Feature 3 of your product'
            ],
            guarantee: '30-day money back guarantee'
          }),
          props: { featured: true }
        },
        {
          id: 'button-1',
          type: 'BUTTON',
          content: 'Buy Now',
          props: { variant: 'primary', size: 'large', url: 'next-page', action: 'navigate' }
        }
      ]
    },
    { 
      name: 'Checkout',
      type: 'checkout',
      content: [
        {
          id: 'headline-1',
          type: 'HEADLINE',
          content: 'Complete Your Purchase',
          props: { level: 'h2', align: 'center' }
        },
        {
          id: 'form-1',
          type: 'FORM',
          content: JSON.stringify({
            fields: [
              { name: 'name', label: 'Full Name', type: 'text', required: true },
              { name: 'email', label: 'Email', type: 'email', required: true },
              { name: 'cardNumber', label: 'Card Number', type: 'text', required: true },
              { name: 'expiry', label: 'Expiration Date', type: 'text', required: true },
              { name: 'cvv', label: 'CVV', type: 'text', required: true }
            ],
            buttonText: 'Complete Purchase'
          }),
          props: { submitEndpoint: 'process-payment' }
        }
      ]
    },
    { 
      name: 'Thank You',
      type: 'thank-you',
      content: [
        {
          id: 'headline-1',
          type: 'HEADLINE',
          content: 'Thank You For Your Purchase!',
          props: { level: 'h2', align: 'center' }
        },
        {
          id: 'paragraph-1',
          type: 'PARAGRAPH',
          content: 'Your order has been successfully processed. Check your email for further instructions.',
          props: { size: 'medium' }
        },
        {
          id: 'button-1',
          type: 'BUTTON',
          content: 'Download Your Product',
          props: { variant: 'primary', size: 'medium', url: '#', action: 'link' }
        }
      ]
    }
  ],
  LEAD_CAPTURE: [
    { 
      name: 'Lead Form',
      type: 'form',
      content: [
        {
          id: 'headline-1',
          type: 'HEADLINE',
          content: 'Get Your Free Guide',
          props: { level: 'h2', align: 'center' }
        },
        {
          id: 'paragraph-1',
          type: 'PARAGRAPH',
          content: 'Enter your details below to receive our exclusive content right in your inbox.',
          props: { size: 'medium' }
        },
        {
          id: 'form-1',
          type: 'FORM',
          content: JSON.stringify({
            fields: [
              { name: 'name', label: 'Your Name', type: 'text', required: true },
              { name: 'email', label: 'Email Address', type: 'email', required: true }
            ],
            buttonText: 'Send Me The Guide'
          }),
          props: { submitEndpoint: 'validate-contact' }
        }
      ]
    },
    { 
      name: 'Thank You',
      type: 'thank-you',
      content: [
        {
          id: 'headline-1',
          type: 'HEADLINE',
          content: 'Thank You For Joining!',
          props: { level: 'h2', align: 'center' }
        },
        {
          id: 'paragraph-1',
          type: 'PARAGRAPH',
          content: 'Check your email for your free guide. It should arrive within the next few minutes.',
          props: { size: 'medium' }
        },
        {
          id: 'social-proof-1',
          type: 'SOCIAL_PROOF',
          content: JSON.stringify({
            heading: 'Join thousands of happy subscribers',
            testimonials: [
              { text: 'This guide changed how I approach my business', author: 'Jane D.' },
              { text: "Best resource I've found online in years", author: 'Mark S.' }
            ]
          }),
          props: {}
        }
      ]
    }
  ],
  WEBINAR_REGISTRATION: [
    { 
      name: 'Registration',
      type: 'form',
      content: [
        {
          id: 'headline-1',
          type: 'HEADLINE',
          content: 'Register For Our Free Webinar',
          props: { level: 'h2', align: 'center' }
        },
        {
          id: 'image-1',
          type: 'IMAGE',
          content: '',
          props: { src: 'https://via.placeholder.com/800x400', alt: 'Webinar Promo', width: 800, height: 400 }
        },
        {
          id: 'paragraph-1',
          type: 'PARAGRAPH',
          content: 'Join us for this exclusive training where you\'ll learn the exact strategies we used to grow our business.',
          props: { size: 'medium' }
        },
        {
          id: 'form-1',
          type: 'FORM',
          content: JSON.stringify({
            fields: [
              { name: 'name', label: 'Full Name', type: 'text', required: true },
              { name: 'email', label: 'Email Address', type: 'email', required: true },
              { name: 'phone', label: 'Phone Number', type: 'tel', required: false }
            ],
            buttonText: 'Reserve My Spot Now'
          }),
          props: { submitEndpoint: 'register-webinar' }
        }
      ]
    },
    {
      name: 'Confirmation',
      type: 'confirmation',
      content: [
        {
          id: 'headline-1',
          type: 'HEADLINE',
          content: 'You\'re Registered!',
          props: { level: 'h2', align: 'center' }
        },
        {
          id: 'paragraph-1',
          type: 'PARAGRAPH',
          content: 'Your spot has been reserved. Mark your calendar and check your email for joining instructions.',
          props: { size: 'medium' }
        },
        {
          id: 'calendar-1',
          type: 'CALENDAR',
          content: JSON.stringify({
            event: {
              title: 'Exclusive Webinar Training',
              date: '2025-06-15T18:00:00Z',
              duration: 60
            }
          }),
          props: { allowAdd: true }
        }
      ]
    },
    {
      name: 'Webinar Room',
      type: 'webinar',
      content: [
        {
          id: 'headline-1',
          type: 'HEADLINE',
          content: 'Welcome to the Webinar',
          props: { level: 'h2', align: 'center' }
        },
        {
          id: 'video-1',
          type: 'VIDEO',
          content: JSON.stringify({
            videoId: 'YE7VzlLtp-4',
            platform: 'youtube'
          }),
          props: { autoplay: false, controls: true }
        },
        {
          id: 'form-1',
          type: 'FORM',
          content: JSON.stringify({
            fields: [
              { name: 'question', label: 'Ask a Question', type: 'textarea', required: true }
            ],
            buttonText: 'Submit Question'
          }),
          props: { submitEndpoint: 'webinar-question' }
        }
      ]
    }
  ],
  PRODUCT_LAUNCH: [
    { 
      name: 'Teaser',
      type: 'landing',
      content: [
        {
          id: 'headline-1',
          type: 'HEADLINE',
          content: 'Something Big Is Coming...',
          props: { level: 'h1', align: 'center' }
        },
        {
          id: 'paragraph-1',
          type: 'PARAGRAPH',
          content: 'We\'re about to reveal our most requested product ever. Join the waitlist to be the first to know.',
          props: { size: 'large' }
        },
        {
          id: 'countdown-1',
          type: 'COUNTDOWN',
          content: JSON.stringify({
            targetDate: '2025-07-01T10:00:00Z',
            title: 'Launching In:'
          }),
          props: {}
        },
        {
          id: 'form-1',
          type: 'FORM',
          content: JSON.stringify({
            fields: [
              { name: 'email', label: 'Email Address', type: 'email', required: true }
            ],
            buttonText: 'Join the Waitlist'
          }),
          props: { submitEndpoint: 'validate-contact' }
        }
      ]
    },
    { 
      name: 'Launch',
      type: 'launch',
      content: [
        {
          id: 'headline-1',
          type: 'HEADLINE',
          content: 'Introducing Our New Product',
          props: { level: 'h1', align: 'center' }
        },
        {
          id: 'video-1',
          type: 'VIDEO',
          content: JSON.stringify({
            videoId: 'YE7VzlLtp-4',
            platform: 'youtube'
          }),
          props: { autoplay: false, controls: true }
        },
        {
          id: 'features-1',
          type: 'FEATURES_BLOCK',
          content: JSON.stringify({
            heading: 'Key Features',
            features: [
              { title: 'Feature 1', description: 'Description of this feature', icon: 'zap' },
              { title: 'Feature 2', description: 'Description of this feature', icon: 'shield' },
              { title: 'Feature 3', description: 'Description of this feature', icon: 'star' }
            ]
          }),
          props: { columns: 3 }
        },
        {
          id: 'button-1',
          type: 'BUTTON',
          content: 'See Pricing Options',
          props: { variant: 'primary', size: 'large', url: 'next-page', action: 'navigate' }
        }
      ]
    },
    { 
      name: 'Pricing',
      type: 'pricing',
      content: [
        {
          id: 'headline-1',
          type: 'HEADLINE',
          content: 'Choose Your Plan',
          props: { level: 'h2', align: 'center' }
        },
        {
          id: 'pricing-1',
          type: 'PRICING_BLOCK',
          content: JSON.stringify({
            plans: [
              {
                name: 'Basic',
                price: '49',
                period: 'per month',
                features: ['Feature 1', 'Feature 2', 'Feature 3'],
                cta: 'Choose Basic'
              },
              {
                name: 'Pro',
                price: '99',
                period: 'per month',
                features: ['All Basic features', 'Feature 4', 'Feature 5', 'Feature 6'],
                cta: 'Choose Pro',
                featured: true
              },
              {
                name: 'Enterprise',
                price: '199',
                period: 'per month',
                features: ['All Pro features', 'Feature 7', 'Feature 8', 'Feature 9'],
                cta: 'Choose Enterprise'
              }
            ]
          }),
          props: {}
        }
      ]
    },
    { 
      name: 'Checkout',
      type: 'checkout',
      content: [
        {
          id: 'headline-1',
          type: 'HEADLINE',
          content: 'Complete Your Order',
          props: { level: 'h2', align: 'center' }
        },
        {
          id: 'form-1',
          type: 'FORM',
          content: JSON.stringify({
            fields: [
              { name: 'name', label: 'Full Name', type: 'text', required: true },
              { name: 'email', label: 'Email', type: 'email', required: true },
              { name: 'cardNumber', label: 'Card Number', type: 'text', required: true },
              { name: 'expiry', label: 'Expiration Date', type: 'text', required: true },
              { name: 'cvv', label: 'CVV', type: 'text', required: true }
            ],
            buttonText: 'Complete Purchase'
          }),
          props: { submitEndpoint: 'process-payment' }
        }
      ]
    }
  ],
  SURVEY_FUNNEL: [
    { 
      name: 'Welcome',
      type: 'welcome',
      content: [
        {
          id: 'headline-1',
          type: 'HEADLINE',
          content: 'Take Our 2-Minute Survey',
          props: { level: 'h2', align: 'center' }
        },
        {
          id: 'paragraph-1',
          type: 'PARAGRAPH',
          content: 'Answer a few quick questions and get personalized recommendations just for you.',
          props: { size: 'medium' }
        },
        {
          id: 'button-1',
          type: 'BUTTON',
          content: 'Start Survey',
          props: { variant: 'primary', size: 'large', url: 'next-page', action: 'navigate' }
        }
      ]
    },
    { 
      name: 'Questions',
      type: 'survey',
      content: [
        {
          id: 'headline-1',
          type: 'HEADLINE',
          content: 'Tell Us About Yourself',
          props: { level: 'h2', align: 'center' }
        },
        {
          id: 'question-1',
          type: 'MULTIPLE_CHOICE',
          content: JSON.stringify({
            id: 'question-1',
            question: 'What is your primary goal?',
            required: true,
            options: [
              { label: 'Option 1', value: 'option1' },
              { label: 'Option 2', value: 'option2' },
              { label: 'Option 3', value: 'option3' }
            ]
          }),
          props: {}
        },
        {
          id: 'question-2',
          type: 'DROPDOWN',
          content: JSON.stringify({
            id: 'dropdown-1',
            label: 'How did you hear about us?',
            placeholder: 'Select an option',
            required: true,
            options: [
              { label: 'Social Media', value: 'social' },
              { label: 'Friend', value: 'referral' },
              { label: 'Search', value: 'search' },
              { label: 'Advertisement', value: 'ad' }
            ]
          }),
          props: {}
        },
        {
          id: 'button-1',
          type: 'BUTTON',
          content: 'Continue',
          props: { variant: 'primary', size: 'medium', url: 'next-page', action: 'navigate' }
        }
      ]
    },
    { 
      name: 'Results',
      type: 'results',
      content: [
        {
          id: 'headline-1',
          type: 'HEADLINE',
          content: 'Your Personalized Results',
          props: { level: 'h2', align: 'center' }
        },
        {
          id: 'paragraph-1',
          type: 'PARAGRAPH',
          content: 'Based on your answers, we recommend the following:',
          props: { size: 'medium' }
        },
        {
          id: 'dynamic-1',
          type: 'DYNAMIC_TEXT',
          content: JSON.stringify({
            conditionalText: [
              {
                condition: "answers.question-1 === 'option1'",
                text: "You selected Option 1. Here's our recommendation for that goal..."
              },
              {
                condition: "answers.question-1 === 'option2'",
                text: "You selected Option 2. Here's our recommendation for that goal..."
              },
              {
                condition: "answers.question-1 === 'option3'",
                text: "You selected Option 3. Here's our recommendation for that goal..."
              }
            ],
            defaultText: "Here's our general recommendation..."
          }),
          props: {}
        },
        {
          id: 'button-1',
          type: 'BUTTON',
          content: 'Check Out Our Solution',
          props: { variant: 'primary', size: 'large', url: '#', action: 'link' }
        }
      ]
    }
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
