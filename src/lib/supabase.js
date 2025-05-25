import { createClient } from '@supabase/supabase-js'


const supabaseUrl = process.env.VITE__SUPABASE_URL;
const supabaseKey = process.env.VITE__SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey)
