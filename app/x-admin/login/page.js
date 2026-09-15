"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const supabase = getSupabase();

    if (!supabase) {
      setError(
        "Supabase belum dikonfigurasi. Tambahkan NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY di environment variables."
      );
      return;
    }

    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (signInError) {
      setError("Email atau password salah.");
      return;
    }

    router.push("/x-admin/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
        <h1 className="font-display text-2xl text-bone text-center mb-2">
          Admin — Aster Custom Lab
        </h1>
        <div>
          <label className="block text-sm text-steel mb-1.5" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-panel border border-white/10 focus:border-crimson outline-none px-4 py-3 text-bone"
          />
        </div>
        <div>
          <label className="block text-sm text-steel mb-1.5" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-panel border border-white/10 focus:border-crimson outline-none px-4 py-3 text-bone"
          />
        </div>
        {error && <p className="text-crimson text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-crimson hover:bg-crimsondark disabled:opacity-60 text-bone font-medium px-6 py-3 rounded-sm transition-colors"
        >
          {loading ? "Masuk..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
