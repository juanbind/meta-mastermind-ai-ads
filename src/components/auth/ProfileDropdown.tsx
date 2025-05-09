
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, Bell, Lock, CreditCard, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    console.log(`Navigating to: /settings?tab=${path}`);
    navigate(`/settings?tab=${path}`);
  };

  const userDisplayName = user?.user_metadata?.full_name || user?.email || 'User';
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full flex items-center justify-center border border-white/20">
          <User className="h-5 w-5 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-metamaster-dark text-white border border-white/10" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="font-normal">
            <div className="font-medium text-sm">{userDisplayName}</div>
            <div className="text-xs text-metamaster-gray-400 truncate">{user?.email}</div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer text-white hover:bg-white/10" onClick={() => navigate('/dashboard')}>
            <User className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-white hover:bg-white/10" onClick={() => handleNavigation('team')}>
            <Users className="mr-2 h-4 w-4" />
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-white hover:bg-white/10" onClick={() => handleNavigation('billing')}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-white hover:bg-white/10" onClick={() => handleNavigation('security')}>
            <Lock className="mr-2 h-4 w-4" />
            <span>Security</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-white hover:bg-white/10" onClick={() => handleNavigation('notifications')}>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-white hover:bg-white/10" onClick={() => handleNavigation('profile')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem className="cursor-pointer text-white hover:bg-white/10" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
