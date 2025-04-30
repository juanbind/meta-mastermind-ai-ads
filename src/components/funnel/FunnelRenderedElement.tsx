
import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Edit, Trash, Save, X, Link, Calendar, Video, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { ELEMENT_TYPES } from './FunnelElement';
import { CanvasItem } from './FunnelCanvas';

interface RenderedElementProps {
  item: CanvasItem;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (content: string, props?: Record<string, any>) => void;
  onCancel: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  device?: 'mobile' | 'tablet' | 'desktop';
}

const FunnelRenderedElement: React.FC<RenderedElementProps> = ({
  item,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onRemove,
  onMoveUp,
  onMoveDown,
  device = 'mobile',
}) => {
  const [editingContent, setEditingContent] = useState(item.content);
  const [editingProps, setEditingProps] = useState(item.props || {});
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleSave = () => {
    onSave(editingContent, editingProps);
  };

  const updateProps = (key: string, value: any) => {
    setEditingProps({ ...editingProps, [key]: value });
  };

  const renderElement = () => {
    const deviceClass = device === 'mobile' ? 'text-sm' : '';

    switch (item.type) {
      case ELEMENT_TYPES.HEADLINE:
        return <h2 className={`text-2xl font-bold ${deviceClass}`}>{item.content}</h2>;
        
      case ELEMENT_TYPES.PARAGRAPH:
        return <p className={`text-metamaster-gray-700 ${deviceClass}`}>{item.content}</p>;
        
      case ELEMENT_TYPES.IMAGE:
        return (
          <div className="relative">
            <img
              src={item.props?.src || 'https://placehold.co/600x400?text=Image'}
              alt={item.props?.alt || 'Funnel image'}
              className="w-full h-auto rounded"
            />
            {item.content && <p className={`text-sm text-center mt-2 ${deviceClass}`}>{item.content}</p>}
          </div>
        );
        
      case ELEMENT_TYPES.VIDEO:
        return (
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9 bg-black rounded overflow-hidden">
              {item.props?.src ? (
                <iframe
                  src={item.props.src}
                  title={item.content || 'Video'}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <img 
                    src={item.props?.placeholder || 'https://placehold.co/600x400/2A2A2A/FFFFFF?text=Video+Placeholder'} 
                    alt="Video placeholder"
                    className="max-w-full max-h-full"
                  />
                </div>
              )}
            </div>
            {item.content && <p className={`text-sm text-center mt-2 ${deviceClass}`}>{item.content}</p>}
          </div>
        );
        
      case ELEMENT_TYPES.FORM:
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className={`font-medium mb-2 ${deviceClass}`}>{item.content || 'Contact Form'}</h3>
            <div className="space-y-3">
              {item.props?.fields?.includes('name') && (
                <Input type="text" placeholder="Name" />
              )}
              {item.props?.fields?.includes('email') && (
                <Input type="email" placeholder="Email" />
              )}
              <Button className="w-full bg-metamaster-primary hover:bg-metamaster-secondary">
                {item.props?.buttonText || 'Submit'}
              </Button>
            </div>
          </div>
        );
        
      case ELEMENT_TYPES.BULLET_LIST:
        return (
          <ul className={`list-disc pl-5 ${deviceClass}`}>
            {item.content.split('\n').map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        );
        
      case ELEMENT_TYPES.BUTTON:
        return (
          <div className="text-center">
            <Button 
              className="bg-metamaster-primary hover:bg-metamaster-secondary"
              onClick={() => item.props?.url && window.open(item.props.url, item.props?.external ? '_blank' : '_self')}
            >
              {item.content}
            </Button>
          </div>
        );
        
      case ELEMENT_TYPES.INPUT:
        return (
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${deviceClass}`}>{item.content}</label>
            <Input 
              placeholder={item.props?.placeholder || `Enter your ${item.content.toLowerCase()}`} 
              type={item.props?.type || 'text'}
              required={item.props?.required}
            />
          </div>
        );
        
      case ELEMENT_TYPES.DROPDOWN:
        return (
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${deviceClass}`}>{item.content}</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={item.props?.placeholder || "Select an option"} />
              </SelectTrigger>
              <SelectContent>
                {item.content.split('\n').map((option, idx) => (
                  <SelectItem key={idx} value={option.toLowerCase().replace(/\s+/g, '-')}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
        
      case ELEMENT_TYPES.CALENDAR:
        return (
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${deviceClass}`}>{item.content}</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left">
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                />
              </PopoverContent>
            </Popover>
          </div>
        );
        
      case ELEMENT_TYPES.DIVIDER:
        return (
          <hr 
            style={{ 
              borderStyle: item.props?.style || 'solid', 
              borderColor: item.props?.color || '#e2e8f0',
              borderWidth: `${item.props?.height || 1}px 0 0 0`,
              margin: '1rem 0'
            }} 
          />
        );
        
      case ELEMENT_TYPES.SPACING:
        return (
          <div style={{ height: `${item.props?.height || 20}px` }}></div>
        );
        
      case ELEMENT_TYPES.ICON:
        return (
          <div className="flex justify-center">
            <span className={`text-[${item.props?.color || '#3B82F6'}]`} style={{ fontSize: `${item.props?.size || 24}px` }}>
              {/* Use a simple unicode star as fallback */}
              ★
            </span>
            {item.content && <p className="text-sm text-center ml-2">{item.content}</p>}
          </div>
        );
        
      default:
        return <div>Unknown element type</div>;
    }
  };

  const renderEditForm = () => {
    const commonFields = (
      <>
        {item.type !== ELEMENT_TYPES.DIVIDER && item.type !== ELEMENT_TYPES.SPACING && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Content</label>
            {item.type === ELEMENT_TYPES.BULLET_LIST || item.type === ELEMENT_TYPES.PARAGRAPH || item.type === ELEMENT_TYPES.DROPDOWN ? (
              <Textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                placeholder={item.type === ELEMENT_TYPES.BULLET_LIST ? "Enter items, one per line" : "Enter text"}
                rows={5}
                className="w-full"
              />
            ) : (
              <Input
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                placeholder="Enter content"
              />
            )}
          </div>
        )}
        
        {/* Element-specific settings */}
        {renderElementSettings()}
      </>
    );

    return (
      <div className="space-y-4">
        {commonFields}
        <div className="flex justify-end space-x-2">
          <Button variant="outline" size="sm" onClick={onCancel}>
            <X size={16} className="mr-1" /> Cancel
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save size={16} className="mr-1" /> Save
          </Button>
        </div>
      </div>
    );
  };

  const renderElementSettings = () => {
    switch (item.type) {
      case ELEMENT_TYPES.IMAGE:
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <Input
                value={editingProps.src || ''}
                onChange={(e) => updateProps('src', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Alt Text</label>
              <Input
                value={editingProps.alt || ''}
                onChange={(e) => updateProps('alt', e.target.value)}
                placeholder="Image description"
              />
            </div>
          </>
        );
        
      case ELEMENT_TYPES.VIDEO:
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Video URL (YouTube, Vimeo)</label>
              <Input
                value={editingProps.src || ''}
                onChange={(e) => updateProps('src', e.target.value)}
                placeholder="https://www.youtube.com/embed/VIDEO_ID"
              />
              <p className="text-xs text-gray-500 mt-1">
                For YouTube: use embed URL (https://www.youtube.com/embed/VIDEO_ID)
              </p>
            </div>
          </>
        );
        
      case ELEMENT_TYPES.BUTTON:
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Button Action</label>
              <Select
                value={editingProps.action || 'link'}
                onValueChange={(value) => updateProps('action', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="link">External Link</SelectItem>
                  <SelectItem value="scroll">Scroll to Section</SelectItem>
                  <SelectItem value="next">Next Step</SelectItem>
                  <SelectItem value="submit">Submit Form</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {editingProps.action === 'link' && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">URL</label>
                  <Input
                    value={editingProps.url || ''}
                    onChange={(e) => updateProps('url', e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="flex items-center mb-4">
                  <Checkbox
                    id="external"
                    checked={!!editingProps.external}
                    onCheckedChange={(checked) => updateProps('external', checked)}
                  />
                  <label htmlFor="external" className="ml-2 text-sm">
                    Open in new tab
                  </label>
                </div>
              </>
            )}
            
            {editingProps.action === 'scroll' && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Section ID</label>
                <Input
                  value={editingProps.targetId || ''}
                  onChange={(e) => updateProps('targetId', e.target.value)}
                  placeholder="section-id"
                />
              </div>
            )}
          </>
        );
        
      case ELEMENT_TYPES.FORM:
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Form Fields</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox
                    id="name-field"
                    checked={(editingProps.fields || []).includes('name')}
                    onCheckedChange={(checked) => {
                      const fields = [...(editingProps.fields || [])];
                      if (checked && !fields.includes('name')) {
                        fields.push('name');
                      } else if (!checked) {
                        const index = fields.indexOf('name');
                        if (index !== -1) fields.splice(index, 1);
                      }
                      updateProps('fields', fields);
                    }}
                  />
                  <label htmlFor="name-field" className="ml-2 text-sm">Name</label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="email-field"
                    checked={(editingProps.fields || []).includes('email')}
                    onCheckedChange={(checked) => {
                      const fields = [...(editingProps.fields || [])];
                      if (checked && !fields.includes('email')) {
                        fields.push('email');
                      } else if (!checked) {
                        const index = fields.indexOf('email');
                        if (index !== -1) fields.splice(index, 1);
                      }
                      updateProps('fields', fields);
                    }}
                  />
                  <label htmlFor="email-field" className="ml-2 text-sm">Email</label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="phone-field"
                    checked={(editingProps.fields || []).includes('phone')}
                    onCheckedChange={(checked) => {
                      const fields = [...(editingProps.fields || [])];
                      if (checked && !fields.includes('phone')) {
                        fields.push('phone');
                      } else if (!checked) {
                        const index = fields.indexOf('phone');
                        if (index !== -1) fields.splice(index, 1);
                      }
                      updateProps('fields', fields);
                    }}
                  />
                  <label htmlFor="phone-field" className="ml-2 text-sm">Phone</label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="message-field"
                    checked={(editingProps.fields || []).includes('message')}
                    onCheckedChange={(checked) => {
                      const fields = [...(editingProps.fields || [])];
                      if (checked && !fields.includes('message')) {
                        fields.push('message');
                      } else if (!checked) {
                        const index = fields.indexOf('message');
                        if (index !== -1) fields.splice(index, 1);
                      }
                      updateProps('fields', fields);
                    }}
                  />
                  <label htmlFor="message-field" className="ml-2 text-sm">Message</label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Button Text</label>
              <Input
                value={editingProps.buttonText || 'Submit'}
                onChange={(e) => updateProps('buttonText', e.target.value)}
                placeholder="Submit"
              />
            </div>
          </>
        );
        
      case ELEMENT_TYPES.INPUT:
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Input Type</label>
              <Select
                value={editingProps.type || 'text'}
                onValueChange={(value) => updateProps('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select input type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="tel">Phone</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="password">Password</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Placeholder</label>
              <Input
                value={editingProps.placeholder || ''}
                onChange={(e) => updateProps('placeholder', e.target.value)}
                placeholder="Enter placeholder text"
              />
            </div>
            <div className="flex items-center mb-4">
              <Checkbox
                id="required"
                checked={!!editingProps.required}
                onCheckedChange={(checked) => updateProps('required', checked)}
              />
              <label htmlFor="required" className="ml-2 text-sm">Required field</label>
            </div>
          </>
        );
        
      case ELEMENT_TYPES.DIVIDER:
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Style</label>
              <Select
                value={editingProps.style || 'solid'}
                onValueChange={(value) => updateProps('style', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select divider style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solid">Solid</SelectItem>
                  <SelectItem value="dashed">Dashed</SelectItem>
                  <SelectItem value="dotted">Dotted</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Thickness (px)</label>
              <Input
                type="number"
                value={editingProps.height || 1}
                onChange={(e) => updateProps('height', parseInt(e.target.value))}
                min={1}
                max={10}
              />
            </div>
          </>
        );
        
      case ELEMENT_TYPES.SPACING:
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Height (px)</label>
            <Input
              type="number"
              value={editingProps.height || 20}
              onChange={(e) => updateProps('height', parseInt(e.target.value))}
              min={5}
              max={200}
            />
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="group relative border border-gray-200 hover:border-metamaster-primary rounded-lg p-4">
      {isEditing ? (
        <div className="space-y-4">
          {renderEditForm()}
        </div>
      ) : (
        <>
          {renderElement()}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 bg-white"
              onClick={onMoveUp}
            >
              <ArrowUp size={14} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 bg-white"
              onClick={onMoveDown}
            >
              <ArrowDown size={14} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 bg-white"
              onClick={onEdit}
            >
              <Edit size={14} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 bg-white text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={onRemove}
            >
              <Trash size={14} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FunnelRenderedElement;
