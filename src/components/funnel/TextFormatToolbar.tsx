
import React from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  AlignJustify,
  Text
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';

export interface TextStyle {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  color: string;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: string;
  letterSpacing?: string;
}

interface TextFormatToolbarProps {
  style: TextStyle;
  onStyleChange: (newStyle: Partial<TextStyle>) => void;
}

const FONT_FAMILIES = [
  { name: 'Sans-serif', value: 'Arial, Helvetica, sans-serif' },
  { name: 'Serif', value: 'Georgia, "Times New Roman", serif' },
  { name: 'Monospace', value: '"Courier New", Courier, monospace' },
  { name: 'Modern', value: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif' },
  { name: 'Classic', value: 'Garamond, "Times New Roman", serif' },
  { name: 'Creative', value: '"Comic Sans MS", cursive, sans-serif' },
];

const FONT_SIZES = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px', '64px'];
const LINE_HEIGHTS = ['1', '1.2', '1.5', '1.8', '2', '2.5'];
const LETTER_SPACINGS = ['normal', '0.05em', '0.1em', '0.15em', '0.2em', '-0.05em'];

const COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'Dark Gray', value: '#333333' },
  { name: 'Gray', value: '#666666' },
  { name: 'Light Gray', value: '#999999' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Red', value: '#FF0000' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Green', value: '#00FF00' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Purple', value: '#800080' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Pink', value: '#FFC0CB' },
  { name: 'Primary', value: '#3B82F6' },
  { name: 'Success', value: '#10B981' },
  { name: 'Warning', value: '#F59E0B' },
  { name: 'Danger', value: '#EF4444' },
];

const TextFormatToolbar: React.FC<TextFormatToolbarProps> = ({ style, onStyleChange }) => {
  const toggleBold = () => {
    onStyleChange({ fontWeight: style.fontWeight === 'bold' ? 'normal' : 'bold' });
  };

  const toggleItalic = () => {
    onStyleChange({ fontStyle: style.fontStyle === 'italic' ? 'normal' : 'italic' });
  };

  const toggleUnderline = () => {
    onStyleChange({ textDecoration: style.textDecoration === 'underline' ? 'none' : 'underline' });
  };

  const setAlignment = (align: 'left' | 'center' | 'right' | 'justify') => {
    onStyleChange({ textAlign: align });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm flex flex-wrap gap-2 items-center">
      {/* Font Family */}
      <Select 
        value={style.fontFamily} 
        onValueChange={(value) => onStyleChange({ fontFamily: value })}
      >
        <SelectTrigger className="w-[140px] h-8">
          <SelectValue placeholder="Font" />
        </SelectTrigger>
        <SelectContent>
          {FONT_FAMILIES.map((font) => (
            <SelectItem key={font.name} value={font.value}>
              <span style={{ fontFamily: font.value }}>{font.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Font Size */}
      <Select 
        value={style.fontSize} 
        onValueChange={(value) => onStyleChange({ fontSize: value })}
      >
        <SelectTrigger className="w-[70px] h-8">
          <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
          {FONT_SIZES.map((size) => (
            <SelectItem key={size} value={size}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Line Height */}
      <Select 
        value={style.lineHeight || '1.5'} 
        onValueChange={(value) => onStyleChange({ lineHeight: value })}
      >
        <SelectTrigger className="w-[80px] h-8">
          <SelectValue placeholder="Line Height" />
        </SelectTrigger>
        <SelectContent>
          {LINE_HEIGHTS.map((height) => (
            <SelectItem key={height} value={height}>
              {height}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Color Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 px-2 flex gap-1 items-center"
          >
            <div 
              className="w-4 h-4 rounded-full border border-gray-300" 
              style={{ backgroundColor: style.color }}
            />
            <Text size={14} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3">
          <div className="grid grid-cols-6 gap-2">
            {COLORS.map((color) => (
              <button
                key={color.name}
                className="w-8 h-8 rounded-full border border-gray-200 hover:scale-110 transition-transform"
                style={{ backgroundColor: color.value }}
                onClick={() => onStyleChange({ color: color.value })}
                title={color.name}
              />
            ))}
          </div>
          <div className="mt-3">
            <label className="block text-xs mb-1">Custom Color</label>
            <input
              type="color"
              value={style.color}
              onChange={(e) => onStyleChange({ color: e.target.value })}
              className="w-full h-8"
            />
          </div>
        </PopoverContent>
      </Popover>

      {/* Text Formatting Buttons */}
      <div className="flex border-l border-gray-200 pl-2 ml-1">
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${style.fontWeight === 'bold' ? 'bg-gray-100' : ''}`}
          onClick={toggleBold}
        >
          <Bold size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${style.fontStyle === 'italic' ? 'bg-gray-100' : ''}`}
          onClick={toggleItalic}
        >
          <Italic size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${style.textDecoration === 'underline' ? 'bg-gray-100' : ''}`}
          onClick={toggleUnderline}
        >
          <Underline size={16} />
        </Button>
      </div>

      {/* Text Alignment Buttons */}
      <div className="flex border-l border-gray-200 pl-2 ml-1">
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${style.textAlign === 'left' ? 'bg-gray-100' : ''}`}
          onClick={() => setAlignment('left')}
        >
          <AlignLeft size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${style.textAlign === 'center' ? 'bg-gray-100' : ''}`}
          onClick={() => setAlignment('center')}
        >
          <AlignCenter size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${style.textAlign === 'right' ? 'bg-gray-100' : ''}`}
          onClick={() => setAlignment('right')}
        >
          <AlignRight size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${style.textAlign === 'justify' ? 'bg-gray-100' : ''}`}
          onClick={() => setAlignment('justify')}
        >
          <AlignJustify size={16} />
        </Button>
      </div>
    </div>
  );
};

export default TextFormatToolbar;
