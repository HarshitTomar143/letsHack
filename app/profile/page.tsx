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
          <form className="w-full max-w-3xl grid grid-cols-2 gap-x-12 gap-y-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-8 py-10 shadow-lg">
            <Input type='email' placeholder='Official Email' className='w-full' />
            <Input type='fullName' placeholder='Full Name' className='w-full' />
            <Input type='rollNumber' placeholder='University Roll Number' className='w-full' />
            <ComboboxDemo />
            <Section />
            <Year />
            <SkillOne />
            <SkillTwo />
            <Input type='file' className='w-full' />
            <Button variant="outline" className='w-full max-w-xs cursor-pointer' type='submit'>Submit</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
