
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration API call
    setTimeout(() => {
      // For demo purposes, let's simulate a successful registration
      toast({
        title: "Success",
        description: "Your account has been created!",
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
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-metamaster-primary"
          placeholder="Your name"
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label htmlFor="reg-email" className="block text-sm font-medium mb-1">
          Email Address
        </label>
        <input
          id="reg-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-metamaster-primary"
          placeholder="Your email"
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label htmlFor="reg-password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          id="reg-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-metamaster-primary"
          placeholder="Create a password"
          disabled={isLoading}
        />
        <p className="text-xs text-metamaster-gray-500 mt-1">
          Password must be at least 8 characters long
        </p>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-metamaster-primary hover:bg-metamaster-secondary"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
};

export default RegisterForm;
