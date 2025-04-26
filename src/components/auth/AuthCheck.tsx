
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthCheckProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const AuthCheck: React.FC<AuthCheckProps> = ({ 
  children,
  redirectTo = '/auth'
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // For demonstration purposes, we'll use localStorage
  // In a real app, you'd use a proper auth solution
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  // Add this line to make yourself always "logged in" for testing
  // const isLoggedIn = true;
  
  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please login or sign up to access this page.",
      });
      navigate(redirectTo);
    }
  }, [isLoggedIn, navigate, redirectTo, toast]);
  
  // If authenticated, render children
  return isLoggedIn ? <>{children}</> : null;
};
