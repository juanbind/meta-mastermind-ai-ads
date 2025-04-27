import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import FAQ from '@/components/FAQ';
import { FeatureSection } from '@/components/features/FeatureSection';
import { PricingSection } from '@/components/pricing/PricingSection';
import { useScrollAnimation, useScrollReveal } from '@/hooks/useScrollAnimation';
const Landing = () => {
  const heroRef = useScrollAnimation();
  const revealRef = useScrollReveal();
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/auth');
  };
  return <div className="min-h-screen hero-gradient dark-gradient">
      <Navbar />
      
      <main className="pt-20 md:pt-32">
        {/* Hero Section */}
        <div ref={heroRef} className="container mx-auto text-center max-w-4xl mb-12 md:mb-20 px-4 animate-on-scroll">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 text-slate-50 lg:text-6xl">
            Build Meta Ad Funnels in Seconds
          </h1>
          <p className="text-lg text-metamaster-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4 py-[3px] md:text-xl">Never pay for a marketing agency, CRM, or funnel builder again! We are used by Top Ad Agencies and Businesses running Meta Ad's to Maximize Your Ad Spend and ROI!</p>
          
          <Button className="bg-metamaster-primary hover:bg-metamaster-primary/90 text-white text-lg px-6 py-4 md:px-8 md:py-6 rounded-xl h-auto w-full sm:w-auto" size="lg" onClick={handleGetStarted}>
            Get Started
          </Button>

          <div className="mt-12 md:mt-20 mb-12 md:mb-20 relative mx-auto max-w-5xl px-4">
            <div className="aspect-video relative rounded-2xl overflow-hidden bg-metamaster-gray-800/50 border border-white/10 flex flex-col items-">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-metamaster-primary/20 flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-metamaster-primary flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
              </div>
              <p className="text-lg md:text-xl font-semibold text-white mb-2">VSL Video Coming Soon</p>
              <p className="text-sm md:text-base text-metamaster-gray-300">This space is reserved for your VSL video</p>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <FeatureSection />

        {/* Pricing Section */}
        <section className="py-16 md:py-20 px-4 bg-[#121a2b]/50 backdrop-blur-sm">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-slate-50 md:text-5xl">
              🚀 Try MetaMaster FREE for 7 Days
            </h2>
            <p className="text-base md:text-lg text-metamaster-gray-300">No credit card required – cancel anytime.</p>
          </div>
          <PricingSection />
        </section>

        {/* FAQ Section */}
        <div className="container mx-auto py-16 md:py-20 px-4">
          <FAQ />
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-metamaster-primary/90 to-metamaster-secondary text-white py-16 md:py-20 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Ready to Transform Your Facebook Ad Results?
            </h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-white/90">
              Join thousands of advertisers who are discovering winning ads, creating better campaigns, and scaling their businesses with MetaMaster.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-metamaster-primary hover:bg-white/90 text-base md:text-lg px-6 py-4 md:px-8 md:py-6 h-auto rounded-xl w-full sm:w-auto" size="lg" onClick={handleGetStarted}>
                Start 7-Day Free Trial
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/auth')} className="border-2 border-white/20 text-base md:text-lg px-6 py-4 md:px-8 md:py-6 h-auto rounded-xl bg-white/5 hover:bg-white/10 text-white w-full sm:w-auto">
                Schedule a Demo
              </Button>
            </div>
            <p className="mt-4 text-sm text-white/80">No credit card required - Cancel anytime</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Landing;