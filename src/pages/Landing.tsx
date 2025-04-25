import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Search, LayoutGrid, Users, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useScrollReveal } from '@/hooks/useScrollAnimation';

const FeatureCard = ({ icon, title, description }) => {
  const revealRef = useScrollReveal();
  return (
    <div
      ref={el => revealRef(el)}
      data-animation="pop"
      className="reveal-element bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover-lift"
    >
      <div className="bg-metamaster-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-metamaster-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-metamaster-gray-600">{description}</p>
    </div>
  );
};

const Landing = () => {
  const heroRef = useScrollAnimation();
  const revealRef = useScrollReveal();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-metamaster-gray-100">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        {/* Hero Section */}
        <div ref={heroRef} className="container mx-auto text-center max-w-4xl animate-on-scroll">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            The Ultimate <span className="gradient-text">Facebook Ads</span> & <span className="gradient-text">Funnel Building</span> Platform
          </h1>
          <p className="text-xl text-metamaster-gray-600 mb-8 max-w-2xl mx-auto">
            Discover winning ads, build high-converting funnels, and manage your customers
            all in one powerful platform.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              ref={el => revealRef(el)}
              data-animation="slide-right"
              className="reveal-element bg-metamaster-primary hover:bg-metamaster-secondary text-white text-lg px-8 py-6 rounded-lg h-auto button-press"
            >
              Get Started Free <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button 
              ref={el => revealRef(el)}
              data-animation="slide-left"
              variant="outline" 
              className="reveal-element text-lg px-8 py-6 rounded-lg h-auto button-press"
            >
              Watch Demo
            </Button>
          </div>
          
          <div 
            ref={el => revealRef(el)}
            data-animation="fade-up"
            className="reveal-element relative"
          >
            <div className="bg-metamaster-gray-800 rounded-xl overflow-hidden shadow-2xl border border-metamaster-gray-700">
              <img 
                src="https://placehold.co/1200x675/121212/e6e6e6?text=MetaMaster+Dashboard" 
                alt="MetaMaster Dashboard Preview" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-metamaster-primary text-white px-6 py-3 rounded-lg shadow-lg transform rotate-2">
              All-in-one solution
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="container mx-auto py-20">
          <div 
            ref={el => revealRef(el)}
            data-animation="fade-up"
            className="reveal-element text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Everything You Need In One Place</h2>
            <p className="text-metamaster-gray-600 max-w-2xl mx-auto">
              MetaMaster combines powerful tools for Facebook ad research, funnel building, and customer management
              to help you scale your business effortlessly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
            <FeatureCard 
              icon={<Search size={24} />}
              title="Ad Library & Discovery"
              description="Search and analyze thousands of Facebook Ads to find what's working in your industry."
            />
            <FeatureCard 
              icon={<Zap size={24} />}
              title="AI Media Buyer"
              description="Generate complete ad campaigns by answering just a few simple questions."
            />
            <FeatureCard 
              icon={<LayoutGrid size={24} />}
              title="Funnel Builder"
              description="Create high-converting funnels with our drag-and-drop builder and templates."
            />
            <FeatureCard 
              icon={<Users size={24} />}
              title="Integrated CRM"
              description="Manage leads and customers through your entire marketing funnel."
            />
          </div>
        </div>
        
        {/* CTA Section */}
        <div 
          ref={el => revealRef(el)}
          data-animation="fade-up"
          className="reveal-element container mx-auto py-16"
        >
          <div className="bg-gradient-to-r from-metamaster-primary to-metamaster-secondary rounded-2xl p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Facebook Ads?</h2>
                <p className="text-white/80 mb-6">
                  Join thousands of marketers who are scaling their businesses faster and more efficiently with MetaMaster.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    'Access to full Facebook Ads Library',
                    'AI-powered campaign generation',
                    'Drag-and-drop funnel builder',
                    'Integrated CRM system'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle size={18} className="mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-auto flex-shrink-0">
                <div className="bg-white p-6 rounded-xl shadow-xl w-full md:w-80">
                  <h3 className="text-metamaster-dark font-bold text-xl mb-4">Start Your Free Trial</h3>
                  <form className="space-y-4">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Your Name"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-metamaster-primary"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        placeholder="Email Address"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-metamaster-primary"
                      />
                    </div>
                    <Button className="w-full bg-metamaster-dark hover:bg-black text-white">
                      Get Started
                    </Button>
                    <p className="text-xs text-center text-metamaster-gray-600">
                      No credit card required
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="container mx-auto py-10 border-t border-gray-200 stagger-reveal">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-metamaster-gray-600 hover:text-metamaster-primary">Features</Link></li>
                <li><Link to="#" className="text-metamaster-gray-600 hover:text-metamaster-primary">Pricing</Link></li>
                <li><Link to="#" className="text-metamaster-gray-600 hover:text-metamaster-primary">Case Studies</Link></li>
                <li><Link to="#" className="text-metamaster-gray-600 hover:text-metamaster-primary">Reviews</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-metamaster-gray-600 hover:text-metamaster-primary">About</Link></li>
                <li><Link to="#" className="text-metamaster-gray-600 hover:text-metamaster-primary">Blog</Link></li>
                <li><Link to="#" className="text-metamaster-gray-600 hover:text-metamaster-primary">Careers</Link></li>
                <li><Link to="#" className="text-metamaster-gray-600 hover:text-metamaster-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-metamaster-gray-600 hover:text-metamaster-primary">Documentation</Link></li>
                <li><Link to="#" className="text-metamaster-gray-600 hover:text-metamaster-primary">Help Center</Link></li>
                <li><Link to="#" className="text-metamaster-gray-600 hover:text-metamaster-primary">Tutorials</Link></li>
                <li><Link to="#" className="text-metamaster-gray-600 hover:text-metamaster-primary">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-metamaster-gray-600 hover:text-metamaster-primary">Privacy Policy</Link></li>
                <li><Link to="#" className="text-metamaster-gray-600 hover:text-metamaster-primary">Terms of Service</Link></li>
                <li><Link to="#" className="text-metamaster-gray-600 hover:text-metamaster-primary">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-metamaster-gray-600 mb-4 md:mb-0">© 2025 MetaMaster. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link to="#" className="text-metamaster-gray-600 hover:text-metamaster-primary">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </Link>
              <Link to="#" className="text-metamaster-gray-600 hover:text-metamaster-primary">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </Link>
              <Link to="#" className="text-metamaster-gray-600 hover:text-metamaster-primary">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </Link>
              <Link to="#" className="text-metamaster-gray-600 hover:text-metamaster-primary">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
