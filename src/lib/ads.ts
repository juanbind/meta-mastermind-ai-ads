
import { supabase } from './supabase';

// Database type definition that matches what's actually in the Supabase table
export interface DatabaseAd {
  id: string;
  title: string | null;
  page_name: string | null;
  impressions: string | null;
  engagement: string | null;
  platform: string; // Required by database
  format: string | null;
  date: string | null;
  created_at: string | null;
  ad_id?: string | null;
  advertiser_id?: string | null;
  advertiser_name: string; // Required by database
  body_text?: string | null;
  creative_type?: string | null;
  cta_type?: string | null;
  description?: string | null;
  estimated_metrics?: any | null;
  start_date?: string | null;
  headline?: string | null;
  image_url?: string | null;
  landing_url?: string | null;
  original_url?: string | null;
  video_url?: string | null;
}

// Application interface with consistent naming in camelCase
export interface Ad {
  id: string;
  title: string | null;
  pageName: string | null; // camelCase in application
  impressions: string | null;
  engagement: string | null;
  platform: string;
  format: string | null;
  date: string | null;
  created_at: string | null;
  ad_id?: string | null;
  advertiser_id?: string | null;
  advertiser_name: string; // Required, matching database
  body_text?: string | null;
  creative_type?: string | null;
  cta_type?: string | null;
  description?: string | null;
  estimated_metrics?: any | null;
  start_date?: string | null;
  headline?: string | null;
  image_url?: string | null;
  landing_url?: string | null;
  original_url?: string | null;
  video_url?: string | null;
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

// Helper function to convert DatabaseAd to Ad (handling field name differences)
function convertDatabaseAdToAd(dbAd: DatabaseAd): Ad {
  return {
    ...dbAd,
    pageName: dbAd.page_name,
  };
}

// Helper function to convert Ad to DatabaseAd (for inserts/updates)
function convertAdToDatabaseAd(ad: Partial<Ad>): Partial<DatabaseAd> {
  const { pageName, ...rest } = ad;
  return {
    ...rest,
    page_name: pageName,
  };
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
        `title.ilike.%${query}%,page_name.ilike.%${query}%`
      );
    }
    
    // Apply platform filter
    if (platform && platform !== 'All') {
      queryBuilder = queryBuilder.eq('platform', platform);
    }
    
    // Apply format filter
    if (format && format !== 'All') {
      queryBuilder = queryBuilder.eq('format', format);
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
          
        if (firstPageResults.error) throw firstPageResults.error;
        
        const mappedData = (firstPageResults.data || []).map(item => convertDatabaseAdToAd(item as DatabaseAd));
        
        return {
          data: mappedData,
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
    
    // Map database results to application interface
    const mappedData = (data || []).map(item => convertDatabaseAdToAd(item as DatabaseAd));
    
    return { 
      data: mappedData, 
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
    return convertDatabaseAdToAd(data as DatabaseAd);
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

// Insert new ads into database - fixed type issues
export async function insertAds(ads: Array<Partial<DatabaseAd>>) {
  try {
    // Make sure required fields are present
    const validAds = ads.map(ad => {
      // Create a valid ad object with required fields
      const validAd: Partial<DatabaseAd> = { ...ad };
      
      // Ensure platform is set (required by the database)
      if (!validAd.platform) {
        validAd.platform = 'Unknown';
      }
      
      // Ensure advertiser_name is set (required by the database)
      if (!validAd.advertiser_name) {
        validAd.advertiser_name = validAd.title || 'Unknown Advertiser';
      }
      
      return validAd;
    });
    
    const { data, error } = await supabase
      .from('ads')
      .insert(validAds)
      .select();
      
    if (error) throw error;
    
    // Convert database response to application format
    const convertedData = (data || []).map(item => convertDatabaseAdToAd(item as DatabaseAd));
    return convertedData;
  } catch (error) {
    console.error('Error inserting ads:', error);
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

// Function to manually fetch and insert ad data
export async function fetchAndInsertAdData() {
  try {
    console.log("Starting to fetch and insert ad data");
    
    // Sample ad data for demonstration
    const sampleAds: Array<Partial<DatabaseAd>> = [
      {
        title: "Summer Sale - 50% Off All Items",
        page_name: "Fashion Brand",
        impressions: "15,000",
        engagement: "4.2%",
        platform: "Facebook",
        format: "Image",
        date: new Date().toISOString().split('T')[0],
        advertiser_name: "Fashion Brand",
        image_url: "https://placehold.co/600x400/EEE/999?text=Fashion+Ad",
        description: "Get 50% off all summer items while supplies last!"
      },
      {
        title: "New Fitness Program Launch",
        page_name: "Health & Wellness",
        impressions: "22,400",
        engagement: "5.7%",
        platform: "Instagram",
        format: "Video",
        date: new Date().toISOString().split('T')[0],
        advertiser_name: "Health & Wellness",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        image_url: "https://placehold.co/600x400/EEE/999?text=Fitness+Ad",
        description: "Transform your body in just 30 days with our new program!"
      },
      {
        title: "Limited Time Offer - Free Shipping",
        page_name: "E-commerce Store",
        impressions: "8,900",
        engagement: "3.1%",
        platform: "Facebook",
        format: "Carousel",
        date: new Date().toISOString().split('T')[0],
        advertiser_name: "E-commerce Store",
        image_url: "https://placehold.co/600x400/EEE/999?text=Ecommerce+Ad",
        description: "Free shipping on all orders for a limited time only!"
      }
    ];
    
    // Insert the sample ads
    const result = await insertAds(sampleAds);
    
    console.log(`Successfully inserted ${result.length} ads`);
    return result;
  } catch (error) {
    console.error('Error fetching and inserting ad data:', error);
    throw error;
  }
}

// Function to populate the ad library from the Edge Function
export async function populateAdLibrary() {
  try {
    const response = await fetch(`${window.location.origin}/functions/v1/fetch-ads`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ads: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.success) {
      console.log(`Successfully fetched ${result.count} ads`);
      return {
        success: true,
        ads_count: result.count,
        source: "Sample Ads"
      };
    } else {
      throw new Error(result.error || "Unknown error fetching ads");
    }
  } catch (error) {
    console.error('Error populating ad library:', error);
    throw error;
  }
}
