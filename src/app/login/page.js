"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center overflow-hidden font-sans p-4">
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-100/60 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-slate-200/70 blur-[120px] pointer-events-none" />

      <div className="flex flex-col items-center mb-6 text-center z-10 max-w-sm">
        <div className="w-16 h-16 bg-[#212C3E] rounded-2xl flex items-center justify-center text-white mb-4 shadow-sm">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>

        <h1 className="text-[22px] font-bold text-[#111827] tracking-tight leading-tight px-4">
          Inventory Management for Shop
        </h1>
        <p className="text-sm text-gray-500 mt-1.5">
          Silakan masuk ke akun Anda
        </p>
      </div>

      {/* PERBAIKAN: Menggunakan unit token resmi canonical Tailwind CSS */}
      <form 
        onSubmit={handleLogin}
        className="w-89.5 sm:w-100 h-79 bg-white/80 backdrop-blur-xs border border-white rounded-3xl p-6 shadow-xl shadow-slate-100 flex flex-col justify-between z-10"
      >
        <div>
          <label className="block text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-1.5">
            Username
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input
              type="text"
              required
              placeholder="Masukkan username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-11 bg-white border border-slate-200 rounded-xl pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-1.5">
            Password
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 bg-white border border-slate-200 rounded-xl pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-[#212C3E] hover:bg-[#192230] text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer mt-2"
        >
          Log In
        </button>
      </form>
    </div>
  );
}