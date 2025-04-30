import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, Share, BookmarkPlus, AlertCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';

interface Ad {
  id: string;
  platform: string;
  title: string;
  description: string;
  imageUrl: string;
  advertiser: string;
  datePosted: string;
  impressions: string;
  engagement: string;
  format: string;
  adLibraryId?: string;
}

// Sample mock API for Meta Ads Library
const fetchMetaAds = async (query: string = '', filters: Record<string, any> = {}) => {
  // In a real implementation, this would call the Meta Ads Library API
  // For demo purposes, we'll simulate a fetch with our sample ads
  console.log('Fetching Meta Ads with query:', query, 'and filters:', filters);
  
  // Mock API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // These would be real ads from the Meta Ads Library API
  const sampleAds: Ad[] = [
    {
      id: '1',
      platform: 'Facebook',
      title: 'Summer Collection Sale',
      description: 'Get 50% off on our new summer collection. Limited time offer, shop now!',
      imageUrl: 'https://placehold.co/600x400/1E88E5/FFFFFF?text=Fashion+Ad',
      advertiser: 'Fashion Brand Co.',
      datePosted: '2 days ago',
      impressions: '10.2k',
      engagement: '3.4%',
      format: 'Single Image',
      adLibraryId: 'fb_123456789'
    },
    {
      id: '2',
      platform: 'Instagram',
      title: 'Premium Fitness Program',
      description: 'Transform your body in 30 days with our expert-led fitness program and nutrition guide.',
      imageUrl: 'https://placehold.co/600x400/9C27B0/FFFFFF?text=Fitness+Ad',
      advertiser: 'FitLife Pro',
      datePosted: '5 days ago',
      impressions: '24.5k',
      engagement: '4.8%',
      format: 'Video',
      adLibraryId: 'ig_987654321'
    },
    // ... keep existing code (additional sample ads)
  ];
  
  // Filter by query if provided
  let filteredAds = sampleAds;
  if (query) {
    const lowerQuery = query.toLowerCase();
    filteredAds = sampleAds.filter(ad => 
      ad.title.toLowerCase().includes(lowerQuery) || 
      ad.description.toLowerCase().includes(lowerQuery) ||
      ad.advertiser.toLowerCase().includes(lowerQuery)
    );
  }
  
  // Apply other filters
  if (filters.platform) {
    filteredAds = filteredAds.filter(ad => ad.platform === filters.platform);
  }
  
  if (filters.format) {
    filteredAds = filteredAds.filter(ad => ad.format === filters.format);
  }
  
  // Return the filtered ads
  return filteredAds;
};

