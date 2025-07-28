'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Hackathon {
  id: number;
  name: string;
  location: string;
  date: string;
  type: string;
  prize: string;
  image_url: string;
  link: string;
}

export default function HackathonsPage() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await fetch('/api/get-hackathon');
        const data = await res.json();
        if (res.ok) {
          setHackathons(data.hackathons);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  if (loading) return <p className="text-center mt-10 text-white">Loading hackathons...</p>;

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

      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Upcoming <span className="bg-gradient-to-r from-[#A259FF] to-[#4BC6EF] bg-clip-text text-transparent">Hackathons</span>
          </h1>
          <div className="flex gap-4">
            <Link
              href="/home"
              className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white px-6 py-2 rounded-xl font-semibold transition"
            >
              Home
            </Link>
            <Link
              href="/add-hackathons"
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 py-2 rounded-xl font-semibold transition"
            >
              + Add Hackathon
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hackathons.map((hack) => (
            <div
              key={hack.id}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all hover:scale-105 cursor-pointer group"
            >
              <Link href={`/hackathons/${hack.id}`} className="block" onClick={() => console.log('Navigating to hackathon:', hack.id)}>
                {hack.image_url && (
                  <Image
                    src={hack.image_url}
                    alt={hack.name}
                    width={500}
                    height={300}
                    className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="p-6 text-white space-y-2">
                  <h2 className="text-2xl font-bold group-hover:text-purple-300 transition-colors">{hack.name}</h2>
                  <p><span className="font-semibold">Location:</span> {hack.location}</p>
                  <p><span className="font-semibold">Date:</span> {hack.date}</p>
                  <p><span className="font-semibold">Type:</span> {hack.type}</p>
                  <p><span className="font-semibold">Prize:</span> {hack.prize || 'N/A'}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-purple-300 font-medium group-hover:text-purple-200 transition-colors">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
              {hack.link && (
                <div className="px-6 pb-6">
                  <a
                    href={hack.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline font-medium inline-flex items-center gap-1"
                  >
                    Visit Site →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
