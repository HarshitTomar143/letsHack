import React from 'react'
import Image from 'next/image'

export default function HomePage() {
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
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen w-full">
        Hello this is the home page
      </div>
    </div>
  )
}
