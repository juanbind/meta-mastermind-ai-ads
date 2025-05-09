
import React from 'react';
import { AlertCircle } from 'lucide-react';
import ContentBlockRenderer from '../ContentBlockRenderer';

interface ContentElementRendererProps {
  type: string;
  content: any;
  props?: Record<string, any>;
  device: 'mobile' | 'tablet' | 'desktop';
}

const ContentElementRenderer: React.FC<ContentElementRendererProps> = ({ 
  type, 
  content, 
  props, 
  device 
}) => {
  try {
    // Parse the content if it's a string (which it typically is when stored)
    const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
    
    // Apply device-specific styling
    const deviceSpecificProps = {
      ...props,
      device,
      // Add responsive classes based on device
      className: `${props?.className || ''} ${getDeviceSpecificClasses(device)}`
    };

    return (
      <ContentBlockRenderer 
        type={type} 
        content={parsedContent} 
        props={deviceSpecificProps} 
        device={device} 
      />
    );
  } catch (error) {
    console.error(`Error rendering content element of type ${type}:`, error);
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <div className="flex items-center text-red-700">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>Error rendering {type}</span>
        </div>
        <div className="text-xs mt-2 text-red-600">
          {error instanceof Error ? error.message : 'Invalid content format'}
        </div>
      </div>
    );
  }
};

// Helper function to apply device-specific classes
const getDeviceSpecificClasses = (device: 'mobile' | 'tablet' | 'desktop'): string => {
  switch (device) {
    case 'mobile':
      return 'max-w-full';
    case 'tablet':
      return 'max-w-2xl mx-auto';
    case 'desktop':
      return 'max-w-4xl mx-auto';
    default:
      return '';
  }
};

export default ContentElementRenderer;
