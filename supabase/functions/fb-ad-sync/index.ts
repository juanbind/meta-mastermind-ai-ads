
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.5';

// Define CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Sample ad data to populate the library (in a real implementation, this would come from Meta's Ad Library API)
const sampleAds = [
  {
    platform: 'Facebook',
    advertiser_name: 'Nike',
    title: 'Summer Collection Launch',
    description: 'Discover our new summer collection. Designed for performance and style.',
    image_url: 'https://placehold.co/600x400/EEE/31343C?text=Nike+Summer+Ad',
    creative_type: 'Single Image',
    start_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    estimated_duration_days: 30,
    engagement: { likes: 1520, comments: 324, shares: 89 },
    estimated_metrics: {
      impressions_low: 50000,
      impressions_high: 100000,
      engagement_rate: 0.042,
      performance_score: 8.2
    },
    advertiser_id: '123456789',
    page_name: 'Nike',
    page_id: '987654321',
    headline: 'Summer Collection Launch',
    body_text: 'Discover our new summer collection. Designed for performance and style.',
    cta_type: 'Shop Now',
    industry_category: 'Apparel & Accessories'
  },
  {
    platform: 'Instagram',
    advertiser_name: 'Adidas',
    title: 'New Running Shoes',
    description: 'Ultraboost 21. Feel the future of running with our most responsive shoes yet.',
    image_url: 'https://placehold.co/600x400/EEE/31343C?text=Adidas+Running+Ad',
    creative_type: 'Video',
    video_url: 'https://example.com/video.mp4',
    start_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    estimated_duration_days: 15,
    engagement: { likes: 2245, comments: 178, shares: 65 },
    estimated_metrics: {
      impressions_low: 75000,
      impressions_high: 125000,
      engagement_rate: 0.038,
      performance_score: 7.8
    },
    advertiser_id: '223456789',
    page_name: 'Adidas',
    page_id: '887654321',
    headline: 'New Running Shoes',
    body_text: 'Ultraboost 21. Feel the future of running with our most responsive shoes yet.',
    cta_type: 'Learn More',
    industry_category: 'Apparel & Accessories'
  },
  {
    platform: 'Facebook',
    advertiser_name: 'Peloton',
    title: 'Transform Your Fitness Routine',
    description: 'Join the Peloton community today and experience world-class workouts from home.',
    image_url: 'https://placehold.co/600x400/EEE/31343C?text=Peloton+Fitness+Ad',
    creative_type: 'Carousel',
    start_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    estimated_duration_days: 20,
    engagement: { likes: 1823, comments: 267, shares: 114 },
    estimated_metrics: {
      impressions_low: 100000,
      impressions_high: 150000,
      engagement_rate: 0.047,
      performance_score: 8.9
    },
    advertiser_id: '323456789',
    page_name: 'Peloton',
    page_id: '787654321',
    headline: 'Transform Your Fitness Routine',
    body_text: 'Join the Peloton community today and experience world-class workouts from home.',
    cta_type: 'Sign Up',
    industry_category: 'Fitness & Wellness'
  },
  {
    platform: 'Instagram',
    advertiser_name: 'Apple',
    title: 'Introducing iPhone 15',
    description: 'Our most advanced iPhone yet. With revolutionary camera system and all-day battery life.',
    image_url: 'https://placehold.co/600x400/EEE/31343C?text=Apple+iPhone+Ad',
    creative_type: 'Single Image',
    start_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    estimated_duration_days: 45,
    engagement: { likes: 3245, comments: 587, shares: 231 },
    estimated_metrics: {
      impressions_low: 200000,
      impressions_high: 350000,
      engagement_rate: 0.051,
      performance_score: 9.3
    },
    advertiser_id: '423456789',
    page_name: 'Apple',
    page_id: '687654321',
    headline: 'Introducing iPhone 15',
    body_text: 'Our most advanced iPhone yet. With revolutionary camera system and all-day battery life.',
    cta_type: 'Buy Now',
    industry_category: 'Technology'
  },
  {
    platform: 'Facebook',
    advertiser_name: 'Airbnb',
    title: 'Discover Unique Stays',
    description: 'Book unforgettable trips with extraordinary homes and experiences around the world.',
    image_url: 'https://placehold.co/600x400/EEE/31343C?text=Airbnb+Travel+Ad',
    creative_type: 'Video',
    video_url: 'https://example.com/airbnb-video.mp4',
    start_date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    estimated_duration_days: 25,
    engagement: { likes: 1437, comments: 193, shares: 76 },
    estimated_metrics: {
      impressions_low: 80000,
      impressions_high: 120000,
      engagement_rate: 0.033,
      performance_score: 7.5
    },
    advertiser_id: '523456789',
    page_name: 'Airbnb',
    page_id: '587654321',
    headline: 'Discover Unique Stays',
    body_text: 'Book unforgettable trips with extraordinary homes and experiences around the world.',
    cta_type: 'Book Now',
    industry_category: 'Travel & Hospitality'
  },
  {
    platform: 'Instagram',
    advertiser_name: 'Netflix',
    title: 'New Series: Stranger Things Season 5',
    description: 'The final season is here. Stream now exclusively on Netflix.',
    image_url: 'https://placehold.co/600x400/EEE/31343C?text=Netflix+Series+Ad',
    creative_type: 'Single Image',
    start_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    estimated_duration_days: 14,
    engagement: { likes: 5320, comments: 1872, shares: 543 },
    estimated_metrics: {
      impressions_low: 300000,
      impressions_high: 500000,
      engagement_rate: 0.062,
      performance_score: 9.7
    },
    advertiser_id: '623456789',
    page_name: 'Netflix',
    page_id: '487654321',
    headline: 'New Series: Stranger Things Season 5',
    body_text: 'The final season is here. Stream now exclusively on Netflix.',
    cta_type: 'Watch Now',
    industry_category: 'Entertainment'
  },
  {
    platform: 'Facebook',
    advertiser_name: 'Tesla',
    title: 'Meet the New Model Y',
    description: 'The future of driving is here. Experience our most affordable electric SUV yet.',
    image_url: 'https://placehold.co/600x400/EEE/31343C?text=Tesla+Model+Y+Ad',
    creative_type: 'Carousel',
    start_date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    estimated_duration_days: 30,
    engagement: { likes: 2178, comments: 435, shares: 189 },
    estimated_metrics: {
      impressions_low: 150000,
      impressions_high: 250000,
      engagement_rate: 0.041,
      performance_score: 8.6
    },
    advertiser_id: '723456789',
    page_name: 'Tesla',
    page_id: '387654321',
    headline: 'Meet the New Model Y',
    body_text: 'The future of driving is here. Experience our most affordable electric SUV yet.',
    cta_type: 'Learn More',
    industry_category: 'Automotive'
  },
  {
    platform: 'Instagram',
    advertiser_name: 'Spotify',
    title: 'Premium Subscription Sale',
    description: 'Get 3 months of Premium for free. No ads, offline listening, and unlimited skips.',
    image_url: 'https://placehold.co/600x400/EEE/31343C?text=Spotify+Premium+Ad',
    creative_type: 'Single Image',
    start_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    estimated_duration_days: 10,
    engagement: { likes: 1245, comments: 134, shares: 57 },
    estimated_metrics: {
      impressions_low: 90000,
      impressions_high: 130000,
      engagement_rate: 0.029,
      performance_score: 7.2
    },
    advertiser_id: '823456789',
    page_name: 'Spotify',
    page_id: '287654321',
    headline: 'Premium Subscription Sale',
    body_text: 'Get 3 months of Premium for free. No ads, offline listening, and unlimited skips.',
    cta_type: 'Subscribe',
    industry_category: 'Technology'
  },
  {
    platform: 'Facebook',
    advertiser_name: 'Starbucks',
    title: 'Summer Drinks Collection',
    description: 'Beat the heat with our new refreshing summer drinks collection. Available for a limited time.',
    image_url: 'https://placehold.co/600x400/EEE/31343C?text=Starbucks+Summer+Ad',
    creative_type: 'Video',
    video_url: 'https://example.com/starbucks-video.mp4',
    start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    estimated_duration_days: 21,
    engagement: { likes: 1825, comments: 246, shares: 92 },
    estimated_metrics: {
      impressions_low: 110000,
      impressions_high: 180000,
      engagement_rate: 0.034,
      performance_score: 7.8
    },
    advertiser_id: '923456789',
    page_name: 'Starbucks',
    page_id: '187654321',
    headline: 'Summer Drinks Collection',
    body_text: 'Beat the heat with our new refreshing summer drinks collection. Available for a limited time.',
    cta_type: 'Order Now',
    industry_category: 'Food & Beverage'
  },
  {
    platform: 'Facebook',
    advertiser_name: 'Microsoft',
    title: 'Windows 11 Pro',
    description: 'Elevate your productivity with the most secure Windows ever.',
    image_url: 'https://placehold.co/600x400/EEE/31343C?text=Windows+11+Pro+Ad',
    creative_type: 'Single Image',
    start_date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    estimated_duration_days: 40,
    engagement: { likes: 985, comments: 217, shares: 54 },
    estimated_metrics: {
      impressions_low: 85000,
      impressions_high: 145000,
      engagement_rate: 0.028,
      performance_score: 7.3
    },
    advertiser_id: '023456789',
    page_name: 'Microsoft',
    page_id: '087654321',
    headline: 'Windows 11 Pro',
    body_text: 'Elevate your productivity with the most secure Windows ever.',
    cta_type: 'Download',
    industry_category: 'Technology'
  },
  {
    platform: 'Instagram',
    advertiser_name: 'Under Armour',
    title: 'Train Like a Champion',
    description: 'Our most advanced performance gear yet. Designed to help you break your limits.',
    image_url: 'https://placehold.co/600x400/EEE/31343C?text=Under+Armour+Ad',
    creative_type: 'Carousel',
    start_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    estimated_duration_days: 28,
    engagement: { likes: 1675, comments: 208, shares: 73 },
    estimated_metrics: {
      impressions_low: 70000,
      impressions_high: 120000,
      engagement_rate: 0.037,
      performance_score: 8.1
    },
    advertiser_id: '123456780',
    page_name: 'Under Armour',
    page_id: '987654312',
    headline: 'Train Like a Champion',
    body_text: 'Our most advanced performance gear yet. Designed to help you break your limits.',
    cta_type: 'Shop Now',
    industry_category: 'Apparel & Accessories'
  },
  {
    platform: 'Facebook',
    advertiser_name: 'Disney+',
    title: 'Disney+ New Releases',
    description: 'Stream the latest blockbusters and original series, exclusively on Disney+.',
    image_url: 'https://placehold.co/600x400/EEE/31343C?text=Disney+Plus+Ad',
    creative_type: 'Video',
    video_url: 'https://example.com/disney-video.mp4',
    start_date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    estimated_duration_days: 30,
    engagement: { likes: 4285, comments: 1387, shares: 642 },
    estimated_metrics: {
      impressions_low: 250000,
      impressions_high: 400000,
      engagement_rate: 0.058,
      performance_score: 9.2
    },
    advertiser_id: '223456780',
    page_name: 'Disney+',
    page_id: '887654312',
    headline: 'Disney+ New Releases',
    body_text: 'Stream the latest blockbusters and original series, exclusively on Disney+.',
    cta_type: 'Subscribe Now',
    industry_category: 'Entertainment'
  }
];

