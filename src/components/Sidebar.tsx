
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '@/components/Logo';
import ProfileDropdown from '@/components/auth/ProfileDropdown';
import { 
  LayoutDashboard, 
  Zap, 
  Target, 
  Search, 
  Image, 
  GitMerge, 
  Users, 
  BarChart3, 
  LayoutTemplate, 
  Link2, 
  Settings, 
  X,
  Rocket
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="h-full flex flex-col">
        <div className="px-4 py-5 flex items-center justify-between">
          <Logo variant="full" className="h-8" />
          <button 
            onClick={() => setIsOpen(false)} 
            className="md:hidden text-gray-500 hover:text-gray-700"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 
                `group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                ${isActive ? 'bg-metamaster-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="px-3 py-3 border-t">
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

const sidebarLinks = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="mr-3" size={18} />
  },
  {
    to: '/ai-tools',
    label: 'AI Tools',
    icon: <Zap className="mr-3" size={18} />
  },
  {
    to: '/ai-media-buyer',
    label: 'AI Media Buyer',
    icon: <Target className="mr-3" size={18} />
  },
  {
    to: '/campaign-builder',
    label: 'Campaign Builder',
    icon: <Rocket className="mr-3" size={18} />
  },
  {
    to: '/ads-library',
    label: 'Ads Library',
    icon: <Search className="mr-3" size={18} />
  },
  {
    to: '/creatives',
    label: 'Creatives',
    icon: <Image className="mr-3" size={18} />
  },
  {
    to: '/funnel-builder',
    label: 'Funnel Builder',
    icon: <GitMerge className="mr-3" size={18} />
  },
  {
    to: '/crm',
    label: 'CRM',
    icon: <Users className="mr-3" size={18} />
  },
  {
    to: '/reports',
    label: 'Reports',
    icon: <BarChart3 className="mr-3" size={18} />
  },
  {
    to: '/templates',
    label: 'Templates',
    icon: <LayoutTemplate className="mr-3" size={18} />
  },
  {
    to: '/integrations',
    label: 'Integrations',
    icon: <Link2 className="mr-3" size={18} />
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: <Settings className="mr-3" size={18} />
  }
];
