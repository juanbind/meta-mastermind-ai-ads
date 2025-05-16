
// Supabase Edge Function: fetch-ads
// This function fetches ads from external sources and stores them in the database

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Example platforms that might be scraped
const PLATFORMS = ['Facebook', 'Instagram', 'TikTok'];
const FORMATS = ['Image', 'Video', 'Carousel', 'Story'];

// Serve HTTP requests
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Get environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Generate mock ad data
    const mockAds = generateMockAds(20);
    
    // Insert ads into database
    const { data, error } = await supabase
      .from('ads')
      .insert(mockAds)
      .select();
      
    if (error) {
      throw error;
    }
    
    console.log(`Successfully inserted ${data.length} ads`);
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully fetched and inserted ${data.length} ads`,
        count: data.length
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in fetch-ads function:', error);
    
    // Return error response
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});

// Function to generate mock ad data
function generateMockAds(count = 10) {
  const ads = [];
  
  const adTitles = [
    'Summer Sale - Up to 50% Off',
    'New Collection Launch',
    'Limited Time Offer',
    'Subscribe Now and Get 20% Off',
    'Flash Sale - 24 Hours Only',
    'Free Shipping on All Orders',
    'Bundle and Save',
    'Holiday Special Deals',
    'Back to School Promotion',
    'End of Season Clearance'
  ];
  
  const pageNames = [
    'Fashion Brand',
    'Tech Store',
    'Fitness Club',
    'Beauty Shop',
    'Food Delivery',
    'Travel Agency',
    'Home Decor',
    'Online Course',
    'Mobile App',
    'Local Restaurant'
  ];
  
  for (let i = 0; i < count; i++) {
    // Generate random impression count between 1,000 and 100,000
    const impressionsCount = Math.floor(Math.random() * 99000) + 1000;
    const impressions = impressionsCount.toLocaleString();
    
    // Generate random engagement rate between 0.5% and 10%
    const engagementRate = (Math.random() * 9.5 + 0.5).toFixed(1);
    const engagement = `${engagementRate}%`;
    
    // Select random platform and format
    const platform = PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)];
    const format = FORMATS[Math.floor(Math.random() * FORMATS.length)];
    
    // Select random title and page name
    const title = adTitles[Math.floor(Math.random() * adTitles.length)];
    const pageName = pageNames[Math.floor(Math.random() * pageNames.length)];
    
    // Generate random date within the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    const dateString = date.toISOString().split('T')[0];
    
    // Generate placeholder image URL
    const imageUrl = `https://placehold.co/600x400/EEE/999?text=${encodeURIComponent(platform)}+Ad`;
    
    // Generate video URL for video ads
    const videoUrl = format === 'Video' 
      ? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
      : null;
    
    // Generate mock metrics
    const estimatedMetrics = {
      impressions_low: impressionsCount * 0.8,
      impressions_high: impressionsCount * 1.2,
      engagement_rate: engagementRate / 100,
      ctr: (Math.random() * 5).toFixed(2),
      spend_low: Math.floor(impressionsCount * 0.001 * 5),
      spend_high: Math.floor(impressionsCount * 0.001 * 15),
      performance_score: Math.floor(Math.random() * 100)
    };
    
    ads.push({
      title,
      page_name: pageName,
      impressions,
      engagement,
      platform,
      format,
      date: dateString,
      advertiser_name: pageName,
      image_url: imageUrl,
      video_url: videoUrl,
      description: `Amazing deals on our ${title.toLowerCase()} campaign! Don't miss out.`,
      creative_type: format,
      start_date: dateString,
      estimated_metrics: estimatedMetrics,
      ad_id: `ad_${Math.random().toString(36).substr(2, 9)}`
    });
  }
  
  return ads;
}
