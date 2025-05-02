
import React from 'react';
import { 
  CheckCircle, 
  Star, 
  Heart, 
  Clock, 
  Shield, 
  AlertCircle as AlertCircleIcon,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  content: {
    headline: string;
    subheadline: string;
    buttonText: string;
    trustBadges?: string[];
  };
  props?: {
    bgType?: 'color' | 'image' | 'video';
    bgColor?: string;
    bgImage?: string;
    bgVideo?: string;
    layout?: 'left' | 'center' | 'right';
    style?: {
      fontFamily?: string;
      headingSize?: string;
      subheadingSize?: string;
      color?: string;
      buttonColor?: string;
      buttonTextColor?: string;
    };
  };
  device?: 'mobile' | 'tablet' | 'desktop';
}

interface FeaturesBlockProps {
  content: {
    headline: string;
    features: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
  props?: {
    layout?: 'grid' | 'alternating';
    columns?: number;
    style?: {
      bgColor?: string;
      iconColor?: string;
      headingColor?: string;
      textColor?: string;
    };
  };
  device?: 'mobile' | 'tablet' | 'desktop';
}

interface TestimonialBlockProps {
  content: {
    testimonials: {
      quote: string;
      name: string;
      role: string;
      rating: number;
    }[];
  };
  props?: {
    layout?: 'grid' | 'slider';
    showPhotos?: boolean;
    showRatings?: boolean;
    style?: {
      bgColor?: string;
      textColor?: string;
      quoteColor?: string;
      accentColor?: string;
    };
  };
  device?: 'mobile' | 'tablet' | 'desktop';
}

interface CtaBlockProps {
  content: {
    headline: string;
    subheadline: string;
    buttonText: string;
    hasCountdown: boolean;
    countdownDate: string;
  };
  props?: {
    bgType?: 'color' | 'image' | 'gradient';
    bgColor?: string;
    bgImage?: string;
    gradient?: string;
    style?: {
      textColor?: string;
      buttonColor?: string;
      buttonTextColor?: string;
      padding?: string;
    };
  };
  device?: 'mobile' | 'tablet' | 'desktop';
}

interface FaqBlockProps {
  content: {
    headline: string;
    faqs: {
      question: string;
      answer: string;
    }[];
  };
  props?: {
    layout?: 'accordion' | 'grid';
    enableSearch?: boolean;
    style?: {
      bgColor?: string;
      textColor?: string;
      accentColor?: string;
      borderColor?: string;
    };
  };
  device?: 'mobile' | 'tablet' | 'desktop';
}

interface PricingBlockProps {
  content: {
    headline: string;
    subheadline: string;
    isYearly: boolean;
    plans: {
      name: string;
      monthlyPrice: number;
      yearlyPrice: number;
      description: string;
      features: string[];
      isPopular: boolean;
      buttonText: string;
    }[];
  };
  props?: {
    layout?: 'horizontal' | 'vertical';
    showToggle?: boolean;
    style?: {
      bgColor?: string;
      textColor?: string;
      accentColor?: string;
      popularHighlightColor?: string;
      borderColor?: string;
    };
  };
  device?: 'mobile' | 'tablet' | 'desktop';
}

const renderIcon = (name: string, size: number = 24, color: string = '#3B82F6') => {
  switch (name.toLowerCase()) {
    case 'check':
      return <CheckCircle size={size} color={color} />;
    case 'star':
      return <Star size={size} color={color} />;
    case 'heart':
      return <Heart size={size} color={color} />;
    default:
      return <CheckCircle size={size} color={color} />;
  }
};

// Star Rating Component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star 
          key={i}
          size={16}
          fill={i < rating ? '#FFD700' : 'none'}
          stroke={i < rating ? '#FFD700' : '#D1D5DB'}
        />
      ))}
    </div>
  );
};

