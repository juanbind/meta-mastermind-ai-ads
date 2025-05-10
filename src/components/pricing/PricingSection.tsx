
import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '../ui/card';

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
        <div className="bg-adking-gray-100 shadow-md rounded-full p-1 flex items-center">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              billingCycle === 'monthly' 
                ? 'bg-adking-primary text-adking-dark shadow-md' 
                : 'text-adking-gray-700 hover:text-adking-dark'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annually')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
              billingCycle === 'annually' 
                ? 'bg-adking-primary text-adking-dark shadow-md' 
                : 'text-adking-gray-700 hover:text-adking-dark'
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Pro Plan */}
        <Card className="border-2 border-adking-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all p-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-adking-dark">Pro</CardTitle>
            <p className="text-adking-gray-600 mt-1">For teams or solo sales reps</p>
            
            <div className="flex items-baseline mt-4">
              <span className="text-4xl font-bold text-adking-dark">${billingCycle === 'annually' ? '42' : '50'}</span>
              <span className="text-adking-gray-600 ml-2">/month</span>
            </div>
          </CardHeader>
          
          <CardContent className="pt-4">
            <Button 
              className="w-full py-6 text-lg font-medium rounded-xl bg-adking-dark hover:bg-adking-gray-800 text-white border-none"
              onClick={handleStartTrial}
            >
              Create Account <ArrowRight className="ml-1 h-5 w-5" />
            </Button>

            <div className="border-t border-adking-gray-200 mt-6 pt-6 space-y-3">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-adking-primary mt-0.5" />
                <span className="text-adking-gray-700">Access to all Ad Tools</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-adking-primary mt-0.5" />
                <span className="text-adking-gray-700">Full Campaign Builder</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-adking-primary mt-0.5" />
                <span className="text-adking-gray-700">Ad Performance Dashboard</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-adking-primary mt-0.5" />
                <span className="text-adking-gray-700">Save & Download Ads</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-adking-primary mt-0.5" />
                <span className="text-adking-gray-700">AI Media Buyer (up to 3 Campaigns)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enterprise Plan */}
        <Card className="border-2 border-adking-primary rounded-xl overflow-hidden hover:shadow-xl transition-all relative p-1 bg-gradient-to-b from-white to-adking-gray-100">
          <div className="absolute top-0 right-0 bg-adking-primary text-adking-dark text-xs font-bold px-3 py-1 rounded-bl-lg">
            MOST POPULAR
          </div>
          
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-adking-dark">Enterprise</CardTitle>
            <p className="text-adking-gray-600 mt-1">For teams of 20 or more</p>
            
            <div className="flex items-baseline mt-4">
              <span className="text-4xl font-bold text-adking-dark">Demo For Pricing</span>
            </div>
          </CardHeader>
          
          <CardContent className="pt-4">
            <Button 
              className="w-full py-6 text-lg font-medium rounded-xl bg-adking-primary hover:bg-adking-secondary text-adking-dark border-none"
              onClick={() => navigate('/contact')}
            >
              Book Demo <ArrowRight className="ml-1 h-5 w-5" />
            </Button>

            <div className="border-t border-adking-gray-200 mt-6 pt-6 space-y-3">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-adking-primary mt-0.5" />
                <span className="text-adking-gray-700">Everything in Pro</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-adking-primary mt-0.5" />
                <span className="text-adking-gray-700">AI Call Scoring and Feedback</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-adking-primary mt-0.5" />
                <span className="text-adking-gray-700">Custom enterprise agents</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-adking-primary mt-0.5" />
                <span className="text-adking-gray-700">Scalable usage Based Billing</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-adking-primary mt-0.5" />
                <span className="text-adking-gray-700">VIP Customer Support</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
