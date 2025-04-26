
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface LogoutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null;
  className?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  variant = 'ghost',
  className = '' 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    // Clear the logged in state
    localStorage.removeItem('isLoggedIn');
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    
    // Redirect to landing page
    navigate('/');
  };
  
  return (
    <Button 
      variant={variant} 
      onClick={handleLogout}
      className={className}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
};

export default LogoutButton;
