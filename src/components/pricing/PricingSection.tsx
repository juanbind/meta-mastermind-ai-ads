
import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export function PricingSection() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  const handleStartTrial = () => {
    navigate('/auth');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Billing Toggle */}
      <div className="flex justify-center mb-12">
        <div className="bg-black/30 backdrop-blur-md rounded-full p-1 flex items-center">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              billingCycle === 'monthly' 
                ? 'bg-adking-primary text-adking-dark' 
                : 'text-white/80 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annually')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
              billingCycle === 'annually' 
                ? 'bg-adking-primary text-adking-dark' 
                : 'text-white/80 hover:text-white'
            }`}
          >
            Annually
            <span className="ml-2 text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
              Save 15%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Pro Plan */}
        <div className="pricing-card p-8">
          <h3 className="text-2xl font-bold mb-1">Pro</h3>
          <p className="text-white/70 mb-4">For teams or solo sales reps</p>
          
          <div className="flex items-baseline mb-6">
            <span className="text-4xl font-bold">$50</span>
            <span className="text-white/70 ml-2">/month</span>
          </div>

          <Button 
            className="w-full mb-8 py-6 text-lg font-medium rounded-xl bg-white hover:bg-white/90 text-adking-dark border-none"
            onClick={handleStartTrial}
          >
            Create Account <ArrowRight className="ml-1 h-5 w-5" />
          </Button>

          <div className="border-t border-white/10 pt-6 space-y-3">
            <div className="pricing-feature">
              <Check className="h-5 w-5 text-adking-primary" />
              <span>Access to all Ad Tools</span>
            </div>
            <div className="pricing-feature">
              <Check className="h-5 w-5 text-adking-primary" />
              <span>Full Campaign Builder</span>
            </div>
            <div className="pricing-feature">
              <Check className="h-5 w-5 text-adking-primary" />
              <span>Ad Performance Dashboard</span>
            </div>
            <div className="pricing-feature">
              <Check className="h-5 w-5 text-adking-primary" />
              <span>Save & Download Ads</span>
            </div>
            <div className="pricing-feature">
              <Check className="h-5 w-5 text-adking-primary" />
              <span>AI Media Buyer (up to 3 Campaigns)</span>
            </div>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="pricing-card pricing-card-highlight p-8">
          <h3 className="text-2xl font-bold mb-1">Enterprise</h3>
          <p className="text-white/70 mb-4">For teams of 20 or more</p>
          
          <div className="flex items-baseline mb-6">
            <span className="text-4xl font-bold">Demo For Pricing</span>
          </div>

          <Button 
            className="w-full mb-8 py-6 text-lg font-medium rounded-xl bg-adking-primary hover:bg-adking-primary/90 text-adking-dark border-none"
            onClick={() => navigate('/contact')}
          >
            Book Demo <ArrowRight className="ml-1 h-5 w-5" />
          </Button>

          <div className="border-t border-white/20 pt-6 space-y-3">
            <div className="pricing-feature">
              <Check className="h-5 w-5 text-adking-primary" />
              <span>Everything in Pro</span>
            </div>
            <div className="pricing-feature">
              <Check className="h-5 w-5 text-adking-primary" />
              <span>AI Call Scoring and Feedback</span>
            </div>
            <div className="pricing-feature">
              <Check className="h-5 w-5 text-adking-primary" />
              <span>Custom enterprise agents</span>
            </div>
            <div className="pricing-feature">
              <Check className="h-5 w-5 text-adking-primary" />
              <span>Scalable usage Based Billing</span>
            </div>
            <div className="pricing-feature">
              <Check className="h-5 w-5 text-adking-primary" />
              <span>VIP Customer Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
