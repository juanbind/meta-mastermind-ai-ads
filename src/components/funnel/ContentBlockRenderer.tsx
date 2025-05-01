
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Award, Shield, Check } from 'lucide-react';

interface ContentBlockRendererProps {
  type: string;
  content: string;
  props?: Record<string, any>;
  device: 'mobile' | 'tablet' | 'desktop';
}

// Helper function to get paddings based on device
const getResponsivePadding = (device: 'mobile' | 'tablet' | 'desktop') => {
  switch (device) {
    case 'mobile':
      return 'px-4 py-8';
    case 'tablet':
      return 'px-8 py-10';
    default:
      return 'px-12 py-16';
  }
};

// Helper to render background based on properties
const renderBackground = (props: Record<string, any>) => {
  if (!props) return {};
  
  const bgType = props.bgType || 'color';
  
  if (bgType === 'color' && props.bgColor) {
    return { backgroundColor: props.bgColor };
  } else if (bgType === 'gradient' && props.gradient) {
    return { background: props.gradient };
  } else if (bgType === 'image' && props.bgImage) {
    return {
      backgroundImage: `url(${props.bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }
  
  return {};
};

const ContentBlockRenderer: React.FC<ContentBlockRendererProps> = ({ type, content, props, device }) => {
  // Default to empty object if props is undefined
  const blockProps = props || {};
  const style = blockProps.style || {};
  
  try {
    const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
    
    // HERO SECTION
    if (type === 'hero-section') {
      const padding = getResponsivePadding(device);
      const layout = blockProps.layout || 'center';
      const textAlign = layout === 'center' ? 'text-center mx-auto' : 'text-left';
      const maxWidthClass = layout === 'center' ? 'max-w-3xl mx-auto' : '';
      
      return (
        <div 
          className={`w-full ${padding} flex flex-col items-${layout} justify-center`}
          style={renderBackground(blockProps)}
        >
          <div className={`${maxWidthClass} ${textAlign}`}>
            <h1 
              className={`font-bold mb-4`} 
              style={{
                fontSize: style.headingSize || '48px',
                color: style.color || '#111827',
                fontFamily: style.fontFamily || 'sans-serif'
              }}
            >
              {parsedContent.headline}
            </h1>
            <p 
              className="mb-6 opacity-80" 
              style={{
                fontSize: style.subheadingSize || '20px',
                color: style.color || '#111827',
                fontFamily: style.fontFamily || 'sans-serif'
              }}
            >
              {parsedContent.subheadline}
            </p>
            <Button 
              className="font-medium px-8 py-6 text-lg rounded-lg"
              style={{
                backgroundColor: style.buttonColor || '#3B82F6',
                color: style.buttonTextColor || '#ffffff'
              }}
            >
              {parsedContent.buttonText}
            </Button>
            
            {parsedContent.trustBadges && parsedContent.trustBadges.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {parsedContent.trustBadges.map((badge: string, index: number) => (
                  <div key={index} className="flex items-center text-sm opacity-70">
                    <Shield className="w-4 h-4 mr-1" />
                    {badge}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }
    
    // FEATURES BLOCK
    if (type === 'features-block') {
      const padding = getResponsivePadding(device);
      const columns = blockProps.columns || 3;
      const colClass = {
        2: 'grid-cols-1 md:grid-cols-2 gap-8',
        3: 'grid-cols-1 md:grid-cols-3 gap-6',
        4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4',
      }[columns] || 'grid-cols-1 md:grid-cols-3 gap-6';
      
      return (
        <div 
          className={`w-full ${padding}`} 
          style={{ backgroundColor: style.bgColor || '#ffffff' }}
        >
          <h2 
            className="text-center text-3xl font-bold mb-12" 
            style={{ color: style.headingColor || '#111827' }}
          >
            {parsedContent.headline}
          </h2>
          
          <div className={`grid ${colClass}`}>
            {parsedContent.features.map((feature: any, index: number) => (
              <div key={index} className="flex flex-col items-center text-center p-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4" 
                  style={{ color: style.iconColor || '#3B82F6' }}
                >
                  {feature.icon === 'check' && <Check size={36} />}
                  {feature.icon === 'star' && <Star size={36} />}
                  {feature.icon === 'heart' && <Award size={36} />}
                </div>
                <h3 
                  className="text-xl font-semibold mb-2" 
                  style={{ color: style.headingColor || '#111827' }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: style.textColor || '#4b5563' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // PRICING BLOCK
    if (type === 'pricing-block') {
      const padding = getResponsivePadding(device);
      const layout = blockProps.layout || 'horizontal';
      const colClass = layout === 'horizontal' ? 'grid-cols-1 md:grid-cols-3 gap-8' : 'grid-cols-1 gap-8';
      
      return (
        <div 
          className={`w-full ${padding}`} 
          style={{ backgroundColor: style.bgColor || '#ffffff' }}
        >
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-bold mb-4" 
              style={{ color: style.textColor || '#111827' }}
            >
              {parsedContent.headline}
            </h2>
            <p 
              className="max-w-2xl mx-auto" 
              style={{ color: style.textColor || '#111827', opacity: 0.7 }}
            >
              {parsedContent.subheadline}
            </p>
            
            {blockProps.showToggle && (
              <div className="flex items-center justify-center mt-6 space-x-4">
                <span 
                  className="font-medium" 
                  style={{ color: !parsedContent.isYearly ? style.accentColor : undefined }}
                >
                  Monthly
                </span>
                <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                  <div 
                    className="w-5 h-5 absolute rounded-full top-0.5 transition-all" 
                    style={{ 
                      backgroundColor: style.accentColor || '#3B82F6',
                      left: parsedContent.isYearly ? 'calc(100% - 20px)' : '2px' 
                    }}
                  ></div>
                </div>
                <span 
                  className="font-medium"
                  style={{ color: parsedContent.isYearly ? style.accentColor : undefined }}
                >
                  Yearly <span className="text-xs opacity-70">(20% off)</span>
                </span>
              </div>
            )}
          </div>
          
          <div className={`grid ${colClass}`}>
            {parsedContent.plans.map((plan: any, index: number) => {
              const isPopular = plan.isPopular;
              const price = parsedContent.isYearly ? plan.yearlyPrice : plan.monthlyPrice;
              
              return (
                <div 
                  key={index} 
                  className={`rounded-xl p-6 border relative flex flex-col`}
                  style={{ 
                    borderColor: style.borderColor || '#e5e7eb',
                    backgroundColor: isPopular ? (style.popularHighlightColor || '#eef2ff') : 'transparent'
                  }}
                >
                  {isPopular && (
                    <span 
                      className="absolute top-0 right-6 transform -translate-y-1/2 px-3 py-1 text-xs rounded-full"
                      style={{ 
                        backgroundColor: style.accentColor || '#3B82F6',
                        color: '#ffffff' 
                      }}
                    >
                      Most Popular
                    </span>
                  )}
                  
                  <h3 
                    className="text-xl font-bold mb-2" 
                    style={{ color: style.textColor || '#111827' }}
                  >
                    {plan.name}
                  </h3>
                  <p 
                    className="text-sm mb-4 opacity-70" 
                    style={{ color: style.textColor || '#111827' }}
                  >
                    {plan.description}
                  </p>
                  
                  <div className="flex items-baseline mb-6">
                    <span 
                      className="text-4xl font-bold" 
                      style={{ color: style.textColor || '#111827' }}
                    >
                      ${typeof price === 'number' ? price.toFixed(2) : price}
                    </span>
                    <span className="ml-2 opacity-70">/mo</span>
                  </div>
                  
                  <div className="space-y-4 flex-grow mb-6">
                    {plan.features.map((feature: string, i: number) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check 
                          size={16} 
                          className="flex-shrink-0" 
                          style={{ color: style.accentColor || '#3B82F6' }} 
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full py-6 mt-auto`}
                    style={{ 
                      backgroundColor: isPopular ? (style.accentColor || '#3B82F6') : 'transparent',
                      color: isPopular ? '#ffffff' : (style.textColor || '#111827'),
                      border: isPopular ? 'none' : `1px solid ${style.borderColor || '#e5e7eb'}`,
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    
    // FAQ BLOCK
    if (type === 'faq-block') {
      const padding = getResponsivePadding(device);
      
      return (
        <div 
          className={`w-full ${padding}`} 
          style={{ backgroundColor: style.bgColor || '#ffffff' }}
        >
          <h2 
            className="text-3xl font-bold mb-8 text-center" 
            style={{ color: style.textColor || '#111827' }}
          >
            {parsedContent.headline}
          </h2>
          
          <div className="max-w-3xl mx-auto divide-y" style={{ borderColor: style.borderColor || '#e5e7eb' }}>
            {parsedContent.faqs.map((faq: any, index: number) => (
              <div key={index} className="py-4">
                <div 
                  className="flex justify-between items-center cursor-pointer py-2"
                >
                  <h3 
                    className="text-lg font-medium" 
                    style={{ color: style.textColor || '#111827' }}
                  >
                    {faq.question}
                  </h3>
                  <div 
                    className="ml-2 flex-shrink-0" 
                    style={{ color: style.accentColor || '#3B82F6' }}
                  >
                    {/* Plus icon placeholder */}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 3.33301V12.6663" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M3.33398 8H12.6673" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                
                {/* FAQ answer (collapsed by default in real implementation) */}
                <div className="mt-1 ml-1 opacity-75" style={{ color: style.textColor || '#111827' }}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // TESTIMONIAL BLOCK
    if (type === 'testimonial-block') {
      const padding = getResponsivePadding(device);
      const layout = blockProps.layout || 'grid';
      const colClass = layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 gap-6' : '';
      
      return (
        <div 
          className={`w-full ${padding}`} 
          style={{ backgroundColor: style.bgColor || '#f9fafb' }}
        >
          <div className={`grid ${colClass}`}>
            {parsedContent.testimonials.map((testimonial: any, index: number) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-sm border flex flex-col"
                style={{ borderColor: style.accentColor ? `${style.accentColor}20` : 'rgba(0,0,0,0.1)' }}
              >
                <p 
                  className="italic mb-4" 
                  style={{ color: style.quoteColor || '#6b7280' }}
                >
                  "{testimonial.quote}"
                </p>
                
                <div className="mt-auto flex items-center">
                  {blockProps.showPhotos && (
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-3 overflow-hidden">
                      {/* Placeholder for avatar */}
                    </div>
                  )}
                  <div>
                    <p 
                      className="font-semibold" 
                      style={{ color: style.textColor || '#111827' }}
                    >
                      {testimonial.name}
                    </p>
                    <p 
                      className="text-sm" 
                      style={{ color: style.textColor || '#111827', opacity: 0.7 }}
                    >
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                
                {blockProps.showRatings && testimonial.rating && (
                  <div className="mt-3 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className="mr-0.5" 
                        fill={i < testimonial.rating ? 'currentColor' : 'none'}
                        style={{ color: style.accentColor || '#3B82F6' }} 
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // CTA BLOCK
    if (type === 'cta-block') {
      const padding = getResponsivePadding(device);
      
      return (
        <div 
          className={`w-full ${padding} text-center`}
          style={renderBackground(blockProps)}
        >
          <div className="max-w-3xl mx-auto">
            <h2 
              className="text-3xl font-bold mb-4" 
              style={{ color: style.textColor || '#ffffff' }}
            >
              {parsedContent.headline}
            </h2>
            
            <p 
              className="mb-8 opacity-90" 
              style={{ color: style.textColor || '#ffffff' }}
            >
              {parsedContent.subheadline}
            </p>
            
            {parsedContent.hasCountdown && (
              <div className="mb-8">
                <div className="text-sm mb-2" style={{ color: style.textColor || '#ffffff' }}>
                  Special offer ends in:
                </div>
                <div className="flex justify-center gap-2">
                  {['00', '00', '00', '00'].map((unit, i) => (
                    <div 
                      key={i}
                      className="w-16 h-16 rounded-lg flex items-center justify-center text-xl font-bold" 
                      style={{ 
                        backgroundColor: style.timerBgColor || '#ef4444',
                        color: style.timerColor || '#ffffff'
                      }}
                    >
                      {unit}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <Button 
              className="px-8 py-6 text-lg rounded-lg font-medium"
              style={{
                backgroundColor: style.buttonColor || '#ffffff', 
                color: style.buttonTextColor || '#3B82F6'
              }}
            >
              {parsedContent.buttonText}
            </Button>
          </div>
        </div>
      );
    }
    
    // Default fallback
    return <div className="p-4 border border-red-300 bg-red-50 text-red-700 rounded">Content block preview not available</div>;
    
  } catch (error) {
    console.error("Error rendering content block:", error);
    return (
      <div className="p-4 border border-red-300 bg-red-50 text-red-700 rounded">
        <AlertCircle className="inline-block mr-2" size={18} />
        Error rendering content block
      </div>
    );
  }
};

export default ContentBlockRenderer;
