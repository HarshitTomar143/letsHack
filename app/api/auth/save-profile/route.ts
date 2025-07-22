import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseServer';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    email,
    fullName,
    rollNumber,
    branch,
    section,
    year,
    skill1,
    skill2,
  } = body;

  if (!email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }

  try {
    const { error } = await supabase
      .from('profiles')
      .upsert(
        {
          email,
          full_name: fullName,
          roll_number: rollNumber,
          branch,
          section,
          year,
          skill1,
          skill2,
        },
        { onConflict: 'email' }
      );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Profile saved successfully!' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
