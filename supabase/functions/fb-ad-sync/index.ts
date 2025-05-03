
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
      // Fashion and Apparel Ads
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
        ad_id: "223456789098761",
        platform: "Instagram",
        advertiser_id: "22345678909",
        advertiser_name: "H&M",
        page_id: "22345678",
        page_name: "H&M",
        title: "Summer Collection 2025",
        description: "Discover our sustainable summer styles. Made with eco-friendly materials and fair trade practices.",
        image_url: "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg",
        video_url: null,
        landing_url: "https://www.hm.com/summer",
        original_url: "https://www.facebook.com/ads/library/?id=223456789098761",
        creative_type: "Carousel",
        headline: "Summer Collection 2025",
        body_text: "Discover our sustainable summer styles. Made with eco-friendly materials and fair trade practices.",
        cta_type: "Shop Now",
        start_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        last_seen_date: new Date().toISOString(),
        estimated_duration_days: 45,
        engagement: { likes: 8400, shares: 1350, comments: 720 },
        estimated_metrics: {
          impressions_low: 250000,
          impressions_high: 350000,
          engagement_rate: 0.047,
          performance_score: 8.7
        },
        targeting: {
          age: ["18-24", "25-34", "35-44"],
          gender: ["female"],
          interests: ["fashion", "sustainability", "summer trends"]
        },
        industry_category: "Fashion",
        keywords: ["summer fashion", "sustainable clothing", "eco-friendly", "summer styles"],
        language: "English"
      },
      
      // Tech Products
      {
        ad_id: "987654321098765",
        platform: "Instagram",
        advertiser_id: "98765432109",
        advertiser_name: "Samsung",
        page_id: "87654321",
        page_name: "Samsung Mobile",
        title: "Introducing the Galaxy Z Fold",
        description: "The future of mobile is here. Experience our revolutionary folding smartphone.",
        image_url: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg",
        video_url: "https://assets.mixkit.co/videos/preview/mixkit-smartphone-with-amazing-graphics-1616-large.mp4",
        landing_url: "https://www.samsung.com/galaxy",
        original_url: "https://www.facebook.com/ads/library/?id=987654321098765", 
        creative_type: "Video",
        headline: "Introducing the Galaxy Z Fold",
        body_text: "The future of mobile is here. Experience our revolutionary folding smartphone.",
        cta_type: "Learn More",
        start_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        last_seen_date: new Date().toISOString(),
        estimated_duration_days: 45,
        engagement: { likes: 12700, shares: 2200, comments: 960 },
        estimated_metrics: {
          impressions_low: 400000,
          impressions_high: 600000,
          engagement_rate: 0.051,
          performance_score: 9.2
        },
        targeting: {
          age: ["18-24", "25-34", "35-44"],
          gender: ["male", "female"],
          interests: ["technology", "smartphones", "innovation"]
        },
        industry_category: "Technology",
        keywords: ["smartphone", "folding phone", "galaxy", "mobile tech"],
        language: "English"
      },
      {
        ad_id: "456789012345678",
        platform: "Facebook",
        advertiser_id: "45678901234",
        advertiser_name: "Apple",
        page_id: "56789012",
        page_name: "Apple",
        title: "Introducing the New iPad Pro",
        description: "More power. More features. More possibilities for creativity and productivity.",
        image_url: null,
        video_url: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-persons-hands-using-a-tablet-32622-large.mp4",
        landing_url: "https://www.apple.com/ipad-pro",
        original_url: "https://www.facebook.com/ads/library/?id=456789012345678", // Direct link to ad
        creative_type: "Video",
        headline: "Introducing the New iPad Pro",
        body_text: "More power. More features. More possibilities for creativity and productivity.",
        cta_type: "Learn More",
        start_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        last_seen_date: new Date().toISOString(),
        estimated_duration_days: 60,
        engagement: { likes: 18500, shares: 3400, comments: 2800 },
        estimated_metrics: {
          impressions_low: 500000,
          impressions_high: 750000,
          engagement_rate: 0.068,
          performance_score: 9.8
        },
        targeting: {
          age: ["18-24", "25-34", "35-44", "45-54"],
          gender: ["male", "female"],
          interests: ["technology", "design", "productivity", "creativity"]
        },
        industry_category: "Technology",
        keywords: ["ipad", "tablet", "tech", "apple", "creativity"],
        language: "English"
      },
      
      // Automotive
      {
        ad_id: "567890123456789",
        platform: "Facebook",
        advertiser_id: "56789012345",
        advertiser_name: "Tesla",
        page_id: "67890123",
        page_name: "Tesla Motors",
        title: "The Future of Electric SUVs",
        description: "Introducing the Tesla Model Y. Experience the perfect combination of performance and sustainability.",
        image_url: "https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg",
        video_url: null,
        landing_url: "https://www.tesla.com/modely",
        original_url: "https://www.facebook.com/ads/library/?id=567890123456789",
        creative_type: "Single Image",
        headline: "The Future of Electric SUVs",
        body_text: "Introducing the Tesla Model Y. Experience the perfect combination of performance and sustainability.",
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
        keywords: ["electric", "SUV", "sustainability", "luxury", "Tesla"],
        language: "English"
      },
      
      // Travel
      {
        ad_id: "678901234567890",
        platform: "Facebook",
        advertiser_id: "67890123456",
        advertiser_name: "Airbnb",
        page_id: "78901234",
        page_name: "Airbnb",
        title: "Discover Unique Stays Around the World",
        description: "Book cabins, beach houses, unique homes and more around the world.",
        image_url: "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg",
        video_url: "https://assets.mixkit.co/videos/preview/mixkit-traveling-through-a-small-town-in-the-passenger-seat-42653-large.mp4",
        landing_url: "https://www.airbnb.com",
        original_url: "https://www.facebook.com/ads/library/?id=678901234567890",
        creative_type: "Video",
        headline: "Discover Unique Stays Around the World",
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
      
      // Entertainment
      {
        ad_id: "789012345678901",
        platform: "Instagram",
        advertiser_id: "78901234567",
        advertiser_name: "Spotify",
        page_id: "89012345",
        page_name: "Spotify",
        title: "Music for Every Moment",
        description: "Discover new music and podcasts with Spotify Premium. 3 months free for new subscribers.",
        image_url: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
        video_url: "https://assets.mixkit.co/videos/preview/mixkit-musician-playing-a-music-track-on-a-laptop-and-smartphone-23402-large.mp4",
        landing_url: "https://www.spotify.com/premium",
        original_url: "https://www.facebook.com/ads/library/?id=789012345678901",
        creative_type: "Video",
        headline: "Music for Every Moment",
        body_text: "Discover new music and podcasts with Spotify Premium. 3 months free for new subscribers.",
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
      
      // Retail
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
        original_url: "https://www.facebook.com/ads/library/?id=890123456789012",
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
      
      // Beauty
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
        original_url: "https://www.facebook.com/ads/library/?id=901234567890123",
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
      
      // Fitness
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
        video_url: "https://assets.mixkit.co/videos/preview/mixkit-woman-training-with-dumbbells-at-home-8053-large.mp4",
        landing_url: "https://www.onepeloton.com",
        original_url: "https://www.facebook.com/ads/library/?id=012345678901234",
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
      },
      
      // Food and Beverage
      {
        ad_id: "123456789012346",
        platform: "Instagram",
        advertiser_id: "12345678902",
        advertiser_name: "Starbucks",
        page_id: "12345679",
        page_name: "Starbucks",
        title: "Summer Refreshers",
        description: "Beat the heat with our new line of handcrafted cold drinks.",
        image_url: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg",
        video_url: null,
        landing_url: "https://www.starbucks.com/summer",
        original_url: "https://www.facebook.com/ads/library/?id=123456789012346",
        creative_type: "Single Image",
        headline: "Summer Refreshers",
        body_text: "Beat the heat with our new line of handcrafted cold drinks.",
        cta_type: "Order Now",
        start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        last_seen_date: new Date().toISOString(),
        estimated_duration_days: 21,
        engagement: { likes: 4500, shares: 320, comments: 210 },
        estimated_metrics: {
          impressions_low: 100000,
          impressions_high: 150000,
          engagement_rate: 0.043,
          performance_score: 8.1
        },
        targeting: {
          age: ["18-24", "25-34", "35-44"],
          gender: ["male", "female"],
          interests: ["coffee", "beverages", "refreshments", "summer drinks"]
        },
        industry_category: "Food and Beverage",
        keywords: ["coffee", "cold drinks", "refreshers", "summer", "beverages"],
        language: "English"
      },
      
      // Financial Services
      {
        ad_id: "234567890123456",
        platform: "Facebook",
        advertiser_id: "23456789012",
        advertiser_name: "Chase Bank",
        page_id: "23456789",
        page_name: "Chase",
        title: "Earn 5% Cash Back",
        description: "Open a new Chase Freedom card and earn 5% cash back on all purchases for 3 months.",
        image_url: "https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg",
        video_url: null,
        landing_url: "https://www.chase.com/freedom",
        original_url: "https://www.facebook.com/ads/library/?id=234567890123456",
        creative_type: "Single Image",
        headline: "Earn 5% Cash Back",
        body_text: "Open a new Chase Freedom card and earn 5% cash back on all purchases for 3 months.",
        cta_type: "Apply Now",
        start_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        last_seen_date: new Date().toISOString(),
        estimated_duration_days: 90,
        engagement: { likes: 1900, shares: 180, comments: 210 },
        estimated_metrics: {
          impressions_low: 400000,
          impressions_high: 600000,
          engagement_rate: 0.022,
          performance_score: 7.9
        },
        targeting: {
          age: ["25-34", "35-44", "45-54", "55-64"],
          gender: ["male", "female"],
          interests: ["personal finance", "credit cards", "banking", "rewards programs"]
        },
        industry_category: "Financial Services",
        keywords: ["credit card", "cash back", "banking", "finance", "rewards"],
        language: "English"
      },
      
      // Education
      {
        ad_id: "345678901234567",
        platform: "Instagram",
        advertiser_id: "34567890123",
        advertiser_name: "Coursera",
        page_id: "34567890",
        page_name: "Coursera",
        title: "Learn Data Science",
        description: "Gain in-demand skills with our professional certificate program. No experience required.",
        image_url: null,
        video_url: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-studying-at-home-with-a-laptop-18365-large.mp4",
        landing_url: "https://www.coursera.org/professional-certificates/data-science",
        original_url: "https://www.facebook.com/ads/library/?id=345678901234567",
        creative_type: "Video",
        headline: "Learn Data Science",
        body_text: "Gain in-demand skills with our professional certificate program. No experience required.",
        cta_type: "Enroll Now",
        start_date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        last_seen_date: new Date().toISOString(),
        estimated_duration_days: 60,
        engagement: { likes: 3200, shares: 780, comments: 450 },
        estimated_metrics: {
          impressions_low: 180000,
          impressions_high: 250000,
          engagement_rate: 0.046,
          performance_score: 8.4
        },
        targeting: {
          age: ["18-24", "25-34", "35-44"],
          gender: ["male", "female"],
          interests: ["education", "data science", "programming", "career development"]
        },
        industry_category: "Education",
        keywords: ["online learning", "data science", "certification", "skills", "education"],
        language: "English"
      },
      
      // Real Estate
      {
        ad_id: "456789012345679",
        platform: "Facebook",
        advertiser_id: "45678901235",
        advertiser_name: "Zillow",
        page_id: "56789013",
        page_name: "Zillow",
        title: "Find Your Dream Home",
        description: "Browse millions of listings and find the perfect home that fits your needs and budget.",
        image_url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
        video_url: "https://assets.mixkit.co/videos/preview/mixkit-attractive-couple-looking-at-a-house-for-sale-on-a-street-43127-large.mp4",
        landing_url: "https://www.zillow.com",
        original_url: "https://www.facebook.com/ads/library/?id=456789012345679",
        creative_type: "Video",
        headline: "Find Your Dream Home",
        body_text: "Browse millions of listings and find the perfect home that fits your needs and budget.",
        cta_type: "Search Now",
        start_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        last_seen_date: new Date().toISOString(),
        estimated_duration_days: 30,
        engagement: { likes: 2100, shares: 190, comments: 240 },
        estimated_metrics: {
          impressions_low: 120000,
          impressions_high: 180000,
          engagement_rate: 0.032,
          performance_score: 7.6
        },
        targeting: {
          age: ["25-34", "35-44", "45-54"],
          gender: ["male", "female"],
          interests: ["real estate", "home buying", "mortgages", "home decor", "moving"]
        },
        industry_category: "Real Estate",
        keywords: ["homes for sale", "real estate", "home buying", "property", "zillow"],
        language: "English"
      },
      
      // B2B Software
      {
        ad_id: "567890123456790",
        platform: "Facebook",
        advertiser_id: "56789012346",
        advertiser_name: "Salesforce",
        page_id: "67890124",
        page_name: "Salesforce",
        title: "Transform Your Business",
        description: "Discover how Salesforce can help you grow your business with the world's #1 CRM platform.",
        image_url: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
        video_url: null,
        landing_url: "https://www.salesforce.com/products/crm-system",
        original_url: "https://www.facebook.com/ads/library/?id=567890123456790",
        creative_type: "Single Image",
        headline: "Transform Your Business",
        body_text: "Discover how Salesforce can help you grow your business with the world's #1 CRM platform.",
        cta_type: "Learn More",
        start_date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        last_seen_date: new Date().toISOString(),
        estimated_duration_days: 90,
        engagement: { likes: 1400, shares: 320, comments: 180 },
        estimated_metrics: {
          impressions_low: 80000,
          impressions_high: 120000,
          engagement_rate: 0.035,
          performance_score: 8.3
        },
        targeting: {
          age: ["25-34", "35-44", "45-54", "55-64"],
          gender: ["male", "female"],
          interests: ["business", "sales", "CRM", "marketing", "enterprise software"]
        },
        industry_category: "B2B",
        keywords: ["CRM", "business software", "sales", "customer relationship", "enterprise"],
        language: "English"
      },
      
      // Healthcare
      {
        ad_id: "678901234567891",
        platform: "Facebook",
        advertiser_id: "67890123457",
        advertiser_name: "Mayo Clinic",
        page_id: "78901235",
        page_name: "Mayo Clinic",
        title: "Expert Care When You Need It",
        description: "World-class healthcare from the nation's top-ranked hospital. Schedule your appointment today.",
        image_url: "https://images.pexels.com/photos/263337/pexels-photo-263337.jpeg",
        video_url: null,
        landing_url: "https://www.mayoclinic.org/appointments",
        original_url: "https://www.facebook.com/ads/library/?id=678901234567891",
        creative_type: "Single Image",
        headline: "Expert Care When You Need It",
        body_text: "World-class healthcare from the nation's top-ranked hospital. Schedule your appointment today.",
        cta_type: "Book Now",
        start_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        last_seen_date: new Date().toISOString(),
        estimated_duration_days: 45,
        engagement: { likes: 2800, shares: 410, comments: 320 },
        estimated_metrics: {
          impressions_low: 150000,
          impressions_high: 220000,
          engagement_rate: 0.038,
          performance_score: 8.7
        },
        targeting: {
          age: ["35-44", "45-54", "55-64", "65+"],
          gender: ["male", "female"],
          interests: ["healthcare", "wellness", "medical services", "health insurance"]
        },
        industry_category: "Healthcare",
        keywords: ["medical care", "hospital", "healthcare", "doctors", "appointments"],
        language: "English"
      },
      
      // Gaming
      {
        ad_id: "789012345678902",
        platform: "Instagram",
        advertiser_id: "78901234568",
        advertiser_name: "Xbox",
        page_id: "89012346",
        page_name: "Xbox",
        title: "Next-Gen Gaming Is Here",
        description: "Experience lightning-fast load times and stunning visuals with Xbox Series X.",
        image_url: null,
        video_url: "https://assets.mixkit.co/videos/preview/mixkit-player-wins-in-a-video-game-and-selebrates-the-triumph-29854-large.mp4",
        landing_url: "https://www.xbox.com/consoles",
        original_url: "https://www.facebook.com/ads/library/?id=789012345678902",
        creative_type: "Video",
        headline: "Next-Gen Gaming Is Here",
        body_text: "Experience lightning-fast load times and stunning visuals with Xbox Series X.",
        cta_type: "Shop Now",
        start_date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        last_seen_date: new Date().toISOString(),
        estimated_duration_days: 30,
        engagement: { likes: 12800, shares: 2400, comments: 1900 },
        estimated_metrics: {
          impressions_low: 350000,
          impressions_high: 550000,
          engagement_rate: 0.064,
          performance_score: 9.5
        },
        targeting: {
          age: ["18-24", "25-34", "35-44"],
          gender: ["male"],
          interests: ["gaming", "console gaming", "xbox", "video games"]
        },
        industry_category: "Gaming",
        keywords: ["xbox", "console", "gaming", "video games", "next-gen"],
        language: "English"
      }
    ];

    // Generate additional variations of ads with different dates and formats to increase dataset
    const moreAds = [];
    const industries = ["Retail", "Technology", "Fitness", "Fashion", "Food", "Travel", "Automotive", "Healthcare"];
    const platforms = ["Facebook", "Instagram"];
    const creativeTypes = ["Single Image", "Video", "Carousel"];
    const advertiserNames = [
      "Amazon", "Microsoft", "Planet Fitness", "Under Armour", "Chipotle", 
      "Expedia", "Ford", "UnitedHealthcare", "Lululemon", "Best Buy",
      "Whole Foods", "Adidas", "Samsung", "Toyota", "Netflix", "Uber",
      "Shopify", "Etsy", "Home Depot", "Lowe's", "Target", "Walmart"
    ];
    
    // Generate 40 more variations
    for (let i = 0; i < 40; i++) {
      const randomIndex = Math.floor(Math.random() * sampleAds.length);
      const baseAd = sampleAds[randomIndex];
      
      // Create variations with different industry, advertiser, dates
      const industry = industries[Math.floor(Math.random() * industries.length)];
      const platform = platforms[Math.floor(Math.random() * platforms.length)];
      const creativeType = creativeTypes[Math.floor(Math.random() * creativeTypes.length)];
      const advertiser = advertiserNames[Math.floor(Math.random() * advertiserNames.length)];
      
      // Random days ago between 1-60
      const daysAgo = Math.floor(Math.random() * 60) + 1;
      
      moreAds.push({
        ...baseAd,
        ad_id: `variation_${i}_${Date.now()}`,
        platform,
        advertiser_name: advertiser,
        page_name: advertiser,
        creative_type: creativeType,
        industry_category: industry,
        start_date: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
        // Ensure video_url is appropriate based on creative type
        video_url: creativeType === 'Video' ? baseAd.video_url || "https://assets.mixkit.co/videos/preview/mixkit-time-lapse-of-a-working-professional-18748-large.mp4" : null
      });
    }
    
    // Combine original samples with variations
    const allAds = [...sampleAds, ...moreAds];
    
    console.log(`Processing ${allAds.length} total ads`);

    // Method depends on the HTTP request method
    if (req.method === "GET") {
      // Demo mode: Insert sample ads into the database
      console.log(`Starting to insert ${allAds.length} ads into the database`);
      
      // Delete existing ads before inserting (ensures clean state)
      console.log("Clearing existing ads first");
      const { error: deleteError } = await supabase
        .from("ads")
        .delete()
        .not('id', 'is', null); // Delete all rows
        
      if (deleteError) {
        console.error("Error clearing existing ads:", deleteError);
        // Continue anyway - even if clear failed, we'll try to add the new ones
      }
      
      // Insert in batches to avoid timeout
      const batchSize = 15;
      const batches = [];
      for (let i = 0; i < allAds.length; i += batchSize) {
        batches.push(allAds.slice(i, i + batchSize));
      }
      
      console.log(`Split into ${batches.length} batches of up to ${batchSize} ads each`);
      
      let insertedCount = 0;
      let errorCount = 0;
      
      for (const [index, batch] of batches.entries()) {
        try {
          console.log(`Processing batch ${index + 1} of ${batches.length}`);
          const { data, error } = await supabase
            .from("ads")
            .insert(batch);
            
          if (error) {
            console.error(`Error inserting batch ${index + 1}:`, error);
            errorCount += batch.length;
          } else {
            insertedCount += batch.length;
            console.log(`Successfully inserted batch ${index + 1}`);
          }
        } catch (batchError) {
          console.error(`Exception processing batch ${index + 1}:`, batchError);
          errorCount += batch.length;
        }
      }
      
      console.log(`Completed insertion: ${insertedCount} ads successfully inserted, ${errorCount} errors`);
      
      return new Response(
        JSON.stringify({
          success: true,
          message: "Ads library populated successfully",
          ads_count: insertedCount,
          errors: errorCount
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
        for (const ad of allAds) {
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
            ads_count: allAds.length
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
