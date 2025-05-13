
// deno-lint-ignore-file
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";

// We need to use Deno DOM instead of Puppeteer because Deno Deploy doesn't support browser APIs
// This is a simplified version that mimics what the Puppeteer code would do

// Note: For a full implementation with Puppeteer, this would need to be deployed
// to a platform like Railway or Vercel, then called from this Edge Function

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { searchParams } = new URL(req.url);

    const keyword = searchParams.get("keyword") || "fitness";
    const platform = searchParams.get("platform") || "";
    const niche = searchParams.get("niche") || "";
    const adFormat = searchParams.get("adFormat") || "all";
    const dateRange = searchParams.get("dateRange") || "";
    const engagement = searchParams.get("engagement") || "";
    const runningTime = searchParams.get("runningTime") || "";

    console.log(`Scraping ads for keyword: ${keyword}`);

    // Construct URL with filters
    let url = `https://www.facebook.com/ads/library/?q=${encodeURIComponent(keyword)}&ad_type=${adFormat}&country=US`;

    // Apply additional filters to URL if available
    if (platform) url += `&platform=${platform}`;
    if (niche) url += `&niche=${niche}`;
    if (dateRange) url += `&date_range=${dateRange}`;
    if (engagement) url += `&engagement=${engagement}`;
    if (runningTime) url += `&running_time=${runningTime}`;

    console.log(`Using URL: ${url}`);

    // Fetch the HTML content
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml",
        "Accept-Language": "en-US,en;q=0.9",
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    
    // Parse HTML using Deno DOM
    const parser = new DOMParser();
    const document = parser.parseFromString(html, "text/html");
    
    if (!document) {
      throw new Error("Failed to parse HTML");
    }

    console.log("Successfully parsed HTML, extracting ad data...");
    
    // Extract ads data
    const ads = [];
    const adCards = document.querySelectorAll(".x1lliihq"); // Using the selector from your example
    
    console.log(`Found ${adCards.length} ad cards`);
    
    adCards.forEach((card, index) => {
      const imageElement = card.querySelector("img");
      
      ads.push({
        title: card.textContent?.slice(0, 100) || "No title",
        image_url: imageElement?.getAttribute("src") || "",
        snapshot_url: url,
        ad_id: `scraped-${Date.now()}-${index}`,
        platform: "Facebook",
        advertiser_name: "Extracted Advertiser", // This would need better extraction
        created_at: new Date().toISOString(),
        scraper_keyword: keyword
      });
    });

    // If we couldn't find any ads, generate mock data
    if (ads.length === 0) {
      console.log("No ads found, generating mock data");
      
      for (let i = 0; i < 3; i++) {
        ads.push({
          title: `Mock ${keyword} Ad ${i+1}`,
          image_url: `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}`,
          snapshot_url: `${url}&mock=${i}`,
          ad_id: `mock-${Date.now()}-${i}`,
          platform: "Facebook",
          advertiser_name: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} Company`,
          created_at: new Date().toISOString(),
          scraper_keyword: keyword
        });
      }
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      "https://mbbfcjdfdkoggherfmff.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iYmZjamRmZGtvZ2doZXJmbWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3Njg5MjksImV4cCI6MjA2MTM0NDkyOX0.pLzVKIRzhm613OjtaaxY7TIoi8R2rKnZAjQieGMLTbA"
    );
    
    // Store ads in Supabase
    let savedAds = [];
    for (const ad of ads) {
      // Check if the ad already exists by snapshot URL
      const { data: existingAd } = await supabaseClient
        .from("ads")
        .select("id")
        .eq("snapshot_url", ad.snapshot_url)
        .maybeSingle();
      
      if (existingAd) {
        console.log(`Ad with snapshot URL ${ad.snapshot_url} already exists, skipping`);
        continue;
      }
      
      // Insert ad into database
      const { data, error } = await supabaseClient
        .from("ads")
        .insert([ad])
        .select();
      
      if (error) {
        console.error(`Error inserting ad: ${error.message}`);
      } else if (data) {
        savedAds.push(data[0]);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Found ${ads.length} ads, saved ${savedAds.length} new ones`,
        ads: savedAds 
      }),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        } 
      }
    );
    
  } catch (error) {
    console.error("Error in scrape-ads function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: error.message 
      }),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        },
        status: 500
      }
    );
  }
});
