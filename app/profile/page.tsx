"use client";
import React, { useState, useEffect } from 'react';
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
import { useRouter } from 'next/navigation';

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
    contact: "",
    linkedin: "",
    github: "",
    bestWork: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess("") , 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

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
    setError("");
    setSuccess("");

    

    let imageUrl = "";
    if (form.file) {
      const url = await uploadImage(form.file);
      if (url) imageUrl = url;
    }

    const payload = {
      ...form,
      file: undefined, // remove file object
      image_url: imageUrl,
    };

    const res = await fetch("/api/save-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok && result.error) {
      setError(result.error);
      return;
    }
    setError("");
    setSuccess(result.message || "Profile saved successfully!");
    setForm({
      email: "",
      fullName: "",
      rollNumber: "",
      branch: "",
      section: "",
      year: "",
      skill1: "",
      skill2: "",
      file: null,
      contact: "",
      linkedin: "",
      github: "",
      bestWork: "",
    });
    // Optionally, reset file input value if needed
  };

  const isFormComplete = () => {
    return (
      form.email.trim() !== "" &&
      form.fullName.trim() !== "" &&
      form.rollNumber.trim() !== "" &&
      form.branch.trim() !== "" &&
      form.section.trim() !== "" &&
      form.year.trim() !== "" &&
      form.skill1.trim() !== "" &&
      form.skill2.trim() !== "" &&
      form.linkedin.trim() !== "" &&
      form.github.trim() !== "" &&
      form.contact.trim() !== "" &&
      form.bestWork.trim() !== "" &&
      form.file !== null
    );
  };

  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <Image src="/profileImg.png" alt="Profile Background" fill priority className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-5xl mx-auto">
        {error && (
          <div className="mb-4 w-full max-w-3xl bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 w-full max-w-3xl bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            {success}
          </div>
        )}
        <div className="flex flex-col md:flex-row items-center md:items-center md:justify-between mb-12 px-8 w-full max-w-7xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg text-center md:text-left">
            Complete Your User <span className="bg-gradient-to-r from-[#A259FF] to-[#4BC6EF] bg-clip-text text-transparent">Profile</span>
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/home')}
              className="cursor-pointer px-6 py-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold text-lg transition-all hover:opacity-90 shadow"
            >
              Home
            </button>
            <button
              onClick={() => router.push('/user')}
              className="cursor-pointer px-6 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold text-lg transition-all hover:opacity-90 shadow"
            >
              View Profile
            </button>
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: "/signin" })}
              className="cursor-pointer px-6 py-2 rounded-lg bg-gradient-to-r from-[#A259FF] to-[#4BC6EF] text-white font-semibold text-lg transition-all hover:opacity-90 shadow"
            >
              Logout
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-5xl flex flex-col gap-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-8 py-10 shadow-lg overflow-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Personal Information */}
            <div className="flex-1 bg-white/20 backdrop-blur-xl rounded-xl p-6 mb-2 shadow border border-white/20 min-w-[260px]">
              <h2 className="text-xl font-bold text-white mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 gap-y-6">
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
                  <label htmlFor="contact" className="text-white font-semibold mb-1 block">Contact Details</label>
                  <Input id="contact" type="text" placeholder="Contact Details" value={form.contact} onChange={handleChange} />
                </div>
              </div>
            </div>
            {/* Academic Information */}
            <div className="flex-1 bg-white/20 backdrop-blur-xl rounded-xl p-6 mb-2 shadow border border-white/20 min-w-[220px]">
              <h2 className="text-xl font-bold text-white mb-4">Academic Information</h2>
              <div className="grid grid-cols-1 gap-y-6">
                <div>
                  <label className="text-white font-semibold mb-1 block">Branch</label>
                  <ComboboxDemo value={form.branch} onChange={(val) => setForm((prev) => ({ ...prev, branch: val }))} />
                </div>
                <div>
                  <label className="text-white font-semibold mb-1 block">Section</label>
                  <Section value={form.section} onChange={(val) => setForm((prev) => ({ ...prev, section: val }))} />
                </div>
                <div>
                  <label className="text-white font-semibold mb-1 block">Year</label>
                  <Year value={form.year} onChange={(val) => setForm((prev) => ({ ...prev, year: val }))} />
                </div>
              </div>
            </div>
          </div>
          {/* Professional & Social */}
          <div className="bg-white/20 backdrop-blur-xl rounded-xl p-6 mb-2 shadow border border-white/20 min-w-[260px]">
            <h2 className="text-xl font-bold text-white mb-4">Professional & Social</h2>
            <div className="grid grid-cols-1 gap-y-6">
              <div>
                <label className="text-white font-semibold mb-1 block">Skill 1</label>
                <SkillOne value={form.skill1} onChange={(val) => setForm((prev) => ({ ...prev, skill1: val }))} />
              </div>
              <div>
                <label className="text-white font-semibold mb-1 block">Skill 2</label>
                <SkillTwo value={form.skill2} onChange={(val) => setForm((prev) => ({ ...prev, skill2: val }))} />
              </div>
              <div>
                <label htmlFor="linkedin" className="text-white font-semibold mb-1 block">Linkedin URL</label>
                <Input className='w-130' id="linkedin" type="text" placeholder="Linkedin URL" value={form.linkedin} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="github" className="text-white font-semibold mb-1 block">GitHub URL</label>
                <Input id="github" type="text" placeholder="GitHub URL" value={form.github} onChange={handleChange} />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="bestWork" className="text-white font-semibold mb-1 block">Best Work URL</label>
                <Input id="bestWork" type="text" placeholder="Best Work URL" value={form.bestWork} onChange={handleChange} />
              </div>
              <div className="md:col-span-2 flex items-end gap-4">
                <div className="flex-1">
                  <label htmlFor="file" className="text-white font-semibold mb-1 block">Upload Profile Photo</label>
                  <Input id="file" type="file" onChange={handleFileChange} />
                </div>
                <Button type="submit" className="h-10 px-8 cursor-pointer bg-violet-500 hover:bg-purple-600 text-white hover:text-white whitespace-nowrap" disabled={!isFormComplete()}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
