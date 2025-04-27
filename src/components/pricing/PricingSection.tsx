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
      color: "green-400",
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
    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {pricingPlans.map((plan) => (
        <Card 
          key={plan.name} 
          className={`relative p-8 bg-[#0A0F1D]/80 backdrop-blur-sm border ${
            plan.badge ? 'border-[#1E88E5] shadow-lg shadow-[#1E88E5]/10' : 'border-white/10'
          } rounded-2xl transition-all duration-300 hover:border-${plan.color}/50`}
        >
          {plan.badge && (
            <span className="absolute -top-3 right-4 bg-[#1E88E5] text-white text-sm px-3 py-1 rounded-full font-medium">
              {plan.badge}
            </span>
          )}
          <div className="mb-8">
            <h3 className={`text-2xl font-bold mb-2 text-${plan.color}`}>{plan.name}</h3>
            <div className="flex items-baseline mb-2">
              <span className="text-4xl font-bold text-white">{plan.price}</span>
              <span className="text-gray-300 ml-2">/month</span>
            </div>
            <p className="text-gray-300 text-lg">{plan.description}</p>
          </div>

          <div className="space-y-4">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                {feature.included ? (
                  <div className="w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-gray-800 flex-shrink-0 flex items-center justify-center">
                    <X className="w-3 h-3 text-gray-500" />
                  </div>
                )}
                <span className={`${feature.included ? 'text-white' : 'text-gray-400'} text-base`}>
                  {feature.name}
                </span>
              </div>
            ))}
          </div>

          <Button 
            className={`w-full mt-8 py-6 text-lg font-medium rounded-xl ${
              plan.badge 
                ? 'bg-[#1E88E5] hover:bg-[#1E88E5]/90 text-white' 
                : 'bg-[#0A0F1D] hover:bg-white/5 border border-white/10 text-white'
            }`}
            onClick={handleStartTrial}
          >
            Start Free Trial
          </Button>
        </Card>
      ))}

      <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 mt-10 col-span-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="text-metamaster-gray-300 font-medium">7-Day Free Trial</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="text-metamaster-gray-300 font-medium">Cancel Anytime</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="text-metamaster-gray-300 font-medium">Free Updates</span>
        </div>
      </div>
    </div>
  );
}
