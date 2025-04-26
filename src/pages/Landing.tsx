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
  return <div className="min-h-screen bg-gradient-to-b from-metamaster-dark via-[#0D47A1] to-metamaster-dark/95">
      <Navbar />
      
      <main className="pt-32">
        {/* Hero Section */}
        <div ref={heroRef} className="container mx-auto text-center max-w-4xl mb-20 px-4 animate-on-scroll">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Build Meta Ad Funnels in Seconds
          </h1>
          <p className="text-xl text-metamaster-gray-400 mb-8 max-w-2xl mx-auto">
            Never pay for a marketing agency, CRM, or funnel builder again! We are used by Top Ad Agencies and Businesses running Meta Ad's to Maximize Your Ad Spend and ROI!
          </p>
          
          <Button className="bg-metamaster-primary hover:bg-metamaster-primary/90 text-white text-lg px-8 py-6 rounded-xl h-auto" size="lg" onClick={handleGetStarted}>
            Get Started
          </Button>

          <div className="mt-20 mb-20 relative mx-auto max-w-5xl">
            <div className="r">
              <div className="">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-metamaster-primary/20 flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 rounded-full bg-metamaster-primary flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="text-xl font-semibold text-white mb-2">VSL Video Coming Soon</p>
                  <p className="text-metamaster-gray-300">This space is reserved for your VSL video</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <FeatureSection />

        {/* Pricing Section */}
        <section className="py-20 px-4 bg-[#121a2b]/50 backdrop-blur-sm">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-slate-50 md:text-5xl">
              🚀 Try MetaMaster FREE for 7 Days
            </h2>
            <p className="text-lg text-metamaster-gray-300">
              No credit card required – cancel anytime. Choose the plan that fits your growth stage.
            </p>
          </div>
          <PricingSection />
        </section>

        {/* FAQ Section */}
        <div className="container mx-auto py-20 px-4">
          <FAQ />
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-metamaster-primary/90 to-metamaster-secondary text-white py-20 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Facebook Ad Results?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of advertisers who are discovering winning ads, creating better campaigns, and scaling their businesses with MetaMaster.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-metamaster-primary hover:bg-white/90 text-lg px-8 py-6 h-auto rounded-xl" size="lg" onClick={handleGetStarted}>
                Start 7-Day Free Trial
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/auth')} className="border-2 border-white/20 text-lg px-8 py-6 h-auto rounded-xl bg-slate-50 text-sky-600">
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