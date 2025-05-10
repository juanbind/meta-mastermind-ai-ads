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
  return <div className="min-h-screen bg-white relative">
      {/* Background grid pattern - mimicking the reference design */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:30px_30px] opacity-[0.03] pointer-events-none"></div>
      <Navbar />
      
      <main className="pt-20 md:pt-32">
        {/* Hero Section */}
        <div ref={heroRef} className="container mx-auto text-center max-w-4xl mb-12 md:mb-20 px-4 animate-on-scroll relative">
          <div className="inline-block px-4 py-1 text-adking-dark rounded-full mb-6 font-medium bg-yellow-300">
            AdKing AI Now Live!
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 text-adking-dark">Run Meta Ad's In Seconds</h1>
          
          <p className="text-lg text-adking-gray-700 mb-6 md:mb-8 max-w-2xl mx-auto px-4 py-[3px] md:text-xl">
            Never pay for a Marketing agency, CRM, or Media Buyer again! We are used by Top Ad Agencies and Businesses running Meta Ad's to Maximize Your Ad Spend and ROI!
          </p>
          
          <Button className="bg-adking-primary hover:bg-adking-secondary text-adking-dark font-medium text-lg px-6 py-4 md:px-8 md:py-5 rounded-xl h-auto w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300" size="lg" onClick={handleGetStarted}>
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <div className="mt-12 md:mt-20 mb-12 md:mb-20 relative mx-auto max-w-5xl px-4">
            <div className="aspect-video relative rounded-2xl overflow-hidden bg-adking-gray-100 border border-adking-gray-300 shadow-xl flex flex-col items-center justify-center mx-auto">
              <div className="w-16 h-16 rounded-full bg-adking-primary/20 flex items-center justify-center mx-auto mb-4 animate-glow">
                <div className="w-8 h-8 rounded-full bg-adking-primary flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-adking-dark" />
                </div>
              </div>
              <p className="text-xl font-semibold text-adking-dark mb-2">VSL Video Coming Soon</p>
              <p className="text-adking-gray-700">This space is reserved for your VSL video</p>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <section className="py-16 md:py-24 px-4 relative border-y border-adking-gray-200 bg-slate-50">
          <div className="absolute inset-0 bg-grid-pattern bg-[size:30px_30px] opacity-[0.05] pointer-events-none"></div>
          <FeatureSection />
        </section>

        {/* Pricing Section - White Background */}
        <section className="py-16 md:py-24 px-4 bg-white relative border-b border-adking-gray-200">
          <div className="absolute inset-0 bg-grid-pattern bg-[size:30px_30px] opacity-[0.03] pointer-events-none"></div>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-bold mb-3 md:mb-4 text-adking-dark md:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-adking-gray-700 max-w-2xl mx-auto">
              Choose a plan that works best for your business needs. No hidden fees.
            </p>
          </div>
          <PricingSection />
        </section>

        {/* FAQ Section */}
        <div className="container mx-auto py-16 md:py-24 px-4 relative">
          <div className="absolute inset-0 bg-grid-pattern bg-[size:30px_30px] opacity-[0.03] pointer-events-none"></div>
          <FAQ />
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-adking-primary to-adking-secondary text-adking-dark py-16 md:py-24 px-4 shadow-inner relative">
          <div className="container mx-auto text-center max-w-3xl relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Ready to Transform Your Facebook Ad Results?
            </h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-adking-dark/90">
              Join thousands of advertisers who are discovering winning ads, creating better campaigns, and scaling their businesses with AdKing.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-adking-dark text-white hover:bg-adking-gray-800 text-base md:text-lg px-6 py-4 md:px-8 md:py-5 h-auto rounded-xl w-full sm:w-auto shadow-lg" size="lg" onClick={handleGetStarted}>
                Start 7-Day Free Trial
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/auth')} className="border-2 border-adking-dark/20 text-base md:text-lg px-6 py-4 md:px-8 md:py-5 h-auto rounded-xl bg-adking-dark/5 hover:bg-adking-dark/10 text-adking-dark w-full sm:w-auto">
                Schedule a Demo
              </Button>
            </div>
            <p className="mt-4 text-sm text-adking-dark/80">No credit card required - Cancel anytime</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Landing;