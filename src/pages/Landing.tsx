
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import FAQ from '@/components/FAQ';
import FeatureGrid from '@/components/FeatureGrid';
import { useScrollAnimation, useScrollReveal } from '@/hooks/useScrollAnimation';

const Landing = () => {
  const heroRef = useScrollAnimation();
  const revealRef = useScrollReveal();

  return (
    <div className="min-h-screen bg-metamaster-dark text-white">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        {/* Hero Section */}
        <div ref={heroRef} className="container mx-auto text-center max-w-4xl animate-on-scroll">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Build Meta Ad Funnels <br />in Seconds
          </h1>
          <p className="text-xl text-metamaster-gray-400 mb-8 max-w-2xl mx-auto">
            Never pay for a marketing agency, CRM, or funnel builder again! We are used by Top Ad Agencies and Businesses running Meta Ad's to Maximize Your Ad Spend and ROI!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              ref={el => revealRef(el)}
              data-animation="slide-right"
              className="reveal-element bg-metamaster-primary hover:bg-metamaster-secondary text-white text-lg px-8 py-6 rounded-lg h-auto button-press"
              size="lg"
            >
              Get Started Free <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button 
              ref={el => revealRef(el)}
              data-animation="slide-left"
              variant="outline" 
              className="reveal-element text-lg px-8 py-6 rounded-lg h-auto button-press"
              size="lg"
            >
              Schedule a Demo
            </Button>
          </div>
          
          <div 
            ref={el => revealRef(el)}
            data-animation="fade-up"
            className="reveal-element relative"
          >
            <div className="bg-metamaster-gray-800 rounded-xl overflow-hidden shadow-2xl border border-metamaster-gray-700">
              <div className="aspect-video bg-metamaster-gray-900 flex items-center justify-center">
                <div className="text-metamaster-gray-600 text-xl">
                  VSL Video Coming Soon
                </div>
              </div>
            </div>
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
            className="reveal-element bg-gradient-to-r from-metamaster-primary to-metamaster-secondary rounded-2xl p-12 text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Facebook Ad Results?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of advertisers who are discovering winning ads, creating better campaigns, and scaling their businesses with MetaMaster.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="bg-metamaster-dark hover:bg-black text-white text-lg px-8 py-6 h-auto button-press"
                size="lg"
              >
                Start 7-Day Free Trial
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto button-press"
                size="lg"
              >
                Schedule a Demo
              </Button>
            </div>
            <p className="mt-4 text-sm text-white/80">No credit card required - Cancel anytime</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
