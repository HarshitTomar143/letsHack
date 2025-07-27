'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Request {
  sender_email: string;
  receiver_email: string;
  hackathons:{
    name:string;
  }
  created_at: string;
}

export default function RequestsPage() {
  const [sentRequests, setSentRequests] = useState<Request[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<Request[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch('/api/requests');
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch requests');
        }

        setSentRequests(data.sent || []);
        setReceivedRequests(data.received || []);
      } catch (err: any) {
        console.error('Error fetching requests:', err);
        setError(err.message || 'An error occurred');
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background image with overlay */}
      <Image src="/hackBack.png" alt="Background" fill priority className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute inset-0 bg-black/60 z-10" />
      
      <div className="relative z-20 w-full max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight drop-shadow-lg">Your Requests</h1>
          <p className="text-white/80 text-lg">Manage your team collaboration requests</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl text-red-300 text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sent Requests Card */}
          <div className="bg-white/10 backdrop-blur-3xl border border-white/40 rounded-3xl shadow-2xl p-8" 
               style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', border: '1.5px solid rgba(255,255,255,0.18)'}}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-bold text-green-400">Requests Sent</h2>
            </div>
            
            {sentRequests.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {sentRequests.map((req, index) => (
                  <div
                    key={`sent-${index}`}
                    className="bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-white/90 font-semibold mb-1">To: {req.receiver_email}</p>
                        <p className="text-green-300/80 text-sm">Hackathon: {req.hackathons?.name || "Unknown"}</p>
                      </div>
                      <div className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
                        Sent
                      </div>
                    </div>
                    <p className="text-xs text-white/50">{new Date(req.created_at).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="text-white/60 text-lg">You haven't sent any requests yet.</p>
                <p className="text-white/40 text-sm mt-2">Start collaborating by sending team requests!</p>
              </div>
            )}
          </div>

          {/* Received Requests Card */}
          <div className="bg-white/10 backdrop-blur-3xl border border-white/40 rounded-3xl shadow-2xl p-8" 
               style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', border: '1.5px solid rgba(255,255,255,0.18)'}}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-bold text-purple-400">Requests Received</h2>
            </div>
            
            {receivedRequests.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {receivedRequests.map((req, index) => (
                  <div
                    key={`received-${index}`}
                    className="bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-white/90 font-semibold mb-1">From: {req.sender_email}</p>
                        <p className="text-purple-300/80 text-sm">Hackathon:{req.hackathons?.name || "Unknown"}</p>
                      </div>
                      <div className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
                        Received
                      </div>
                    </div>
                    <p className="text-xs text-white/50">{new Date(req.created_at).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-white/60 text-lg">You haven't received any requests yet.</p>
                <p className="text-white/40 text-sm mt-2">Team requests will appear here when others invite you!</p>
              </div>
            )}
          </div>
        </div>

        {/* Back to Community Button */}
        <div className="text-center mt-8">
          <a 
            href="/home" 
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-2xl transition-all duration-300 font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
