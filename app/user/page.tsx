// app/view-profile/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function ViewProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-10">
      <h1 className="text-4xl font-bold mb-8">User Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/10 p-8 rounded-xl backdrop-blur-lg shadow-lg border border-white/20">
        <div>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Full Name:</strong> {profile.full_name}</p>
          <p><strong>Roll Number:</strong> {profile.roll_number}</p>
          <p><strong>Branch:</strong> {profile.branch}</p>
          <p><strong>Section:</strong> {profile.section}</p>
          <p><strong>Year:</strong> {profile.year}</p>
          <p><strong>Skill 1:</strong> {profile.skill1}</p>
          <p><strong>Skill 2:</strong> {profile.skill2}</p>
        </div>
        <div className="w-full h-64 relative rounded overflow-hidden border border-white/20">
          {profile.imageUrl && (
            <Image
              src={profile.imageUrl}
              alt="Profile"
              fill
              className="object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}
