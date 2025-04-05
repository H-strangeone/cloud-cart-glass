
import React from 'react';
import { Star, Clock, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface CourseType {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  reviewCount: number;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  duration: string;
  level: string;
  studentsEnrolled: number;
  category: string;
  description: string; // Added the missing description property
}

interface CourseCardProps {
  course: CourseType;
  onAddToCart: (course: CourseType) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onAddToCart }) => {
  return (
    <div className="course-card flex flex-col h-full">
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img 
          src={course.imageUrl} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
          {course.category}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg line-clamp-2 mb-1">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-2">By {course.instructor}</p>
        
        <div className="flex items-center gap-1 mb-3">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium text-sm">{course.rating}</span>
          <span className="text-gray-500 text-xs">({course.reviewCount} reviews)</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Clock className="h-3.5 w-3.5" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{course.level}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600 col-span-2">
            <Users className="h-3.5 w-3.5" />
            <span>{course.studentsEnrolled.toLocaleString()} students</span>
          </div>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <div>
            {course.discountPrice ? (
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">${course.discountPrice}</span>
                <span className="text-gray-500 text-sm line-through">${course.price}</span>
              </div>
            ) : (
              <span className="font-bold text-lg">${course.price}</span>
            )}
          </div>
          <Button 
            onClick={() => onAddToCart(course)} 
            className="text-sm bg-gradient-to-r from-coursera-blue to-coursera-purple"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
