import { supabase } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log('Test API: Checking Supabase connection...');
    
    const { data, error } = await supabase
      .from("hackathons")
      .select("id, name")
      .limit(1);

    if (error) {
      console.error('Test API: Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Test API: Successfully connected to Supabase');
    return NextResponse.json({ 
      success: true, 
      hackathons: data,
      count: data?.length || 0 
    });
  } catch (err) {
    console.error('Test API Error:', err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 