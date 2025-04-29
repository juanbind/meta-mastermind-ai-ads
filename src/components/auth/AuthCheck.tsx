
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

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
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && !user) {
      console.log("User not authenticated, redirecting to:", redirectTo);
      toast({
        title: "Authentication required",
        description: "Please login or sign up to access this page.",
        variant: "warning",
      });
      navigate(redirectTo);
    }
  }, [user, loading, navigate, redirectTo, toast]);
  
  // Show loading spinner while checking auth status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-metamaster-primary"></div>
      </div>
    );
  }
  
  // If authenticated, render children
  return user ? <>{children}</> : null;
};
