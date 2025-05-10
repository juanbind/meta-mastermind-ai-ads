
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Search,
  FileImage,
  BarChart2,
  Users,
  Layers,
  Zap,
  PieChart,
  FileText,
  Settings
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import LogoutButton from './auth/LogoutButton';
import Logo from './Logo';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Search, label: 'Ad Library', path: '/ads-library' },
    { icon: FileImage, label: 'Creatives', path: '/creatives' },
    { icon: BarChart2, label: 'AI Media Buyer', path: '/ai-media-buyer' },
    { icon: Users, label: 'CRM', path: '/crm' },
    { icon: Layers, label: 'Funnel Builder', path: '/funnel-builder', badge: true },
    { icon: Zap, label: 'AI Tools', path: '/ai-tools' },
    { icon: PieChart, label: 'Reports', path: '/reports' },
    { icon: FileText, label: 'Templates', path: '/templates' },
    { icon: Settings, label: 'Integrations', path: '/integrations' }
  ];
  
  return (
    <div className="fixed left-0 top-0 h-full w-[220px] bg-white border-r border-gray-100 flex flex-col justify-between z-10">
      <div>
        <div className="px-4 py-4">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
        </div>
        <div className="px-3 mt-2">
          <nav className="space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-yellow-400 text-gray-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon size={18} className="mr-3" />
                {item.label}
                {item.badge && (
                  <div className="ml-auto w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-[10px] font-semibold text-gray-800">
                    β
                  </div>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      {user && (
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-blue-500 flex items-center justify-center text-white font-medium flex-shrink-0">
              {user.email ? user.email[0].toUpperCase() : 'U'}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-gray-800 truncate">
                {user.email || 'User'}
              </p>
              <LogoutButton className="text-xs text-gray-500 hover:text-red-500 hover:underline" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
