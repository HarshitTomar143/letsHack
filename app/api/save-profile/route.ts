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
    linkedin,
    github,
    contact,
    bestWork,
    skill1,
    skill2,
    image_url, // ✅ ADD this
  } = body;

  if (!email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }

  try {
    // Check if email already exists
    const { data: emailData } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', email)
      .single();

    if (emailData) {
      return NextResponse.json({ error: 'A user with this email already exists.' }, { status: 409 });
    }

    // Check if roll number already exists
    const { data: rollData } = await supabase
      .from('profiles')
      .select('roll_number')
      .eq('roll_number', rollNumber)
      .single();

    if (rollData) {
      return NextResponse.json({ error: 'A user with this roll number already exists.' }, { status: 409 });
    }

    // ✅ Insert including image
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
          linkedin,
          github,
          contact,
          bestWork,
          skill2,
          image_url, // ✅ Store image URL
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
