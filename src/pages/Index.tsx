
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { verifyCredentials } from '@/utils/auth';

const Index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/courses');
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Verify against predefined users
    if (verifyCredentials(username, password)) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      setIsLoading(false);
      toast({
        title: "Login successful",
        description: `Welcome back, ${username}!`,
      });
      navigate('/courses');
    } else {
      setIsLoading(false);
      setError('Invalid username or password. Please try again.');
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive"
      });
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    // Simulate Google login authentication process
    // In a real implementation, you would use Google OAuth here
    setTimeout(() => {
      const googleUser = {
        name: 'Google User',
        email: 'user@gmail.com'
      };
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', googleUser.name);
      localStorage.setItem('isGoogleUser', 'true');
      
      setIsLoading(false);
      toast({
        title: "Google login successful",
        description: `Welcome, ${googleUser.name}!`,
      });
      navigate('/courses');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-coursera-blue to-coursera-purple flex items-center justify-center">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-coursera-blue to-coursera-purple bg-clip-text text-transparent">
            CourseCart
          </h1>
          <p className="text-gray-600 mt-2">Your gateway to knowledge</p>
        </div>
        
        <div className="glass-card p-8 animate-slide-up">
          <h2 className="text-2xl font-bold mb-6 text-center">Log in to your account</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100/70 text-red-800 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="glass-input w-full"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="glass-input w-full"
              />
            </div>
            
            <div className="text-right">
              <a href="#" className="text-sm text-coursera-blue hover:underline">
                Forgot password?
              </a>
            </div>
            
            <Button 
              type="submit" 
              className="w-full btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </Button>
          </form>
          
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/60 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          
          <Button 
            type="button" 
            onClick={handleGoogleLogin}
            className="w-full btn-google mb-6"
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>
          
          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account?</span>{' '}
            <a href="#" className="text-coursera-blue font-medium hover:underline">
              Sign up
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Test users: saurabh/1234, rohit/1234, chirag/1234
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
