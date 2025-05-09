
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

console.log("Contact validation function started");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, phone } = await req.json();
    const errors = {};
    
    // Email validation using regex
    if (email) {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(email)) {
        errors['email'] = "Invalid email format";
      }
    }
    
    // Basic phone validation
    if (phone) {
      // Strip all non-numeric characters
      const cleanPhone = phone.replace(/\D/g, '');
      
      // Check if it's a reasonable length (most country codes are 1-3 digits, most local numbers 7-10 digits)
      if (cleanPhone.length < 7 || cleanPhone.length > 15) {
        errors['phone'] = "Phone number length appears invalid";
      }
    }
    
    // Check if we have any validation errors
    const isValid = Object.keys(errors).length === 0;
    
    return new Response(
      JSON.stringify({ 
        isValid,
        errors: isValid ? null : errors,
        sanitized: {
          email: email ? email.toLowerCase().trim() : null,
          phone: phone ? phone.replace(/\D/g, '') : null
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in validate-contact function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
