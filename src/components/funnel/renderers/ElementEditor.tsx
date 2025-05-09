
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ELEMENT_TYPES } from '../FunnelElement';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ColorPicker } from '../ColorPicker';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface ElementEditorProps {
  type: string;
  content: any;
  props?: Record<string, any>;
  onChange: (content: any) => void;
  onPropsChange?: (props: Record<string, any>) => void;
}

const ElementEditor: React.FC<ElementEditorProps> = ({ type, content, props = {}, onChange, onPropsChange = () => {} }) => {
  // Different edit interfaces based on element type
  switch (type) {
    case ELEMENT_TYPES.HEADLINE:
      return (
        <Tabs defaultValue="content">
          <TabsList className="mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <Input
              value={content || ''}
              onChange={(e) => onChange(e.target.value)}
              className="mb-2"
              placeholder="Enter headline text"
            />
          </TabsContent>
          
          <TabsContent value="style">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <Select 
                    value={props.fontSize || 'text-2xl'} 
                    onValueChange={(value) => onPropsChange({...props, fontSize: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Font Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text-xl">Small</SelectItem>
                      <SelectItem value="text-2xl">Medium</SelectItem>
                      <SelectItem value="text-3xl">Large</SelectItem>
                      <SelectItem value="text-4xl">XL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Font Weight</Label>
                  <Select 
                    value={props.fontWeight || 'font-bold'} 
                    onValueChange={(value) => onPropsChange({...props, fontWeight: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Font Weight" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="font-normal">Normal</SelectItem>
                      <SelectItem value="font-medium">Medium</SelectItem>
                      <SelectItem value="font-semibold">Semibold</SelectItem>
                      <SelectItem value="font-bold">Bold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Alignment</Label>
                <Select 
                  value={props.textAlign || 'text-left'} 
                  onValueChange={(value) => onPropsChange({...props, textAlign: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text-left">Left</SelectItem>
                    <SelectItem value="text-center">Center</SelectItem>
                    <SelectItem value="text-right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Text Color</Label>
                <ColorPicker 
                  color={props.color || '#000000'} 
                  onChange={(color) => onPropsChange({...props, color})}
                />
              </div>

              <div className="space-y-2">
                <Label>Heading Level</Label>
                <Select 
                  value={props.level || 'h2'} 
                  onValueChange={(value) => onPropsChange({...props, level: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Heading Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="h1">H1</SelectItem>
                    <SelectItem value="h2">H2</SelectItem>
                    <SelectItem value="h3">H3</SelectItem>
                    <SelectItem value="h4">H4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      );
    
    case ELEMENT_TYPES.PARAGRAPH:
      return (
        <Tabs defaultValue="content">
          <TabsList className="mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <Textarea
              value={content || ''}
              onChange={(e) => onChange(e.target.value)}
              rows={4}
              className="mb-2"
              placeholder="Enter paragraph text"
            />
          </TabsContent>
          
          <TabsContent value="style">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Font Size</Label>
                <Select 
                  value={props.fontSize || 'text-base'} 
                  onValueChange={(value) => onPropsChange({...props, fontSize: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Font Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text-sm">Small</SelectItem>
                    <SelectItem value="text-base">Medium</SelectItem>
                    <SelectItem value="text-lg">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Text Color</Label>
                <ColorPicker 
                  color={props.color || '#000000'} 
                  onChange={(color) => onPropsChange({...props, color})}
                />
              </div>

              <div className="space-y-2">
                <Label>Line Height</Label>
                <Select 
                  value={props.lineHeight || 'leading-normal'} 
                  onValueChange={(value) => onPropsChange({...props, lineHeight: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Line Height" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leading-tight">Tight</SelectItem>
                    <SelectItem value="leading-normal">Normal</SelectItem>
                    <SelectItem value="leading-relaxed">Relaxed</SelectItem>
                    <SelectItem value="leading-loose">Loose</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      );
    
    case ELEMENT_TYPES.BUTTON:
      return (
        <Tabs defaultValue="content">
          <TabsList className="mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="action">Action</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <Input
              value={content || ''}
              onChange={(e) => onChange(e.target.value)}
              className="mb-2"
              placeholder="Button text"
            />
          </TabsContent>
          
          <TabsContent value="style">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Button Size</Label>
                  <Select 
                    value={props.size || 'md'} 
                    onValueChange={(value) => onPropsChange({...props, size: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Variant</Label>
                  <Select 
                    value={props.variant || 'primary'} 
                    onValueChange={(value) => onPropsChange({...props, variant: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Variant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary</SelectItem>
                      <SelectItem value="secondary">Secondary</SelectItem>
                      <SelectItem value="outline">Outline</SelectItem>
                      <SelectItem value="ghost">Ghost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Background Color</Label>
                <ColorPicker 
                  color={props.bgColor || '#3B82F6'} 
                  onChange={(bgColor) => onPropsChange({...props, bgColor})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Full Width</Label>
                <Select 
                  value={props.fullWidth ? 'true' : 'false'} 
                  onValueChange={(value) => onPropsChange({...props, fullWidth: value === 'true'})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Full Width" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="action">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Action Type</Label>
                <Select 
                  value={props.action || 'link'} 
                  onValueChange={(value) => onPropsChange({...props, action: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Action Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="link">External Link</SelectItem>
                    <SelectItem value="navigate">Go to Page</SelectItem>
                    <SelectItem value="submit">Submit Form</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>{props.action === 'navigate' ? 'Target Page' : 'URL'}</Label>
                <Input
                  value={props.url || ''}
                  onChange={(e) => onPropsChange({...props, url: e.target.value})}
                  placeholder={props.action === 'navigate' ? 'Page name' : 'https://'}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      );
    
    case ELEMENT_TYPES.IMAGE:
    case ELEMENT_TYPES.IMAGE_BLOCK:
      return (
        <Tabs defaultValue="content">
          <TabsList className="mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                  value={content || ''}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="Enter image URL"
                  className="mb-2"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Alt Text</Label>
                <Input
                  value={props.alt || ''}
                  onChange={(e) => onPropsChange({...props, alt: e.target.value})}
                  placeholder="Describe image for accessibility"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="style">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Width</Label>
                  <Input
                    type="number"
                    value={props.width || ''}
                    onChange={(e) => onPropsChange({...props, width: e.target.value ? Number(e.target.value) : undefined})}
                    placeholder="Width in pixels"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Height</Label>
                  <Input
                    type="number"
                    value={props.height || ''}
                    onChange={(e) => onPropsChange({...props, height: e.target.value ? Number(e.target.value) : undefined})}
                    placeholder="Height in pixels"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Border Radius</Label>
                <div className="pt-5">
                  <Slider
                    min={0}
                    max={20}
                    step={1}
                    value={[props.borderRadius || 0]}
                    onValueChange={([borderRadius]) => onPropsChange({...props, borderRadius})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Alignment</Label>
                <Select 
                  value={props.alignment || 'center'} 
                  onValueChange={(value) => onPropsChange({...props, alignment: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      );
    
    case ELEMENT_TYPES.DIVIDER:
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Style</Label>
            <Select 
              value={props.style || 'solid'} 
              onValueChange={(value) => onPropsChange({...props, style: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Divider Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">Solid</SelectItem>
                <SelectItem value="dashed">Dashed</SelectItem>
                <SelectItem value="dotted">Dotted</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Color</Label>
            <ColorPicker 
              color={props.color || '#e2e8f0'} 
              onChange={(color) => onPropsChange({...props, color})}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Thickness</Label>
            <div className="pt-5">
              <Slider
                min={1}
                max={10}
                step={1}
                value={[props.height || 1]}
                onValueChange={([height]) => onPropsChange({...props, height})}
              />
            </div>
          </div>
        </div>
      );
    
    case ELEMENT_TYPES.HERO_SECTION:
    case ELEMENT_TYPES.FEATURES_BLOCK:
    case ELEMENT_TYPES.TESTIMONIAL_BLOCK:
    case ELEMENT_TYPES.CTA_BLOCK:
    case ELEMENT_TYPES.FAQ_BLOCK:
    case ELEMENT_TYPES.PRICING_BLOCK:
    case ELEMENT_TYPES.SOCIAL_PROOF:
    case ELEMENT_TYPES.COUNTDOWN:
    case ELEMENT_TYPES.TRUST_BADGES:
    case ELEMENT_TYPES.IMAGE_TEXT_SECTION:
    case ELEMENT_TYPES.LIST_WITH_ICONS:
    case ELEMENT_TYPES.HTML_BLOCK:
    case ELEMENT_TYPES.CONDITIONAL_BLOCK:
    case ELEMENT_TYPES.FORM:
    case ELEMENT_TYPES.FORM_BLOCK:
    case ELEMENT_TYPES.MULTIPLE_CHOICE:
    case ELEMENT_TYPES.DROPDOWN:
    case ELEMENT_TYPES.IMAGE_SLIDER:
    case ELEMENT_TYPES.LEAD_CAPTURE_FORM:
      return (
        <Tabs defaultValue="content">
          <TabsList className="mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <Textarea
              value={typeof content === 'object' ? JSON.stringify(content, null, 2) : content}
              onChange={(e) => onChange(e.target.value)}
              rows={10}
              className="mb-2 font-mono text-xs"
              placeholder="Enter JSON configuration"
            />
          </TabsContent>
          
          <TabsContent value="style">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Background</Label>
                <Select 
                  value={props.bgType || 'color'} 
                  onValueChange={(value) => onPropsChange({...props, bgType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Background Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="color">Color</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="gradient">Gradient</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {props.bgType === 'color' && (
                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <ColorPicker 
                    color={props.bgColor || '#ffffff'} 
                    onChange={(bgColor) => onPropsChange({...props, bgColor})}
                  />
                </div>
              )}
              
              {props.bgType === 'image' && (
                <div className="space-y-2">
                  <Label>Background Image URL</Label>
                  <Input
                    value={props.bgImage || ''}
                    onChange={(e) => onPropsChange({...props, bgImage: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label>Padding</Label>
                <Select 
                  value={props.padding || 'medium'} 
                  onValueChange={(value) => onPropsChange({...props, padding: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Padding" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {type === ELEMENT_TYPES.HERO_SECTION && (
                <div className="space-y-2">
                  <Label>Layout</Label>
                  <Select 
                    value={props.layout || 'center'} 
                    onValueChange={(value) => onPropsChange({...props, layout: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="center">Centered</SelectItem>
                      <SelectItem value="left">Left Content</SelectItem>
                      <SelectItem value="right">Right Content</SelectItem>
                      <SelectItem value="split">Split Column</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {type === ELEMENT_TYPES.FEATURES_BLOCK && (
                <div className="space-y-2">
                  <Label>Columns</Label>
                  <Select 
                    value={props.columns?.toString() || "3"} 
                    onValueChange={(value) => onPropsChange({...props, columns: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Columns" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Column</SelectItem>
                      <SelectItem value="2">2 Columns</SelectItem>
                      <SelectItem value="3">3 Columns</SelectItem>
                      <SelectItem value="4">4 Columns</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      );
    
    case ELEMENT_TYPES.SPACING:
      return (
        <div className="space-y-4">
          <Label>Spacing Height (pixels)</Label>
          <Input
            type="number"
            value={props?.height || 20}
            onChange={(e) => onPropsChange({...props, height: parseInt(e.target.value) || 20})}
            min="0"
            max="200"
          />
          <div className="pt-5">
            <Slider
              min={0}
              max={200}
              step={4}
              value={[props?.height || 20]}
              onValueChange={([height]) => onPropsChange({...props, height})}
            />
          </div>
        </div>
      );
      
    default:
      return (
        <Input
          value={typeof content === 'object' ? JSON.stringify(content) : content || ''}
          onChange={(e) => onChange(e.target.value)}
          className="mb-2"
          placeholder="Enter content"
        />
      );
  }
};

export default ElementEditor;
