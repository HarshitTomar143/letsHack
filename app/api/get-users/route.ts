import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseServer";

export async function GET(){
   const { data, error } = await supabase
  .from('profiles')
  .select('full_name, branch, year,  skill1, skill2, image_url, email');
        

    if(error){
        return NextResponse.json({error: error.message},{status:500});
    }

    return NextResponse.json({users: data});
}