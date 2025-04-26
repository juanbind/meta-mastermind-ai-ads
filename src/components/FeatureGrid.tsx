
import React from 'react';
import { Search, Zap, LayoutGrid, BarChart2, Users, Image } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  className?: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, features, delay }: FeatureCardProps) => (
  <div 
    className="reveal-element bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-metamaster-primary/30 transition-all duration-500 hover:transform hover:-translate-y-1"
    data-animation="fade-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="bg-gradient-to-br from-metamaster-primary/20 to-metamaster-secondary/20 w-14 h-14 rounded-xl flex items-center justify-center text-metamaster-primary mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">{title}</h3>
    <p className="text-metamaster-gray-400 mb-6 text-lg">{description}</p>
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-metamaster-gray-300">
          <div className="w-1.5 h-1.5 rounded-full bg-metamaster-primary mr-3" />
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

const FeatureGrid = () => {
  const features = [
    {
      icon: <Search className="w-7 h-7 text-metamaster-primary" />,
      title: "Smart Ad Research",
      description: "Find winning Facebook ads with AI-powered insights",
      features: [
        "Access to full ads library",
        "Natural language search",
        "Performance scoring"
      ]
    },
    {
      icon: <Zap className="w-7 h-7 text-metamaster-primary" />,
      title: "AI Campaign Builder",
      description: "Create campaigns with expert media buyer strategies",
      features: [
        "Smart campaign generator",
        "Done-for-you planner",
        "Creative blueprint AI"
      ]
    },
    {
      icon: <LayoutGrid className="w-7 h-7 text-metamaster-primary" />,
      title: "Funnel Builder",
      description: "Build high-converting funnels with drag & drop",
      features: [
        "Mobile-first templates",
        "Pre-built niche funnels",
        "Multi-step flows"
      ]
    },
    {
      icon: <Image className="w-7 h-7 text-metamaster-primary" />,
      title: "Creative Tools",
      description: "Download and organize winning ad creatives",
      features: [
        "Direct asset downloader",
        "Audio extractor",
        "Creative database"
      ]
    },
    {
      icon: <BarChart2 className="w-7 h-7 text-metamaster-primary" />,
      title: "Performance AI",
      description: "Analyze and predict ad performance",
      features: [
        "Ad performance scoring",
        "Engagement analytics",
        "Industry benchmarks"
      ]
    },
    {
      icon: <Users className="w-7 h-7 text-metamaster-primary" />,
      title: "Team & Clients",
      description: "Manage your team and clients in one place",
      features: [
        "Multi-user access",
        "Client workspaces",
        "White-label dashboard"
      ]
    }
  ];

  return (
    <div className="container mx-auto py-20">
      <div className="text-center mb-16 reveal-element" data-animation="fade-up">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          All-in-One Facebook Ads Platform
        </h2>
        <p className="text-xl text-metamaster-gray-400 max-w-2xl mx-auto">
          Everything you need to discover, create, and scale winning Facebook ads
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            {...feature}
            delay={index * 150}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;
