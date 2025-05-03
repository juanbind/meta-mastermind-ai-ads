
import { supabase } from './supabase';

// Interface definitions for type safety
export interface Ad {
  id: string;
  ad_id: string | null;
  platform: string;
  advertiser_id: string | null;
  advertiser_name: string;
  page_id: string | null;
  page_name: string | null;
  title: string | null;
  description: string | null;
  image_url: string | null;
  video_url: string | null;
  landing_url: string | null;
  original_url: string | null; // Meta ad URL
  creative_type: string | null;
  headline: string | null;
  body_text: string | null;
  cta_type: string | null;
  start_date: string | null;
  last_seen_date: string | null;
  estimated_duration_days: number | null;
  engagement: any;
  estimated_metrics: any;
  targeting: any | null;
  metadata: any | null;
  first_seen: string | null;
  last_updated: string | null;
  industry_category: string | null;
  keywords: string[] | null;
  language: string | null;
  user_id: string | null;
  created_at: string | null;
}

export interface AdCollection {
  id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface AdAlert {
  id: string;
  name: string;
  type: string;
  criteria: any;
  frequency: string | null;
  is_active: boolean;
  last_triggered: string | null;
  created_at: string | null;
  updated_at: string | null;
  user_id: string;
}

// Fetch ads with filters
export async function fetchAds(options: {
  query?: string;
  platform?: string;
  format?: string;
  page?: number;
  pageSize?: number;
}) {
  const { query, platform, format, page = 1, pageSize = 24 } = options;
  try {
    console.log(`Fetching ads with options:`, options);
    
    let queryBuilder = supabase.from('ads').select('*', { count: 'exact' });
    
    // Apply search query across multiple fields
    if (query) {
      queryBuilder = queryBuilder.or(
        `title.ilike.%${query}%,description.ilike.%${query}%,advertiser_name.ilike.%${query}%,body_text.ilike.%${query}%,headline.ilike.%${query}%`
      );
    }
    
    // Apply platform filter
    if (platform && platform !== 'All') {
      queryBuilder = queryBuilder.eq('platform', platform);
    }
    
    // Apply format filter
    if (format && format !== 'All') {
      queryBuilder = queryBuilder.eq('creative_type', format);
    }
    
    // Apply pagination
    const from = (page - 1) * pageSize;
    
    // Execute the query with pagination
    const { data, error, count } = await queryBuilder
      .order('created_at', { ascending: false })
      .range(from, from + pageSize - 1);
      
    console.log(`Query returned ${data?.length || 0} ads, count: ${count || 'unknown'}`);
    
    if (error) {
      if (error.code === 'PGRST103' && error.message.includes('Requested range not satisfiable')) {
        // If we hit the end of results, return what we have
        console.log("Reached end of available results");
        
        // Try again with first page
        const firstPageResults = await queryBuilder
          .order('created_at', { ascending: false })
          .range(0, pageSize - 1);
          
        return {
          data: firstPageResults.data as Ad[],
          count: firstPageResults.count || 0,
          page: 1,
          pageSize,
          isLastPage: true
        };
      }
      throw error;
    }
    
    // Check if we've reached the last page
    const isLastPage = !data || data.length < pageSize || (count !== null && from + data.length >= count);
    
    return { 
      data: data as Ad[], 
      count: count || 0, 
      page, 
      pageSize,
      isLastPage
    };
  } catch (error) {
    console.error('Error fetching ads:', error);
    throw error;
  }
}

// Get ad by ID
export async function getAd(id: string) {
  try {
    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data as Ad;
  } catch (error) {
    console.error(`Error fetching ad ${id}:`, error);
    throw error;
  }
}

// Save ad to collection
export async function saveAdToCollection(adId: string, collectionId: string, notes?: string) {
  try {
    const { data, error } = await supabase
      .from('collection_ads')
      .insert({
        ad_id: adId,
        collection_id: collectionId,
        notes,
        added_at: new Date().toISOString()
      })
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error saving ad ${adId} to collection ${collectionId}:`, error);
    throw error;
  }
}

// Fetch user collections
export async function fetchCollections(userId: string) {
  try {
    const { data, error } = await supabase
      .from('ad_collections')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data as AdCollection[];
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error;
  }
}

// Create collection
export async function createCollection(collection: Omit<AdCollection, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('ad_collections')
      .insert(collection)
      .select()
      .single();
      
    if (error) throw error;
    return data as AdCollection;
  } catch (error) {
    console.error('Error creating collection:', error);
    throw error;
  }
}

// Create alert
export async function createAlert(alert: Omit<AdAlert, 'id' | 'created_at' | 'updated_at' | 'last_triggered'>) {
  try {
    const { data, error } = await supabase
      .from('ad_alerts')
      .insert(alert)
      .select()
      .single();
      
    if (error) throw error;
    return data as AdAlert;
  } catch (error) {
    console.error('Error creating alert:', error);
    throw error;
  }
}

// Fetch insights for ad
export async function fetchAdInsights(adId: string) {
  try {
    const { data, error } = await supabase
      .from('ad_insights')
      .select('*')
      .eq('ad_id', adId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching insights for ad ${adId}:`, error);
    throw error;
  }
}

