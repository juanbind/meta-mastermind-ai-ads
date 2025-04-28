
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

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
    // If Supabase is not connected, show a warning toast
    if (!supabase && !loading) {
      toast({
        title: "Supabase not connected",
        description: "Authentication features are limited until you connect to Supabase",
        variant: "warning",
      });
      return;
    }

    if (!loading && !user) {
      toast({
        title: "Authentication required",
        description: "Please login or sign up to access this page.",
      });
      navigate(redirectTo);
    }
  }, [user, loading, navigate, redirectTo, toast]);
  
  // Show nothing while checking auth status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-metamaster-primary"></div>
      </div>
    );
  }
  
  // If Supabase is not connected but we're in development, allow access for testing
  if (!supabase && import.meta.env.DEV) {
    return <>{children}</>;
  }
  
  // If authenticated, render children
  return user ? <>{children}</> : null;
};
