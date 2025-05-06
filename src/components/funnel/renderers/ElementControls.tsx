
import React from 'react';
import { Edit, Check, Trash, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ElementControlsProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const ElementControls: React.FC<ElementControlsProps> = ({
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onRemove,
  onMoveUp,
  onMoveDown
}) => {
  return (
    <div className="absolute -top-3 -right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
      {isEditing ? (
        <>
          <Button size="icon" variant="outline" onClick={onSave} className="h-7 w-7 bg-white">
            <Check className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" onClick={onCancel} className="h-7 w-7 bg-white">
            <Trash className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <>
          <Button size="icon" variant="outline" onClick={onEdit} className="h-7 w-7 bg-white">
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="outline" 
            onClick={onRemove} 
            className="h-7 w-7 bg-white text-red-500 hover:text-red-700"
          >
            <Trash className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="outline" 
            onClick={onMoveUp} 
            className="h-7 w-7 bg-white"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="outline" 
            onClick={onMoveDown} 
            className="h-7 w-7 bg-white"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
};

export default ElementControls;
