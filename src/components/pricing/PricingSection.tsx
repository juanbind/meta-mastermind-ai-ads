import React from 'react';
import { Check, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '../ui/card';
export function PricingSection() {
  const navigate = useNavigate();
  const handleStartTrial = () => {
    navigate('/auth');
  };
  return <div className="w-full max-w-6xl mx-auto px-4">
      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Starter Plan */}
        <Card className="border-2 border-adking-gray-300 rounded-xl overflow-hidden hover:shadow-xl transition-all p-1 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-adking-dark">Starter</CardTitle>
            <p className="text-adking-gray-700 mt-1">Perfect for creators, freelancers, and new advertisers</p>
            
            <div className="flex items-baseline mt-4">
              <span className="text-4xl font-bold text-adking-dark">$50</span>
              <span className="text-adking-gray-700 ml-2">/month</span>
            </div>
          </CardHeader>
          
          <CardContent className="pt-4">
            <Button onClick={handleStartTrial} className="w-full py-6 text-lg font-medium rounded-xl bg-adking-dark hover text-slate-50">
              7-Day Free Trial <ArrowRight className="ml-1 h-5 w-5" />
            </Button>

            <div className="border-t border-adking-gray-300 mt-6 pt-6 space-y-3">
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
                <X className="h-5 w-5 text-red-500 mt-0.5" />
                <span className="text-adking-gray-700">AI Media Buyer not included</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className="border-2 border-adking-primary rounded-xl overflow-hidden hover:shadow-xl transition-all relative p-1 bg-gradient-to-b from-white to-adking-gray-50">
          <div className="absolute top-0 right-0 bg-adking-primary text-adking-dark text-xs font-bold px-3 py-1 rounded-bl-lg">
            MOST POPULAR
          </div>
          
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-adking-dark">Pro</CardTitle>
            <p className="text-adking-gray-700 mt-1">For growing businesses ready to scale profitably</p>
            
            <div className="flex items-baseline mt-4">
              <span className="text-4xl font-bold text-adking-dark">$275</span>
              <span className="text-adking-gray-700 ml-2">/month</span>
            </div>
          </CardHeader>
          
          <CardContent className="pt-4">
            <Button className="w-full py-6 text-lg font-medium rounded-xl bg-adking-primary hover:bg-adking-secondary text-adking-dark border-none" onClick={handleStartTrial}>
              7-Day Free Trial <ArrowRight className="ml-1 h-5 w-5" />
            </Button>

            <div className="border-t border-adking-gray-300 mt-6 pt-6 space-y-3">
              <p className="font-medium text-adking-dark mb-2">Everything in Starter, plus:</p>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-adking-primary mt-0.5" />
                <span className="text-adking-gray-700">AI Media Buyer (Run up to 3 Campaigns)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-adking-primary mt-0.5" />
                <span className="text-adking-gray-700">1-on-1 Support</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-adking-primary mt-0.5" />
                <span className="text-adking-gray-700">3 Done-For-You Ad Creatives/month</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-adking-primary mt-0.5" />
                <span className="text-adking-gray-700">Funnel Builder Access</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-adking-primary mt-0.5" />
                <span className="text-adking-gray-700">Built-in CRM & Automations</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agency Plan */}
        <Card className="border-2 border-adking-gray-300 rounded-xl overflow-hidden hover:shadow-xl transition-all p-1 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-adking-dark">Agency</CardTitle>
            <p className="text-adking-gray-700 mt-1">Built for media buyers, agencies, and power users</p>
            
            <div className="flex items-baseline mt-4">
              <span className="text-4xl font-bold text-adking-dark">$500</span>
              <span className="text-adking-gray-700 ml-2">/month</span>
            </div>
          </CardHeader>
          
          <CardContent className="pt-4">
            <Button onClick={() => navigate('/contact')} className="w-full py-6 text-lg font-medium rounded-xl border-none text-slate-50 bg-neutral-950 hover:bg-neutral-800">
              Book Demo <ArrowRight className="ml-1 h-5 w-5" />
            </Button>

            <div className="border-t border-adking-gray-300 mt-6 pt-6 space-y-3">
              <p className="font-medium text-adking-dark mb-2">Everything in Pro, plus:</p>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-adking-primary mt-0.5" />
                <span className="text-adking-gray-700">Run up to 50 Campaigns</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-adking-primary mt-0.5" />
                <span className="text-adking-gray-700">50 Done-For-You Ad Creatives/month</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-adking-primary mt-0.5" />
                <span className="text-adking-gray-700">White-label Options</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-adking-primary mt-0.5" />
                <span className="text-adking-gray-700">Multi-Client Management</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-adking-primary mt-0.5" />
                <span className="text-adking-gray-700">Priority Support</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Plans Include Section */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-bold text-adking-dark mb-4">All Plans Include:</h3>
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 bg-adking-gray-100 px-4 py-2 rounded-full">
            <Check className="h-4 w-4 text-adking-primary" />
            <span className="text-adking-gray-700 text-sm">7-Day Free Trial</span>
          </div>
          <div className="flex items-center gap-2 bg-adking-gray-100 px-4 py-2 rounded-full">
            <Check className="h-4 w-4 text-adking-primary" />
            <span className="text-adking-gray-700 text-sm">Cancel Anytime</span>
          </div>
          <div className="flex items-center gap-2 bg-adking-gray-100 px-4 py-2 rounded-full">
            <Check className="h-4 w-4 text-adking-primary" />
            <span className="text-adking-gray-700 text-sm">Access to New Features & Updates</span>
          </div>
        </div>
      </div>
    </div>;
}