import { supabase } from '@/lib/supabaseServer';

export async function GET() {
  const { data, error } = await supabase.from('profiles').select('image_url, email, full_name');

  if (error) return new Response(error.message, { status: 500 });

  return new Response(JSON.stringify({ users: data }), { status: 200 });
}
