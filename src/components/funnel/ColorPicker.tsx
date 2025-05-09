
import React from 'react';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, label }) => {
  const presetColors = [
    '#9b87f5', // Primary Purple
    '#6E59A5', // Tertiary Purple
    '#D6BCFA', // Light Purple
    '#E5DEFF', // Soft Purple
    '#F2FCE2', // Soft Green
    '#FEF7CD', // Soft Yellow
    '#FEC6A1', // Soft Orange
    '#FFDEE2', // Soft Pink
    '#FDE1D3', // Soft Peach
    '#D3E4FD', // Soft Blue
    '#F1F0FB', // Soft Gray
    '#FFFFFF', // White
    '#000000', // Black
  ];

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="flex items-center space-x-2">
        <div 
          className="w-10 h-10 rounded-md border border-gray-300 cursor-pointer shadow-sm"
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
          className="font-mono w-28 h-10"
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {presetColors.map((presetColor) => (
          <div
            key={presetColor}
            className={`w-6 h-6 rounded-md cursor-pointer hover:scale-110 transition-transform ${
              color === presetColor ? 'ring-2 ring-offset-2 ring-purple-500' : ''
            }`}
            style={{ backgroundColor: presetColor }}
            onClick={() => onChange(presetColor)}
          />
        ))}
      </div>
    </div>
  );
};
