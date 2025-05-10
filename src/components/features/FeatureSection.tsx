import React from 'react';
import { Search, Zap, LayoutGrid, BarChart2, Users, Image } from 'lucide-react';
const features = [{
  icon: <Search className="w-6 h-6 text-adking-primary" />,
  title: "Ad Discovery & Research",
  description: "Search and find winning Facebook ads with AI-powered filtering and insights.",
  features: ["Full Facebook & Instagram Ads Library integration", "Natural language search for ads", "Ad Performance Scoring system"]
}, {
  icon: <Zap className="w-6 h-6 text-adking-primary" />,
  title: "AI Media Buyer Tools",
  description: "Let AI build your campaigns with the strategy of a 7-figure media buyer.",
  features: ["Smart Campaign Generator (4-10 questions)", '"Done-For-You" Campaign Planner', "Ad Creative Blueprint Generator"]
}, {
  icon: <LayoutGrid className="w-6 h-6 text-adking-primary" />,
  title: "Drag & Drop Funnel Builder",
  description: "Create high-converting funnels with our intuitive drag-and-drop builder.",
  features: ["Mobile-first funnel templates", "Pre-built templates by niche", "Multi-step funnels with conditional logic"]
}, {
  icon: <Image className="w-6 h-6 text-adking-primary" />,
  title: "Ad Asset Tools",
  description: "Download, organize, and repurpose winning ad creatives.",
  features: ["Direct video/image downloader", "Audio extractor for viral sounds", "Organized creative database"]
}, {
  icon: <BarChart2 className="w-6 h-6 text-adking-primary" />,
  title: "Performance Intelligence",
  description: "Analyze and predict ad performance with AI-powered insights.",
  features: ["Estimated ad performance scoring", "Engagement heatmaps for ads", "Industry benchmarks comparison"]
}, {
  icon: <Users className="w-6 h-6 text-adking-primary" />,
  title: "Built-in CRM",
  description: "Manage leads, clients, and team members all in one place.",
  features: ["Multi-user workspaces", "Client folders for agencies", "Client dashboard (white-label)"]
}];
export function FeatureSection() {
  return <section className="py-16 md:py-20 px-4">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-adking-dark lg:text-5xl">
          All-in-One Facebook Ads Platform
        </h2>
        <p className="text-base md:text-lg text-adking-gray-700 max-w-3xl mx-auto">
          Everything you need to discover, create, optimize, and scale your Facebook ads in one powerful platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => <div key={index} className="p-4 md:p-6 border border-adking-gray-300 rounded-xl hover:border-adking-primary/30 transition-all duration-300 shadow-sm bg-[#fffbee]">
            <div className="w-12 h-12 rounded-lg bg-adking-primary/10 flex items-center justify-center mb-4 md:mb-6">
              {feature.icon}
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-adking-dark">
              {feature.title}
            </h3>
            <p className="text-sm md:text-base text-adking-gray-700 mb-4 md:mb-6">
              {feature.description}
            </p>
            <ul className="space-y-2 md:space-y-3">
              {feature.features.map((item, i) => <li key={i} className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-adking-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-adking-primary flex-shrink-0" />
                  {item}
                </li>)}
            </ul>
            <a href="#" className="inline-block mt-4 md:mt-6 text-sm md:text-base text-adking-primary hover:text-adking-secondary transition-colors font-medium">
              Learn more →
            </a>
          </div>)}
      </div>
    </section>;
}