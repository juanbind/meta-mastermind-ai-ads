
import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, Share, BookmarkPlus, AlertCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';

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
}

const FilterButton: React.FC<{ label: string }> = ({ label }) => (
  <Button variant="outline" size="sm" className="flex items-center">
    {label}
    <ChevronDown size={16} className="ml-2" />
  </Button>
);

const AdCard: React.FC<{ ad: Ad }> = ({ ad }) => {
  const { toast } = useToast();
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    setSaved(!saved);
    toast({
      title: saved ? "Ad removed from saved" : "Ad saved to library",
      description: saved ? "Ad removed from your saved collection" : "You can find this ad in your saved collection",
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share link copied",
      description: "Ad share link has been copied to your clipboard",
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
  const { toast } = useToast();
  
  // Simulate loading ads
  useEffect(() => {
    const loadAds = () => {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
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
            format: 'Single Image'
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
            format: 'Video'
          },
          {
            id: '3',
            platform: 'Facebook',
            title: 'Business Growth Masterclass',
            description: 'Learn proven strategies to scale your business from industry experts. Register for free webinar now.',
            imageUrl: 'https://placehold.co/600x400/FF9800/FFFFFF?text=Business+Ad',
            advertiser: 'Growth Accelerator',
            datePosted: '1 week ago',
            impressions: '15.7k',
            engagement: '2.9%',
            format: 'Carousel'
          },
          {
            id: '4',
            platform: 'Instagram',
            title: 'Smart Home Devices',
            description: 'Make your home smarter with our range of IoT devices. Special launch discount of 30% off.',
            imageUrl: 'https://placehold.co/600x400/4CAF50/FFFFFF?text=Tech+Ad',
            advertiser: 'Smart Living Tech',
            datePosted: '3 days ago',
            impressions: '32.1k',
            engagement: '5.2%',
            format: 'Collection'
          },
          {
            id: '5',
            platform: 'Facebook',
            title: 'Organic Skincare Line',
            description: 'Cruelty-free, organic ingredients for radiant skin. Try our bestselling serum today.',
            imageUrl: 'https://placehold.co/600x400/E91E63/FFFFFF?text=Beauty+Ad',
            advertiser: 'Pure Beauty Co.',
            datePosted: '4 days ago',
            impressions: '18.6k',
            engagement: '4.1%',
            format: 'Single Image'
          },
          {
            id: '6',
            platform: 'Instagram',
            title: 'Language Learning App',
            description: 'Learn a new language in just 10 minutes a day. Download now for a 7-day free trial.',
            imageUrl: 'https://placehold.co/600x400/3F51B5/FFFFFF?text=App+Ad',
            advertiser: 'LinguaLearn',
            datePosted: '1 day ago',
            impressions: '41.3k',
            engagement: '6.7%',
            format: 'Video'
          }
        ];
        
        setAds(sampleAds);
        setIsLoading(false);
      }, 800);
    };
    
    loadAds();
  }, []);
  
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
    
    // Simulate search
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Search complete",
        description: `Found ${ads.length} ads related to "${searchQuery}"`,
      });
    }, 800);
  };
  
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter === activeFilter ? null : filter);
    if (filter !== activeFilter) {
      toast({
        title: `Filter: ${filter}`,
        description: `Applied filter to show ads by ${filter.toLowerCase()}`,
      });
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
              {["Platform", "Niche", "Ad Format", "Date Range", "Engagement", "Running Time"].map((filter, index) => (
                <Button 
                  key={index}
                  variant={activeFilter === filter ? "default" : "outline"} 
                  size="sm" 
                  className={`flex items-center ${activeFilter === filter ? 'bg-metamaster-primary' : ''}`}
                  onClick={() => handleFilterClick(filter)}
                >
                  {filter}
                  <ChevronDown size={16} className="ml-2" />
                </Button>
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
                  onClick={() => setSearchQuery('fitness')}
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
                onClick={() => toast({
                  title: "Loading more ads",
                  description: "Getting additional ads...",
                })}
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
