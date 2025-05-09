
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

console.log("Lead scoring function started");

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

    const { leadId } = await req.json();

    // Get the lead data
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .single();

    if (leadError || !lead) {
      throw new Error(`Error retrieving lead: ${leadError?.message || 'Lead not found'}`);
    }

    // Calculate score (this should mirror the logic in the DB function)
    let score = 0;
    const answers = lead.answers || {};

    // Scoring logic (matches the SQL function)
    if (answers.budget) {
      if (answers.budget === 'high') score += 30;
      else if (answers.budget === 'medium') score += 20;
      else if (answers.budget === 'low') score += 10;
    }

    if (answers.timeframe) {
      if (answers.timeframe === 'immediate') score += 30;
      else if (answers.timeframe === 'soon') score += 20;
      else if (answers.timeframe === 'future') score += 10;
    }

    if (answers.interest_level) {
      if (answers.interest_level === 'very_interested') score += 30;
      else if (answers.interest_level === 'somewhat_interested') score += 15;
      else if (answers.interest_level === 'just_browsing') score += 5;
    }

    // Update lead score
    const { data, error } = await supabase
      .from('leads')
      .update({ score })
      .eq('id', leadId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update lead score: ${error.message}`);
    }

    console.log(`Updated lead ${leadId} with score ${score}`);

    return new Response(
      JSON.stringify({ success: true, lead: data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in score-lead function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
