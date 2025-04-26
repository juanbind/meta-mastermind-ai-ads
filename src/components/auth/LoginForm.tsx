
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      // For demo purposes, let's simulate a successful login
      toast({
        title: "Success",
        description: "You've successfully logged in!",
      });
      setIsLoading(false);
      
      // Call onSuccess if provided
      if (onSuccess) {
        onSuccess();
      }
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1 text-white">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-metamaster-primary"
          placeholder="Your email"
          disabled={isLoading}
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password
          </label>
          <a 
            href="#" 
            className="text-xs text-metamaster-primary hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-metamaster-primary"
          placeholder="Your password"
          disabled={isLoading}
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-metamaster-primary hover:bg-metamaster-secondary text-white"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-white/10 flex-grow"></div>
        <span className="mx-4 text-sm text-metamaster-gray-400">or continue with</span>
        <div className="border-t border-white/10 flex-grow"></div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          className="flex justify-center items-center py-2 px-4 border border-white/10 rounded-lg hover:bg-white/5"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </button>
        <button
          type="button"
          className="flex justify-center items-center py-2 px-4 border border-white/10 rounded-lg hover:bg-white/5"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fill="#1877F2"/>
          </svg>
        </button>
        <button
          type="button"
          className="flex justify-center items-center py-2 px-4 border border-white/10 rounded-lg hover:bg-white/5"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
