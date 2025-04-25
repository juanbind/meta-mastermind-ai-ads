
import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Share, BookmarkPlus, Zap, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';

interface Ad {
  id: number;
  title: string;
  image: string;
  platform: string;
  niche: string;
  engagement: 'Low' | 'Medium' | 'High' | 'Very High';
  datePosted: string;
  runningDays: number;
  copy: string;
  savedCount: number;
}

const mockAds: Ad[] = [
  {
    id: 1,
    title: "Fitness Challenge Program",
    image: "https://placehold.co/600x400/1E88E5/FFFFFF?text=Fitness+Ad",
    platform: "Facebook",
    niche: "Fitness",
    engagement: "Very High",
    datePosted: "May 10, 2025",
    runningDays: 45,
    copy: "Transform your body in just 30 days with our scientifically-proven method. Join 10,000+ others who have already changed their lives!",
    savedCount: 234,
  },
  {
    id: 2,
    title: "E-commerce Fashion Collection",
    image: "https://placehold.co/600x400/0D47A1/FFFFFF?text=Fashion+Ad",
    platform: "Instagram",
    niche: "Fashion",
    engagement: "High",
    datePosted: "May 8, 2025",
    runningDays: 12,
    copy: "Introducing our Summer Collection. Sustainable fabrics, timeless designs. Use code SUMMER25 for 25% off your first order!",
    savedCount: 189,
  },
  {
    id: 3,
    title: "SaaS Marketing Dashboard",
    image: "https://placehold.co/600x400/2A2A2A/FFFFFF?text=SaaS+Ad",
    platform: "Facebook",
    niche: "SaaS",
    engagement: "Medium",
    datePosted: "May 5, 2025",
    runningDays: 30,
    copy: "Stop wasting time on marketing that doesn't work. Our all-in-one dashboard gives you crystal clear insights in seconds.",
    savedCount: 142,
  },
  {
    id: 4,
    title: "Real Estate Property Listing",
    image: "https://placehold.co/600x400/757575/FFFFFF?text=Real+Estate",
    platform: "Facebook",
    niche: "Real Estate",
    engagement: "High",
    datePosted: "May 2, 2025",
    runningDays: 18,
    copy: "Luxury Waterfront Living - Starting at $599k. Schedule your private tour today before these exclusive units are gone!",
    savedCount: 98,
  },
];

const FilterButton: React.FC<{ label: string }> = ({ label }) => (
  <Button variant="outline" size="sm" className="flex items-center">
    {label}
    <ChevronDown size={16} className="ml-2" />
  </Button>
);

const EngagementBadge: React.FC<{ level: 'Low' | 'Medium' | 'High' | 'Very High' }> = ({ level }) => {
  const bgColor = {
    'Low': 'bg-metamaster-gray-200 text-metamaster-gray-800',
    'Medium': 'bg-blue-100 text-blue-800',
    'High': 'bg-green-100 text-green-800',
    'Very High': 'bg-purple-100 text-purple-800',
  }[level];
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
      {level} Engagement
    </span>
  );
};

const AdCard: React.FC<{ ad: Ad }> = ({ ad }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="relative">
        <img src={ad.image} alt={ad.title} className="w-full h-48 object-cover" />
        <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
          Running {ad.runningDays} days
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs text-metamaster-gray-600 block mb-1">{ad.platform} • {ad.niche}</span>
            <h3 className="font-bold text-lg mb-2">{ad.title}</h3>
          </div>
          <div>
            <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
              <BookmarkPlus size={16} />
            </Button>
          </div>
        </div>
        
        <EngagementBadge level={ad.engagement} />
        
        <div className="mt-3 text-sm text-metamaster-gray-600">
          <p className="line-clamp-2">{ad.copy}</p>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-metamaster-gray-600">Posted: {ad.datePosted}</span>
          <span className="text-xs text-metamaster-gray-600">{ad.savedCount} people saved this</span>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
            View Details
          </Button>
          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
            <Share size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

const AdsLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Facebook Ads Library</h1>
            <p className="text-metamaster-gray-600">Search, analyze and save high-performing ads across platforms</p>
          </div>
          
          {/* Search & Filters */}
          <div className="bg-white rounded-xl shadow-md p-5 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-metamaster-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search for ads (e.g., fitness, ecommerce, coaching)"
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-metamaster-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Button className="bg-metamaster-primary hover:bg-metamaster-secondary">
                  <Search size={18} className="mr-2" /> Search
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Filter size={16} className="mr-2" /> Advanced Filters
                </Button>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <FilterButton label="Platform" />
              <FilterButton label="Niche" />
              <FilterButton label="Ad Format" />
              <FilterButton label="Date Range" />
              <FilterButton label="Engagement" />
              <FilterButton label="Running Time" />
            </div>
          </div>
          
          {/* AI Tools */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="bg-gradient-to-r from-metamaster-primary to-metamaster-secondary p-5 rounded-xl shadow-md flex-1 text-white">
              <div className="flex items-start">
                <div className="mr-4 bg-white/20 rounded-lg p-2">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">AI Ad Analysis</h3>
                  <p className="opacity-80 mb-4">Let our AI analyze this ad's structure, copy, and performance drivers.</p>
                  <Button className="bg-white text-metamaster-primary hover:bg-white/90">
                    Analyze This Ad
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-metamaster-gray-800 p-5 rounded-xl shadow-md flex-1 text-white">
              <div className="flex items-start">
                <div className="mr-4 bg-white/10 rounded-lg p-2">
                  <PieChart size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Performance Insights</h3>
                  <p className="opacity-80 mb-4">Get estimated performance data and benchmarks for selected ads.</p>
                  <Button variant="outline" className="text-white border-white hover:bg-white/10">
                    View Insights
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ad Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAds.map(ad => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
          
          {/* Load More */}
          <div className="mt-8 text-center">
            <Button variant="outline" className="px-8">Load More Ads</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsLibrary;
