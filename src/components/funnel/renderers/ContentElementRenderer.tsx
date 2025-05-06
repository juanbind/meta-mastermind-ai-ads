
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
    const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
    
    return (
      <ContentBlockRenderer 
        type={type} 
        content={parsedContent} 
        props={props} 
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
      </div>
    );
  }
};

export default ContentElementRenderer;
