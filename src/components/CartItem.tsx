
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CourseType } from './CourseCard';

interface CartItemProps {
  course: CourseType;
  onRemove: (courseId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ course, onRemove }) => {
  return (
    <div className="glass-card p-4 flex gap-4">
      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
        <img 
          src={course.imageUrl} 
          alt={course.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium mb-1 line-clamp-1">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-2">By {course.instructor}</p>
        
        <div className="flex items-center justify-between">
          <div>
            {course.discountPrice ? (
              <div className="flex items-center gap-2">
                <span className="font-bold">${course.discountPrice}</span>
                <span className="text-gray-500 text-sm line-through">${course.price}</span>
              </div>
            ) : (
              <span className="font-bold">${course.price}</span>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onRemove(course.id)}
            className="text-gray-500 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
