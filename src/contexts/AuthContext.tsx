
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean, message?: string }>;
  signOut: () => Promise<void>;
  updateUserMetadata: (metadata: Record<string, any>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      // Show welcome message if the event is a signup event
      if (_event === 'SIGNED_IN' && !user) {
        toast({
          title: "Welcome to your 7 Day Free No Credit Card Trial of Meta Master!",
          description: "Need help? Book a Demo Below!"
        });
      }
    });
    
    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Signed in successfully",
        description: "Welcome back!",
      });
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message || "An error occurred during sign in",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });
      
      if (error) {
        throw error;
      }
      
      if (data.user) {
        toast({
          title: "Welcome to your 7 Day Free No Credit Card Trial of Meta Master!",
          description: "Need help? Book a Demo Below!"
        });
        return { success: true };
      } else {
        toast({
          title: "Almost there!",
          description: "Please check your email to confirm your account",
        });
        return { success: false, message: "Email confirmation required" };
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast({
        title: "Error creating account",
        description: error.message || "An error occurred during sign up",
        variant: "destructive",
      });
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Add updateUserMetadata function
  const updateUserMetadata = async (metadata: Record<string, any>) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.updateUser({
        data: metadata
      });
      
      if (error) {
        throw error;
      }
      
      // Update the local user state
      setUser(data.user);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
      
    } catch (error: any) {
      console.error("Error updating user metadata:", error);
      toast({
        title: "Error updating profile",
        description: error.message || "An error occurred during profile update",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUserMetadata,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