// Component for filtering ads
const FilterButton: React.FC<{ 
  label: string;
  isActive: boolean;
  onClick: () => void;
  options?: string[];
  onOptionClick?: (option: string) => void;
}> = ({ label, isActive, onClick, options, onOptionClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => {
    onClick();
    if (!options?.length) {
      setShowDropdown(false);
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  return (
    <div className="relative">
      <Button 
        variant={isActive ? "default" : "outline"} 
        size="sm" 
        className={`flex items-center ${isActive ? 'bg-metamaster-primary' : ''}`}
        onClick={handleClick}
      >
        {label}
        <ChevronDown size={16} className="ml-2" />
      </Button>
      
      {showDropdown && options && (
        <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md border border-gray-100 z-10 min-w-[150px]">
          {options.map((option) => (
            <button
              key={option}
              className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
              onClick={() => {
                onOptionClick?.(option);
                setShowDropdown(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Ad card component
const AdCard: React.FC<{ ad: Ad }> = ({ ad }) => {
  const { toast } = useToast();
  const [saved, setSaved] = useState(false);
  
  const handleSave = async () => {
    try {
      // In a real implementation, this would save to a user's collection in the database
      if (saved) {
        // Remove from saved collection
        // This would make an API call to remove the ad from the user's saved collection
        toast({
          title: "Ad removed from saved",
          description: "Ad removed from your saved collection",
        });
      } else {
        // Add to saved collection
        // This would make an API call to add the ad to the user's saved collection
        toast({
          title: "Ad saved to library",
          description: "You can find this ad in your saved collection",
        });
      }
      setSaved(!saved);
    } catch (error) {
      console.error('Error saving ad:', error);
      toast({
        title: "Error",
        description: "There was a problem saving this ad",
        variant: "destructive"
      });
    }
  };
  
  const handleShare = () => {
    // Create a share link for the ad
    const shareUrl = `${window.location.origin}/ads/${ad.adLibraryId || ad.id}`;
    
    // Try to use the native share API if available
    if (navigator.share) {
      navigator.share({
        title: ad.title,
        text: ad.description,
        url: shareUrl
      }).catch(err => {
        console.error('Error sharing:', err);
        // Fallback to copying to clipboard
        copyToClipboard(shareUrl);
      });
    } else {
      // Fallback to copying to clipboard
      copyToClipboard(shareUrl);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Share link copied",
        description: "Ad share link has been copied to your clipboard",
      });
    }).catch(err => {
      console.error('Error copying to clipboard:', err);
      toast({
        title: "Error",
        description: "Could not copy link to clipboard",
        variant: "destructive"
      });
    });
  };
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
      <div className="relative h-64 bg-gray-100">
        <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white/90 backdrop-blur-sm h-8 w-8"
            onClick={handleSave}
          >
            <BookmarkPlus size={16} className={saved ? "text-metamaster-primary" : ""} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white/90 backdrop-blur-sm h-8 w-8"
            onClick={handleShare}
          >
            <Share size={16} />
          </Button>
        </div>
        <div className="absolute bottom-3 left-3 bg-black/20 backdrop-blur-sm text-white rounded-full px-2 py-1 text-xs">
          {ad.format}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
            {ad.platform}
          </span>
          <span className="text-xs text-metamaster-gray-500">
            {ad.datePosted}
          </span>
        </div>
        
        <h3 className="font-semibold mb-1 text-metamaster-gray-800">{ad.title}</h3>
        <p className="text-metamaster-gray-600 text-sm mb-2 line-clamp-2">{ad.description}</p>
        
        <div className="flex items-center text-metamaster-gray-500 mb-3">
          <span className="text-xs">By {ad.advertiser}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-metamaster-gray-500">Impressions</span>
            <p className="font-semibold text-metamaster-gray-800">{ad.impressions}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-metamaster-gray-500">Engagement</span>
            <p className="font-semibold text-metamaster-gray-800">{ad.engagement}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdsLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [ads, setAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const { toast } = useToast();
  
  const filterOptions = {
    "Platform": ["Facebook", "Instagram", "All"],
    "Niche": ["Fashion", "Fitness", "Real Estate", "E-commerce", "Coaching", "Tech", "Beauty", "All"],
    "Ad Format": ["Single Image", "Carousel", "Video", "Collection", "All"],
    "Date Range": ["Last 24 hours", "Last 7 days", "Last 30 days", "Last 90 days", "All time"],
    "Engagement": ["High (>5%)", "Medium (2-5%)", "Low (<2%)", "All"],
    "Running Time": ["Active", "Inactive", "All"]
  };
  
  // Load ads when component mounts or filters change
  useEffect(() => {
    loadAds();
  }, [filters]);
  
  const loadAds = async () => {
    setIsLoading(true);
    try {
      const fetchedAds = await fetchMetaAds(searchQuery, filters);
      setAds(fetchedAds);
    } catch (error) {
      console.error("Error fetching ads:", error);
      toast({
        title: "Error fetching ads",
        description: "There was a problem loading the ads library.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = async () => {
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
    
    await loadAds();
  };
  
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter === activeFilter ? null : filter);
  };
  
  const handleFilterOptionClick = (filter: string, option: string) => {
    if (option === "All") {
      // Remove this filter
      const newFilters = { ...filters };
      delete newFilters[filter.toLowerCase()];
      setFilters(newFilters);
    } else {
      // Apply this filter
      setFilters({
        ...filters,
        [filter.toLowerCase()]: option
      });
    }
    
    toast({
      title: `Filter: ${filter} - ${option}`,
      description: option === "All" ? `Removed ${filter.toLowerCase()} filter` : `Applied filter to show ads by ${option}`,
    });
  };
  
  const loadMore = async () => {
    setIsLoading(true);
    toast({
      title: "Loading more ads",
      description: "Getting additional ads...",
    });
    
    try {
      // In a real implementation, this would fetch the next page of ads
      const moreAds = await fetchMetaAds(searchQuery, filters);
      
      // Add more ads to the existing list
      // For demo purposes, we're just duplicating the existing ads with new IDs
      const newAds = moreAds.map(ad => ({
        ...ad,
        id: `new-${ad.id}-${Date.now()}`
      }));
      
      setAds([...ads, ...newAds]);
      
      toast({
        title: "More ads loaded",
        description: `Loaded ${newAds.length} additional ads`,
      });
    } catch (error) {
      console.error("Error loading more ads:", error);
      toast({
        title: "Error loading more ads",
        description: "There was a problem loading additional ads.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 text-metamaster-gray-800">Meta Ads Library</h1>
            <p className="text-metamaster-gray-600">Search, analyze and save high-performing ads across Meta platforms</p>
          </div>
          
          {/* Search & Filters */}
          <div className="bg-white rounded-xl shadow-md p-5 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-metamaster-gray-500" />
                </div>
                <Input
                  type="text"
                  placeholder="Search for ads (e.g., fitness, ecommerce, coaching)"
                  className="pl-10 pr-4 py-2 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
                    description: "Advanced filtering options are now available.",
                  })}
                >
                  <Filter size={16} className="mr-2" /> Advanced Filters
                </Button>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.keys(filterOptions).map((filter) => (
                <FilterButton 
                  key={filter}
                  label={filter}
                  isActive={activeFilter === filter || filters[filter.toLowerCase()] !== undefined}
                  onClick={() => handleFilterClick(filter)}
                  options={filterOptions[filter as keyof typeof filterOptions]}
                  onOptionClick={(option) => handleFilterOptionClick(filter, option)}
                />
              ))}
            </div>
          </div>
          
          {/* Ads Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 animate-pulse">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 w-1/4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-12 bg-gray-100 rounded"></div>
                      <div className="h-12 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : ads.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ads.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-10 shadow-md border border-gray-100 text-center">
              <div className="flex flex-col items-center justify-center">
                <AlertCircle size={48} className="text-metamaster-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-metamaster-gray-800 mb-2">No Ads Found</h3>
                <p className="text-metamaster-gray-600 mb-6 max-w-md mx-auto">
                  Try different search terms or filtering options to find relevant ads.
                </p>
                <Button 
                  className="bg-metamaster-primary hover:bg-metamaster-secondary"
                  onClick={() => {
                    setSearchQuery('fitness');
                    handleSearch();
                  }}
                >
                  Try Sample Search
                </Button>
              </div>
            </div>
          )}
          
          {/* Results Found Text */}
          {ads.length > 0 && !isLoading && (
            <div className="mt-6 mb-4">
              <p className="text-metamaster-gray-600">Showing {ads.length} results</p>
            </div>
          )}
          
          {/* Load More Button */}
          {ads.length > 0 && !isLoading && (
            <div className="mt-8 text-center">
              <Button 
                variant="outline" 
                className="px-8"
                onClick={loadMore}
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdsLibrary;