// Populate the Ad Library with Meta ads
export async function populateAdLibrary() {
  try {
    console.log("Starting populateAdLibrary function");
    
    // Check existing ads count before making the call
    const { data: existingAdsCount, error: countError } = await supabase
      .from('ads')
      .select('count');
      
    if (countError) {
      console.error("Error checking ads count:", countError);
    } else {
      console.log(`Found ${existingAdsCount[0]?.count || 0} existing ads`);
    }
    
    // If we have less than 100 ads, call the edge function to populate more
    if (!existingAdsCount || existingAdsCount[0]?.count < 100) {
      try {
        console.log("Calling edge function to populate ad library");
        
        // Use AbortSignal for better timeout control
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
        
        const response = await fetch(
          `https://mbbfcjdfdkoggherfmff.functions.supabase.co/fb-ad-sync`, 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            signal: controller.signal
          }
        );
        
        // Clear the timeout
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`Edge function returned error: ${response.status}`);
        }
        
        const result = await response.json();
        console.log("Edge function result:", result);
        return result;
      } catch (fetchError) {
        console.error("Error connecting to edge function:", fetchError);
        
        if (fetchError.name === 'AbortError') {
          console.log("Edge function request timed out, falling back to fetching existing ads");
        }
        
        // If edge function fails but we have some existing ads, still return success
        if (existingAdsCount && existingAdsCount[0]?.count > 0) {
          return { 
            success: true, 
            message: `Using ${existingAdsCount[0].count} existing ads (edge function unavailable)`,
            ads_count: existingAdsCount[0].count
          };
        } else {
          // Emergency backup: insert minimal sample ads directly from here
          await insertSampleAds();
          return { 
            success: true, 
            message: 'Using sample ads data (edge function unavailable)', 
            ads_count: 12 
          };
        }
      }
    } else {
      // We already have enough ads in the database
      console.log(`Using ${existingAdsCount[0].count} existing ads in database`);
      return { 
        success: true, 
        message: `Using ${existingAdsCount[0].count} existing ads`, 
        ads_count: existingAdsCount[0].count 
      };
    }
  } catch (error) {
    console.error('Error populating Ad Library:', error);
    
    // Final fallback
    try {
      await insertSampleAds();
      return { 
        success: true, 
        message: 'Using sample ads data (after error recovery)', 
        ads_count: 12 
      };
    } catch (fallbackError) {
      console.error('Error inserting sample ads:', fallbackError);
      throw error; // Throw original error if fallback also fails
    }
  }
}

// Insert sample ads as fallback when edge function fails
async function insertSampleAds() {
  const sampleAds = [
    {
      platform: 'Facebook',
      advertiser_name: 'Fitness Revolution',
      title: 'Transform Your Body in 30 Days',
      description: 'Join our proven fitness program and see results in just one month!',
      creative_type: 'Single Image',
      image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop',
      start_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      original_url: 'https://www.facebook.com/ads/library/?id=123456789',
      estimated_metrics: {
        impressions_low: 15000,
        impressions_high: 25000,
        engagement_rate: 0.042
      }
    },
    {
      platform: 'Instagram',
      advertiser_name: 'Fashion Style Co',
      title: 'Summer Collection Launch',
      description: 'Discover our new sustainable summer collection. Use code SUMMER20 for 20% off your first order!',
      creative_type: 'Carousel',
      image_url: 'https://images.unsplash.com/photo-1523359346063-d879354c0ea5?w=800&auto=format&fit=crop',
      start_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      original_url: 'https://www.facebook.com/ads/library/?id=223456789',
      estimated_metrics: {
        impressions_low: 30000,
        impressions_high: 50000,
        engagement_rate: 0.038
      }
    },
    {
      platform: 'Facebook',
      advertiser_name: 'Tech Innovations',
      title: 'The Future of Smart Homes',
      description: 'Control your entire home from your phone with our new integrated smart system.',
      creative_type: 'Video',
      video_url: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-video-call-with-a-laptop-at-39894-large.mp4',
      image_url: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&auto=format&fit=crop',
      start_date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      original_url: 'https://www.facebook.com/ads/library/?id=323456789',
      estimated_metrics: {
        impressions_low: 40000,
        impressions_high: 70000,
        engagement_rate: 0.025
      }
    }
  ];
  
  // Delete any existing ads to avoid duplication
  try {
    await supabase.from('ads').delete().not('id', 'is', null);
  } catch (deleteError) {
    console.log('Could not delete existing ads, continuing anyway:', deleteError);
  }
  
  // Insert new sample ads
  for (const ad of sampleAds) {
    try {
      await supabase
        .from('ads')
        .insert(ad);
    } catch (error) {
      console.error('Error inserting sample ad:', error);
    }
  }
  
  console.log('Added sample ads as fallback');
}

// Connect to Facebook Ads (kept for backward compatibility but can now be optional)
export async function connectFacebookAds(accessToken: string, adAccountId: string, userId: string) {
  try {
    const response = await fetch(`https://mbbfcjdfdkoggherfmff.functions.supabase.co/fb-ad-sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken,
        adAccountId,
        userId
      })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to connect to Facebook Ads');
    }
    
    return result;
  } catch (error) {
    console.error('Error connecting to Facebook Ads:', error);
    throw error;
  }
}

// Generate ads report
export async function generateAdsReport(filterOptions: Record<string, any>) {
  // In a real implementation, this would generate a report based on filters
  // For demo purposes, we'll return a sample report object
  return {
    generatedAt: new Date().toISOString(),
    filters: filterOptions,
    summary: {
      totalAds: 24,
      averageEngagement: '3.8%',
      topPerformer: 'Summer Collection Ad',
      totalSpend: '$1,240.00'
    },
    performanceByPlatform: [
      { platform: 'Facebook', count: 14, avgEngagement: '3.2%' },
      { platform: 'Instagram', count: 10, avgEngagement: '4.7%' }
    ]
  };
}
