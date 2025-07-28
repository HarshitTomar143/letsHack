import { supabase } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // get last segment of URL

    console.log('API: Fetching hackathon with ID:', id);

    if (!id) {
      return NextResponse.json({ error: "Missing hackathon ID" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("hackathons")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Hackathon not found" }, { status: 404 });
    }

    console.log('API: Successfully fetched hackathon:', data.id);
    return NextResponse.json({ hackathon: data });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
