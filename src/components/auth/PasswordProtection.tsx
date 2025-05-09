
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PasswordProtectionProps {
  password: string;
  children: React.ReactNode;
  redirectPath?: string;
}

export const PasswordProtection: React.FC<PasswordProtectionProps> = ({
  password,
  children,
  redirectPath = '/dashboard',
}) => {
  const [inputPassword, setInputPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // Check if the user has already entered the correct password
  useEffect(() => {
    const storedAuth = localStorage.getItem('funnel_builder_auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputPassword === password) {
      localStorage.setItem('funnel_builder_auth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setInputPassword('');
    }
  };
  
  const handleCancel = () => {
    navigate(redirectPath);
  };
  
  if (isAuthenticated) {
    return <>{children}</>;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-metamaster-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-metamaster-gray-800">Funnel Builder Access</h1>
          <p className="text-metamaster-gray-600 mt-2">
            This area is password protected. Please enter the password to continue.
          </p>
        </div>
        
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-metamaster-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              required
              autoFocus
              className="w-full"
            />
          </div>
          
          <div className="flex space-x-3">
            <Button 
              type="submit" 
              className="flex-1 bg-metamaster-primary hover:bg-metamaster-secondary"
            >
              Continue
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              className="flex-1"
            >
              Go Back
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordProtection;
