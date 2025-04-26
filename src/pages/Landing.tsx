
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import FAQ from '@/components/FAQ';
import FeatureGrid from '@/components/FeatureGrid';
import { useScrollAnimation, useScrollReveal } from '@/hooks/useScrollAnimation';

const Landing = () => {
  const heroRef = useScrollAnimation();
  const revealRef = useScrollReveal();

  return (
    <div className="min-h-screen bg-gradient-to-b from-metamaster-dark via-metamaster-dark/95 to-metamaster-dark/90">
      <Navbar />
      
      <main className="pt-32 pb-16 px-4">
        {/* Hero Section */}
        <div ref={heroRef} className="container mx-auto text-center max-w-4xl animate-on-scroll">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Your Ultimate Facebook Ads Assistant
          </h1>
          <p className="text-xl text-metamaster-gray-400 mb-8 max-w-2xl mx-auto">
            Discover winning ads, build high-converting funnels, and scale your business with our AI-powered platform
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              ref={el => revealRef(el)}
              data-animation="slide-right"
              className="reveal-element bg-gradient-to-r from-metamaster-primary to-metamaster-secondary hover:opacity-90 text-white text-lg px-8 py-6 rounded-xl h-auto button-press"
              size="lg"
            >
              Start Free Trial <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              ref={el => revealRef(el)}
              data-animation="slide-left"
              variant="outline" 
              className="reveal-element border-2 border-white/20 hover:bg-white/10 text-white text-lg px-8 py-6 rounded-xl h-auto button-press"
              size="lg"
            >
              Watch Demo
            </Button>
          </div>
          
          <div 
            ref={el => revealRef(el)}
            data-animation="fade-up"
            className="reveal-element relative mx-auto max-w-5xl"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                alt="Platform Dashboard"
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="container mx-auto my-20">
          <div className="text-center mb-8">
            <p className="text-metamaster-gray-400 text-lg">Trusted by 10,000+ businesses and agencies</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {/* Add your client logos here */}
          </div>
        </div>

        {/* Feature Grid */}
        <FeatureGrid />

        {/* FAQ Section */}
        <div className="container mx-auto py-20">
          <FAQ />
        </div>
        
        {/* CTA Section */}
        <div className="container mx-auto py-16">
          <div 
            ref={el => revealRef(el)}
            data-animation="fade-up"
            className="reveal-element rounded-3xl p-16 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(155,135,245,0.2) 0%, rgba(155,135,245,0.1) 100%)",
              backdropFilter: "blur(10px)"
            }}
          >
            <div className="absolute inset-0 bg-metamaster-dark/10 backdrop-blur-sm" />
            <div className="relative z-10">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Ready to Transform Your Ad Strategy?
              </h2>
              <p className="text-xl text-metamaster-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of advertisers who are discovering winning ads and scaling their businesses with MetaMaster
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  className="bg-gradient-to-r from-metamaster-primary to-metamaster-secondary hover:opacity-90 text-white text-lg px-8 py-6 h-auto button-press rounded-xl"
                  size="lg"
                >
                  Get Started Free
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-white/20 hover:bg-white/10 text-white text-lg px-8 py-6 h-auto button-press rounded-xl"
                  size="lg"
                >
                  Schedule Demo
                </Button>
              </div>
              <p className="mt-4 text-sm text-metamaster-gray-400">No credit card required - 14-day free trial</p>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Scroll Indicator */}
      <button 
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white animate-bounce"
      >
        <ChevronDown size={32} />
      </button>
    </div>
  );
};

export default Landing;
