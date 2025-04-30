
import { supabase as supabaseClient } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

// Export the supabase client from the integration
export const supabase = supabaseClient;

// Helper function to safely use supabase client
export const getSupabase = () => {
  if (!supabase) {
    console.error('Supabase client not initialized. Please connect to Supabase first.');
    return null;
  }
  
  console.log('Supabase client initialized:', !!supabase);
  return supabase;
};

// Create a mock funnels table interface to work around TypeScript issues
// This will be properly updated when Supabase types are regenerated
export interface FunnelData {
  id: string;
  name: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  is_published: boolean;
  published_url?: string;
}

export type FunnelInsert = Omit<FunnelData, 'id' | 'created_at' | 'updated_at'>;
export type FunnelUpdate = Partial<Omit<FunnelData, 'id' | 'created_at'>>;

