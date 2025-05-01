import React, { useState, useEffect } from 'react';
import { X, ArrowUp, ArrowDown, Settings, Trash2, Star, Clock, Check, Award, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ELEMENT_TYPES } from './FunnelElement';
import TextFormatToolbar, { TextStyle } from './TextFormatToolbar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FunnelRenderedElementProps {
  item: {
    id: string;
    type: string;
    content: string;
    props?: Record<string, any>;
  };
  isEditing: boolean;
  onEdit: () => void;
  onSave: (content: string, props?: Record<string, any>) => void;
  onCancel: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  device: 'mobile' | 'tablet' | 'desktop';
}

const FunnelRenderedElement: React.FC<FunnelRenderedElementProps> = ({
  item,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onRemove,
  onMoveUp,
  onMoveDown,
  device,
}) => {
  const [editedContent, setEditedContent] = useState(item.content);
  const [localProps, setLocalProps] = useState(item.props || {});
  const [textStyle, setTextStyle] = useState<TextStyle>({
    fontFamily: (item.props?.style?.fontFamily) || 'Arial, Helvetica, sans-serif',
    fontSize: (item.props?.style?.fontSize) || '16px',
    fontWeight: (item.props?.style?.fontWeight) || 'normal',
    fontStyle: (item.props?.style?.fontStyle) || 'normal',
    textDecoration: (item.props?.style?.textDecoration) || 'none',
    color: (item.props?.style?.color) || '#000000',
    textAlign: (item.props?.style?.textAlign as 'left' | 'center' | 'right' | 'justify') || 'left',
    lineHeight: (item.props?.style?.lineHeight) || '1.5',
    letterSpacing: (item.props?.style?.letterSpacing) || 'normal',
  });
  
  // For complex content that's stored as JSON
  const [parsedContent, setParsedContent] = useState<any>(null);

  // Update text style when item props change
  useEffect(() => {
    if (item.props?.style) {
      setTextStyle(prevStyle => ({
        ...prevStyle,
        ...item.props?.style,
        textAlign: (item.props?.style?.textAlign as 'left' | 'center' | 'right' | 'justify') || 'left'
      }));
    }

    // Try to parse JSON content if applicable
    if (item.type.includes('block') || 
        item.type === ELEMENT_TYPES.SOCIAL_PROOF || 
        item.type === ELEMENT_TYPES.COUNTDOWN || 
        item.type === ELEMENT_TYPES.TRUST_BADGES) {
      try {
        const parsed = JSON.parse(item.content);
        setParsedContent(parsed);
        console.log("Parsed content:", parsed);
      } catch (e) {
        console.error("Could not parse JSON content", e);
      }
    }
  }, [item.props, item.content, item.type]);
  
  const handleStyleChange = (newStyle: Partial<TextStyle>) => {
    const updatedStyle = { ...textStyle, ...newStyle };
    setTextStyle(updatedStyle);
    
    // Update the localProps with the new style
    const updatedProps = {
      ...localProps,
      style: updatedStyle
    };
    setLocalProps(updatedProps);
  };
  
  const handleSave = () => {
    onSave(editedContent, localProps);
  };

  // Get a safe style object for React components
  const getStyledProps = () => {
    const { textAlign, ...rest } = textStyle;
    
    return {
      ...rest,
      textAlign: textAlign as 'left' | 'center' | 'right' | 'justify',
    };
  };

  // Helper function to safely parse JSON content
  const getParsedContent = () => {
    if (parsedContent) return parsedContent;
    
    try {
      if (item.type.includes('block') || 
          item.type === ELEMENT_TYPES.SOCIAL_PROOF || 
          item.type === ELEMENT_TYPES.COUNTDOWN || 
          item.type === ELEMENT_TYPES.TRUST_BADGES) {
        return JSON.parse(item.content);
      }
    } catch (e) {
      console.error("Error parsing content:", e);
    }
    return null;
  };

  // Renders the element based on its type
  const renderElement = () => {
    const styleProps = getStyledProps();
    const content = getParsedContent();
    
    switch (item.type) {
      case ELEMENT_TYPES.HEADLINE:
        return <h2 style={styleProps} className="font-bold">{item.content}</h2>;
      
      case ELEMENT_TYPES.PARAGRAPH:
        return <p style={styleProps}>{item.content}</p>;
      
      case ELEMENT_TYPES.IMAGE:
        return (
          <div style={{ textAlign: styleProps.textAlign }}>
            <img 
              src={item.props?.src || 'https://placehold.co/600x400?text=Image'} 
              alt={item.props?.alt || 'Image'} 
              className="inline-block max-w-full" 
            />
          </div>
        );
      
      case ELEMENT_TYPES.VIDEO:
        return (
          <div className="relative aspect-video w-full bg-gray-100 flex items-center justify-center" style={{ textAlign: styleProps.textAlign }}>
            {item.props?.src ? (
              <iframe 
                src={item.props.src} 
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="text-center p-4">
                <p style={styleProps}>Video Placeholder</p>
                <p className="text-sm text-gray-500" style={styleProps}>Edit to add a video URL</p>
              </div>
            )}
          </div>
        );
      
      case ELEMENT_TYPES.FORM:
        return (
          <div className="border border-gray-200 p-4 rounded" style={{ textAlign: styleProps.textAlign }}>
            <h3 className="mb-2" style={styleProps}>{item.content}</h3>
            <div className="space-y-3">
              {(item.props?.fields || ['name', 'email']).map((field: string) => (
                <div key={field} className="space-y-1" style={{ textAlign: 'left' }}>
                  <label className="text-sm font-medium capitalize" style={styleProps}>{field}</label>
                  <input 
                    type={field === 'email' ? 'email' : 'text'} 
                    className="w-full px-3 py-2 border border-gray-300 rounded" 
                    placeholder={`Enter ${field}`} 
                    disabled
                    style={{ fontFamily: styleProps.fontFamily }}
                  />
                </div>
              ))}
              <button 
                className="w-full bg-blue-600 text-white py-2 rounded mt-2"
                style={{ ...styleProps, backgroundColor: styleProps.color }}
              >
                {item.props?.buttonText || 'Submit'}
              </button>
            </div>
          </div>
        );
      
      case ELEMENT_TYPES.BULLET_LIST:
        return (
          <ul className="list-disc pl-5 space-y-1" style={styleProps}>
            {item.content.split('\n').map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        );
      
      case ELEMENT_TYPES.BUTTON:
        return (
          <div style={{ textAlign: styleProps.textAlign }}>
            <button 
              className={`px-4 py-2 rounded ${
                item.props?.variant === 'outline' 
                  ? 'border border-blue-600 text-blue-600' 
                  : 'text-white'
              }`}
              style={{ 
                ...styleProps, 
                backgroundColor: item.props?.variant === 'outline' ? 'transparent' : styleProps.color || '#3B82F6',
                borderColor: styleProps.color || '#3B82F6',
                color: item.props?.variant === 'outline' ? (styleProps.color || '#3B82F6') : '#FFFFFF'
              }}
            >
              {item.content}
            </button>
          </div>
        );
      
      case ELEMENT_TYPES.INPUT:
        return (
          <div className="space-y-1" style={{ textAlign: styleProps.textAlign }}>
            <label className="text-sm font-medium" style={styleProps}>{item.content}</label>
            <input 
              type={item.props?.type || 'text'} 
              className="w-full px-3 py-2 border border-gray-300 rounded" 
              placeholder={item.props?.placeholder || `Enter ${item.content}`} 
              disabled
              style={{ fontFamily: styleProps.fontFamily }}
            />
          </div>
        );

      case ELEMENT_TYPES.DROPDOWN:
        return (
          <div className="space-y-1" style={{ textAlign: styleProps.textAlign }}>
            <label className="text-sm font-medium" style={styleProps}>{item.content}</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded" 
              disabled
              style={{ fontFamily: styleProps.fontFamily }}
            >
              <option>{item.props?.placeholder || 'Select an option'}</option>
              {item.content.split('\n').map((option, i) => (
                <option key={i} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      
      case ELEMENT_TYPES.DIVIDER:
        return (
          <hr className="my-4 border-t" style={{ 
            borderColor: item.props?.color || '#e2e8f0',
            borderTopWidth: `${item.props?.height || 1}px`,
            borderStyle: item.props?.style || 'solid'
          }} />
        );
      
      case ELEMENT_TYPES.SPACING:
        return <div style={{ height: `${item.props?.height || 20}px` }}></div>;
      
      case ELEMENT_TYPES.ICON:
        return (
          <div style={{ textAlign: styleProps.textAlign }}>
            <div 
              className="inline-block" 
              style={{ 
                fontSize: `${item.props?.size || 24}px`,
                color: item.props?.color || styleProps.color || '#3B82F6'
              }}
            >
              {item.props?.name || '★'}
            </div>
          </div>
        );
      
      case ELEMENT_TYPES.HERO_SECTION:
        if (!content) return <div>Invalid hero section data</div>;
        
        const heroStyle: React.CSSProperties = {
          background: localProps?.bgType === 'image' && localProps?.bgImage 
            ? `url(${localProps.bgImage}) center/cover no-repeat` 
            : localProps?.bgColor || '#f9fafb',
          padding: '60px 20px',
          textAlign: styleProps.textAlign as 'left' | 'center' | 'right',
        };
        
        return (
          <div style={heroStyle} className="rounded-lg overflow-hidden">
            <div className="max-w-4xl mx-auto">
              <h1 style={{
                fontSize: localProps?.style?.headingSize || '48px',
                fontFamily: styleProps.fontFamily,
                fontWeight: 'bold',
                color: localProps?.style?.color || '#111827',
                marginBottom: '16px'
              }}>
                {content.headline}
              </h1>
              <p style={{
                fontSize: localProps?.style?.subheadingSize || '20px',
                fontFamily: styleProps.fontFamily,
                color: localProps?.style?.color || '#4b5563',
                marginBottom: '32px',
                maxWidth: styleProps.textAlign === 'center' ? '600px' : 'none',
                marginLeft: styleProps.textAlign === 'center' ? 'auto' : '0',
                marginRight: styleProps.textAlign === 'center' ? 'auto' : '0'
              }}>
                {content.subheadline}
              </p>
              <button style={{
                backgroundColor: localProps?.style?.buttonColor || '#3B82F6',
                color: localProps?.style?.buttonTextColor || '#ffffff',
                padding: '12px 28px',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontFamily: styleProps.fontFamily,
                border: 'none',
                cursor: 'pointer'
              }}>
                {content.buttonText}
              </button>
              
              {content.trustBadges && content.trustBadges.length > 0 && (
                <div style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: styleProps.textAlign }}>
                  {content.trustBadges.map((badge: string, index: number) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                      <Shield size={20} style={{ marginRight: '8px', color: localProps?.style?.buttonColor || '#3B82F6' }} />
                      <span style={{ fontSize: '14px', color: localProps?.style?.color || '#6b7280' }}>{badge}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      
      case ELEMENT_TYPES.FEATURES_BLOCK:
        if (!content) return <div>Invalid features block data</div>;
        
        const featuresStyle: React.CSSProperties = {
          backgroundColor: localProps?.style?.bgColor || '#ffffff',
          padding: '60px 20px',
          textAlign: styleProps.textAlign as 'left' | 'center' | 'right'
        };
        
        const getGridCols = () => {
          const columns = localProps?.columns || 3;
          if (device === 'mobile') return 1;
          if (device === 'tablet' && columns > 2) return 2;
          return columns;
        };
        
        return (
          <div style={featuresStyle} className="rounded-lg">
            <div className="max-w-6xl mx-auto">
              <h2 style={{
                fontSize: '32px',
                fontFamily: styleProps.fontFamily,
                fontWeight: 'bold',
                color: localProps?.style?.headingColor || '#111827',
                marginBottom: '40px'
              }}>
                {content.headline}
              </h2>
              
              {localProps?.layout === 'grid' ? (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: `repeat(${getGridCols()}, 1fr)`, 
                  gap: '30px'
                }}>
                  {content.features.map((feature: any, index: number) => (
                    <div key={index} style={{ textAlign: 'left' }}>
                      <div style={{ 
                        color: localProps?.style?.iconColor || '#3B82F6', 
                        marginBottom: '16px',
                        fontSize: '24px'
                      }}>
                        {feature.icon === 'star' && <Star size={32} />}
                        {feature.icon === 'check' && <Check size={32} />}
                        {feature.icon === 'award' && <Award size={32} />}
                        {!['star', 'check', 'award'].includes(feature.icon) && <Shield size={32} />}
                      </div>
                      <h3 style={{ 
                        fontSize: '20px',
                        fontFamily: styleProps.fontFamily,
                        fontWeight: 'bold',
                        color: localProps?.style?.headingColor || '#111827',
                        marginBottom: '8px'
                      }}>
                        {feature.title}
                      </h3>
                      <p style={{
                        fontSize: '16px',
                        fontFamily: styleProps.fontFamily,
                        color: localProps?.style?.textColor || '#4b5563'
                      }}>
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
                  {content.features.map((feature: any, index: number) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                      alignItems: 'center',
                      gap: '40px',
                      flexWrap: device === 'mobile' ? 'wrap' : 'nowrap'
                    }}>
                      <div style={{ flex: 1, minWidth: device === 'mobile' ? '100%' : '300px' }}>
                        <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400">Feature Image</span>
                        </div>
                      </div>
                      <div style={{ flex: 1, minWidth: device === 'mobile' ? '100%' : '300px' }}>
                        <div style={{ 
                          color: localProps?.style?.iconColor || '#3B82F6', 
                          marginBottom: '16px',
                          fontSize: '24px'
                        }}>
                          {feature.icon === 'star' && <Star size={32} />}
                          {feature.icon === 'check' && <Check size={32} />}
                          {feature.icon === 'award' && <Award size={32} />}
                          {!['star', 'check', 'award'].includes(feature.icon) && <Shield size={32} />}
                        </div>
                        <h3 style={{ 
                          fontSize: '24px',
                          fontFamily: styleProps.fontFamily,
                          fontWeight: 'bold',
                          color: localProps?.style?.headingColor || '#111827',
                          marginBottom: '12px'
                        }}>
                          {feature.title}
                        </h3>
                        <p style={{
                          fontSize: '16px',
                          fontFamily: styleProps.fontFamily,
                          color: localProps?.style?.textColor || '#4b5563'
                        }}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
        
      case ELEMENT_TYPES.FAQ_BLOCK:
        if (!content) return <div>Invalid FAQ block data</div>;
        
        const faqStyle: React.CSSProperties = {
          backgroundColor: localProps?.style?.bgColor || '#ffffff',
          padding: '60px 20px',
          textAlign: styleProps.textAlign as 'left' | 'center' | 'right'
        };
        
        return (
          <div style={faqStyle} className="rounded-lg">
            <div className="max-w-4xl mx-auto">
              <h2 style={{
                fontSize: '32px',
                fontFamily: styleProps.fontFamily,
                fontWeight: 'bold',
                color: localProps?.style?.textColor || '#111827',
                marginBottom: '40px'
              }}>
                {content.headline}
              </h2>
              
              {localProps?.enableSearch && (
                <div style={{ marginBottom: '24px' }}>
                  <Input 
                    placeholder="Search FAQs..." 
                    className="w-full"
                  />
                </div>
              )}
              
              <Accordion type="single" collapsible className="w-full">
                {content.faqs.map((faq: any, index: number) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="border-b border-gray-200">
                    <AccordionTrigger 
                      className="text-left py-4 hover:no-underline"
                      style={{ 
                        fontFamily: styleProps.fontFamily,
                        color: localProps?.style?.textColor || '#111827',
                        fontWeight: 'medium',
                        fontSize: '18px'
                      }}
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div 
                        style={{ 
                          fontFamily: styleProps.fontFamily,
                          color: localProps?.style?.textColor || '#4b5563',
                          fontSize: '16px',
                          lineHeight: '1.6'
                        }}
                      >
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        );
        
      default:
        return <div style={styleProps}>{item.content}</div>;
    }
  };

  // Editor content based on element type
  const renderEditor = () => {
    switch (item.type) {
      case ELEMENT_TYPES.HEADLINE:
      case ELEMENT_TYPES.PARAGRAPH:
      case ELEMENT_TYPES.BUTTON:
      case ELEMENT_TYPES.BULLET_LIST:
        return (
          <>
            <TextFormatToolbar 
              style={textStyle} 
              onStyleChange={handleStyleChange}
            />
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full mt-2"
              rows={item.type === ELEMENT_TYPES.PARAGRAPH ? 4 : 2}
            />
          </>
        );
      
      case ELEMENT_TYPES.IMAGE:
        return (
          <div className="space-y-3">
            <TextFormatToolbar 
              style={textStyle} 
              onStyleChange={handleStyleChange}
            />
            <div className="space-y-1 mt-2">
              <label className="text-sm font-medium">Image URL</label>
              <Input
                type="text"
                value={localProps.src || ''}
                onChange={(e) => setLocalProps({ ...localProps, src: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Alt Text</label>
              <Input
                type="text"
                value={localProps.alt || ''}
                onChange={(e) => setLocalProps({ ...localProps, alt: e.target.value })}
                placeholder="Image description"
              />
            </div>
          </div>
        );
      
      case ELEMENT_TYPES.VIDEO:
        return (
          <div className="space-y-3">
            <TextFormatToolbar 
              style={textStyle} 
              onStyleChange={handleStyleChange}
            />
            <div className="space-y-1 mt-2">
              <label className="text-sm font-medium">Video URL (YouTube or Vimeo)</label>
              <Input
                type="text"
                value={localProps.src || ''}
                onChange={(e) => setLocalProps({ ...localProps, src: e.target.value })}
                placeholder="https://www.youtube.com/embed/video_id"
              />
            </div>
          </div>
        );
      
      case ELEMENT_TYPES.FORM:
        return (
          <div className="space-y-3">
            <TextFormatToolbar 
              style={textStyle} 
              onStyleChange={handleStyleChange}
            />
            <div className="space-y-1 mt-2">
              <label className="text-sm font-medium">Form Title</label>
              <Input
                type="text"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                placeholder="Contact Form"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Form Fields (one per line)</label>
              <Textarea
                value={(localProps.fields || []).join('\n')}
                onChange={(e) => {
                  const fields = e.target.value.split('\n').filter(f => f.trim() !== '');
                  setLocalProps({ ...localProps, fields });
                }}
                placeholder="name\nemail\nphone"
                rows={4}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Button Text</label>
              <Input
                type="text"
                value={localProps.buttonText || ''}
                onChange={(e) => setLocalProps({ ...localProps, buttonText: e.target.value })}
                placeholder="Submit"
              />
            </div>
          </div>
        );
      
      case ELEMENT_TYPES.INPUT:
      case ELEMENT_TYPES.DROPDOWN:
        return (
          <>
            <TextFormatToolbar 
              style={textStyle} 
              onStyleChange={handleStyleChange}
            />
            <div className="space-y-3 mt-2">
              <div className="space-y-1">
                <label className="text-sm font-medium">Label Text</label>
                <Input
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  placeholder="Field Label"
                />
              </div>
              {item.type === ELEMENT_TYPES.DROPDOWN && (
                <div className="space-y-1">
                  <label className="text-sm font-medium">Options (one per line)</label>
                  <Textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    placeholder="Option 1\nOption 2\nOption 3"
                    rows={4}
                  />
                </div>
              )}
              <div className="space-y-1">
                <label className="text-sm font-medium">Placeholder</label>
                <Input
                  type="text"
                  value={localProps.placeholder || ''}
                  onChange={(e) => setLocalProps({ ...localProps, placeholder: e.target.value })}
                  placeholder="Enter placeholder text"
                />
              </div>
            </div>
          </>
        );
      
      case ELEMENT_TYPES.DIVIDER:
      case ELEMENT_TYPES.SPACING:
      case ELEMENT_TYPES.ICON:
        return (
          <div className="space-y-3">
            {(item.type === ELEMENT_TYPES.ICON) && (
              <TextFormatToolbar 
                style={textStyle} 
                onStyleChange={handleStyleChange}
              />
            )}
            {item.type === ELEMENT_TYPES.DIVIDER && (
              <>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Line Color</label>
                  <Input
                    type="color"
                    value={localProps.color || '#e2e8f0'}
                    onChange={(e) => setLocalProps({ ...localProps, color: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Height (px)</label>
                  <Input
                    type="number"
                    value={localProps.height || 1}
                    onChange={(e) => setLocalProps({ ...localProps, height: Number(e.target.value) })}
                    min={1}
                    max={20}
                  />
                </div>
              </>
            )}
            {item.type === ELEMENT_TYPES.SPACING && (
              <div className="space-y-1">
                <label className="text-sm font-medium">Height (px)</label>
                <Input
                  type="number"
                  value={localProps.height || 20}
                  onChange={(e) => setLocalProps({ ...localProps, height: Number(e.target.value) })}
                  min={5}
                  max={200}
                />
              </div>
            )}
            {item.type === ELEMENT_TYPES.ICON && (
              <>
                <div className="space-y-1 mt-2">
                  <label className="text-sm font-medium">Icon</label>
                  <Input
                    type="text"
                    value={localProps.name || '★'}
                    onChange={(e) => setLocalProps({ ...localProps, name: e.target.value })}
                    placeholder="★"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Size (px)</label>
                  <Input
                    type="number"
                    value={localProps.size || 24}
                    onChange={(e) => setLocalProps({ ...localProps, size: Number(e.target.value) })}
                    min={8}
                    max={128}
                  />
                </div>
                {!textStyle.color && (
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Color</label>
                    <Input
                      type="color"
                      value={localProps.color || '#3B82F6'}
                      onChange={(e) => setLocalProps({ ...localProps, color: e.target.value })}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        );
      
      case ELEMENT_TYPES.HERO_SECTION:
        try {
          const content = JSON.parse(editedContent);
          
          return (
            <div className="space-y-4">
              <h3 className="font-medium">Hero Section Settings</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Headline</label>
                <Input
                  value={content.headline}
                  onChange={(e) => {
                    const updated = { ...content, headline: e.target.value };
                    setEditedContent(JSON.stringify(updated));
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Subheadline</label>
                <Textarea
                  value={content.subheadline}
                  onChange={(e) => {
                    const updated = { ...content, subheadline: e.target.value };
                    setEditedContent(JSON.stringify(updated));
                  }}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Button Text</label>
                <Input
                  value={content.buttonText}
                  onChange={(e) => {
                    const updated = { ...content, buttonText: e.target.value };
                    setEditedContent(JSON.stringify(updated));
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Background Type</label>
                <select
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2"
                  value={localProps.bgType || 'color'}
                  onChange={(e) => {
                    setLocalProps({ ...localProps, bgType: e.target.value });
                  }}
                >
                  <option value="color">Color</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
              
              {localProps.bgType === 'color' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Background Color</label>
                  <Input
                    type="color"
                    value={localProps.bgColor || '#f9fafb'}
                    onChange={(e) => {
                      setLocalProps({ ...localProps, bgColor: e.target.value });
                    }}
                  />
                </div>
              )}
              
              {localProps.bgType === 'image' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Background Image URL</label>
                  <Input
                    value={localProps.bgImage || ''}
                    onChange={(e) => {
                      setLocalProps({ ...localProps, bgImage: e.target.value });
                    }}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Text Alignment</label>
                <select
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2"
                  value={textStyle.textAlign}
                  onChange={(e) => {
                    handleStyleChange({ textAlign: e.target.value as 'left' | 'center' | 'right' | 'justify' });
                  }}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium">Text Color</label>
                <Input
                  type="color"
                  value={(localProps.style && localProps.style.color) || '#111827'}
                  onChange={(e) => {
                    const style = { ...(localProps.style || {}), color: e.target.value };
                    setLocalProps({ ...localProps, style });
                  }}
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium">Button Color</label>
                <Input
                  type="color"
                  value={(localProps.style && localProps.style.buttonColor) || '#3B82F6'}
                  onChange={(e) => {
                    const style = { ...(localProps.style || {}), buttonColor: e.target.value };
                    setLocalProps({ ...localProps, style });
                  }}
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium">Button Text Color</label>
                <Input
                  type="color"
                  value={(localProps.style && localProps.style.buttonTextColor) || '#ffffff'}
                  onChange={(e) => {
                    const style = { ...(localProps.style || {}), buttonTextColor: e.target.value };
                    setLocalProps({ ...localProps, style });
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Trust Badges (one per line)</label>
                <Textarea
                  value={(content.trustBadges || []).join('\n')}
                  onChange={(e) => {
                    const trustBadges = e.target.value.split('\n').filter(badge => badge.trim() !== '');
                    const updated = { ...content, trustBadges };
                    setEditedContent(JSON.stringify(updated));
                  }}
                  rows={3}
                  placeholder="Trusted by 10,000+ customers"
                />
              </div>
            </div>
          );
        } catch (e) {
          console.error("Error rendering hero section editor:", e);
          return <div>Error: Invalid hero section data</div>;
        }
        
      case ELEMENT_TYPES.FEATURES_BLOCK:
        try {
          const content = JSON.parse(editedContent);
          
          return (
            <div className="space-y-4">
              <h3 className="font-medium">Features Block Settings</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Headline</label>
                <Input
                  value={content.headline}
                  onChange={(e) => {
                    const updated = { ...content, headline: e.target.value };
                    setEditedContent(JSON.stringify(updated));
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Layout</label>
                <select
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2"
                  value={localProps.layout || 'grid'}
                  onChange={(e) => {
                    setLocalProps({ ...localProps, layout: e.target.value });
                  }}
                >
                  <option value="grid">Grid</option>
                  <option value="alternating">Alternating</option>
                </select>
              </div>
              
              {localProps.layout === 'grid' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Columns</label>
                  <select
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2"
                    value={localProps.columns || 3}
                    onChange={(e) => {
                      setLocalProps({ ...localProps, columns: parseInt(e.target.value) });
                    }}
                  >
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </select>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Background Color</label>
                <Input
                  type="color"
                  value={(localProps.style && localProps.style.bgColor) || '#ffffff'}
                  onChange={(e) => {
                    const style = { ...(localProps.style || {}), bgColor: e.target.value };
                    setLocalProps({ ...localProps, style });
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Icon Color</label>
                <Input
                  type="color"
                  value={(localProps.style && localProps.style.iconColor) || '#3B82F6'}
                  onChange={(e) => {
                    const style = { ...(localProps.style || {}), iconColor: e.target.value };
                    setLocalProps({ ...localProps, style });
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Heading Color</label>
                <Input
                  type="color"
                  value={(localProps.style && localProps.style.headingColor) || '#111827'}
                  onChange={(e) => {
                    const style = { ...(localProps.style || {}), headingColor: e.target.value };
                    setLocalProps({ ...localProps, style });
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Text Color</label>
                <Input
                  type="color"
                  value={(localProps.style && localProps.style.textColor) || '#4b5563'}
                  onChange={(e) => {
                    const style = { ...(localProps.style || {}), textColor: e.target.value };
                    setLocalProps({ ...localProps, style });
                  }}
                />
              </div>
              
              <div className="space-y-2 border-t pt-4 mt-4">
                <label className="text-sm font-medium">Features</label>
                
                {content.features.map((feature: any, index: number) => (
                  <div key={index} className="p-3 border rounded-md space-y-2 mb-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Feature {index + 1}</h4>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                        onClick={() => {
                          const features = [...content.features];
                          features.splice(index, 1);
                          setEditedContent(JSON.stringify({
                            ...content,
                            features
                          }));
                        }}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Icon</label>
                      <select
                        className="w-full border border-gray-300 rounded-md shadow-sm py-1"
                        value={feature.icon || 'check'}
                        onChange={(e) => {
                          const features = [...content.features];
                          features[index] = { ...feature, icon: e.target.value };
                          setEditedContent(JSON.stringify({
                            ...content,
                            features
                          }));
                        }}
                      >
                        <option value="check">Check</option>
                        <option value="star">Star</option>
                        <option value="award">Award</option>
                        <option value="shield">Shield</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        value={feature.title || ''}
                        onChange={(e) => {
                          const features = [...content.features];
                          features[index] = { ...feature, title: e.target.value };
                          setEditedContent(JSON.stringify({
                            ...content,
                            features
                          }));
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        value={feature.description || ''}
                        onChange={(e) => {
                          const features = [...content.features];
                          features[index] = { ...feature, description: e.target.value };
                          setEditedContent(JSON.stringify({
                            ...content,
                            features
                          }));
                        }}
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
                
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => {
                    setEditedContent(JSON.stringify({
                      ...content,
                      features: [
                        ...content.features,
                        {
                          icon: 'check',
                          title: 'New Feature',
                          description: 'Description of how this feature benefits the customer.'
                        }
                      ]
                    }));
                  }}
                >
                  Add Feature
                </Button>
              </div>
            </div>
          );
        } catch (e) {
          console.error("Error rendering features block editor:", e);
          return <div>Error: Invalid features block data</div>;
        }
        
      case ELEMENT_TYPES.FAQ_BLOCK:
        try {
          const content = JSON.parse(editedContent);
          
          return (
            <div className="space-y-4">
              <h3 className="font-medium">FAQ Block Settings</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Headline</label>
                <Input
                  value={content.headline}
                  onChange={(e) => {
                    const updated = { ...content, headline: e.target.value };
                    setEditedContent(JSON.stringify(updated));
                  }}
                />
              </div>
              
              <div className="flex items-center space-x-2 py-2">
                <input
                  type="checkbox"
                  checked={!!localProps.enableSearch}
                  onChange={(e) => {
                    setLocalProps({ ...localProps, enableSearch: e.target.checked });
                  }}
                  id="enable-search"
                />
                <label htmlFor="enable-search" className="text-sm">Enable Search</label>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Background Color</label>
                <Input
                  type="color"
                  value={(localProps.style && localProps.style.bgColor) || '#ffffff'}
                  onChange={(e) => {
                    const style = { ...(localProps.style || {}), bgColor: e.target.value };
                    setLocalProps({ ...localProps, style });
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Text Color</label>
                <Input
                  type="color"
                  value={(localProps.style && localProps.style.textColor) || '#111827'}
                  onChange={(e) => {
                    const style = { ...(localProps.style || {}), textColor: e.target.value };
                    setLocalProps({ ...localProps, style });
                  }}
                />
              </div>
              
              <div className="space-y-2 border-t pt-4 mt-4">
                <label className="text-sm font-medium">FAQs</label>
                
                {content.faqs.map((faq: any, index: number) => (
                  <div key={index} className="p-3 border rounded-md space-y-2 mb-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Question {index + 1}</h4>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                        onClick={() => {
                          const faqs = [...content.faqs];
                          faqs.splice(index, 1);
                          setEditedContent(JSON.stringify({
                            ...content,
                            faqs
                          }));
                        }}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Question</label>
                      <Input
                        value={faq.question || ''}
                        onChange={(e) => {
                          const faqs = [...content.faqs];
                          faqs[index] = { ...faq, question: e.target.value };
                          setEditedContent(JSON.stringify({
                            ...content,
                            faqs
                          }));
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Answer</label>
                      <Textarea
                        value={faq.answer || ''}
                        onChange={(e) => {
                          const faqs = [...content.faqs];
                          faqs[index] = { ...faq, answer: e.target.value };
                          setEditedContent(JSON.stringify({
                            ...content,
                            faqs
                          }));
                        }}
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
                
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => {
                    setEditedContent(JSON.stringify({
                      ...content,
                      faqs: [
                        ...content.faqs,
                        {
                          question: 'New Question?',
                          answer: 'Answer to the question.'
                        }
                      ]
                    }));
                  }}
                >
                  Add FAQ
                </Button>
              </div>
            </div>
          );
        } catch (e) {
          console.error("Error rendering FAQ block editor:", e);
          return <div>Error: Invalid FAQ block data</div>;
        }
      
      default:
        return (
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full"
            rows={3}
          />
        );
    }
  };

  return (
    <div 
      className={`relative border-2 rounded-md transition-all group ${
        isEditing ? 'border-blue-500 shadow-lg' : 'border-transparent hover:border-gray-300'
      }`}
    >
      {/* Editing interface */}
      {isEditing ? (
        <div className="p-4 bg-gray-50 rounded-md">
          <div className="mb-3 flex justify-between items-center">
            <h4 className="font-medium capitalize">{item.type.replace(/-/g, ' ')}</h4>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X size={18} />
            </Button>
          </div>
          
          {renderEditor()}
          
          <div className="flex justify-between mt-4">
            <Button variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Element display */}
          <div 
            className="p-4 cursor-pointer" 
            onClick={onEdit}
          >
            {renderElement()}
          </div>
          
          {/* Element controls (visible on hover) */}
          <div className="absolute -top-3 -right-3 hidden group-hover:flex space-x-1 bg-white shadow-md border border-gray-200 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveUp}>
              <ArrowUp size={14} />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveDown}>
              <ArrowDown size={14} />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onEdit}>
              <Settings size={14} />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={onRemove}>
              <Trash2 size={14} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FunnelRenderedElement;
