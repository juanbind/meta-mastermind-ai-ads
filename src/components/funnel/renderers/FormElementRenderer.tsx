import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar, Upload, AlertCircle } from 'lucide-react';
import { ELEMENT_TYPES } from '../FunnelElement';

interface FormElementRendererProps {
  type: string;
  content: any;
  props?: Record<string, any>;
}

const FormElementRenderer: React.FC<FormElementRendererProps> = ({ type, content, props }) => {
  switch (type) {
    case ELEMENT_TYPES.FORM:
    case ELEMENT_TYPES.FORM_BLOCK:
      try {
        const formContent = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
        return (
          <div className="p-4 border border-dashed border-gray-300 rounded">
            <h3 className="font-medium mb-2">Form Element</h3>
            <div className="flex flex-col gap-2 mb-4">
              <Input placeholder="Name" className="w-full" />
              <Input placeholder="Email" type="email" className="w-full" />
              <Button>Submit</Button>
            </div>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono overflow-auto max-h-40 mt-4">
              {formContent || 'Form configuration'}
            </div>
          </div>
        );
      } catch (error) {
        return <div className="p-2 text-red-500">Invalid form format</div>;
      }
    
    case ELEMENT_TYPES.MULTIPLE_CHOICE:
      try {
        const mcContent = typeof content === 'string' 
          ? JSON.parse(content) 
          : content;
        
        return (
          <div className="p-4 border border-dashed border-gray-300 rounded">
            <h3 className="font-medium mb-2">{mcContent.question || "Multiple Choice"}</h3>
            <div className="space-y-2">
              {mcContent.options?.map((option: string, idx: number) => (
                <div key={idx} className="flex items-center">
                  <input 
                    type={mcContent.allowMultiple ? "checkbox" : "radio"} 
                    id={`option-${idx}`}
                    name="option"
                    className="mr-2"
                  />
                  <label htmlFor={`option-${idx}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
        );
      } catch (error) {
        return <div className="p-2 text-red-500">Invalid multiple choice format</div>;
      }
    
    case ELEMENT_TYPES.DROPDOWN:
      try {
        const options = typeof content === 'string' 
          ? content.split('\n')
          : Array.isArray(content) ? content : [];
        
        return (
          <div className="p-2">
            <select className="w-full border border-gray-300 rounded p-2">
              <option value="" disabled selected>Select an option</option>
              {options.map((option: string, idx: number) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      } catch (error) {
        return <div className="p-2 text-red-500">Invalid dropdown format</div>;
      }
    
    case ELEMENT_TYPES.FILE_UPLOAD:
      return (
        <div className="p-4 border border-dashed border-gray-300 rounded">
          <h3 className="font-medium mb-2">File Upload</h3>
          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-gray-500" />
              <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
            </div>
            <input type="file" className="hidden" />
          </label>
        </div>
      );
    
    case ELEMENT_TYPES.CALENDAR:
    case ELEMENT_TYPES.DATE_PICKER:
      return (
        <div className="p-4 border border-dashed border-gray-300 rounded">
          <h3 className="font-medium mb-2">Date Selection</h3>
          <div className="relative">
            <Input 
              type="date" 
              className="w-full p-2"
              placeholder={content || "Select a date"} 
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
      );
      
    default:
      return (
        <div className="p-4 border border-dashed border-gray-300 rounded">
          <div className="flex items-center text-amber-700">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>Unknown form element type: {type}</span>
          </div>
        </div>
      );
  }
};

export default FormElementRenderer;
