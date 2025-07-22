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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All User Profiles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user, index) => (
          <Link key={user.email} href={`/users/${encodeURIComponent(user.email)}`}>
            <div key={index} className="p-4 border rounded-lg shadow-sm flex items-center gap-4">
            {user.image_url && (
              <Image
                src={user.image_url}
                alt={user.full_name}
                width={80}
                height={120}
                className="rounded-2xl object-cover"
              />
            )}
            <div>
              <p className="font-semibold">{user.full_name}</p>
              <p>Branch: {user.branch}</p>
              <p>Year: {user.year}</p>
              <p>Skills: {user.skill1}, {user.skill2}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
