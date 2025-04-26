
import React from 'react';
import { Search, Zap, LayoutGrid, Image, BarChart2, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  className?: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, features, className, delay }: FeatureCardProps) => (
  <div 
    className={cn(
      "reveal-element bg-metamaster-gray-800/50 rounded-xl p-6 border border-metamaster-gray-700/50 hover:border-metamaster-primary/50 transition-all duration-300",
      className
    )}
    data-animation="fade-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="bg-metamaster-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-metamaster-primary mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-metamaster-gray-400 mb-4">{description}</p>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-metamaster-gray-300">
          <svg className="w-5 h-5 mr-2 text-metamaster-primary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

const FeatureGrid = () => {
  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Ad Discovery & Research",
      description: "Search and find winning Facebook ads with AI-powered filtering and insights.",
      features: [
        "Full Facebook & Instagram Ads Library integration",
        "Natural language search for ads",
        "Ad Performance Scoring system"
      ]
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI Media Buyer Tools",
      description: "Let AI build your campaigns with the strategy of a 7-figure media buyer.",
      features: [
        "Smart Campaign Generator (4-10 questions)",
        '"Done-For-You" Campaign Planner',
        "Ad Creative Blueprint Generator"
      ]
    },
    {
      icon: <LayoutGrid className="w-6 h-6" />,
      title: "Drag & Drop Funnel Builder",
      description: "Create high-converting funnels with our intuitive drag-and-drop builder.",
      features: [
        "Mobile-first funnel templates",
        "Pre-built templates by niche",
        "Multi-step funnels with conditional logic"
      ]
    },
    {
      icon: <Image className="w-6 h-6" />,
      title: "Ad Asset Tools",
      description: "Download, organize, and repurpose winning ad creatives.",
      features: [
        "Direct video/image downloader",
        "Audio extractor for viral sounds",
        "Organized creative database"
      ]
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Performance Intelligence",
      description: "Analyze and predict ad performance with AI-powered insights.",
      features: [
        "Estimated ad performance scoring",
        "Engagement heatmaps for ads",
        "Industry benchmarks comparison"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Built-in CRM",
      description: "Manage leads, clients, and team members all in one place.",
      features: [
        "Multi-user workspaces",
        "Client folders for agencies",
        "Client dashboard (white-label)"
      ]
    }
  ];

  return (
    <div className="container mx-auto py-20">
      <div className="text-center mb-16 reveal-element" data-animation="fade-up">
        <h2 className="text-4xl font-bold mb-4 text-white">All-in-One Facebook Ads Platform</h2>
        <p className="text-metamaster-gray-400 max-w-2xl mx-auto">
          Everything you need to discover, create, optimize, and scale your Facebook ads in one powerful platform.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            {...feature}
            delay={index * 100}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;
