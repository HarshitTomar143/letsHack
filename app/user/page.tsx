// app/view-profile/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabaseServer";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

type Props= {
  params: {email:string};
}

export default function ViewProfilePage({params}:Props) {
  const email= decodeURIComponent(params.email);
  const [user,setUser]= useState<any>(null)  
  const { data: session } = useSession();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const isOwnProfile= session?.user?.email === email;

  useEffect(() => {
    const fetchProfile = async () => {

      

      

      if (!session?.user?.email) return;

      try {
        const res = await fetch(`/api/get-profile?email=${session.user.email}`);
        const data = await res.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session?.user?.email]);

  if (loading) return <div className="text-white p-10">Loading...</div>;

  if (!profile)
    return <div className="text-white p-10">No profile data found.</div>;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background image with overlay */}
      <Image src="/profileImg.png" alt="Background" fill priority className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="relative z-20 w-full max-w-2xl bg-white/10 backdrop-blur-3xl border border-white/40 rounded-3xl shadow-2xl p-10 flex flex-col items-center" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', border: '1.5px solid rgba(255,255,255,0.18)'}}>
        {/* Go Back button */}
        <div className="w-full flex justify-end mb-2">
          <a href="/profile" className="text-lg font-semibold text-red-500 hover:underline">Go Back</a>
        </div>
        {/* Profile Image */}
        <div className="relative mb-6">
          <Image
            src={profile.image_url || '/profileImg.png'}
            alt={profile.full_name || 'Profile'}
            width={180}
            height={180}
            className="rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
        {/* Name */}
        <h1 className="text-3xl font-bold text-white mb-1 tracking-tight drop-shadow-lg">{profile.full_name}</h1>
        {/* Username/Roll Number */}
        <p className="text-lg text-white/80 mb-6">{profile.roll_number && `@${profile.roll_number}`}</p>
        {/* Info Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="text-white/70 text-sm font-medium mb-1">Email</div>
            <div className="text-lg text-white font-semibold break-all">{profile.email}</div>
          </div>
          <div>
            <div className="text-white/70 text-sm font-medium mb-1">Phone</div>
            <div className="text-lg text-white font-semibold">{profile.contact || '-'}</div>
          </div>
          <div>
            <div className="text-white/70 text-sm font-medium mb-1">Branch</div>
            <div className="text-lg text-white font-semibold">{profile.branch}</div>
          </div>
          <div>
            <div className="text-white/70 text-sm font-medium mb-1">Section</div>
            <div className="text-lg text-white font-semibold">{profile.section}</div>
          </div>
          <div>
            <div className="text-white/70 text-sm font-medium mb-1">Year</div>
            <div className="text-lg text-white font-semibold">{profile.year}</div>
          </div>
          <div>
            <div className="text-white/70 text-sm font-medium mb-1">Skill 1</div>
            <div className="text-lg text-white font-semibold">{profile.skill1}</div>
          </div>
          <div>
            <div className="text-white/70 text-sm font-medium mb-1">Skill 2</div>
            <div className="text-lg text-white font-semibold">{profile.skill2}</div>
          </div>
        </div>
        {/* Social Links */}
        <div className="w-full flex flex-col md:flex-row md:justify-between gap-4 mb-6">
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-300 hover:underline font-medium">
              <Image src="/linkedin.svg" alt="LinkedIn" width={22} height={22} className="inline" />
              LinkedIn
            </a>
          )}
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:underline font-medium">
              <Image src="/github.svg" alt="GitHub" width={22} height={22} className="inline" />
              GitHub
            </a>
          )}
          {profile.bestWork && (
            <a href={profile.bestWork} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-300 hover:underline font-medium">
              <Image src="/file.svg" alt="Best Work" width={22} height={22} className="inline" />
              Best Work
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
