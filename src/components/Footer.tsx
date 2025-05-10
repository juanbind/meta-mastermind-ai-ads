
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-metamaster-gray-800/50 border-t border-white/10 pt-16 pb-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-metamaster-gray-400 max-w-md">
              The all-in-one platform for Facebook & Instagram Ad success. Discover winning ads, build campaigns, and scale your business with AI.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-metamaster-gray-400 hover:text-metamaster-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-metamaster-gray-400 hover:text-metamaster-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-metamaster-gray-400 hover:text-metamaster-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-metamaster-gray-400 hover:text-metamaster-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-metamaster-gray-400 hover:text-metamaster-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/ads-library" className="text-metamaster-gray-400 hover:text-white transition-colors">Ad Library</Link></li>
              <li><Link to="/funnel-builder" className="text-metamaster-gray-400 hover:text-white transition-colors">Funnel Builder</Link></li>
              <li><Link to="/crm" className="text-metamaster-gray-400 hover:text-white transition-colors">CRM</Link></li>
              <li><Link to="/dashboard" className="text-metamaster-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-metamaster-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-metamaster-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-metamaster-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-metamaster-gray-400 hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-metamaster-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-metamaster-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-metamaster-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-metamaster-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-metamaster-gray-500 text-sm">
            © {new Date().getFullYear()} AdKing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