// Hero Section Component
const HeroSection: React.FC<HeroSectionProps> = ({ content, props, device }) => {
  const {
    headline = 'Powerful Headline That Converts',
    subheadline = 'Supporting text that explains your offer and removes objections',
    buttonText = 'Get Started Now',
    trustBadges = []
  } = content || {};

  const {
    bgType = 'color',
    bgColor = '#f9fafb',
    layout = 'center',
    style = {
      headingSize: '48px',
      subheadingSize: '20px',
      color: '#111827',
      buttonColor: '#3B82F6',
      buttonTextColor: '#ffffff'
    }
  } = props || {};

  // Apply mobile styles
  const headingSize = device === 'mobile' ? '32px' 
    : device === 'tablet' ? '40px'
    : style.headingSize;
  
  const subheadingSize = device === 'mobile' ? '18px'
    : device === 'tablet' ? '20px'
    : style.subheadingSize;

  const textAlign = layout === 'center' ? 'text-center' : 
    layout === 'left' ? 'text-left' : 'text-right';

  return (
    <div 
      className={`w-full py-12 px-4 ${textAlign}`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 
          className="font-bold mb-4"
          style={{ 
            fontSize: headingSize,
            color: style.color,
            lineHeight: 1.2
          }}
        >
          {headline}
        </h1>
        <p 
          className="mb-8"
          style={{
            fontSize: subheadingSize,
            color: style.color,
            opacity: 0.8
          }}
        >
          {subheadline}
        </p>
        <Button 
          className="px-6 py-3 font-medium"
          style={{
            backgroundColor: style.buttonColor,
            color: style.buttonTextColor
          }}
        >
          {buttonText}
        </Button>
        
        {trustBadges && trustBadges.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {trustBadges.map((badge, index) => (
              <div key={index} className="text-sm opacity-80" style={{ color: style.color }}>
                {badge}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Features Block Component
const FeaturesBlock: React.FC<FeaturesBlockProps> = ({ content, props, device }) => {
  const {
    headline = 'Why Choose Our Solution',
    features = []
  } = content || {};

  const {
    layout = 'grid',
    columns = 3,
    style = {
      bgColor: '#ffffff',
      iconColor: '#3B82F6',
      headingColor: '#111827',
      textColor: '#4b5563'
    }
  } = props || {};

  // Adjust columns for responsive
  const gridCols = device === 'mobile' ? 1 
    : device === 'tablet' ? 2 
    : columns;

  return (
    <div className="w-full py-12 px-4" style={{ backgroundColor: style.bgColor }}>
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-center font-bold text-3xl mb-12"
          style={{ color: style.headingColor }}
        >
          {headline}
        </h2>
        
        <div 
          className={`grid gap-8`}
          style={{ 
            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`
          }}
        >
          {features.map((feature, index) => (
            <div key={index} className={`flex flex-col ${layout === 'grid' ? 'items-center text-center' : 'items-start'}`}>
              <div className="mb-4">
                {renderIcon(feature.icon, 32, style.iconColor)}
              </div>
              <h3 
                className="text-xl font-medium mb-2"
                style={{ color: style.headingColor }}
              >
                {feature.title}
              </h3>
              <p style={{ color: style.textColor }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Testimonial Block Component
const TestimonialBlock: React.FC<TestimonialBlockProps> = ({ content, props, device }) => {
  const {
    testimonials = []
  } = content || {};

  const {
    layout = 'grid',
    showRatings = true,
    style = {
      bgColor: '#f9fafb',
      textColor: '#111827',
      quoteColor: '#6b7280',
      accentColor: '#3B82F6'
    }
  } = props || {};

  // Adjust layout for responsive
  const gridCols = device === 'mobile' ? 1 : device === 'tablet' ? 1 : 2;

  return (
    <div className="w-full py-12 px-4" style={{ backgroundColor: style.bgColor }}>
      <div className="max-w-6xl mx-auto">
        <div 
          className={`grid gap-8`}
          style={{ 
            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md"
            >
              {showRatings && (
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>
              )}
              <p 
                className="text-lg mb-4 italic"
                style={{ color: style.quoteColor }}
              >
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <div>
                  <p 
                    className="font-medium"
                    style={{ color: style.textColor }}
                  >
                    {testimonial.name}
                  </p>
                  <p 
                    className="text-sm"
                    style={{ color: style.quoteColor }}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// CTA Block Component
const CtaBlock: React.FC<CtaBlockProps> = ({ content, props, device }) => {
  const {
    headline = 'Ready to Get Started?',
    subheadline = 'Join thousands of satisfied customers today.',
    buttonText = 'Sign Up Now',
    hasCountdown = false,
    countdownDate = ''
  } = content || {};

  const {
    bgType = 'color',
    bgColor = '#3B82F6',
    gradient = 'linear-gradient(90deg, #3B82F6, #6366F1)',
    style = {
      textColor: '#ffffff',
      buttonColor: '#ffffff',
      buttonTextColor: '#3B82F6',
      padding: '60px'
    }
  } = props || {};

  // Adjust padding for responsive
  const paddingY = device === 'mobile' ? '40px' : style.padding;

  const backgroundStyle = bgType === 'gradient' 
    ? { background: gradient }
    : { backgroundColor: bgColor };

  return (
    <div 
      className="w-full px-4 text-center"
      style={{ 
        ...backgroundStyle,
        paddingTop: paddingY,
        paddingBottom: paddingY
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 
          className="text-3xl font-bold mb-4"
          style={{ color: style.textColor }}
        >
          {headline}
        </h2>
        <p 
          className="mb-8 text-lg"
          style={{ color: style.textColor, opacity: 0.9 }}
        >
          {subheadline}
        </p>
        
        {hasCountdown && countdownDate && (
          <div className="mb-8 flex justify-center">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="bg-white/20 rounded p-3 w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl font-bold" style={{ color: style.textColor }}>00</span>
                </div>
                <span style={{ color: style.textColor }}>Days</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white/20 rounded p-3 w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl font-bold" style={{ color: style.textColor }}>00</span>
                </div>
                <span style={{ color: style.textColor }}>Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white/20 rounded p-3 w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl font-bold" style={{ color: style.textColor }}>00</span>
                </div>
                <span style={{ color: style.textColor }}>Minutes</span>
              </div>
            </div>
          </div>
        )}
        
        <Button 
          className="px-8 py-4 font-medium text-lg"
          style={{
            backgroundColor: style.buttonColor,
            color: style.buttonTextColor
          }}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

// FAQ Block Component
const FaqBlock: React.FC<FaqBlockProps> = ({ content, props, device }) => {
  const {
    headline = 'Frequently Asked Questions',
    faqs = []
  } = content || {};

  const {
    layout = 'accordion',
    style = {
      bgColor: '#ffffff',
      textColor: '#111827',
      accentColor: '#3B82F6',
      borderColor: '#e5e7eb'
    }
  } = props || {};

  return (
    <div className="w-full py-12 px-4" style={{ backgroundColor: style.bgColor }}>
      <div className="max-w-4xl mx-auto">
        <h2 
          className="text-center font-bold text-3xl mb-12"
          style={{ color: style.textColor }}
        >
          {headline}
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border rounded-lg overflow-hidden"
              style={{ borderColor: style.borderColor }}
            >
              <div 
                className="p-4 font-medium flex justify-between items-center cursor-pointer"
                style={{ color: style.textColor }}
              >
                {faq.question}
                <span style={{ color: style.accentColor }}>+</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Pricing Block Component
const PricingBlock: React.FC<PricingBlockProps> = ({ content, props, device }) => {
  const {
    headline = 'Simple, Transparent Pricing',
    subheadline = 'No hidden fees or long-term contracts.',
    isYearly = false,
    plans = []
  } = content || {};

  const {
    layout = 'horizontal',
    showToggle = true,
    style = {
      bgColor: '#ffffff',
      textColor: '#111827',
      accentColor: '#3B82F6',
      popularHighlightColor: '#eef2ff',
      borderColor: '#e5e7eb'
    }
  } = props || {};

  // Adjust columns for responsive
  const gridCols = device === 'mobile' ? 1 
    : device === 'tablet' ? layout === 'horizontal' ? 2 : 1 
    : layout === 'horizontal' ? 3 : 1;

  return (
    <div className="w-full py-12 px-4" style={{ backgroundColor: style.bgColor }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className="font-bold text-3xl mb-4"
            style={{ color: style.textColor }}
          >
            {headline}
          </h2>
          <p
            className="text-lg"
            style={{ color: style.textColor, opacity: 0.8 }}
          >
            {subheadline}
          </p>
          
          {showToggle && (
            <div className="mt-6 inline-flex items-center bg-gray-100 p-1 rounded-lg">
              <button
                className={`px-4 py-2 rounded-md ${!isYearly ? 'bg-white shadow' : ''}`}
                style={{ color: style.textColor }}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 rounded-md ${isYearly ? 'bg-white shadow' : ''}`}
                style={{ color: style.textColor }}
              >
                Yearly
              </button>
            </div>
          )}
        </div>
        
        <div 
          className={`grid gap-8`}
          style={{ 
            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`
          }}
        >
          {plans.map((plan, index) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            
            return (
              <div 
                key={index} 
                className={`border rounded-xl p-6 ${plan.isPopular ? 'relative shadow-lg' : ''}`}
                style={{ 
                  borderColor: style.borderColor,
                  backgroundColor: plan.isPopular ? style.popularHighlightColor : 'transparent'
                }}
              >
                {plan.isPopular && (
                  <div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: style.accentColor,
                      color: 'white'
                    }}
                  >
                    Most Popular
                  </div>
                )}
                
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ color: style.textColor }}
                >
                  {plan.name}
                </h3>
                <p 
                  className="text-sm mb-4"
                  style={{ color: style.textColor, opacity: 0.7 }}
                >
                  {plan.description}
                </p>
                
                <div className="mb-6">
                  <span
                    className="text-4xl font-bold"
                    style={{ color: style.textColor }}
                  >
                    ${price}
                  </span>
                  <span style={{ color: style.textColor, opacity: 0.7 }}>
                    {isYearly ? '/year' : '/month'}
                  </span>
                </div>
                
                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li 
                      key={i}
                      className="flex items-center"
                    >
                      <CheckCircle 
                        size={16} 
                        className="mr-2"
                        style={{ color: style.accentColor }}
                      />
                      <span style={{ color: style.textColor }}>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className="w-full"
                  style={{ 
                    backgroundColor: plan.isPopular ? style.accentColor : 'transparent',
                    color: plan.isPopular ? 'white' : style.accentColor,
                    borderColor: style.accentColor,
                    borderWidth: plan.isPopular ? 0 : 1
                  }}
                >
                  {plan.buttonText}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Main ContentBlockRenderer Component
interface ContentBlockRendererProps {
  type: string;
  content: string;
  props?: Record<string, any>;
  device?: 'mobile' | 'tablet' | 'desktop';
}

const ContentBlockRenderer: React.FC<ContentBlockRendererProps> = ({ 
  type, 
  content, 
  props,
  device = 'desktop'
}) => {
  try {
    const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
    
    switch (type) {
      case 'hero-section':
        return <HeroSection content={parsedContent} props={props} device={device} />;
      case 'features-block':
        return <FeaturesBlock content={parsedContent} props={props} device={device} />;
      case 'testimonial-block':
        return <TestimonialBlock content={parsedContent} props={props} device={device} />;
      case 'cta-block':
        return <CtaBlock content={parsedContent} props={props} device={device} />;
      case 'faq-block':
        return <FaqBlock content={parsedContent} props={props} device={device} />;
      case 'pricing-block':
        return <PricingBlock content={parsedContent} props={props} device={device} />;
      default:
        return (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
            <div className="flex items-center text-yellow-700">
              <AlertCircleIcon className="w-5 h-5 mr-2" />
              <span>Unknown content block type: {type}</span>
            </div>
          </div>
        );
    }
  } catch (error) {
    console.error('Error rendering content block:', error);
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <div className="flex items-center text-red-700">
          <AlertCircleIcon className="w-5 h-5 mr-2" />
          <span>Error rendering content block</span>
        </div>
      </div>
    );
  }
};

export default ContentBlockRenderer;
