
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Create a Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Handles Facebook lead sync
const handleFacebookSync = async (payload: any) => {
  try {
    console.log("Processing Facebook lead:", payload);
    
    // Extract lead information
    const { form_id, field_data } = payload;
    if (!form_id || !field_data) {
      throw new Error("Missing required lead data");
    }
    
    // Extract field data and map to contact fields
    const fieldMap = new Map();
    field_data.forEach((field: any) => {
      fieldMap.set(field.name, field.values[0]);
    });
    
    // Basic fields to collect
    const firstName = fieldMap.get("first_name") || fieldMap.get("firstname") || "";
    const lastName = fieldMap.get("last_name") || fieldMap.get("lastname") || "";
    const email = fieldMap.get("email") || "";
    const phone = fieldMap.get("phone") || fieldMap.get("phone_number") || "";
    
    if (!firstName && !lastName && !email && !phone) {
      throw new Error("Lead missing required contact information");
    }
    
    // Create contact in CRM
    const { data, error } = await supabase
      .from("contacts")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        source: "facebook",
        source_id: form_id,
        status: "new",
        stage: "lead",
        tags: ["facebook-lead"],
        custom_fields: payload,
      })
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    console.log("Contact created successfully:", data.id);
    return { success: true, contact_id: data.id };
    
  } catch (error) {
    console.error("Error processing Facebook lead:", error);
    throw error;
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Process only POST requests
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { 
          status: 405, 
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          } 
        }
      );
    }
    
    const payload = await req.json();
    const result = await handleFacebookSync(payload);
    
    return new Response(
      JSON.stringify(result),
      { 
        status: 200, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  } catch (error) {
    console.error("Error in fb-lead-sync function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        } 
      }
    );
  }
});
