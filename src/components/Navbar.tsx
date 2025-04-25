
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white bg-opacity-80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-metamaster-gray-600 hover:text-metamaster-primary font-medium transition-all-ease">
              Dashboard
            </Link>
            <Link to="/ads-library" className="text-metamaster-gray-600 hover:text-metamaster-primary font-medium transition-all-ease">
              Ads Library
            </Link>
            <Link to="/funnel-builder" className="text-metamaster-gray-600 hover:text-metamaster-primary font-medium transition-all-ease">
              Funnel Builder
            </Link>
            <Link to="/crm" className="text-metamaster-gray-600 hover:text-metamaster-primary font-medium transition-all-ease">
              CRM
            </Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="text-metamaster-gray-600 hover:text-metamaster-primary">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-metamaster-gray-600 hover:text-metamaster-primary">
              <Settings size={20} />
            </Button>
            <Button className="bg-metamaster-primary hover:bg-metamaster-secondary text-white">
              Get Started
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-6 absolute w-full">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/dashboard" 
              className="text-metamaster-gray-600 hover:text-metamaster-primary font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/ads-library" 
              className="text-metamaster-gray-600 hover:text-metamaster-primary font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ads Library
            </Link>
            <Link 
              to="/funnel-builder" 
              className="text-metamaster-gray-600 hover:text-metamaster-primary font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Funnel Builder
            </Link>
            <Link 
              to="/crm" 
              className="text-metamaster-gray-600 hover:text-metamaster-primary font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              CRM
            </Link>
            <Button className="bg-metamaster-primary hover:bg-metamaster-secondary text-white w-full mt-2">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
