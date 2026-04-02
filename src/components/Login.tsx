import React from 'react';
import { motion } from 'motion/react';
import { Trees, LogIn } from 'lucide-react';
import { loginWithGoogle } from '../firebase';

export default function Login() {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6 font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-zinc-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-zinc-300/20 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md bg-white border border-zinc-200 p-12 rounded-md shadow-sm relative z-10 text-center animate-in">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-zinc-950 rounded-md flex items-center justify-center shadow-sm">
            <Trees className="w-8 h-8 text-white stroke-[1.5]" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-zinc-950 mb-2 tracking-tight">Admin Console</h1>
        <p className="text-zinc-500 mb-10 font-medium">Sign in to manage Gishwati Tour content.</p>

        <button
          onClick={() => loginWithGoogle()}
          className="w-full py-4 bg-zinc-950 text-white rounded-md font-bold flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all duration-300 shadow-sm"
        >
          <LogIn className="w-5 h-5 stroke-[2]" />
          Continue with Google
        </button>

        <div className="mt-10 pt-8 border-t border-zinc-100">
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-relaxed">
            Restricted Access
          </p>
          <p className="mt-2 text-xs text-zinc-500 font-medium">
            Authorized personnel only. Contact the Super Admin for permissions.
          </p>
        </div>
      </div>
    </div>
  );
}
