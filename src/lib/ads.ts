
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
  snapshot_url: string | null;
  scraper_keyword: string | null;
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

// Fetch ads with filters and improved error handling
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

// Function to manually trigger the ad scraper
export async function triggerAdScraper(keywords?: string[]) {
  try {
    console.log("Manually triggering ad scraper");
    
    const response = await fetch(
      `https://mbbfcjdfdkoggherfmff.functions.supabase.co/ad-scraper`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          run_id: crypto.randomUUID(),
          keywords: keywords,
          timestamp: new Date().toISOString()
        })
      }
    );
    
    if (!response.ok) {
      throw new Error(`Error triggering ad scraper: ${response.status}`);
    }
    
    const result = await response.json();
    console.log("Ad scraper triggered:", result);
    
    return result;
  } catch (error) {
    console.error('Error triggering ad scraper:', error);
    throw error;
  }
}

// Get recent scraper job status
export async function getScraperJobStatus() {
  try {
    const { data, error } = await supabase
      .from('scraper_jobs')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(1)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        // No jobs found
        return null;
      }
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching scraper job status:', error);
    throw error;
  }
}

// Populate the Ad Library with scraped ads
export async function populateAdLibrary() {
  try {
    console.log("Starting populateAdLibrary function");
    
    // Check existing ads count
    const { data: existingAdsCount, error: countError } = await supabase
      .from('ads')
      .select('count');
      
    if (countError) {
      console.error("Error checking ads count:", countError);
    } else {
      console.log(`Found ${existingAdsCount[0]?.count || 0} existing ads`);
    }
    
    // If we have less than 10 ads, trigger the scraper
    if (!existingAdsCount || existingAdsCount[0]?.count < 10) {
      try {
        console.log("Insufficient ads in database, triggering ad scraper");
        
        const result = await triggerAdScraper();
        
        return {
          success: true,
          message: `Ad scraping job initiated. Job ID: ${result.job_id}`,
          source: "Scraper",
          job_id: result.job_id
        };
      } catch (error) {
        console.error("Error triggering ad scraper:", error);
        throw error;
      }
    }
    
    return { 
      success: true, 
      message: `Using ${existingAdsCount[0].count} existing ads`,
      source: "Database",
      ads_count: existingAdsCount[0].count
    };
  } catch (error) {
    console.error('Error populating Ad Library:', error);
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
