// utils/supabase.ts
import { createClient } from '@supabase/supabase-js'; // ✅ Correct


export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
