
// Supabase Edge Function: Ad Scraper
// This function scrapes Facebook and Instagram ads and stores them in the database

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Ad scraper keywords to search for
const SCRAPER_KEYWORDS = [
  'fitness',
  'ecommerce',
  'coaching',
  'real estate',
  'tech',
  'fashion',
  'beauty'
];

// Mock data generator for demonstration
const generateMockAd = (platform: string, keyword: string) => {
  const creativeFuncs = {
    'Single Image': () => ({ 
      image_url: `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}`,
      video_url: null
    }),
    'Video': () => ({ 
      image_url: `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}`,
      video_url: `https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`
    }),
    'Carousel': () => ({ 
      image_url: `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}`,
      video_url: null,
      // Additional carousel data would be here
    }),
  };

  const adTypes = Object.keys(creativeFuncs);
  const adType = adTypes[Math.floor(Math.random() * adTypes.length)];
  const mediaContent = creativeFuncs[adType]();
  
  // Generate engaging ad headlines based on keyword
  let headline, bodyText;
  switch (keyword) {
    case 'fitness':
      headline = [`Transform Your Body In Just 30 Days`, `The Workout Secret They Don't Want You To Know`, `5 Steps To Your Dream Physique`][Math.floor(Math.random() * 3)];
      bodyText = [`Discover how our science-backed program has helped thousands get in the best shape of their lives without extreme dieting.`, `Join our 30-day challenge and see results or your money back. Limited spots available!`, `Our certified trainers customize your fitness journey with proven methods that deliver real results.`][Math.floor(Math.random() * 3)];
      break;
    case 'ecommerce':
      headline = [`Sell Online Without The Headaches`, `Your Store, Ready In 24 Hours`, `Triple Your E-Commerce Sales`][Math.floor(Math.random() * 3)];
      bodyText = [`Our platform makes selling online easier than ever. No technical skills required.`, `Join thousands of successful sellers using our all-in-one solution with built-in marketing tools.`, `Leverage our AI-powered product recommendation engine to boost your average order value.`][Math.floor(Math.random() * 3)];
      break;
    case 'coaching':
      headline = [`Unlock Your Full Potential`, `The Coaching Program That Changed Everything`, `From Struggling To Thriving`][Math.floor(Math.random() * 3)];
      bodyText = [`Our proven methodology has helped executives at Fortune 500 companies achieve breakthrough results.`, `Transform your mindset, habits, and outcomes with our 12-week intensive coaching program.`, `Stop settling for less than you deserve. Our coaches help you create the life you've always wanted.`][Math.floor(Math.random() * 3)];
      break;
    default:
      headline = [`Limited Time Offer: ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}`, `Transform Your ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} Experience`, `The Secret To Better ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}`][Math.floor(Math.random() * 3)];
      bodyText = [`Discover why thousands of customers trust us for their ${keyword} needs.`, `Join the revolution that's changing how people approach ${keyword}.`, `Stop wasting time on solutions that don't work. Our ${keyword} experts are ready to help.`][Math.floor(Math.random() * 3)];
  }

  // Generate random advertiser name
  const companyPrefix = ['Modern', 'Elite', 'Prime', 'Superior', 'Next-Gen', 'Advanced', 'Pro', 'Smart', 'Ultra', 'Optimal'][Math.floor(Math.random() * 10)];
  const companySuffix = ['Solutions', 'Technologies', 'Innovations', 'Systems', 'Group', 'Labs', 'Co', 'Inc', 'Enterprises', 'Network'][Math.floor(Math.random() * 10)];
  const advertiserName = `${companyPrefix} ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} ${companySuffix}`;

  // Generate random engagement metrics
  const likesBase = Math.floor(Math.random() * 1000);
  const sharesBase = Math.floor(likesBase * 0.3);
  const commentsBase = Math.floor(likesBase * 0.2);
  
  // Generate estimated metrics
  const impressionsLow = Math.floor((likesBase + sharesBase + commentsBase) * 50);
  const impressionsHigh = Math.floor(impressionsLow * (1.5 + Math.random()));
  const engagementRate = ((likesBase + sharesBase + commentsBase) / impressionsLow * 100).toFixed(2);

  // Construct date within the last 30 days
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 30));
  
  // Create a unique snapshot URL
  const snapshotId = Math.floor(Math.random() * 10000000000).toString();
  const snapshotUrl = `https://www.facebook.com/ads/library/?id=${snapshotId}`;
  
  return {
    ad_id: snapshotId,
    platform: platform,
    advertiser_name: advertiserName,
    advertiser_id: `${Math.floor(Math.random() * 1000000000)}`,
    page_name: advertiserName,
    page_id: `${Math.floor(Math.random() * 1000000000)}`,
    title: headline,
    headline: headline,
    description: bodyText,
    body_text: bodyText,
    creative_type: adType,
    ...mediaContent,
    cta_type: ['Learn More', 'Shop Now', 'Sign Up', 'Contact Us'][Math.floor(Math.random() * 4)],
    start_date: startDate.toISOString(),
    engagement: {
      likes: likesBase,
      shares: sharesBase,
      comments: commentsBase
    },
    estimated_metrics: {
      impressions_low: impressionsLow,
      impressions_high: impressionsHigh,
      engagement_rate: parseFloat(engagementRate),
      ctr: (Math.random() * 5).toFixed(2),
      performance_score: Math.floor(Math.random() * 100),
      spend_low: Math.floor(Math.random() * 1000),
      spend_high: Math.floor(Math.random() * 3000) + 1000
    },
    industry_category: keyword,
    keywords: [keyword],
    language: 'en',
    snapshot_url: snapshotUrl,
    scraper_keyword: keyword,
    original_url: snapshotUrl
  };
};

