'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface User {
  full_name: string;
  branch: string;
  year: string;
  section: string;
  skill1: string;
  skill2: string;
  image_url?: string;
  email: string;
}

export default function AllUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/get-users');
      const result = await res.json();
      if (res.ok) {
        setUsers(result.users);
      } else {
        console.error(result.error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background image with overlay */}
      <Image src="/profileImg.png" alt="Background" fill priority className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="relative z-20 w-full max-w-5xl mx-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-0 mb-10">
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-extrabold text-white drop-shadow-lg text-center md:text-left leading-[1.1] m-0">
            COMMUNITY
          </h1>
          <a href="/home" className="px-8 py-2 rounded-lg bg-gradient-to-r from-[#A259FF] to-[#4BC6EF] text-white font-semibold text-lg transition-all hover:opacity-90 shadow text-center md:ml-8">
            Go Back
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {users.map((user, index) => (
            <Link key={user.email} href={`/users/${encodeURIComponent(user.email)}`}>
              <div className="group p-6 bg-white/10 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-xl flex items-center gap-6 transition-transform hover:scale-105 hover:bg-white/20 cursor-pointer" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)', border: '1.5px solid rgba(255,255,255,0.18)'}}>
                {user.image_url && (
                  <Image
                    src={user.image_url}
                    alt={user.full_name}
                    width={80}
                    height={80}
                    className="rounded-2xl object-cover border-2 border-white shadow"
                  />
                )}
                <div>
                  <p className="font-semibold text-white text-lg mb-1">{user.full_name}</p>
                  <p className="text-white/80 text-sm mb-1">Branch: {user.branch}</p>
                  <p className="text-white/80 text-sm mb-1">Year: {user.year}</p>
                  <p className="text-white/80 text-sm">Skills: {user.skill1}, {user.skill2}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
