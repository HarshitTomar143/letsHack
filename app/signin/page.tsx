"use client"
export const dynamic = 'force-dynamic';
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setMessage("");
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
      callbackUrl: "/home",
    });
    if (res?.ok) {
      setMessage("Login successful");
      router.push(res.url || "/home");
    } else {
      setMessage(res?.error || "Login failed");
    }
    setPending(false);
  };

  const handleProvier = (event: React.MouseEvent<HTMLButtonElement>, value: "github" | "google")=>{
    event.preventDefault();
    signIn(value, {callbackUrl:"/"});
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#18102A] relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/loginImg.png"
        alt="Login Background"
        fill
        style={{ objectFit: "cover", zIndex: 0 }}
        className="absolute inset-0 w-full h-full"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#18102A]/80 z-10" />
      {/* Main Content */}
      <div className="relative z-20 flex flex-col md:flex-row w-full max-w-5xl h-[90vh] rounded-2xl overflow-hidden shadow-2xl">
        {/* Left Side (Logo & Adventure Text) */}
        <div className="hidden md:flex flex-col justify-between bg-transparent w-1/2 p-10">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#fff" fillOpacity="0.1" />
                <path d="M10 22L22 10M10 10H22V22" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-white text-2xl font-bold">Let's Hack</span>
            </div>
            <div className="flex justify-center my-4">
                          <Image src="/team.png" alt="Team" width={420} height={220} className="rounded-xl object-contain max-w-xs drop-shadow-lg" />
                        </div>
          </div>
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold text-white leading-tight">
              SIGN IN TO YOUR <br />
              <span className="text-[#A259FF]">ADVENTURE!</span>
            </h2>
          </div>
        </div>
        {/* Right Side (Form) */}
        <div className="flex-1 flex flex-col justify-center items-center bg-[#1B1532]/90 p-8 md:p-16 w-full md:w-1/2">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-extrabold text-white mb-6">LOGIN</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <label className="text-white text-sm font-semibold mb-1" htmlFor="email">
                Sign in with email address
              </label>
              <div className="flex items-center bg-[#231B3A] rounded-lg px-4 py-3 mb-2">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="mr-3 opacity-60">
                  <path d="M4 4h16v16H4V4zm0 0l8 8 8-8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  id="email"
                  type="email"
                  placeholder="Yourname@gmail.com"
                  value={form.email}
                  disabled={pending}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="bg-transparent outline-none text-white w-full placeholder:text-white/60"
                />
              </div>
              <label className="text-white text-sm font-semibold mb-1 mt-2" htmlFor="password">
                Sign in with password
              </label>
              <div className="flex items-center bg-[#231B3A] rounded-lg px-4 py-3 mb-2 relative">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="mr-3 opacity-60">
                  <path d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-6V9a6 6 0 10-12 0v2a2 2 0 00-2 2v5a2 2 0 002 2h12a2 2 0 002-2v-5a2 2 0 00-2-2zm-8-2a4 4 0 118 0v2H8V9z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  disabled={pending}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="bg-transparent outline-none text-white w-full placeholder:text-white/60 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    // Eye open
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="#fff" strokeWidth="1.5"/>
                      <circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="1.5"/>
                    </svg>
                  ) : (
                    // Eye closed
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="#fff" strokeWidth="1.5"/>
                      <circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="1.5"/>
                      <line x1="4" y1="20" x2="20" y2="4" stroke="#fff" strokeWidth="1.5"/>
                    </svg>
                  )}
                </button>
              </div>
              <button
                type="submit"
                disabled={pending}
                className="mt-4 w-full py-3 rounded-lg bg-gradient-to-r from-[#A259FF] to-[#4BC6EF] text-white font-semibold text-lg transition-all hover:opacity-90 flex items-center justify-center gap-2"
              >
                {pending && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                )}
                Login
              </button>
            </form>
            {/* {error && (
              <div className="mt-2 text-center text-sm font-semibold text-red-400">
                {error === "CredentialsSignin"
                  ? "Invalid email or password"
                  : "Login failed"}
              </div>
            )} */}
            {message && (
              <div className={`mt-2 text-center text-sm font-semibold ${message === 'Login successful' ? 'text-green-400' : 'text-red-400'}`}>{message}</div>
            )}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-white/20" />
              <span className="mx-4 text-white/60 text-sm">Or continue with</span>
              <div className="flex-1 h-px bg-white/20" />
            </div>
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                className="flex items-center gap-2 cursor-pointer w-1/2 justify-center bg-[#231B3A] hover:bg-[#2d2347] transition-colors text-white font-medium py-2.5 rounded-lg border border-transparent"
                onClick={() => signIn("google", { callbackUrl: "/home" })}
                disabled={pending}
              >
                <Image src="/google.svg" alt="Google" width={20} height={20} />
                Google
              </button>
              <button
              onClick={(e)=> handleProvier(e, "github")} 
               className="flex items-center gap-2 w-1/2 justify-center cursor-pointer bg-[#231B3A] hover:bg-[#2d2347] transition-colors text-white font-medium py-2.5 rounded-lg border border-transparent">
                <Image src="/github.svg" alt="GitHub" width={20} height={20} />
                GitHub
              </button>
            </div>
            <div className="flex gap-2 w-full relative mt-8">
              {/* Sliding background */}
              <div className="absolute left-0 top-0 h-full w-1/2 transition-all duration-300 z-0" style={{transform: 'translateX(0%)'}}>
                <div className="h-full w-full rounded-lg bg-gradient-to-r from-[#A259FF] to-[#4BC6EF]" />
              </div>
              <Link href="/signin" className="flex-1 py-2.5 rounded-lg font-semibold text-lg text-white z-10 transition-all duration-300 flex items-center justify-center" style={{position: 'relative'}}>
                Login
              </Link>
              <Link href="/signup" className="flex-1 py-2.5 rounded-lg font-semibold text-lg z-10 transition-all duration-300 flex items-center justify-center text-white bg-transparent" style={{position: 'relative'}}>
                SignUp
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Top Bar for mobile */}
      <div className="md:hidden absolute top-0 left-0 w-full flex items-center justify-between p-4 z-30">
        <div className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#fff" fillOpacity="0.1" />
            <path d="M10 22L22 10M10 10H22V22" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-white text-lg font-bold">Ibrahim <span className="font-light">Memon</span></span>
        </div>
        <div className="text-xs text-white/80">
          HAVE AN ACCOUNT? <a href="#" className="font-bold underline">SIGN IN</a>
        </div>
      </div>
      {/* Footer for mobile */}
      <div className="md:hidden absolute bottom-4 left-0 w-full flex items-center justify-center z-30">
        <span className="text-xs text-white/40">COPYRIGHT BY IBRAHIM MEMON</span>
      </div>
    </div>
  );
}

