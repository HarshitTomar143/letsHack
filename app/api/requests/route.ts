import { supabase } from "@/lib/supabaseServer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
