import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create a real client if valid credentials are provided
let supabase: SupabaseClient;

if (supabaseUrl && supabaseUrl !== 'your-supabase-url-here' && supabaseUrl.startsWith('http')) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Create a dummy client that won't crash — pages will fall back to seed data
  supabase = createClient('https://placeholder.supabase.co', 'placeholder');
}

export { supabase };
