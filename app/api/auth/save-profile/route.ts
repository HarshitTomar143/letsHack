// File: /app/api/save-profile/route.ts

export async function POST(req: Request) {
  const body = await req.json();
  console.log("Received profile data:", body);
  // Save to DB logic (MongoDB, Supabase DB, etc.)

  return Response.json({ success: true, data: body });
}
