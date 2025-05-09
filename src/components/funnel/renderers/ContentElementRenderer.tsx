
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
  props = {}, 
  device 
}) => {
  try {
    // Parse the content if it's a string (which it typically is when stored)
    const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
    
    // Apply device-specific styling
    const deviceSpecificProps = {
      ...props,
      device,
      // Apply responsive classes based on device
      className: `${props?.className || ''} ${getDeviceSpecificClasses(device)}`,
      // Apply perspective styling for 3D effect
      style: {
        ...(props?.style || {}),
        borderRadius: props?.borderRadius || '8px',
        overflow: 'hidden',
        transform: props?.perspective ? `perspective(1000px) rotateX(${props.perspectiveAngle || '2deg'})` : 'none',
        boxShadow: props?.elevation ? getElevationShadow(props.elevation) : 'none',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }
    };

    return (
      <div className="perspective-content-block relative">
        {/* Device frame for better preview */}
        {device !== 'desktop' && (
          <div className={`absolute inset-0 pointer-events-none border-2 rounded-lg ${
            device === 'mobile' ? 'border-purple-200' : 'border-purple-100'
          }`}>
            {/* Device notch/home indicator */}
            {device === 'mobile' && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-purple-200 rounded-b-lg"></div>
            )}
          </div>
        )}
        
        {/* Content rendering */}
        <div className="relative z-10">
          <ContentBlockRenderer 
            type={type} 
            content={parsedContent} 
            props={deviceSpecificProps} 
            device={device} 
          />
        </div>

        {/* No-code editing indicator */}
        <div className="absolute bottom-2 right-2 z-20 text-xs bg-white bg-opacity-75 px-2 py-0.5 rounded text-purple-600 font-medium">
          {getElementTypeLabel(type)}
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error rendering content element of type ${type}:`, error);
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
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

// Helper function to generate elevation shadow based on level
const getElevationShadow = (elevation: number): string => {
  switch(elevation) {
    case 0:
      return 'none';
    case 1:
      return '0 2px 5px rgba(0,0,0,0.1)';
    case 2:
      return '0 3px 8px rgba(0,0,0,0.12)';
    case 3:
      return '0 5px 15px rgba(0,0,0,0.15)';
    case 4:
      return '0 8px 20px rgba(0,0,0,0.18)';
    case 5:
      return '0 12px 28px rgba(0,0,0,0.2)';
    default:
      return '0 3px 8px rgba(0,0,0,0.12)';
  }
};

// Helper function to get a user-friendly label for element types
const getElementTypeLabel = (type: string): string => {
  // Convert camelCase or snake_case to Title Case with spaces
  return type
    .replace(/([A-Z])/g, ' $1') // Insert a space before all capital letters
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
    .trim(); // Remove leading/trailing spaces
};

export default ContentElementRenderer;
