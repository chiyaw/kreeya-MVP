'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
  
      if (error) {
        console.error("Login error:", error);
        setErrorMsg(error.message);
      } else {
        console.log("Login success");
      }
    } catch (err) {
      console.error("Network/Fetch Error:", err);
      setErrorMsg("Network error. Please check Supabase setup.");
    }
  };
  

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto mt-20">
      <h2 className="text-xl font-semibold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border p-2 rounded"
        required
      />
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <button type="submit" className="bg-blue-600 text-white py-2 rounded">
        Log In
      </button>
    </form>
  );
}
