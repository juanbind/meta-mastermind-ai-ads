import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, Share, BookmarkPlus, AlertCircle, Loader } from 'lucide-react';
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

// Media preview component to handle different media types with better error handling
const MediaPreview: React.FC<{ 
  ad: Ad, 
  className?: string 
}> = ({ ad, className = "" }) => {
  const [mediaError, setMediaError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  // Enhanced fallback to handle various media scenarios
  if (ad.video_url && !mediaError) {
    return (
      <div className={`relative ${className} bg-gray-100`}>
        {!isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader size={24} className="animate-spin text-metamaster-primary" />
          </div>
        )}
        <video 
          src={ad.video_url} 
          className={`w-full h-full object-cover ${isVideoLoaded ? '' : 'opacity-0'}`}
          controls
          onLoadedData={() => setIsVideoLoaded(true)}
          onError={() => {
            console.error("Error loading video:", ad.video_url);
            setMediaError(true);
          }}
          poster={ad.image_url || undefined}
        />
      </div>
    );
  }
  
  // Image display with error handling
  return (
    <div className={`relative ${className} bg-gray-100`}>
      {!isImageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader size={24} className="animate-spin text-metamaster-primary" />
        </div>
      )}
      <img 
        src={ad.image_url || 'https://placehold.co/600x400/EEE/999?text=No+Image'} 
        alt={ad.title || ad.advertiser_name || 'Ad'} 
        className={`w-full h-full object-cover ${isImageLoaded ? '' : 'opacity-0'}`}
        onLoad={() => setIsImageLoaded(true)}
        onError={(e) => {
          console.error("Error loading image:", ad.image_url);
          const target = e.target as HTMLImageElement;
          target.src = 'https://placehold.co/600x400/EEE/999?text=No+Preview+Available';
          setIsImageLoaded(true);
        }}
      />
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
    // Generate Meta ad URL based on platform and IDs
    let metaAdUrl = '';
    
    if (ad.original_url) {
      // Use the original URL if available
      metaAdUrl = ad.original_url;
    } else if (ad.ad_id && ad.platform.toLowerCase().includes('facebook')) {
      // Generate Facebook Ad Library URL
      metaAdUrl = `https://www.facebook.com/ads/library/?id=${ad.ad_id}`;
    } else if (ad.ad_id && ad.platform.toLowerCase().includes('instagram')) {
      // Generate Instagram Ad URL
      metaAdUrl = `https://www.facebook.com/ads/library/?id=${ad.ad_id}`; // Instagram ads also use Facebook Ad Library
    } else {
      // Fallback to internal URL
      metaAdUrl = `${window.location.origin}/ads/${ad.ad_id || ad.id}`;
    }
    
    // Try to use the native share API if available
    if (navigator.share) {
      navigator.share({
        title: ad.title || "Shared Ad",
        text: ad.description || "",
        url: metaAdUrl
      }).catch(err => {
        console.error('Error sharing:', err);
        // Fallback to copying to clipboard
        copyToClipboard(metaAdUrl);
      });
    } else {
      // Fallback to copying to clipboard
      copyToClipboard(metaAdUrl);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Share link copied",
        description: "Original Meta ad link has been copied to your clipboard",
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
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="relative h-64 bg-gray-100">
        <MediaPreview ad={ad} className="h-full" />
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
        
        <h3 className="font-semibold mb-1 text-metamaster-gray-800 line-clamp-2">{ad.title || ad.headline || 'Untitled Ad'}</h3>
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
  const [pageSize] = useState(24); // Show 24 ads per page
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);

  // Query for fetching ads - using correct React Query v5 syntax
  const { data, isLoading, refetch, isError } = useQuery({
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
    retry: 2,
    meta: {
      onError: (error: any) => {
        console.error('Error fetching ads:', error);
        setLoadError(error.message || 'Failed to load ads');
        toast({
          title: "Error",
          description: "There was an issue loading ads. Please try again.",
          variant: "destructive"
        });
      }
    }
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
    setLoadError(null);
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
  
  const loadMore = async () => {
    if (isLoadingMore || (data?.isLastPage)) return;
    
    setIsLoadingMore(true);
    setPage(page + 1);
    await refetch();
    setIsLoadingMore(false);
  };
  
  // Initial data loading with better error handling
  useEffect(() => {
    const loadInitialAds = async () => {
      if (isInitialDataLoaded) return; // Prevent multiple calls
      
      setIsInitialDataLoaded(true);
      
      try {
        console.log("Starting to populate ad library");
        // Try to populate ad library on first load
        const result = await populateAdLibrary();
        console.log("Populate result:", result);
        
        if (result && result.success) {
          refetch();
          
          // Show toast about the result
          toast({
            title: "Meta Ad Library Loaded",
            description: `Successfully loaded ${result.ads_count} ads${result.source ? ' from ' + result.source : ''}.`,
          });
        } else {
          throw new Error("Failed to populate ad library");
        }
      } catch (error) {
        console.error('Error loading initial ads:', error);
        toast({
          title: "Warning",
          description: "Using cached ad data. Meta Ad Library connection failed.",
          variant: "default"
        });
        // Try to fetch whatever is in the database
        refetch();
      }
    };
    
    loadInitialAds();
  }, [refetch, toast]);
  
  return (
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 text-metamaster-gray-800">Meta Ads Library</h1>
            <p className="text-metamaster-gray-600">Search, analyze and save high-performing ads from the Meta Ad Library</p>
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
          
          {/* Loading state */}
          {isLoading && !data && (
            <div className="text-center py-12">
              <Loader size={48} className="animate-spin text-metamaster-primary mx-auto mb-4" />
              <p className="text-metamaster-gray-600">Loading ads from Meta Ad Library...</p>
            </div>
          )}
          
          {/* Error state */}
          {loadError && !isLoading && (
            <div className="bg-white rounded-xl p-6 shadow-md border border-red-100 text-center mb-8">
              <div className="flex flex-col items-center justify-center">
                <AlertCircle size={48} className="text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-metamaster-gray-800 mb-2">Error Loading Ads</h3>
                <p className="text-metamaster-gray-600 mb-6 max-w-md mx-auto">
                  {loadError}
                </p>
                <Button 
                  className="bg-metamaster-primary hover:bg-metamaster-secondary"
                  onClick={() => {
                    setLoadError(null);
                    refetch();
                  }}
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
          
          {/* Ads Grid */}
          {!isLoading && data?.data && data.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.data.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          ) : (!isLoading && !loadError) ? (
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
                    setSearchQuery('');
                    setFilters({});
                    refetch();
                  }}
                >
                  View All Ads
                </Button>
              </div>
            </div>
          ) : null}
          
          {/* Results Found Text */}
          {data?.data && data.data.length > 0 && !isLoading && (
            <div className="mt-6 mb-4">
              <p className="text-metamaster-gray-600">
                Showing {data.data.length} {data.count && data.count > data.data.length ? `of ${data.count}` : ''} results
              </p>
            </div>
          )}
          
          {/* Load More Button */}
          {data?.data && data.data.length > 0 && !isLoading && data.count && data.count > data.data.length && !data.isLastPage && (
            <div className="mt-8 text-center">
              <Button 
                variant="outline" 
                className="px-8"
                onClick={loadMore}
                disabled={isLoadingMore || (data?.isLastPage)}
              >
                {isLoadingMore ? (
                  <>
                    <Loader size={16} className="animate-spin mr-2" />
                    Loading...
                  </>
                ) : "Load More"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdsLibrary;
