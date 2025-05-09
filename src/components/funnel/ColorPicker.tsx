
import React from 'react';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <div 
        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => {
          // Create a hidden color input and click it
          const input = document.createElement('input');
          input.type = 'color';
          input.value = color;
          input.addEventListener('input', (e) => {
            onChange((e.target as HTMLInputElement).value);
          });
          input.click();
        }}
      />
      <Input
        value={color}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#000000"
        className="font-mono"
      />
    </div>
  );
};
