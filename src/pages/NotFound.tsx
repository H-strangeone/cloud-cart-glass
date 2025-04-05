
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="glass-card p-8 max-w-md">
        <h1 className="text-9xl font-bold bg-gradient-to-r from-coursera-blue to-coursera-purple bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center">
          <Link to="/">
            <Button className="btn-primary">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
