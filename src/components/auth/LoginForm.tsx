
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
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-metamaster-primary"
          placeholder="Your email"
          disabled={isLoading}
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="password" className="block text-sm font-medium">
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
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-metamaster-primary"
          placeholder="Your password"
          disabled={isLoading}
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-metamaster-primary hover:bg-metamaster-secondary"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
};

export default LoginForm;
