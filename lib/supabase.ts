import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vunrksemtwhwrglgcyjj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1bnJrc2VtdHdod3JnbGdjeWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMDYwNTAsImV4cCI6MjA5MTU4MjA1MH0.-GItrBc-FqkByv3OOf-BcDlnc1L0wYUdHJjDOlkTvAw';

export const supabase = createClient(supabaseUrl, supabaseKey);
