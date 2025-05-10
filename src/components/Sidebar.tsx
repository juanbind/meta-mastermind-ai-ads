
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Database, 
  LayoutGrid, 
  Users, 
  FileText,
  BarChart, 
  Settings,
  Zap,
  Menu,
  X,
  Image,
  AlertCircle,
  Bell,
  CreditCard,
  Lock
} from 'lucide-react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  isComingSoon?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, isActive, onClick, isComingSoon }) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all-ease ${
        isActive 
          ? 'bg-gradient-to-r from-adking-primary to-adking-secondary text-white' 
          : 'text-adking-gray-600 hover:bg-adking-gray-200/50'
      }`}
      onClick={onClick}
    >
      <div className="flex-shrink-0">{icon}</div>
      <span className="font-medium">{label}</span>
      
      {isComingSoon && (
        <div className="ml-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-amber-500 fill-amber-500/30" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Coming Soon</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const links = [
    { to: '/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/ads-library', icon: <Search size={20} />, label: 'Ad Library' },
    { to: '/creatives', icon: <Image size={20} />, label: 'Creatives' },
    { to: '/ai-tools/media-buyer', icon: <BarChart size={20} />, label: 'AI Media Buyer' },
    { to: '/crm', icon: <Users size={20} />, label: 'CRM' },
    { to: '/funnel-builder', icon: <LayoutGrid size={20} />, label: 'Funnel Builder', isComingSoon: true },
    { to: '/ai-tools', icon: <Zap size={20} />, label: 'AI Tools' },
    { to: '/reports', icon: <BarChart size={20} />, label: 'Reports' },
    { to: '/templates', icon: <FileText size={20} />, label: 'Templates' },
    { to: '/integrations', icon: <Database size={20} />, label: 'Integrations' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(`/settings?tab=${path}`);
    if (mobileMenuOpen) {
      closeMobileMenu();
    }
  };

  const userDisplayName = user?.user_metadata?.full_name || user?.email || 'User';
  const userInitials = userDisplayName.charAt(0).toUpperCase();
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button 
        className="fixed top-4 left-4 z-50 bg-adking-primary p-2 rounded-md text-white md:hidden"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop Sidebar */}
      <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 py-6 overflow-y-auto hidden md:block">
        <div className="px-6 mb-8">
          <Logo size="md" />
        </div>
        
        <div className="px-3 space-y-1">
          {links.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              isActive={currentPath === link.to}
              isComingSoon={link.isComingSoon}
            />
          ))}
        </div>
        
        <div className="absolute bottom-0 left-0 w-full px-3 py-4 border-t border-gray-200">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center space-x-3 px-4 py-2 cursor-pointer hover:bg-adking-gray-200/50 rounded-lg transition-all-ease">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback className="bg-adking-gray-800 text-white">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-adking-gray-800">
                    {userDisplayName}
                  </p>
                  <p className="text-xs text-adking-gray-500 truncate">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="start">
              <div className="py-2">
                <button 
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-adking-gray-100"
                  onClick={() => handleNavigation('profile')}
                >
                  <Settings size={16} className="mr-2" />
                  Settings
                </button>
                <button 
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-adking-gray-100"
                  onClick={() => handleNavigation('billing')}
                >
                  <CreditCard size={16} className="mr-2" />
                  Billing
                </button>
                <button 
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-adking-gray-100"
                  onClick={() => handleNavigation('security')}
                >
                  <Lock size={16} className="mr-2" />
                  Security
                </button>
                <button 
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-adking-gray-100"
                  onClick={() => handleNavigation('team')}
                >
                  <Users size={16} className="mr-2" />
                  Team
                </button>
                <button 
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-adking-gray-100"
                  onClick={() => handleNavigation('notifications')}
                >
                  <Bell size={16} className="mr-2" />
                  Notifications
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Mobile Sidebar - Slide in from left */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeMobileMenu}></div>
          
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 w-64 bg-white py-6 overflow-y-auto z-50">
            <div className="px-6 mb-8 flex justify-between items-center">
              <Logo size="md" />
              <button 
                className="text-adking-gray-600 p-2"
                onClick={closeMobileMenu}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="px-3 space-y-1">
              {links.map((link) => (
                <SidebarLink
                  key={link.to}
                  to={link.to}
                  icon={link.icon}
                  label={link.label}
                  isActive={currentPath === link.to}
                  onClick={closeMobileMenu}
                  isComingSoon={link.isComingSoon}
                />
              ))}
            </div>
            
            <div className="absolute bottom-0 left-0 w-full px-3 py-4 border-t border-gray-200">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center space-x-3 px-4 py-2 cursor-pointer hover:bg-adking-gray-200/50 rounded-lg transition-all-ease">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={avatarUrl} />
                      <AvatarFallback className="bg-adking-gray-800 text-white">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-adking-gray-800">
                        {userDisplayName}
                      </p>
                      <p className="text-xs text-adking-gray-500 truncate">
                        {user?.email || 'user@example.com'}
                      </p>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0" align="start">
                  <div className="py-2">
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-adking-gray-100"
                      onClick={() => handleNavigation('profile')}
                    >
                      <Settings size={16} className="mr-2" />
                      Settings
                    </button>
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-adking-gray-100"
                      onClick={() => handleNavigation('billing')}
                    >
                      <CreditCard size={16} className="mr-2" />
                      Billing
                    </button>
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-adking-gray-100"
                      onClick={() => handleNavigation('security')}
                    >
                      <Lock size={16} className="mr-2" />
                      Security
                    </button>
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-adking-gray-100"
                      onClick={() => handleNavigation('team')}
                    >
                      <Users size={16} className="mr-2" />
                      Team
                    </button>
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-adking-gray-100"
                      onClick={() => handleNavigation('notifications')}
                    >
                      <Bell size={16} className="mr-2" />
                      Notifications
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
