
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import { toast } from '@/components/ui/use-toast';

// Course data
const coursesData = [
  {
    id: 1,
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React, hooks, and modern state management',
    price: 49.99,
    rating: 4.8,
    students: 15432,
    instructor: 'John Smith',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Programming',
    level: 'Beginner',
  },
  {
    id: 2,
    title: 'Advanced JavaScript Patterns',
    description: 'Master advanced JavaScript concepts, design patterns and optimization techniques',
    price: 79.99,
    rating: 4.9,
    students: 8745,
    instructor: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Programming',
    level: 'Advanced',
  },
  {
    id: 3,
    title: 'UI/UX Design Principles',
    description: 'Comprehensive guide to designing intuitive and beautiful user interfaces',
    price: 59.99,
    rating: 4.7,
    students: 12340,
    instructor: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Design',
    level: 'Intermediate',
  },
  {
    id: 4,
    title: 'Python for Data Science',
    description: 'Learn how to analyze and visualize data using Python and popular libraries',
    price: 69.99,
    rating: 4.8,
    students: 18965,
    instructor: 'Emma Watson',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Data Science',
    level: 'Intermediate',
  },
  {
    id: 5,
    title: 'Full Stack Web Development',
    description: 'Comprehensive course covering frontend, backend, and deployment',
    price: 89.99,
    rating: 4.9,
    students: 14256,
    instructor: 'David Miller',
    image: 'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Programming',
    level: 'Advanced',
  },
  {
    id: 6,
    title: 'Machine Learning Fundamentals',
    description: 'Introduction to machine learning algorithms and practical applications',
    price: 79.99,
    rating: 4.7,
    students: 10823,
    instructor: 'Jessica Zhang',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Data Science',
    level: 'Advanced',
  }
];

const Courses = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if the user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUsername = localStorage.getItem('username') || '';
    
    if (!loggedIn) {
      navigate('/');
      return;
    }
    
    setIsLoggedIn(loggedIn);
    setUsername(storedUsername);
    
    // Get cart from localStorage if it exists
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [navigate]);
  
  const handleAddToCart = (courseId: number) => {
    if (cart.includes(courseId)) {
      toast({
        title: "Already in cart",
        description: "This course is already in your cart",
      });
      return;
    }
    
    const newCart = [...cart, courseId];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    toast({
      title: "Added to cart",
      description: "Course has been added to your cart",
    });
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('isGoogleUser');
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        username={username} 
        cartItemCount={cart.length} 
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto py-8 px-4">
        <section className="mb-12">
          <div className="glass-card p-8 rounded-xl">
            <h1 className="text-3xl font-bold mb-2">Welcome, {username}!</h1>
            <p className="text-gray-600">Discover our course catalog and start learning today.</p>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesData.map((course) => (
              <CourseCard 
                key={course.id}
                course={course}
                onAddToCart={() => handleAddToCart(course.id)}
                isInCart={cart.includes(course.id)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Courses;