// Edge function to sync ads
Deno.serve(async (req) => {
  console.log('Facebook Ad Sync function started');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }
  
  // Connect to Supabase
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  try {
    if (req.method === 'POST') {
      // In a real implementation, this would call Meta's Ad Library API
      // For demo, we're using sample data
      
      // We'll use upsert to avoid duplicates
      const { data, error } = await supabase
        .from('ads')
        .upsert(
          sampleAds.map(ad => ({
            ...ad,
            // Generate a unique ad_id based on advertiser and title if not present
            ad_id: `${ad.advertiser_id}_${ad.title.replace(/\s/g, '_').toLowerCase()}`
          })),
          { onConflict: 'ad_id', ignoreDuplicates: false }
        );
      
      if (error) throw error;
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Ads library populated successfully',
          ads_count: sampleAds.length
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    } else {
      // If it's a GET request, we'll just populate the database with sample data
      // In a real implementation, this would be a scheduled job
      const { data, error } = await supabase
        .from('ads')
        .upsert(
          sampleAds.map(ad => ({
            ...ad,
            ad_id: `${ad.advertiser_id}_${ad.title.replace(/\s/g, '_').toLowerCase()}`
          })),
          { onConflict: 'ad_id', ignoreDuplicates: false }
        );
      
      if (error) throw error;
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Ads library populated successfully',
          ads_count: sampleAds.length
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }
  } catch (error) {
    console.error('Error in Facebook Ad Sync:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
