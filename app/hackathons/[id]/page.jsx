'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';



export default function HackathonDetailPage() {
  const params = useParams();
  const { data: session } = useSession();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [sendingId, setSendingId] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Debug logging - JSX file
  console.log('HackathonDetailPage rendered with params:', params);

  // Fetch hackathon details
  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        console.log('Fetching hackathon with ID:', params.id);
        const res = await fetch(`/api/get-hackathon/${params.id}`);
        console.log('Response status:', res.status);
        const data = await res.json();
        console.log('Response data:', data);
        if (res.ok) {
          setHackathon(data.hackathon);
        } else {
          console.error('API Error:', data.error);
          setError(data.error || 'Failed to fetch hackathon details');
        }
      } catch (err) {
        console.error('Fetch Error:', err);
        setError('Failed to fetch hackathon details');
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchHackathon();
  }, [params.id]);

  // Fetch users list
  const fetchUsers = async () => {
    setShowUsers(true);
    const res = await fetch('/api/get-all-users');
    const data = await res.json();
    if (res.ok) setUsers(data.users || []);
    else setError('Failed to fetch users');
  };

  const sendRequest = async (receiverEmail) => {
  const res = await fetch("/api/requests", {
    method: "POST",
    body: JSON.stringify({
      receiver_email: receiverEmail,
      hackathon_id: hackathon?.id, // Use from fetched hackathon
    }),
  });

  if (res.ok) {
    alert("Request sent ✅");
  } else {
    alert("Failed to send request ❌");
  }
};


  if (loading) return <div className="text-white text-center py-12">Loading...</div>;
  if (error || !hackathon) {
    console.error('Render Error:', { error, hackathon, params });
    return (
      <div className="text-white text-center py-12">
        <div>Error: {error}</div>
        <div className="mt-4 text-sm text-gray-300">
          Hackathon ID: {params.id}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Image
        src="/hackBack.png"
        alt="Background"
        fill
        priority
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/hackathons"
            className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white px-6 py-2 rounded-xl font-semibold transition"
          >
            ← Back to Hackathons
          </Link>
          <Link
            href="/home"
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 py-2 rounded-xl font-semibold transition"
          >
            Home
          </Link>
        </div>

        {/* Hackathon Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden">
          {hackathon.image_url && (
            <div className="relative h-64 md:h-80">
              <Image
                src={hackathon.image_url}
                alt={hackathon.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">{hackathon.name}</h1>
            <p className="mb-4 text-lg">{hackathon.description}</p>
            <div className="flex gap-4">
              {hackathon.link && (
                <a
                  href={hackathon.link}
                  className="bg-green-500 text-white px-6 py-2 rounded-xl font-semibold transition hover:bg-green-600"
                  target="_blank"
                >
                  Official Site
                </a>
              )}
              <button
                onClick={fetchUsers}
                className="bg-purple-500 text-white px-6 py-2 rounded-xl font-semibold transition hover:bg-purple-600"
              >
                Request Users
              </button>
            </div>
          </div>
        </div>

        {/* User List for Requesting */}
        {showUsers && (
          <div className="mt-8 bg-white/10 backdrop-blur-xl p-6 rounded-xl border border-white/20 text-white">
            <h2 className="text-xl font-semibold mb-4">Send Request To:</h2>
            {users.length === 0 ? (
              <p>No users found.</p>
            ) : (
              <ul className="space-y-2">
                {users.map(user => (
                  <li key={user.email} className="flex items-center justify-between">
                    <span>{user.name || user.email}</span>
                    <button
                      onClick={() => sendRequest(user.email)}
                      disabled={sendingId === user.email}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md text-sm"
                    >
                      {sendingId === user.email ? 'Sending...' : 'Send Request'}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {successMsg && <p className="mt-4 text-green-300">{successMsg}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
