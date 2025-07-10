"use client"
import React from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { ComboboxDemo } from '@/components/branch'
import { Section } from '@/components/section'
import { Year } from '@/components/year'
import { SkillOne } from '@/components/skill1'
import { SkillTwo } from '@/components/skill2'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react';

export default function ProfilePage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/profileImg.png"
        alt="Profile Background"
        fill
        priority
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      {/* Main Content */}
      <div className="relative z-20 flex flex-col w-full max-w-5xl mx-auto pt-16">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-12 px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg text-left">
            Complete Your User Profile
          </h1>
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: '/signin' })}
            className="cursor-pointer px-6 py-2 rounded-lg bg-gradient-to-r from-[#A259FF] to-[#4BC6EF] text-white font-semibold text-lg transition-all hover:opacity-90 shadow"
          >
            Logout
          </button>
        </div>
        {/* Form Container */}
        <div className="w-full flex flex-col items-center">
          <form className="w-full max-w-3xl grid grid-cols-2 gap-x-12 gap-y-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-8 py-10 shadow-lg overflow-auto">
            <div>
              <label htmlFor="email" className="block text-white font-semibold mb-1">Email</label>
              <Input id="email" type='email' placeholder='Official Email' className='w-full' />
            </div>
            <div>
              <label htmlFor="fullName" className="block text-white font-semibold mb-1">Full Name</label>
              <Input id="fullName" type='text' placeholder='Full Name' className='w-full' />
            </div>
            <div>
              <label htmlFor="rollNumber" className="block text-white font-semibold mb-1">Roll Number</label>
              <Input id="rollNumber" type='text' placeholder='University Roll Number' className='w-full' />
            </div>
            <div>
              <label className="block text-white font-semibold mb-1">Branch</label>
              <ComboboxDemo />
            </div>
            <div>
              <label className="block text-white font-semibold mb-1">Section</label>
              <Section />
            </div>
            <div>
              <label className="block text-white font-semibold mb-1">Year</label>
              <Year />
            </div>
            <div>
              <label className="block text-white font-semibold mb-1">Skill 1</label>
              <SkillOne />
            </div>
            <div>
              <label className="block text-white font-semibold mb-1">Skill 2</label>
              <SkillTwo />
            </div>
            {/* Place file upload on the left and submit button on the right in the last row */}
            <div>
              <label htmlFor="file" className="block text-white font-semibold mb-1">Upload Profile Photo</label>
              <Input id="file" type='file' className='w-full' />
            </div>
            <div className="flex items-center mt-7 justify-center w-full">
              <Button variant="outline" className='w-full max-w-xs cursor-pointer bg-violet-500 hover:bg-purple-600 text-white hover:text-white' type='submit'>Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
