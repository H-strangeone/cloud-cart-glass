
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CourseCard, { CourseType } from '@/components/CourseCard';
import Navbar from '@/components/Navbar';
import { toast } from '@/components/ui/use-toast';

// Sample course data
const sampleCourses: CourseType[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    instructor: 'John Smith',
    rating: 4.8,
    reviewCount: 2563,
    price: 99.99,
    discountPrice: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format',
    duration: '8 weeks',
    level: 'Beginner',
    studentsEnrolled: 15420,
    category: 'Development'
  },
  {
    id: '2',
    title: 'Machine Learning A-Z: Hands-On Python & R In Data Science',
    instructor: 'Sarah Johnson',
    rating: 4.6,
    reviewCount: 1832,
    price: 129.99,
    discountPrice: 64.99,
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format',
    duration: '12 weeks',
    level: 'Intermediate',
    studentsEnrolled: 9870,
    category: 'Data Science'
  },
  {
    id: '3',
    title: 'UX/UI Design: Creating User-Centered Experiences',
    instructor: 'Michael Brown',
    rating: 4.9,
    reviewCount: 3241,
    price: 89.99,
    discountPrice: undefined,
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format',
    duration: '6 weeks',
    level: 'All Levels',
    studentsEnrolled: 12450,
    category: 'Design'
  },
  {
    id: '4',
    title: 'Advanced JavaScript: From Fundamentals to Functional JS',
    instructor: 'Emily Chen',
    rating: 4.7,
    reviewCount: 1542,
    price: 79.99,
    discountPrice: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2070&auto=format',
    duration: '10 weeks',
    level: 'Advanced',
    studentsEnrolled: 7650,
    category: 'Development'
  },
  {
    id: '5',
    title: 'Digital Marketing Masterclass: Get Your First 1,000 Customers',
    instructor: 'Jessica Williams',
    rating: 4.5,
    reviewCount: 2100,
    price: 119.99,
    discountPrice: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=2070&auto=format',
    duration: '8 weeks',
    level: 'Beginner',
    studentsEnrolled: 18900,
    category: 'Marketing'
  },
  {
    id: '6',
    title: 'Financial Management and Analysis: Comprehensive Guide',
    instructor: 'Robert Taylor',
    rating: 4.4,
    reviewCount: 950,
    price: 149.99,
    discountPrice: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2070&auto=format',
    duration: '14 weeks',
    level: 'Intermediate',
    studentsEnrolled: 5200,
    category: 'Finance'
  }
];

const categories = [
  'All Categories',
  'Development',
  'Data Science',
  'Design',
  'Marketing',
  'Finance',
  'Business'
];

const Courses = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [cartItems, setCartItems] = useState<CourseType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedIn) {
      navigate('/');
      return;
    }
    
    setIsLoggedIn(true);
    setUsername(localStorage.getItem('username') || '');
    
    // Get cart items from localStorage
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/');
  };
  
  const handleAddToCart = (course: CourseType) => {
    const isInCart = cartItems.some(item => item.id === course.id);
    
    if (isInCart) {
      toast({
        title: "Already in cart",
        description: `${course.title} is already in your cart.`,
        variant: "destructive",
      });
      return;
    }
    
    const newCartItems = [...cartItems, course];
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    
    toast({
      title: "Added to cart",
      description: `${course.title} has been added to your cart.`,
    });
  };
  
  const filteredCourses = sampleCourses.filter(course => {
    const matchesCategory = selectedCategory === 'All Categories' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        cartItemCount={cartItems.length} 
        username={username}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
          <p className="text-gray-600">Discover top-rated courses to enhance your skills</p>
        </section>
        
        <section className="glass-card p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-input pl-10 w-full"
              />
            </div>
            
            <div className="relative inline-block">
              <div className="flex items-center gap-2 glass-input cursor-pointer min-w-[180px]">
                <Filter className="h-4 w-4 text-gray-600" />
                <span>{selectedCategory}</span>
                <ChevronDown className="h-4 w-4 ml-auto text-gray-600" />
              </div>
              <div className="absolute top-full left-0 right-0 mt-1 p-2 glass-card z-10 hidden group-hover:block">
                {categories.map((category) => (
                  <div 
                    key={category} 
                    className="p-2 hover:bg-white/50 rounded cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onAddToCart={handleAddToCart} 
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Courses;
