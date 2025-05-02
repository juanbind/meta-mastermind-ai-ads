
import React from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface TextFormatToolbarProps {
  value: string;
  onChange: (value: string) => void;
}

const TextFormatToolbar: React.FC<TextFormatToolbarProps> = ({ value, onChange }) => {
  // Simple formatting functions
  const applyFormat = (format: string) => {
    // In a real implementation, this would apply proper formatting
    // For now, just append the format to the text as a placeholder
    onChange(`${value} (${format})`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md p-1 flex flex-wrap gap-1 mb-2">
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0" 
        onClick={() => applyFormat('bold')}
      >
        <Bold size={14} />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0" 
        onClick={() => applyFormat('italic')}
      >
        <Italic size={14} />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0" 
        onClick={() => applyFormat('underline')}
      >
        <Underline size={14} />
      </Button>
      <div className="h-full w-px bg-gray-200 mx-1"></div>
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0" 
        onClick={() => applyFormat('left')}
      >
        <AlignLeft size={14} />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0" 
        onClick={() => applyFormat('center')}
      >
        <AlignCenter size={14} />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0" 
        onClick={() => applyFormat('right')}
      >
        <AlignRight size={14} />
      </Button>
    </div>
  );
};

export default TextFormatToolbar;
