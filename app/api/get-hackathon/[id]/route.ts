import { supabase } from "@/lib/supabaseServer";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // get last segment of URL

  if (!id) {
    return new Response("Missing hackathon ID", { status: 400 });
  }

  const { data, error } = await supabase
    .from("hackathons")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
