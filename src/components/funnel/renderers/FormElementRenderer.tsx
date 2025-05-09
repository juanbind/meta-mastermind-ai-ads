
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar, Upload, AlertCircle, Check } from 'lucide-react';
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
    case ELEMENT_TYPES.LEAD_CAPTURE_FORM:
      try {
        const formContent = typeof content === 'string' ? JSON.parse(content) : content;
        const fields = formContent?.fields || [];
        const buttonText = formContent?.buttonText || 'Submit';
        
        return (
          <div className="p-4 rounded-md bg-white border border-purple-100">
            {props?.title && <h3 className="font-medium mb-3 text-gray-800">{props.title}</h3>}
            <div className="flex flex-col gap-3 mb-4">
              {fields.map((field: any, index: number) => (
                <div key={index} className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">{field.label}</label>
                  <Input 
                    placeholder={field.placeholder || field.label} 
                    type={field.type || 'text'} 
                    className="w-full border-gray-300 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50" 
                  />
                </div>
              ))}
              <Button 
                className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {buttonText}
              </Button>
            </div>
          </div>
        );
      } catch (error) {
        return <div className="p-3 text-red-500 text-sm bg-red-50 rounded-md">Invalid form format</div>;
      }
    
    case ELEMENT_TYPES.MULTIPLE_CHOICE:
      try {
        const mcContent = typeof content === 'string' 
          ? JSON.parse(content) 
          : content;
        
        return (
          <div className="p-4 rounded-md bg-white border border-purple-100">
            <h3 className="font-medium mb-3 text-gray-800">{mcContent.question || "Multiple Choice"}</h3>
            <div className="space-y-2.5">
              {mcContent.options?.map((option: string, idx: number) => (
                <div key={idx} className="flex items-center bg-gray-50 p-2.5 rounded-md hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200">
                  <div className={`w-5 h-5 rounded-full border ${mcContent.allowMultiple ? 'border-gray-400' : 'border-purple-400'} mr-3 flex items-center justify-center`}>
                    {mcContent.allowMultiple ? (
                      <div className="w-3 h-3 bg-purple-500 rounded-sm hidden"></div>
                    ) : (
                      <div className="w-3 h-3 bg-purple-500 rounded-full hidden"></div>
                    )}
                  </div>
                  <label className="cursor-pointer text-gray-700 flex-grow">{option}</label>
                </div>
              ))}
            </div>
          </div>
        );
      } catch (error) {
        return <div className="p-3 text-red-500 text-sm bg-red-50 rounded-md">Invalid multiple choice format</div>;
      }
    
    case ELEMENT_TYPES.DROPDOWN:
      try {
        const options = typeof content === 'string' 
          ? content.split('\n')
          : Array.isArray(content) ? content : [];
        
        return (
          <div className="p-2">
            <select className="w-full border border-gray-300 rounded-md p-2.5 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 pr-10 bg-white">
              <option value="" disabled selected>Select an option</option>
              {options.map((option: string, idx: number) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      } catch (error) {
        return <div className="p-3 text-red-500 text-sm bg-red-50 rounded-md">Invalid dropdown format</div>;
      }
    
    case ELEMENT_TYPES.FILE_UPLOAD:
      return (
        <div className="p-4 rounded-md bg-white border border-purple-100">
          <h3 className="font-medium mb-3 text-gray-800">File Upload</h3>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-purple-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-purple-500" />
              <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input type="file" className="hidden" />
          </label>
        </div>
      );
    
    case ELEMENT_TYPES.CALENDAR:
    case ELEMENT_TYPES.DATE_PICKER:
      return (
        <div className="p-4 rounded-md bg-white border border-purple-100">
          <h3 className="font-medium mb-3 text-gray-800">Date Selection</h3>
          <div className="relative">
            <Input 
              type="date" 
              className="w-full p-2.5 pr-10 border-gray-300 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
              placeholder={content || "Select a date"} 
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>
        </div>
      );
      
    case ELEMENT_TYPES.CHECKBOX:
      try {
        const checkboxContent = typeof content === 'string' ? JSON.parse(content) : content;
        const label = checkboxContent?.label || "I agree to terms";
        const required = checkboxContent?.required || false;
        
        return (
          <div className="p-3 rounded-md">
            <div className="flex items-center bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition-colors border border-gray-200">
              <div className="w-5 h-5 rounded border border-gray-400 mr-3 flex items-center justify-center">
                <Check className="w-3 h-3 text-white hidden" />
              </div>
              <label className="cursor-pointer text-gray-700 text-sm">
                {label} {required && <span className="text-red-500">*</span>}
              </label>
            </div>
          </div>
        );
      } catch (error) {
        return <div className="p-3 text-red-500 text-sm bg-red-50 rounded-md">Invalid checkbox format</div>;
      }
      
    default:
      return (
        <div className="p-4 border border-dashed border-gray-300 rounded-md">
          <div className="flex items-center text-amber-700">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>Unknown form element type: {type}</span>
          </div>
        </div>
      );
  }
};

export default FormElementRenderer;
