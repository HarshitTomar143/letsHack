"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
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