// Function to simulate scraping
const scrapeAds = async (supabase, options: { jobId: string, keywords?: string[] }) => {
  const { jobId, keywords = SCRAPER_KEYWORDS } = options;
  
  console.log(`Starting ad scraping job ${jobId} with keywords: ${keywords.join(', ')}`);
  
  // Update job status to running
  await supabase
    .from('scraper_jobs')
    .update({
      status: 'running',
      keywords: keywords
    })
    .eq('id', jobId);
  
  let totalAdded = 0;
  let totalSkipped = 0;
  const errors = [];
  
  try {
    // Process each keyword
    for (const keyword of keywords) {
      console.log(`Scraping for keyword: ${keyword}`);
      
      // In a real implementation, here we would:
      // 1. Navigate to Facebook Ad Library
      // 2. Search for the keyword
      // 3. Extract ad details from the page
      
      // For demo purposes, we'll generate 2-5 mock ads per platform per keyword
      const platforms = ['Facebook', 'Instagram'];
      
      for (const platform of platforms) {
        const adCount = 2 + Math.floor(Math.random() * 4); // 2-5 ads
        
        for (let i = 0; i < adCount; i++) {
          // Generate mock ad data
          const adData = generateMockAd(platform, keyword);
          
          // Check if the ad already exists by snapshot URL
          const { data: existingAd } = await supabase
            .from('ads')
            .select('id')
            .eq('snapshot_url', adData.snapshot_url)
            .maybeSingle();
          
          if (existingAd) {
            console.log(`Ad with snapshot URL ${adData.snapshot_url} already exists, skipping`);
            totalSkipped++;
            continue;
          }
          
          // Insert ad into database
          const { error } = await supabase
            .from('ads')
            .insert([adData]);
          
          if (error) {
            console.error(`Error inserting ad: ${error.message}`);
            errors.push({ keyword, platform, error: error.message });
          } else {
            totalAdded++;
          }
        }
      }
    }
    
    // Update job status to completed
    await supabase
      .from('scraper_jobs')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        results: {
          added: totalAdded,
          skipped: totalSkipped
        },
        errors: errors.length > 0 ? errors : null
      })
      .eq('id', jobId);
    
    console.log(`Ad scraping job ${jobId} completed. Added: ${totalAdded}, Skipped: ${totalSkipped}, Errors: ${errors.length}`);
    
    return {
      success: true,
      added: totalAdded,
      skipped: totalSkipped,
      errors: errors.length
    };
  } catch (error) {
    console.error(`Ad scraping job ${jobId} failed: ${error.message}`);
    
    // Update job status to failed
    await supabase
      .from('scraper_jobs')
      .update({
        status: 'failed',
        completed_at: new Date().toISOString(),
        errors: [{ general: error.message }]
      })
      .eq('id', jobId);
    
    return {
      success: false,
      error: error.message
    };
  }
};

// Main handler for the edge function
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const supabaseClient = createClient(
      'https://mbbfcjdfdkoggherfmff.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iYmZjamRmZGtvZ2doZXJmbWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3Njg5MjksImV4cCI6MjA2MTM0NDkyOX0.pLzVKIRzhm613OjtaaxY7TIoi8R2rKnZAjQieGMLTbA'
    );
    
    if (req.method === 'POST') {
      // Extract request parameters
      const { run_id, keywords, timestamp } = await req.json();
      console.log(`Received scraper request: ${JSON.stringify({ run_id, keywords, timestamp })}`);
      
      // Create a new job record
      const { data: job, error: jobError } = await supabaseClient
        .from('scraper_jobs')
        .insert({
          id: run_id || undefined, // Use provided ID or generate a new one
          job_type: 'ad_scraper',
          status: 'pending',
          keywords: keywords || SCRAPER_KEYWORDS
        })
        .select()
        .single();
      
      if (jobError) {
        throw new Error(`Error creating job: ${jobError.message}`);
      }
      
      // Start the scraping process in the background to avoid timing out
      EdgeRuntime.waitUntil(
        scrapeAds(supabaseClient, { 
          jobId: job.id,
          keywords: job.keywords
        })
      );
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Ad scraping job started',
          job_id: job.id
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
          status: 202 // Accepted
        }
      );
    } else if (req.method === 'GET') {
      // For manual triggering/testing - execute immediately with default keywords
      const jobId = crypto.randomUUID();
      
      // Create a new job record
      const { data: job, error: jobError } = await supabaseClient
        .from('scraper_jobs')
        .insert({
          id: jobId,
          job_type: 'ad_scraper',
          status: 'pending',
          keywords: SCRAPER_KEYWORDS
        })
        .select()
        .single();
      
      if (jobError) {
        throw new Error(`Error creating job: ${jobError.message}`);
      }
      
      // Execute the scraping immediately
      const result = await scrapeAds(supabaseClient, { jobId: job.id });
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Ad scraping completed',
          result
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    return new Response(
      JSON.stringify({
        error: 'Method not allowed'
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 405
      }
    );
  } catch (err) {
    console.error(`Error in ad-scraper: ${err.message}`);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 500
      }
    );
  }
});
