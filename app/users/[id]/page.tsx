// app/user/[email]/page.tsx

import { supabase } from '@/lib/supabaseServer';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type Props = {
  params: { email: string };
};

export default async function UserProfile({ params }: Props) {
  const decodedEmail = decodeURIComponent(params.email); // to handle @ and . safely

  const { data: user, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', decodedEmail)
    .single();

  if (!user || error) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{user.full_name}</h1>

      {user.image_url && (
        <Image
          src={user.image_url}
          alt={user.full_name}
          width={200}
          height={200}
          className="rounded-full object-cover mb-4"
        />
      )}

      <div className="space-y-2 text-lg">
        <p><strong>Roll Number:</strong> {user.roll_number}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Branch:</strong> {user.branch}</p>
        <p><strong>Year:</strong> {user.year}</p>
        <p><strong>Section:</strong> {user.section}</p>
        <p><strong>Skill 1:</strong> {user.skill1}</p>
        <p><strong>Skill 2:</strong> {user.skill2}</p>
      </div>
    </div>
  );
}
