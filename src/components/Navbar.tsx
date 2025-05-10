
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { useAuth } from '@/contexts/AuthContext';
import ProfileDropdown from './auth/ProfileDropdown';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Detect scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-metamaster-dark bg-opacity-95 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-white hover:text-metamaster-primary font-medium transition-all-ease"
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigate('/ads-library')}
              className="text-white hover:text-metamaster-primary font-medium transition-all-ease"
            >
              Ads Library
            </button>
            <button 
              onClick={() => navigate('/ai-tools')}
              className="text-white hover:text-metamaster-primary font-medium transition-all-ease"
            >
              AI Tools
            </button>
            <button 
              onClick={() => navigate('/funnel-builder')}
              className="text-white hover:text-metamaster-primary font-medium transition-all-ease"
            >
              Funnel Builder
            </button>
            <button 
              onClick={() => navigate('/crm')}
              className="text-white hover:text-metamaster-primary font-medium transition-all-ease"
            >
              CRM
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3">
            {!user ? (
              <Button 
                className="bg-metamaster-primary hover:bg-metamaster-secondary text-white"
                onClick={() => navigate('/auth')}
              >
                Get Started
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="icon" className="text-white hover:text-metamaster-primary">
                  <Bell size={20} />
                </Button>
                <ProfileDropdown />
              </>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-metamaster-dark/95 backdrop-blur-md shadow-lg py-4 px-6 absolute w-full">
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => {
                navigate('/dashboard');
                setMobileMenuOpen(false);
              }}
              className="text-white hover:text-metamaster-primary font-medium py-2"
            >
              Dashboard
            </button>
            <button 
              onClick={() => {
                navigate('/ads-library');
                setMobileMenuOpen(false);
              }}
              className="text-white hover:text-metamaster-primary font-medium py-2"
            >
              Ads Library
            </button>
            <button 
              onClick={() => {
                navigate('/ai-tools');
                setMobileMenuOpen(false);
              }}
              className="text-white hover:text-metamaster-primary font-medium py-2"
            >
              AI Tools
            </button>
            <button 
              onClick={() => {
                navigate('/funnel-builder');
                setMobileMenuOpen(false);
              }}
              className="text-white hover:text-metamaster-primary font-medium py-2"
            >
              Funnel Builder
            </button>
            <button 
              onClick={() => {
                navigate('/crm');
                setMobileMenuOpen(false);
              }}
              className="text-white hover:text-metamaster-primary font-medium py-2"
            >
              CRM
            </button>
            {!user ? (
              <Button 
                className="bg-metamaster-primary hover:bg-metamaster-secondary text-white w-full mt-2"
                onClick={() => {
                  navigate('/auth');
                  setMobileMenuOpen(false);
                }}
              >
                Get Started
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 w-full mt-2"
                onClick={() => {
                  navigate('/dashboard');
                  setMobileMenuOpen(false);
                }}
              >
                Dashboard
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
