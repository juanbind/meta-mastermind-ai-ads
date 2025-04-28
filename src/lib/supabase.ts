
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing. Make sure to connect your project to Supabase through the Lovable interface.');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);
