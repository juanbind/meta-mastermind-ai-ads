
import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, Share, BookmarkPlus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { fetchAds, saveAdToCollection, populateAdLibrary, Ad } from '@/lib/ads';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

// Filter button component
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
      // Get user's default collection or create one if it doesn't exist
      const { data: user } = await supabase.auth.getUser();
      
      if (!user?.user?.id) {
        toast({
          title: "Authentication required",
          description: "Please sign in to save ads to your collection",
          variant: "destructive"
        });
        return;
      }
      
      const { data: collections } = await supabase
        .from('ad_collections')
        .select('id')
        .eq('user_id', user.user.id)
        .eq('name', 'My Saved Ads')
        .limit(1);
        
      let collectionId: string;
        
      if (!collections || collections.length === 0) {
        // Create default collection
        const { data: newCollection } = await supabase
          .from('ad_collections')
          .insert({
            name: 'My Saved Ads',
            description: 'Default collection for saved ads',
            user_id: user.user.id,
            is_public: false
          })
          .select()
          .single();
          
        if (!newCollection) throw new Error('Failed to create collection');
        collectionId = newCollection.id;
      } else {
        collectionId = collections[0].id;
      }
      
      if (saved) {
        // Remove from collection
        const { error } = await supabase
          .from('collection_ads')
          .delete()
          .eq('ad_id', ad.id)
          .eq('collection_id', collectionId);
          
        if (error) throw error;
        
        toast({
          title: "Ad removed from saved",
          description: "Ad removed from your saved collection",
        });
      } else {
        // Save to collection
        await saveAdToCollection(ad.id, collectionId);
        
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
    const shareUrl = `${window.location.origin}/ads/${ad.ad_id || ad.id}`;
    
    // Try to use the native share API if available
    if (navigator.share) {
      navigator.share({
        title: ad.title || "Shared Ad",
        text: ad.description || "",
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
        <img src={ad.image_url || 'https://placehold.co/600x400/EEE/999?text=No+Image'} alt={ad.title || 'Ad'} className="w-full h-full object-cover" />
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
          {ad.creative_type || 'Unknown Format'}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
            {ad.platform}
          </span>
          <span className="text-xs text-metamaster-gray-500">
            {ad.start_date ? new Date(ad.start_date).toLocaleDateString() : 'Unknown date'}
          </span>
        </div>
        
        <h3 className="font-semibold mb-1 text-metamaster-gray-800">{ad.title || ad.headline || 'Untitled Ad'}</h3>
        <p className="text-metamaster-gray-600 text-sm mb-2 line-clamp-2">{ad.description || ad.body_text || 'No description available'}</p>
        
        <div className="flex items-center text-metamaster-gray-500 mb-3">
          <span className="text-xs">By {ad.advertiser_name}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-metamaster-gray-500">Impressions</span>
            <p className="font-semibold text-metamaster-gray-800">
              {ad.estimated_metrics?.impressions_high ? 
                `${Math.round(ad.estimated_metrics.impressions_low / 1000)}k-${Math.round(ad.estimated_metrics.impressions_high / 1000)}k` : 
                'Unknown'}
            </p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-metamaster-gray-500">Engagement</span>
            <p className="font-semibold text-metamaster-gray-800">
              {ad.engagement ? 
                `${typeof ad.engagement === 'string' ? ad.engagement : 
                  (ad.estimated_metrics?.engagement_rate ? 
                    `${(ad.estimated_metrics.engagement_rate * 100).toFixed(1)}%` : 
                    'Unknown')}` : 
                'Unknown'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component
const AdsLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(9); // Show 9 ads per page

  // Query for fetching ads
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['ads', searchQuery, filters, page, pageSize],
    queryFn: () => fetchAds({ 
      query: searchQuery, 
      platform: filters['Platform'], 
      format: filters['Ad Format'],
      page,
      pageSize
    }),
    // Enable by default to show ads without requiring search
    enabled: true,
  });
  
  const filterOptions = {
    "Platform": ["Facebook", "Instagram", "All"],
    "Niche": ["Fashion", "Fitness", "Real Estate", "E-commerce", "Coaching", "Tech", "Beauty", "All"],
    "Ad Format": ["Single Image", "Carousel", "Video", "Collection", "All"],
    "Date Range": ["Last 24 hours", "Last 7 days", "Last 30 days", "Last 90 days", "All time"],
    "Engagement": ["High (>5%)", "Medium (2-5%)", "Low (<2%)", "All"],
    "Running Time": ["Active", "Inactive", "All"]
  };
  
  const handleSearch = () => {
    setPage(1); // Reset to first page
    refetch();
    
    if (searchQuery.trim()) {
      toast({
        title: "Search initiated",
        description: "Searching for ads related to '" + searchQuery + "'...",
      });
    }
  };
  
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter === activeFilter ? null : filter);
  };
  
  const handleFilterOptionClick = (filter: string, option: string) => {
    if (option === "All") {
      // Remove this filter
      const newFilters = { ...filters };
      delete newFilters[filter];
      setFilters(newFilters);
    } else {
      // Apply this filter
      setFilters({
        ...filters,
        [filter]: option
      });
    }
    
    setPage(1); // Reset to first page
    
    toast({
      title: `Filter: ${filter} - ${option}`,
      description: option === "All" ? `Removed ${filter.toLowerCase()} filter` : `Applied filter to show ads by ${option}`,
    });
    
    refetch();
  };
  
  const loadMore = () => {
    setPage(page + 1);
  };
  
  // Initial data loading
  useEffect(() => {
    // Populate ad library on first load
    const loadInitialAds = async () => {
      try {
        await populateAdLibrary();
        refetch();
      } catch (error) {
        console.error('Error loading initial ads:', error);
      }
    };
    
    loadInitialAds();
  }, [refetch]);
  
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
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Button 
                  className="bg-metamaster-primary hover:bg-metamaster-secondary"
                  onClick={handleSearch}
                >
                  <Search size={18} className="mr-2" /> Search
                </Button>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.keys(filterOptions).map((filter) => (
                <FilterButton 
                  key={filter}
                  label={filter}
                  isActive={activeFilter === filter || filters[filter] !== undefined}
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
          ) : data?.data && data.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.data.map((ad) => (
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
          {data?.data && data.data.length > 0 && !isLoading && (
            <div className="mt-6 mb-4">
              <p className="text-metamaster-gray-600">
                Showing {data.data.length} {data.count && data.count > data.data.length ? `of ${data.count}` : ''} results
              </p>
            </div>
          )}
          
          {/* Load More Button */}
          {data?.data && data.data.length > 0 && !isLoading && data.count && data.count > data.data.length && (
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
