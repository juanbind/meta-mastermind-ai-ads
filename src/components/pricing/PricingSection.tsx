
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
  emoji: string;
}

export function PricingSection() {
  const navigate = useNavigate();

  const pricingPlans: PricingPlan[] = [
    {
      name: "Starter",
      price: "$50",
      description: "Perfect for creators, freelancers, and new advertisers.",
      color: "text-green-500",
      emoji: "🟢",
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
      color: "text-metamaster-primary",
      emoji: "🔵",
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
      color: "text-red-600",
      emoji: "🔴",
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
      {pricingPlans.map((plan) => (
        <Card 
          key={plan.name} 
          className={`relative p-4 md:p-6 bg-card rounded-xl shadow-lg border ${
            plan.badge ? 'border-metamaster-primary border-2 shadow-xl ring-2 ring-metamaster-primary/20' : 'border-border'
          } hover:shadow-xl transition-all duration-300 flex flex-col`}
        >
          {plan.badge && (
            <span className="absolute -top-3 right-4 bg-metamaster-primary text-white text-sm px-3 py-1 rounded-full font-medium">
              {plan.badge}
            </span>
          )}
          <div className="mb-8">
            <h3 className={`text-xl font-semibold mb-2 ${plan.color}`}>
              {plan.emoji} {plan.name}
            </h3>
            <div className="flex items-baseline mb-2">
              <span className="text-4xl font-bold text-foreground">{plan.price}</span>
              <span className="text-muted-foreground ml-2">/month</span>
            </div>
            <p className="text-muted-foreground text-lg">{plan.description}</p>
          </div>

          <div className="space-y-4 flex-grow">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                {feature.included ? (
                  <div className="w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-metamaster-gray-700 flex-shrink-0 flex items-center justify-center">
                    <X className="w-3 h-3 text-metamaster-gray-500" />
                  </div>
                )}
                <span className={`${feature.included ? 'text-foreground font-medium' : 'text-muted-foreground'} text-base`}>
                  {feature.name}
                </span>
              </div>
            ))}
          </div>

          <Button 
            className={`w-full mt-8 py-6 text-lg font-medium rounded-xl ${
              plan.badge 
                ? 'bg-metamaster-primary hover:bg-metamaster-primary/90 text-white' 
                : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
            }`}
            onClick={handleStartTrial}
          >
            Start Free Trial
          </Button>
        </Card>
      ))}
    </div>
  );
}
