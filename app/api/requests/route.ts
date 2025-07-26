import { supabase } from "@/lib/supabaseServer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function POST(req:any){
    const session= await getServerSession(authOptions)
    
    if(!session){
        return new Response('Unauthorised',{status:401});
    }

    const {reciever_id, hackathon_id}= await req.json();

    const {error}= await supabase.from('requests').insert([{sender_id: session.user.id, reciever_id, hackathon_id}]);

    if(error){
        return new Response(error.message, {status: 500});
    }

    return new Response(JSON.stringify({ok:true}), {status: 201})
}