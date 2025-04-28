
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Export a dummy client if credentials are missing
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Log a helpful message for developers
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Auth functionality will be limited. Connect your project to Supabase through the Lovable interface.');
}

// Helper function to safely use supabase client
export const getSupabase = () => {
  if (!supabase) {
    console.error('Supabase client not initialized. Please connect to Supabase first.');
    return null;
  }
  return supabase;
};
