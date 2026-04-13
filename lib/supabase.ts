import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://vunrksemtwhwrglgcyjj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1bnJrc2VtdHdod3JnbGdjeWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMDYwNTA'
);
