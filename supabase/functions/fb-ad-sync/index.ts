
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

console.log("Facebook Ad Sync function started");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get request body
    const { accessToken, adAccountId, userId } = await req.json();

    if (!accessToken || !adAccountId || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Store Facebook integration details
    const { data: integration, error: integrationError } = await supabase
      .from('facebook_integrations')
      .upsert({
        user_id: userId,
        access_token: accessToken,
        account_id: adAccountId,
        status: 'active',
        metadata: { last_sync_attempt: new Date().toISOString() }
      }, { onConflict: 'user_id,account_id' })
      .select()
      .single();

    if (integrationError) {
      console.error('Error storing integration:', integrationError);
      return new Response(
        JSON.stringify({ error: 'Failed to store integration details' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Fetch ads from Facebook Marketing API
    // In a real implementation, we would use the Graph API to fetch actual ads
    // For this demo, we'll simulate fetching ads with sample data
    const sampleAds = [
      {
        ad_id: `fb_ad_${Date.now()}_1`,
        platform: 'Facebook',
        advertiser_name: 'Sample Brand 1',
        page_name: 'Sample Brand Page',
        title: 'Limited Time Offer',
        description: 'Check out our amazing products with 30% off for a limited time!',
        image_url: 'https://placehold.co/600x400/1E88E5/FFFFFF?text=Limited+Time+Offer',
        creative_type: 'Single Image',
        headline: 'Limited Time Offer - 30% OFF',
        body_text: 'Check out our amazing products with 30% off for a limited time!',
        cta_type: 'Shop Now',
        start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        estimated_duration_days: 14,
        engagement: { likes: 120, comments: 35, shares: 15 },
        industry_category: 'Retail',
        user_id: userId
      },
      {
        ad_id: `fb_ad_${Date.now()}_2`,
        platform: 'Instagram',
        advertiser_name: 'Sample Brand 2',
        page_name: 'Sample Brand Page',
        title: 'New Collection Available',
        description: 'Our new summer collection is now available. Shop the latest trends!',
        image_url: 'https://placehold.co/600x400/9C27B0/FFFFFF?text=New+Collection',
        creative_type: 'Carousel',
        headline: 'Summer Collection 2025',
        body_text: 'Our new summer collection is now available. Shop the latest trends!',
        cta_type: 'Learn More',
        start_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        estimated_duration_days: 21,
        engagement: { likes: 240, comments: 42, shares: 28 },
        industry_category: 'Fashion',
        user_id: userId
      }
    ];

    // Insert sample ads into the database
    const { data: ads, error: adsError } = await supabase
      .from('ads')
      .upsert(
        sampleAds.map(ad => ({
          ...ad,
          metadata: { source: 'facebook_api', integration_id: integration.id }
        })),
        { onConflict: 'ad_id' }
      )
      .select();

    if (adsError) {
      console.error('Error storing ads:', adsError);
      return new Response(
        JSON.stringify({ error: 'Failed to store ads data' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Update integration with sync success
    await supabase
      .from('facebook_integrations')
      .update({ 
        metadata: { 
          ...integration.metadata,
          last_successful_sync: new Date().toISOString(),
          ads_synced: sampleAds.length
        }
      })
      .eq('id', integration.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Ads synced successfully', 
        ads_count: ads?.length || 0
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in fb-ad-sync function:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
