
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.4.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Facebook Ad Sync function started");
    
    // Initialize the Supabase client with SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from environment
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Sample ad data - in a production environment this would be fetched from Facebook Ad Library API
    const sampleAds = [
      {
        ad_id: "123456789012345",
        platform: "Facebook",
        advertiser_id: "12345678901",
        advertiser_name: "Nike",
        page_id: "12345678",
        page_name: "Nike Running",
        title: "Run Like Never Before",
        description: "Introducing our newest running shoes with advanced cushioning technology.",
        image_url: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
        video_url: null,
        landing_url: "https://www.nike.com/running",
        original_url: "https://www.facebook.com/ads/library/?id=123456789012345", // Direct link to ad
        creative_type: "Single Image",
        headline: "Run Like Never Before",
        body_text: "Introducing our newest running shoes with advanced cushioning technology.",
        cta_type: "Shop Now",
        start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        last_seen_date: new Date().toISOString(),
        estimated_duration_days: 30,
        engagement: { likes: 5200, shares: 820, comments: 340 },
        estimated_metrics: {
          impressions_low: 100000,
          impressions_high: 150000,
          engagement_rate: 0.042,
          performance_score: 8.5
        },
        targeting: {
          age: ["18-24", "25-34"],
          gender: ["male", "female"],
          interests: ["running", "fitness", "outdoor activities"]
        },
        industry_category: "Retail",
        keywords: ["running", "shoes", "athletic", "sports"],
        language: "English"
      },
      {
        ad_id: "987654321098765",
        platform: "Instagram",
        advertiser_id: "98765432109",
        advertiser_name: "Adidas",
        page_id: "87654321",
        page_name: "Adidas Originals",
        title: "Original Never Goes Out of Style",
        description: "Classic designs meet modern comfort in our latest collection.",
        image_url: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg",
        video_url: null,
        landing_url: "https://www.adidas.com/originals",
        original_url: "https://www.facebook.com/ads/library/?id=987654321098765", // Direct link to ad
        creative_type: "Single Image",
        headline: "Original Never Goes Out of Style",
        body_text: "Classic designs meet modern comfort in our latest collection.",
        cta_type: "Learn More",
        start_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        last_seen_date: new Date().toISOString(),
        estimated_duration_days: 45,
        engagement: { likes: 8700, shares: 1200, comments: 560 },
        estimated_metrics: {
          impressions_low: 200000,
          impressions_high: 250000,
          engagement_rate: 0.051,
          performance_score: 9.2
        },
        targeting: {
          age: ["18-24", "25-34", "35-44"],
          gender: ["male", "female"],
          interests: ["fashion", "streetwear", "music", "urban culture"]
        },
        industry_category: "Fashion",
        keywords: ["streetwear", "fashion", "originals", "classic", "sneakers"],
        language: "English"
      },
      {
        ad_id: "456789012345678",
        platform: "Facebook",
        advertiser_id: "45678901234",
        advertiser_name: "Apple",
        page_id: "56789012",
        page_name: "Apple",
        title: "Introducing the New iPhone",
        description: "More power. More features. More wow factor.",
        image_url: null,
        video_url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", // Sample video URL
        landing_url: "https://www.apple.com/iphone",
        original_url: "https://www.facebook.com/ads/library/?id=456789012345678", // Direct link to ad
        creative_type: "Video",
        headline: "Introducing the New iPhone",
        body_text: "More power. More features. More wow factor.",
        cta_type: "Learn More",
        start_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        last_seen_date: new Date().toISOString(),
        estimated_duration_days: 60,
        engagement: { likes: 12500, shares: 3400, comments: 2800 },
        estimated_metrics: {
          impressions_low: 500000,
          impressions_high: 750000,
          engagement_rate: 0.068,
          performance_score: 9.8
        },
        targeting: {
          age: ["18-24", "25-34", "35-44", "45-54"],
          gender: ["male", "female"],
          interests: ["technology", "innovation", "gadgets", "smartphones"]
        },
        industry_category: "Technology",
        keywords: ["iphone", "smartphone", "tech", "apple", "mobile"],
        language: "English"
      },
      // Add more varied sample ads
      {
        ad_id: "567890123456789",
        platform: "Instagram",
        advertiser_id: "56789012345",
        advertiser_name: "Tesla",
        page_id: "67890123",
        page_name: "Tesla Motors",
        title: "The Future is Electric",
        description: "Experience the performance and sustainability of Tesla electric vehicles.",
        image_url: "https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg",
        video_url: null,
        landing_url: "https://www.tesla.com",
        original_url: "https://www.facebook.com/ads/library/?id=567890123456789", // Direct link to ad
        creative_type: "Single Image",
        headline: "The Future is Electric",
        body_text: "Experience the performance and sustainability of Tesla electric vehicles.",
        cta_type: "Learn More",
        start_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        last_seen_date: new Date().toISOString(),
        estimated_duration_days: 90,
        engagement: { likes: 15800, shares: 4200, comments: 3100 },
        estimated_metrics: {
          impressions_low: 400000,
          impressions_high: 600000,
          engagement_rate: 0.072,
          performance_score: 9.7
        },
        targeting: {
          age: ["25-34", "35-44", "45-54"],
          gender: ["male", "female"],
          interests: ["electric vehicles", "sustainability", "technology", "luxury cars"]
        },
        industry_category: "Automotive",
        keywords: ["electric", "cars", "sustainability", "luxury", "future"],
        language: "English"
      },
      {
        ad_id: "678901234567890",
        platform: "Facebook",
        advertiser_id: "67890123456",
        advertiser_name: "Airbnb",
        page_id: "78901234",
        page_name: "Airbnb",
        title: "Discover Unique Places to Stay",
        description: "Book cabins, beach houses, unique homes and more around the world.",
        image_url: "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg",
        video_url: null,
        landing_url: "https://www.airbnb.com",
        original_url: "https://www.facebook.com/ads/library/?id=678901234567890", // Direct link to ad
        creative_type: "Carousel",
        headline: "Discover Unique Places to Stay",
        body_text: "Book cabins, beach houses, unique homes and more around the world.",
        cta_type: "Book Now",
        start_date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        last_seen_date: new Date().toISOString(),
        estimated_duration_days: 45,
        engagement: { likes: 7600, shares: 1200, comments: 890 },
        estimated_metrics: {
          impressions_low: 300000,
          impressions_high: 450000,
          engagement_rate: 0.048,
          performance_score: 8.9
        },
        targeting: {
          age: ["25-34", "35-44", "45-54"],
          gender: ["male", "female"],
          interests: ["travel", "vacation", "adventure", "experiences", "unique accommodations"]
        },
        industry_category: "Travel",
        keywords: ["accommodation", "travel", "vacation", "booking", "unique stays"],
        language: "English"
      },
      {
        ad_id: "789012345678901",
        platform: "Instagram",
        advertiser_id: "78901234567",
        advertiser_name: "Spotify",
        page_id: "89012345",
        page_name: "Spotify",
        title: "Music for Everyone",
        description: "Discover new music and podcasts with Spotify Premium.",
        image_url: null,
        video_url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", // Sample video URL
        landing_url: "https://www.spotify.com/premium",
        original_url: "https://www.facebook.com/ads/library/?id=789012345678901", // Direct link to ad
        creative_type: "Video",
        headline: "Music for Everyone",
        body_text: "Discover new music and podcasts with Spotify Premium.",
        cta_type: "Try Premium",
        start_date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        last_seen_date: new Date().toISOString(),
        estimated_duration_days: 30,
        engagement: { likes: 9300, shares: 1700, comments: 1200 },
        estimated_metrics: {
          impressions_low: 350000,
          impressions_high: 500000,
          engagement_rate: 0.056,
          performance_score: 9.1
        },
        targeting: {
          age: ["18-24", "25-34"],
          gender: ["male", "female"],
          interests: ["music", "entertainment", "streaming", "podcasts"]
        },
        industry_category: "Entertainment",
        keywords: ["music", "streaming", "premium", "podcasts", "entertainment"],
        language: "English"
      },
      // Add more sample ads as needed
      {
        ad_id: "890123456789012",
        platform: "Facebook",
        advertiser_id: "89012345678",
        advertiser_name: "Target",
        page_id: "90123456",
        page_name: "Target",
        title: "Back to School Deals",
        description: "Stock up on all your back to school essentials with Target's amazing deals.",
        image_url: "https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg",
        video_url: null,
        landing_url: "https://www.target.com/c/back-to-school/-/N-5xty9",
        original_url: "https://www.facebook.com/ads/library/?id=890123456789012", // Direct link to ad
        creative_type: "Single Image",
        headline: "Back to School Deals",
        body_text: "Stock up on all your back to school essentials with Target's amazing deals.",
        cta_type: "Shop Now",
        start_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        last_seen_date: new Date().toISOString(),
        estimated_duration_days: 30,
        engagement: { likes: 3200, shares: 540, comments: 380 },
        estimated_metrics: {
          impressions_low: 200000,
          impressions_high: 300000,
          engagement_rate: 0.039,
          performance_score: 7.8
        },
        targeting: {
          age: ["25-34", "35-44", "45-54"],
          gender: ["female"],
          interests: ["parenting", "education", "shopping", "deals"]
        },
        industry_category: "Retail",
        keywords: ["back to school", "shopping", "deals", "supplies", "target"],
        language: "English"
      },
      {
        ad_id: "901234567890123",
        platform: "Instagram",
        advertiser_id: "90123456789",
        advertiser_name: "Sephora",
        page_id: "01234567",
        page_name: "Sephora",
        title: "New Season, New Look",
        description: "Discover fall's hottest makeup trends and must-have products.",
        image_url: "https://images.pexels.com/photos/2253834/pexels-photo-2253834.jpeg",
        video_url: null,
        landing_url: "https://www.sephora.com/new-makeup",
        original_url: "https://www.facebook.com/ads/library/?id=901234567890123", // Direct link to ad
        creative_type: "Carousel",
        headline: "New Season, New Look",
        body_text: "Discover fall's hottest makeup trends and must-have products.",
        cta_type: "Shop Now",
        start_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        last_seen_date: new Date().toISOString(),
        estimated_duration_days: 45,
        engagement: { likes: 11200, shares: 2300, comments: 1800 },
        estimated_metrics: {
          impressions_low: 300000,
          impressions_high: 450000,
          engagement_rate: 0.062,
          performance_score: 9.3
        },
        targeting: {
          age: ["18-24", "25-34", "35-44"],
          gender: ["female"],
          interests: ["beauty", "makeup", "cosmetics", "fashion", "skincare"]
        },
        industry_category: "Beauty",
        keywords: ["makeup", "beauty", "cosmetics", "skincare", "trends"],
        language: "English"
      },
      {
        ad_id: "012345678901234",
        platform: "Facebook",
        advertiser_id: "01234567890",
        advertiser_name: "Peloton",
        page_id: "12345678",
        page_name: "Peloton",
        title: "Your Best Workout Yet",
        description: "Experience immersive workouts from the comfort of your home with Peloton.",
        image_url: null,
        video_url: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Sample video URL
        landing_url: "https://www.onepeloton.com",
        original_url: "https://www.facebook.com/ads/library/?id=012345678901234", // Direct link to ad
        creative_type: "Video",
        headline: "Your Best Workout Yet",
        body_text: "Experience immersive workouts from the comfort of your home with Peloton.",
        cta_type: "Learn More",
        start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        last_seen_date: new Date().toISOString(),
        estimated_duration_days: 60,
        engagement: { likes: 8900, shares: 1500, comments: 1200 },
        estimated_metrics: {
          impressions_low: 250000,
          impressions_high: 400000,
          engagement_rate: 0.058,
          performance_score: 9.0
        },
        targeting: {
          age: ["25-34", "35-44", "45-54"],
          gender: ["male", "female"],
          interests: ["fitness", "health", "workout", "home gym", "wellness"]
        },
        industry_category: "Fitness",
        keywords: ["workout", "fitness", "home gym", "exercise", "peloton"],
        language: "English"
      }
    ];

    // Method depends on the HTTP request method
    if (req.method === "GET") {
      // Demo mode: Insert sample ads into the database
      for (const ad of sampleAds) {
        // Check if ad with this ad_id already exists
        const { data: existingAd } = await supabase
          .from("ads")
          .select("id")
          .eq("ad_id", ad.ad_id)
          .maybeSingle();
          
        if (!existingAd) {
          // Insert new ad
          const { error } = await supabase
            .from("ads")
            .insert(ad);
            
          if (error) {
            console.error("Error inserting ad:", error);
          }
        }
      }
      
      return new Response(
        JSON.stringify({
          success: true,
          message: "Ads library populated successfully",
          ads_count: sampleAds.length
        }),
        {
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json"
          }
        }
      );
    } else if (req.method === "POST") {
      // Handle Facebook API integration (if user provides their own credentials)
      try {
        const { accessToken, adAccountId, userId } = await req.json();
        
        // In a real implementation, this would call the Facebook Ad Library API
        // For demo purposes, we'll just use the sample data
        
        // Store the integration details
        const { error: integrationError } = await supabase
          .from("facebook_integrations")
          .insert({
            user_id: userId,
            account_id: adAccountId,
            access_token: accessToken,
            status: "active",
            metadata: { last_sync: new Date().toISOString() }
          });
          
        if (integrationError) {
          throw new Error(`Failed to store integration: ${integrationError.message}`);
        }
        
        // Insert the same sample ads but associate them with this user
        for (const ad of sampleAds) {
          const { error } = await supabase
            .from("ads")
            .insert({
              ...ad,
              user_id: userId
            });
            
          if (error) {
            console.error("Error inserting ad:", error);
          }
        }
        
        return new Response(
          JSON.stringify({
            success: true,
            message: "Facebook Ads integration successful",
            ads_count: sampleAds.length
          }),
          {
            headers: { 
              ...corsHeaders, 
              "Content-Type": "application/json"
            }
          }
        );
      } catch (error) {
        console.error("Error connecting to Facebook Ads:", error);
        
        return new Response(
          JSON.stringify({
            success: false,
            error: error.message || "Failed to connect to Facebook Ads"
          }),
          {
            status: 400,
            headers: { 
              ...corsHeaders, 
              "Content-Type": "application/json"
            }
          }
        );
      }
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Method not allowed"
        }),
        {
          status: 405,
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json"
          }
        }
      );
    }
  } catch (error) {
    console.error("Error in FB Ad Sync function:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Internal server error"
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json"
        }
      }
    );
  }
});
