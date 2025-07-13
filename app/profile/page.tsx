"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { ComboboxDemo } from '@/components/branch';
import { Section } from '@/components/section';
import { Year } from '@/components/year';
import { SkillOne } from '@/components/skill1';
import { SkillTwo } from '@/components/skill2';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { supabase } from '@/lib/supabase';

export default function ProfilePage() {
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    rollNumber: "",
    branch: "",
    section: "",
    year: "",
    skill1: "",
    skill2: "",
    file: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, file: e.target.files[0] });
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("profile-images")
      .upload(fileName, file);

    if (error) {
      console.error("Image upload error!:", error.message);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("profile-images")
      .getPublicUrl(fileName);

    return urlData?.publicUrl ?? null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = "";
    if (form.file) {
      const url = await uploadImage(form.file);
      if (url) imageUrl = url;
    }

    const payload = {
      ...form,
      file: undefined, // remove file object
      imageUrl,
    };

    const res = await fetch("/api/save-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    console.log("Profile saved:", result);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <Image src="/profileImg.png" alt="Profile Background" fill priority className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-5xl mx-auto">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between mb-12 px-8 w-full">
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg text-center md:text-left">Complete Your User Profile</h1>
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: "/signin" })}
            className="cursor-pointer px-6 py-2 rounded-lg bg-gradient-to-r from-[#A259FF] to-[#4BC6EF] text-white font-semibold text-lg transition-all hover:opacity-90 shadow"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-3xl grid grid-cols-2 gap-x-12 gap-y-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-8 py-10 shadow-lg overflow-auto">
          <div>
            <label htmlFor="email" className="text-white font-semibold mb-1 block">Email</label>
            <Input id="email" type="email" placeholder="Official Email" value={form.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="fullName" className="text-white font-semibold mb-1 block">Full Name</label>
            <Input id="fullName" type="text" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="rollNumber" className="text-white font-semibold mb-1 block">Roll Number</label>
            <Input id="rollNumber" type="text" placeholder="University Roll Number" value={form.rollNumber} onChange={handleChange} />
          </div>
          <div>
            <label className="text-white font-semibold mb-1 block">Branch</label>
            <ComboboxDemo />
          </div>
          <div>
            <label className="text-white font-semibold mb-1 block">Section</label>
            <Section />
          </div>
          <div>
            <label className="text-white font-semibold mb-1 block">Year</label>
            <Year />
          </div>
          <div>
            <label className="text-white font-semibold mb-1 block">Skill 1</label>
            <SkillOne />
          </div>
          <div>
            <label className="text-white font-semibold mb-1 block">Skill 2</label>
            <SkillTwo />
          </div>
          <div className="flex items-end gap-4 col-span-2">
            <div className="flex-1">
              <label htmlFor="file" className="text-white font-semibold mb-1 block">Upload Profile Photo</label>
              <Input id="file" type="file" onChange={handleFileChange} />
            </div>
            <Button type="submit" className="h-10 px-8 cursor-pointer bg-violet-500 hover:bg-purple-600 text-white hover:text-white whitespace-nowrap">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
