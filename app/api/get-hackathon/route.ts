import { supabase } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(){
    const {data, error}= await supabase.from('hackathons').select('*').order('date', {ascending: true});

    if(error){
        return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({hackathons: data});
}
