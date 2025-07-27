import { supabase } from "@/lib/supabaseServer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { receiver_email, hackathon_id } = await req.json();

  const { error } = await supabase.from("requests").insert([
    {
      sender_email: session.user.email,
      receiver_email,
      hackathon_id,
    },
  ]);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 201 });
}



export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const email = session.user.email;

  // Get sent requests
  const { data: sent, error: sentError } = await supabase
    .from("requests")
    .select("receiver_email, created_at, hackathons(name)")
    .eq("sender_email", email);

  if (sentError) {
    return new Response(JSON.stringify({ error: sentError.message }), { status: 500 });
  }

  // Get received requests
  const { data: received, error: receivedError } = await supabase
    .from("requests")
    .select("sender_email, created_at, hackathons(name)")
    .eq("receiver_email", email);

  if (receivedError) {
    return new Response(JSON.stringify({ error: receivedError.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ sent, received }), { status: 200 });
}