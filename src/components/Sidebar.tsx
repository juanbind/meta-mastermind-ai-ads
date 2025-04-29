
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Database, 
  LayoutGrid, 
  Users, 
  FileText,
  BarChart, 
  Settings,
  Zap
} from 'lucide-react';
import Logo from './Logo';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all-ease ${
        isActive 
          ? 'bg-gradient-to-r from-metamaster-primary to-metamaster-secondary text-white' 
          : 'text-metamaster-gray-600 hover:bg-metamaster-gray-200/50'
      }`}
    >
      <div className="flex-shrink-0">{icon}</div>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const links = [
    { to: '/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/ads-library', icon: <Search size={20} />, label: 'Ad Library' },
    { to: '/funnel-builder', icon: <LayoutGrid size={20} />, label: 'Funnel Builder' },
    { to: '/crm', icon: <Users size={20} />, label: 'CRM' },
    { to: '/ai-tools', icon: <Zap size={20} />, label: 'AI Tools' },
    { to: '/reports', icon: <BarChart size={20} />, label: 'Reports' },
    { to: '/templates', icon: <FileText size={20} />, label: 'Templates' },
    { to: '/integrations', icon: <Database size={20} />, label: 'Integrations' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];
  
  return (
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
          />
        ))}
      </div>
      
      <div className="absolute bottom-0 left-0 w-full px-3 py-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-metamaster-gray-800 flex items-center justify-center text-white">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-metamaster-gray-800">User Name</p>
            <p className="text-xs text-metamaster-gray-500 truncate">user@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
