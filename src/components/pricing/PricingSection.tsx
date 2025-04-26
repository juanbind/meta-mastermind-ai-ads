
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { useNavigate } from 'react-router-dom';

interface PlanFeature {
  name: string;
  included: boolean | string;
}

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  badge?: string;
  color: string;
}

export function PricingSection() {
  const navigate = useNavigate();

  const pricingPlans: PricingPlan[] = [
    {
      name: "Starter",
      price: "$50",
      description: "Perfect for creators, freelancers, and new advertisers.",
      color: "green-500",
      features: [
        { name: "Access to all Ad Tools", included: true },
        { name: "Full Campaign Builder", included: true },
        { name: "Ad Performance Dashboard", included: true },
        { name: "Save & Download Ads", included: true },
        { name: "AI Media Buyer", included: false },
        { name: "1-on-1 Support", included: false },
        { name: "Done-For-You Ad Creatives", included: false },
        { name: "Funnel Builder Access", included: false },
        { name: "Built-in CRM & Automations", included: false },
      ]
    },
    {
      name: "Pro",
      price: "$275",
      description: "For growing businesses ready to scale profitably.",
      color: "blue-500",
      features: [
        { name: "Everything in Starter", included: true },
        { name: "AI Media Buyer (Run up to 3 Campaigns)", included: true },
        { name: "1-on-1 Support", included: true },
        { name: "3 Done-For-You Ad Creatives/month", included: true },
        { name: "Funnel Builder Access", included: true },
        { name: "Built-in CRM & Automations", included: true },
        { name: "White-label Options", included: false },
        { name: "Multi-Client Management", included: false },
        { name: "Priority Support", included: false },
      ],
      badge: "Most Popular"
    },
    {
      name: "Agency",
      price: "$500",
      description: "Built for media buyers, agencies, and power users.",
      color: "red-500",
      features: [
        { name: "Everything in Pro", included: true },
        { name: "Run up to 50 Campaigns", included: true },
        { name: "50 Done-For-You Ad Creatives/month", included: true },
        { name: "White-label Options", included: true },
        { name: "Multi-Client Management", included: true },
        { name: "Priority Support", included: true },
        { name: "Advanced Analytics", included: true },
        { name: "API Access", included: true },
      ]
    }
  ];

  const handleStartTrial = () => {
    navigate('/auth');
  };

  return (
    <section className="py-20 px-4 bg-[#121a2b]/50 backdrop-blur-sm">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          🚀 Try MetaMaster FREE for 7 Days
        </h2>
        <p className="text-lg text-metamaster-gray-400">
          No credit card required – cancel anytime. Choose the plan that fits your growth stage.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`relative p-8 bg-white/5 backdrop-blur-sm border ${
              plan.badge ? 'border-2 border-metamaster-primary shadow-xl' : 'border-white/10'
            } rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-${plan.color}/10`}
          >
            {plan.badge && (
              <span className="absolute -top-3 right-4 bg-metamaster-primary text-white text-xs px-3 py-1 rounded-full">
                {plan.badge}
              </span>
            )}
            <div className="mb-8">
              <h3 className={`text-xl font-semibold mb-2 text-${plan.color}`}>{plan.name}</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-metamaster-gray-400 ml-1">/month</span>
              </div>
              <p className="text-metamaster-gray-400">{plan.description}</p>
            </div>

            <div className="space-y-3">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  {feature.included ? (
                    <div className="w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-metamaster-gray-700 flex-shrink-0 flex items-center justify-center">
                      <X className="w-3 h-3 text-metamaster-gray-500" />
                    </div>
                  )}
                  <span className={`${feature.included ? 'text-white' : 'text-metamaster-gray-500'} text-sm`}>
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>

            <Button 
              className={`w-full mt-8 rounded-xl ${
                plan.badge 
                  ? 'bg-metamaster-primary hover:bg-metamaster-primary/90' 
                  : 'bg-white/5 hover:bg-white/10 border border-white/10'
              }`}
              onClick={handleStartTrial}
            >
              Start Free Trial
            </Button>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 mt-10">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="text-metamaster-gray-400">7-Day Free Trial</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="text-metamaster-gray-400">Cancel Anytime</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="text-metamaster-gray-400">Free Updates</span>
        </div>
      </div>
    </section>
  );
}
