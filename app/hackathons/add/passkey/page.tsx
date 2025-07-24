"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PasskeyPage() {
  const [passkey, setPasskey] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === "supersecret123") {
      router.push("/hackathons/add/form");
    } else {
      alert("Invalid passkey");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <label className="block mb-2 font-semibold">Enter Admin Passkey</label>
        <input
          type="password"
          value={passkey}
          onChange={(e) => setPasskey(e.target.value)}
          className="border px-4 py-2 rounded w-full mb-4"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Continue</button>
      </form>
    </div>
  );
}
