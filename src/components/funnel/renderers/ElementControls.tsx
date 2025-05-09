
import React from 'react';
import { Edit, Check, Trash, ArrowUp, ArrowDown, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ElementControlsProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate?: () => void;
}

const ElementControls: React.FC<ElementControlsProps> = ({
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onRemove,
  onMoveUp,
  onMoveDown,
  onDuplicate
}) => {
  return (
    <div className="absolute -top-3 -right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
      {isEditing ? (
        <>
          <Button 
            size="icon" 
            variant="outline" 
            onClick={onSave} 
            className="h-7 w-7 bg-white border-purple-300 hover:bg-purple-50 hover:text-purple-700"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="outline" 
            onClick={onCancel} 
            className="h-7 w-7 bg-white border-red-300 hover:bg-red-50 hover:text-red-700"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <>
          <Button 
            size="icon" 
            variant="outline" 
            onClick={onEdit} 
            className="h-7 w-7 bg-white border-purple-300 hover:bg-purple-50 hover:text-purple-700"
          >
            <Edit className="h-4 w-4" />
          </Button>
          {onDuplicate && (
            <Button 
              size="icon" 
              variant="outline" 
              onClick={onDuplicate} 
              className="h-7 w-7 bg-white border-purple-300 hover:bg-purple-50 hover:text-purple-700"
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
          <Button 
            size="icon" 
            variant="outline" 
            onClick={onRemove} 
            className="h-7 w-7 bg-white border-red-300 hover:bg-red-50 text-red-500 hover:text-red-700"
          >
            <Trash className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="outline" 
            onClick={onMoveUp} 
            className="h-7 w-7 bg-white border-gray-300 hover:bg-gray-50"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="outline" 
            onClick={onMoveDown} 
            className="h-7 w-7 bg-white border-gray-300 hover:bg-gray-50"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
};

export default ElementControls;
