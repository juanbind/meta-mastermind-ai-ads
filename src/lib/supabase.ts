
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Export the supabase client from the integration
export const supabase = supabaseClient;

// Helper function to safely use supabase client
export const getSupabase = () => {
  if (!supabase) {
    console.error('Supabase client not initialized. Please connect to Supabase first.');
    return null;
  }
  return supabase;
};
