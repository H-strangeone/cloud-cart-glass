
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, CreditCard, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartItem from '@/components/CartItem';
import Navbar from '@/components/Navbar';
import { CourseType } from '@/components/CourseCard';
import { toast } from '@/components/ui/use-toast';

const Cart = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [cartItems, setCartItems] = useState<CourseType[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
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
  
  const handleRemoveFromCart = (courseId: string) => {
    const newCartItems = cartItems.filter(item => item.id !== courseId);
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    
    toast({
      title: "Removed from cart",
      description: "The course has been removed from your cart.",
    });
  };
  
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      localStorage.setItem('cartItems', JSON.stringify([]));
      setCartItems([]);
      setIsCheckingOut(false);
      
      toast({
        title: "Checkout successful",
        description: "Thank you for your purchase! Your courses are now available.",
      });
    }, 2000);
  };
  
  // Calculate total price
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.discountPrice || item.price);
  }, 0);
  
  const taxes = subtotal * 0.1; // 10% tax
  const total = subtotal + taxes;

  return (
    <div className="min-h-screen">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        cartItemCount={cartItems.length} 
        username={username}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any courses to your cart yet.</p>
            <Button 
              onClick={() => navigate('/courses')}
              className="btn-primary"
            >
              Browse Courses
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem 
                    key={item.id} 
                    course={item} 
                    onRemove={handleRemoveFromCart} 
                  />
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full btn-primary mb-4"
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Checkout
                    </span>
                  )}
                </Button>
                
                <div className="bg-yellow-50/50 border border-yellow-200 rounded-lg p-3 flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <p className="text-xs text-gray-700">
                    This is a demo application. No actual payment will be processed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
