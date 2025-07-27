import { supabase } from "@/lib/supabaseServer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(){
    const session= await getServerSession(authOptions);

    if(!session){
        return new Response('Unauthorised', {status: 401});
    }

    const {data, error}= await supabase.from('requests').select('sender_id,hackaton_id,created_at').eq('reciever_id',session.user.id);

    if(error){
        return new Response(error.message, {status: 500})
    }

    return new Response(JSON.stringify({request: data}),{status: 200});
}