"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/homeBackground.jpg"
        alt="Home Background"
        fill
        priority
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-start min-h-screen w-full pt-16">
        <h1 className="text-[3.5rem] md:text-[5rem] font-extrabold text-white drop-shadow-lg mb-12 text-center leading-[1.1]">
          WELCOME TO LET&apos;S <span className="text-[#A259FF]">HACK</span>
        </h1>
        {/* Boxes Grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-x-16 gap-y-12 mt-4 mx-auto">
          {/* Box 1 */}
          <Link href="/profile" className="group">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl w-[320px] h-[220px] flex flex-col items-center justify-center shadow-lg p-6 transition-all duration-300 cursor-pointer group-hover:scale-105 group-hover:bg-white/20 group-hover:backdrop-blur-3xl group-hover:border-white/40">
              <h3 className="text-white text-2xl font-bold mb-3">Profile</h3>
              <Image src="/body.png" alt="Teamwork" width={80} height={80} className="rounded-xl mb-3 object-contain" />
              <span className="text-white text-center text-base">Add or Enhance your profile.</span>
            </div>
          </Link>
          {/* Box 2 */}
          <Link href="/hackathons" className="group">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl w-[320px] h-[220px] flex flex-col items-center justify-center shadow-lg p-6 transition-all duration-300 cursor-pointer group-hover:scale-105 group-hover:bg-white/20 group-hover:backdrop-blur-3xl group-hover:border-white/40">
              <h3 className="text-white text-2xl font-bold mb-3">Hackathons</h3>
              <Image src="/homePage1.png" alt="Hackathons" width={80} height={80} className="rounded-xl mb-3 object-contain" />
              <span className="text-white text-center text-base">Join and compete in global hackathons.</span>
            </div>
          </Link>
          {/* Box 3 */}
          <Link href="/requests" className="group">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl w-[320px] h-[220px] flex flex-col items-center justify-center shadow-lg p-6 transition-all duration-300 cursor-pointer group-hover:scale-105 group-hover:bg-white/20 group-hover:backdrop-blur-3xl group-hover:border-white/40">
              <h3 className="text-white text-2xl font-bold mb-3">Requests</h3>
              <Image src="/file.svg" alt="Resources" width={80} height={80} className="rounded-xl mb-3 object-contain" />
              <span className="text-white text-center text-base">Access guides, templates, and learning materials.</span>
            </div>
          </Link>
          {/* Box 4 */}
          <Link href="/community" className="group">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl w-[320px] h-[220px] flex flex-col items-center justify-center shadow-lg p-6 transition-all duration-300 cursor-pointer group-hover:scale-105 group-hover:bg-white/20 group-hover:backdrop-blur-3xl group-hover:border-white/40">
              <h3 className="text-white text-2xl font-bold mb-3">Community</h3>
              <Image src="/globe.svg" alt="Community" width={80} height={80} className="rounded-xl mb-3 object-contain" />
              <span className="text-white text-center text-base">Connect with hackers from around the world.</span>
            </div>
          </Link>
        </div>
      </div>


      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/30 shadow-2xl p-14 flex flex-col items-center max-w-xl w-full rounded-3xl">
            <h2 className="text-3xl font-medium mb-8 text-center text-white/90 drop-shadow">Complete the user profile</h2>
            <Image src="/homePage1.png" alt="Profile" width={220} height={120} className="mb-8 rounded-xl object-contain shadow-lg" />
            <div className="flex gap-6 mt-4 w-full">
              <button
                className="flex-1 py-3 rounded-lg bg-gradient-to-r cursor-pointer from-[#A259FF] to-[#4BC6EF] text-white font-semibold text-lg transition-all hover:opacity-90 shadow"
                onClick={() => router.push('/profile')}
              >
                Okay
              </button>
              <button
                className="flex-1 py-3 rounded-lg bg-white/30 cursor-pointer text-white font-semibold text-lg transition-all hover:bg-white/50 border border-white/40 shadow"
                onClick={() => setShowModal(false)}
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
