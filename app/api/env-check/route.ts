import { NextResponse } from "next/server";

export async function GET() {
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not Set',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Not Set',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Set' : 'Not Set',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ? 'Set' : 'Not Set',
  };

  return NextResponse.json({ 
    environment: process.env.NODE_ENV,
    envVars 
  });
} 