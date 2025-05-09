
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// Phone validation regex (basic international format)
const PHONE_REGEX = /^\+?[0-9]{7,15}$/

interface ContactValidationRequest {
  email: string
  phone?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email, phone } = await req.json() as ContactValidationRequest

    // Validate email (required)
    if (!email) {
      return new Response(
        JSON.stringify({ 
          error: 'Email is required',
          isValid: false 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    // Check email format
    const isEmailValid = EMAIL_REGEX.test(email)
    if (!isEmailValid) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid email format',
          isValid: false 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    // Validate phone if provided
    let isPhoneValid = true
    if (phone) {
      isPhoneValid = PHONE_REGEX.test(phone)
    }

    // Sanitize inputs
    const sanitizedEmail = email.trim().toLowerCase()
    const sanitizedPhone = phone ? phone.replace(/[^\d+]/g, '') : null

    return new Response(
      JSON.stringify({
        isValid: isEmailValid && isPhoneValid,
        sanitized: {
          email: sanitizedEmail,
          phone: sanitizedPhone
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: error.message,
        isValid: false 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
