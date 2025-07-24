'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AddHackathonPage() {
  const [authorized, setAuthorized] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [form, setForm] = useState({
    name: '',
    location: '',
    date: '',
    type: '',
    prize: '',
    image: null as File | null,
    link: '',
  });
  const [message, setMessage] = useState('');
  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successTimer, setSuccessTimer] = useState<NodeJS.Timeout | null>(null);
  const [countdown, setCountdown] = useState(5);
  const [isUploading, setIsUploading] = useState(false);

  const CORRECT_PASSKEY = "LordHarshit" 
  const handlePasskeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === CORRECT_PASSKEY) {
      setAuthorized(true);
    } else {
      setMessage('Incorrect passkey');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsUploading(true);

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('location', form.location);
    formData.append('date', form.date);
    formData.append('type', form.type);
    formData.append('prize', form.prize);
    if (form.image) formData.append('image', form.image);
    formData.append('link',form.link);

    const res = await fetch('/api/add-hackathon', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      setMessage(result.error || 'Failed to add hackathon.');
      setIsUploading(false);
    } else {
      setMessage('');
      setForm({
        name: '',
        location: '',
        date: '',
        type: '',
        prize: '',
        image: null,
        link: '',
      });
      setCountdown(5);
      setShowSuccessPopup(true);
      setIsUploading(false);
      if (successTimer) clearTimeout(successTimer);
      const timer = setTimeout(() => setShowSuccessPopup(false), 5000);
      setSuccessTimer(timer);
    }
  };

  const isFormComplete = () => {
    return (
      form.name.trim() !== '' &&
      form.location.trim() !== '' &&
      form.date.trim() !== '' &&
      form.type.trim() !== '' &&
      form.prize.trim() !== '' &&
      form.link.trim() !== '' &&
      form.image !== null
    );
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (showSuccessPopup) {
      setCountdown(5);
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (interval) clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
      if (successTimer) clearTimeout(successTimer);
    };
  }, [showSuccessPopup]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <Image src="/hackBack.png" alt="Background" fill priority className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-5xl mx-auto">
        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-2xl px-10 py-8 flex flex-col items-center relative min-w-[320px] max-w-[90vw]">
              <button
                className="absolute top-3 right-3 text-white text-2xl font-bold bg-black/30 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/60 transition"
                onClick={() => setShowSuccessPopup(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="text-6xl mb-4">👍</div>
              <div className="text-3xl font-bold text-white mb-2">Success</div>
              <div className="text-white text-lg">Hackathon added successfully!</div>
              <div className="mt-4 text-white text-sm opacity-70">This will close automatically in <span className="font-bold">{countdown}</span> second{countdown !== 1 ? 's' : ''}.</div>
            </div>
          </div>
        )}
        <div className="w-full max-w-2xl flex flex-col gap-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-8 py-10 shadow-lg overflow-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg text-center mb-8">
            Add <span className="bg-gradient-to-r from-[#A259FF] to-[#4BC6EF] bg-clip-text text-transparent">Hackathon</span>
          </h1>
          {!authorized ? (
            <form onSubmit={handlePasskeySubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Enter Passkey</h2>
              <div>
                <label className="text-white font-semibold mb-1 block">Passkey</label>
                <Input
                  type="password"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  placeholder="Enter passkey"
                />
              </div>
              <Button type="submit" className="h-10 px-8 cursor-pointer bg-violet-500 hover:bg-purple-600 text-white hover:text-white whitespace-nowrap">Submit</Button>
              {message && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{message}</div>}
            </form>
          ) : (
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="name" className="text-white font-semibold mb-1 block">Hackathon Name</label>
                    <Input id="name" value={form.name} onChange={handleInputChange} placeholder="Hackathon Name" required />
                  </div>
                  <div>
                    <label htmlFor="location" className="text-white font-semibold mb-1 block">Location</label>
                    <Input id="location" value={form.location} onChange={handleInputChange} placeholder="Location" required />
                  </div>
                  <div>
                    <label htmlFor="date" className="text-white font-semibold mb-1 block">Date</label>
                    <Input id="date" type="date" value={form.date} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label htmlFor="type" className="text-white font-semibold mb-1 block">Type (Online/Offline)</label>
                    <Input id="type" value={form.type} onChange={handleInputChange} placeholder="Type (Online/Offline)" required />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="prize" className="text-white font-semibold mb-1 block">Prize</label>
                    <Input id="prize" value={form.prize} onChange={handleInputChange} placeholder="Prize (optional)" />
                  </div>
                  <div>
                    <label htmlFor="link" className="text-white font-semibold mb-1 block">Link</label>
                    <Input id="link" value={form.link} onChange={handleInputChange} placeholder="Official Link" />
                  </div>
                  <div>
                    <label htmlFor="image" className="text-white font-semibold mb-1 block">Upload Banner Image</label>
                    <Input id="image" type="file" onChange={handleFileChange} accept="image/*" required />
                  </div>
                </div>
              </div>
              <hr className="border-white/20 my-2" />
              <div className="flex gap-4 justify-end">
                <Button type="submit" className="h-10 px-8 cursor-pointer bg-violet-500 hover:bg-purple-600 text-white hover:text-white whitespace-nowrap" disabled={isUploading || !isFormComplete()}>
                  {isUploading ? 'Uploading...' : 'Add Hackathon'}
                </Button>
                <Button type="button" onClick={() => router.push('/home')} className="h-10 px-8 cursor-pointer bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold whitespace-nowrap">Home</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
