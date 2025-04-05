
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, LogOut, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  isLoggedIn: boolean;
  cartItemCount: number;
  username?: string;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  isLoggedIn, 
  cartItemCount = 0, 
  username = '', 
  onLogout = () => {} 
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="glass sticky top-0 z-50 px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-coursera-blue to-coursera-purple flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-coursera-blue to-coursera-purple bg-clip-text text-transparent">
            CourseCart
          </span>
        </Link>
        
        {isLoggedIn && (
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-4">
              <Link to="/courses" className="nav-link font-medium">Courses</Link>
              <Link to="/categories" className="nav-link font-medium">Categories</Link>
              <Link to="/about" className="nav-link font-medium">About</Link>
            </nav>
            
            <div className="relative flex items-center bg-white/50 rounded-full px-3 py-1.5 w-60">
              <Search className="h-4 w-4 text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search for courses..." 
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Link to="/cart" className="relative p-2">
                <ShoppingCart className="h-5 w-5 text-gray-700" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-coursera-purple text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <div className="hidden md:flex items-center gap-2">
                <div className="text-sm font-medium">Hi, {username}</div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onLogout}
                  className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only text-xs">Logout</span>
                </Button>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-coursera-blue to-coursera-purple text-white">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {isMenuOpen && isLoggedIn && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-card rounded-t-none p-4 flex flex-col gap-3 animate-slide-up">
          <Link to="/courses" className="nav-link font-medium p-2">Courses</Link>
          <Link to="/categories" className="nav-link font-medium p-2">Categories</Link>
          <Link to="/about" className="nav-link font-medium p-2">About</Link>
          <hr className="border-white/30" />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onLogout}
            className="flex items-center justify-center gap-2 text-gray-700"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
