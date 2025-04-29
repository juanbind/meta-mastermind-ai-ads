import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validation
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await signUp(email, password, name);
      console.log("Signup result:", result);
      
      if (result.success) {
        // Show welcome toast message through AuthContext
        // Automatically navigate to dashboard
        navigate('/dashboard');
        if (onSuccess) {
          onSuccess();
        }
      } else if (result.message === "Email confirmation required") {
        toast({
          title: "Please check your email",
          description: "We've sent you a confirmation link to complete your registration",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      // Error is handled in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-700 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1 text-white">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-metamaster-primary"
          placeholder="Your name"
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label htmlFor="reg-email" className="block text-sm font-medium mb-1 text-white">
          Email Address
        </label>
        <input
          id="reg-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-metamaster-primary"
          placeholder="Your email"
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label htmlFor="reg-password" className="block text-sm font-medium mb-1 text-white">
          Password
        </label>
        <input
          id="reg-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-metamaster-primary"
          placeholder="Create a password"
          disabled={isLoading}
        />
        <p className="text-xs text-metamaster-gray-500 mt-1">
          Password must be at least 8 characters long
        </p>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-metamaster-primary hover:bg-metamaster-secondary text-white"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
};

export default RegisterForm;
