import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://favnryitvxihdseslshf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhdm5yeWl0dnhpaGRzZXNsc2hmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMDAwMDAsImV4cCI6MjA1NTU3NjAwMH0.placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const SUPABASE_PROJECT_REF = 'favnryitvxihdseslshf';
