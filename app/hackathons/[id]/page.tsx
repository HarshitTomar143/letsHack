'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Hackathon {
  id: number;
  name: string;
  location: string;
  date: string;
  type: string;
  prize: string;
  image_url: string;
  link: string;
  description?: string;
  organizer?: string;
  registration_deadline?: string;
  max_participants?: number;
  technologies?: string[];
}

export default function HackathonDetailPage() {
  const params = useParams();
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const res = await fetch(`/api/get-hackathon/${params.id}`);
        const data = await res.json();
        
        if (res.ok) {
          setHackathon(data.hackathon);
        } else {
          setError(data.error || 'Failed to fetch hackathon details');
        }
      } catch (err) {
        setError('Failed to fetch hackathon details');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchHackathon();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/hackBack.png"
          alt="Background"
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20">
          <p className="text-white text-xl">Loading hackathon details...</p>
        </div>
      </div>
    );
  }

  if (error || !hackathon) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/hackBack.png"
          alt="Background"
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Hackathon Not Found</h1>
          <p className="text-white mb-6">{error || 'The hackathon you are looking for does not exist.'}</p>
          <Link
            href="/hackathons"
            className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Back to Hackathons
          </Link>
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

        {/* Hackathon Details */}
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
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-purple-300">Event Details</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-semibold w-32">Location:</span>
                  <span>{hackathon.location}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-32">Date:</span>
                  <span>{hackathon.date}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-32">Type:</span>
                  <span className="bg-purple-500/20 px-3 py-1 rounded-full text-sm">
                    {hackathon.type}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-32">Prize Pool:</span>
                  <span className="text-green-400 font-semibold">{hackathon.prize || 'TBD'}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            {hackathon.description && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-purple-300 mb-4">Description</h2>
                <p className="text-gray-200 leading-relaxed">{hackathon.description}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              {hackathon.link && (
                <a
                  href={hackathon.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition flex items-center gap-2"
                >
                  Visit Official Site
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              <button className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold transition">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 