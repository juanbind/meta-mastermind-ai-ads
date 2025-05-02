
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

console.log("Facebook Lead Sync function started");

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

    // Parse the webhook payload
    const payload = await req.json();
    console.log("Received lead webhook payload:", JSON.stringify(payload));

    // In a real Facebook lead sync, we'd validate the payload
    // and extract lead data from the Facebook webhook
    // For this example, we'll create a sample contact

    // Find the integration by form ID or page ID from the webhook
    const { data: integration } = await supabase
      .from('integrations')
      .select('*')
      .eq('provider', 'facebook')
      .single();

    // If no integration found, we'll assign to a default admin user
    const userId = integration?.user_id || null;

    // Create sample contact from the lead
    const leadData = payload.entry?.[0]?.changes?.[0]?.value?.leadgen_id 
      ? payload.entry[0].changes[0].value
      : { form_id: "sample_form", page_id: "sample_page" };
    
    const now = new Date().toISOString();
    
    const contactData = {
      first_name: "Facebook",
      last_name: "Lead",
      email: `lead-${Date.now()}@example.com`,
      phone: "+1234567890",
      status: "new",
      stage: "lead",
      source: "facebook",
      source_id: leadData.leadgen_id || `fb_lead_${Date.now()}`,
      value: 0,
      last_activity: now,
      tags: ["facebook", "lead"],
      created_at: now,
      updated_at: now,
      assigned_to: userId
    };

    // Insert the contact
    const { data: contact, error: contactError } = await supabase
      .from('contacts')
      .insert(contactData)
      .select()
      .single();

    if (contactError) {
      console.error("Error creating contact:", contactError);
      return new Response(
        JSON.stringify({ error: "Failed to create contact" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Log the activity
    await supabase.from('activities').insert({
      type: "lead_capture",
      title: "New Facebook lead received",
      description: "Lead was automatically captured from Facebook Lead Gen form",
      contact_id: contact.id,
      created_at: now
    });

    return new Response(
      JSON.stringify({ success: true, message: "Lead processed successfully" }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in fb-lead-sync function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
