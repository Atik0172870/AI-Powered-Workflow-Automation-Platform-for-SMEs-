import React from 'react';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DraggableNodeProps {
  node: {
    id: number;
    type: string;
    label: string;
    x: number;
    y: number;
    config: any;
  };
  isSelected: boolean;
  onClick: () => void;
  onDelete: () => void;
  onPositionChange: (x: number, y: number) => void;
  nodeTypes: any[];
}

export const DraggableNode = ({ 
  node, 
  isSelected, 
  onClick, 
  onDelete, 
  onPositionChange,
  nodeTypes 
}: DraggableNodeProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const nodeType = nodeTypes.find(t => t.type === node.type);
  const IconComponent = nodeType?.icon;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - node.x,
      y: e.clientY - node.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Constrain to canvas bounds
    const constrainedX = Math.max(0, Math.min(newX, 800));
    const constrainedY = Math.max(0, Math.min(newY, 600));
    
    onPositionChange(constrainedX, constrainedY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global event listeners for drag
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <div
      className={`absolute bg-white border rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all select-none ${
        isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
      } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{ 
        left: node.x, 
        top: node.y,
        zIndex: isDragging ? 1000 : isSelected ? 100 : 1
      }}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className="flex items-center space-x-2">
        <div className={`p-1 rounded ${nodeType?.color || 'bg-gray-100'}`}>
          {IconComponent && <IconComponent className="h-4 w-4" />}
        </div>
        <div>
          <div className="font-medium text-sm">{node.label}</div>
          <div className="text-xs text-gray-500 capitalize">{node.type}</div>
        </div>
      </div>
      {isSelected && (
        <div className="mt-2 pt-2 border-t">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
};
