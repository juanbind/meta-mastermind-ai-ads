
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { useAuth } from '@/contexts/AuthContext';
import ProfileDropdown from './auth/ProfileDropdown';

const Navbar = () => {
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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white bg-opacity-95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => navigate('/dashboard')} className="hover:text-yellow-500 font-medium transition-all-ease text-gray-800">
              Dashboard
            </button>
            <button onClick={() => navigate('/ads-library')} className="hover:text-yellow-500 font-medium transition-all-ease text-gray-800">
              Ads Library
            </button>
            <button onClick={() => navigate('/funnel-builder')} className="hover:text-yellow-500 font-medium transition-all-ease text-gray-800">
              Funnel Builder
            </button>
            <button onClick={() => navigate('/crm')} className="hover:text-yellow-500 font-medium transition-all-ease text-gray-800">
              CRM
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3">
            {!user ? (
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800" onClick={() => navigate('/auth')}>
                Get Started
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="icon" className="hover:text-yellow-500 text-gray-800">
                  <Bell size={20} />
                </Button>
                <ProfileDropdown />
              </>
            )}
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden text-gray-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-6 absolute w-full">
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => {
                navigate('/dashboard');
                setMobileMenuOpen(false);
              }} 
              className="text-gray-800 hover:text-yellow-500 font-medium py-2"
            >
              Dashboard
            </button>
            <button 
              onClick={() => {
                navigate('/ads-library');
                setMobileMenuOpen(false);
              }} 
              className="text-gray-800 hover:text-yellow-500 font-medium py-2"
            >
              Ads Library
            </button>
            <button 
              onClick={() => {
                navigate('/funnel-builder');
                setMobileMenuOpen(false);
              }} 
              className="text-gray-800 hover:text-yellow-500 font-medium py-2"
            >
              Funnel Builder
            </button>
            <button 
              onClick={() => {
                navigate('/crm');
                setMobileMenuOpen(false);
              }} 
              className="text-gray-800 hover:text-yellow-500 font-medium py-2"
            >
              CRM
            </button>
            
            {!user ? (
              <Button 
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 w-full mt-2" 
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
                className="border-gray-200 text-gray-800 hover:bg-gray-100 w-full mt-2" 
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
