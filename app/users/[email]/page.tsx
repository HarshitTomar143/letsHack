// app/users/[email]/page.tsx

import { supabase } from '@/lib/supabaseServer';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type PageProps = {
  params: {
    email: string;
  };
};

export default async function UserProfile({ params }: PageProps) {
  const decodedEmail = decodeURIComponent(params.email);

  const { data: user, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', decodedEmail)
    .single();

  if (!user || error) return notFound();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center">
        <Image
          src={user.image_url || '/default-profile.png'}
          alt={user.full_name}
          width={120}
          height={120}
          className="rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold">{user.full_name}</h1>
        <p className="text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}
