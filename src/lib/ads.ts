
import { supabase } from './supabase';

// Interface definitions for type safety
export interface Ad {
  id: string;
  title: string | null;
  pageName: string | null;
  impressions: string | null;
  engagement: string | null;
  platform: string | null;
  format: string | null;
  date: string | null;
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
        `title.ilike.%${query}%,pageName.ilike.%${query}%`
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

// Insert new ads into database
export async function insertAds(ads: Omit<Ad, 'id' | 'created_at'>[]) {
  try {
    const { data, error } = await supabase
      .from('ads')
      .insert(ads)
      .select();
      
    if (error) throw error;
    return data as Ad[];
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
    const sampleAds = [
      {
        title: "Summer Sale - 50% Off All Items",
        pageName: "Fashion Brand",
        impressions: "15,000",
        engagement: "4.2%",
        platform: "Facebook",
        format: "Image",
        date: new Date().toISOString().split('T')[0]
      },
      {
        title: "New Fitness Program Launch",
        pageName: "Health & Wellness",
        impressions: "22,400",
        engagement: "5.7%",
        platform: "Instagram",
        format: "Video",
        date: new Date().toISOString().split('T')[0]
      },
      {
        title: "Limited Time Offer - Free Shipping",
        pageName: "E-commerce Store",
        impressions: "8,900",
        engagement: "3.1%",
        platform: "Facebook",
        format: "Carousel",
        date: new Date().toISOString().split('T')[0]
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
