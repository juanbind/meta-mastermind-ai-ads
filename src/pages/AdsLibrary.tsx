
import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Share, BookmarkPlus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import { useToast } from '@/components/ui/use-toast';

const FilterButton: React.FC<{ label: string }> = ({ label }) => (
  <Button variant="outline" size="sm" className="flex items-center">
    {label}
    <ChevronDown size={16} className="ml-2" />
  </Button>
);

const AdsLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search query required",
        description: "Please enter a keyword or phrase to search for ads.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Search initiated",
      description: "Searching for ads related to '" + searchQuery + "'...",
    });
    
    // In a real implementation, this is where you would call an API
    // For now, we'll just show a toast after a delay to simulate search
    setTimeout(() => {
      toast({
        title: "No results found",
        description: "Try different keywords or connect your Facebook Ad account.",
      });
    }, 1500);
  };

  const handleConnectFacebook = () => {
    toast({
      title: "Facebook Connection",
      description: "Facebook Ad account integration will be available soon.",
    });
  };
  
  return (
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 text-metamaster-gray-800">Facebook Ads Library</h1>
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
                <Button 
                  className="bg-metamaster-primary hover:bg-metamaster-secondary"
                  onClick={handleSearch}
                >
                  <Search size={18} className="mr-2" /> Search
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center"
                  onClick={() => toast({
                    title: "Advanced Filters",
                    description: "Advanced filtering options coming soon.",
                  })}
                >
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
          
          {/* Empty State */}
          <div className="bg-white rounded-xl p-10 shadow-md border border-gray-100 text-center">
            <div className="flex flex-col items-center justify-center">
              <AlertCircle size={48} className="text-metamaster-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-metamaster-gray-800 mb-2">No Ads Found</h3>
              <p className="text-metamaster-gray-600 mb-6 max-w-md mx-auto">
                Connect your Facebook Ad account or search for ads to see results here.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="bg-metamaster-primary hover:bg-metamaster-secondary"
                  onClick={handleConnectFacebook}
                >
                  Connect Facebook Account
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchQuery('fitness ads example')}
                >
                  Try Sample Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsLibrary;
