import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!https://vunrksemtwhwrglgcyjj.supabase.co!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1bnJrc2VtdHdod3JnbGdjeWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMDYwNTA
);
