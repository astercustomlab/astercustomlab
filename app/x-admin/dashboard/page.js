"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabaseClient";
import ServicesAdmin from "@/components/admin/ServicesAdmin";
import GalleryAdmin from "@/components/admin/GalleryAdmin";
import PromoAdmin from "@/components/admin/PromoAdmin";

const TABS = [
  { key: "services", label: "Layanan" },
  { key: "promo", label: "Promo" },
  { key: "gallery", label: "Galeri" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [tab, setTab] = useState("services");

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      router.replace("/x-admin/login");
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/x-admin/login");
      } else {
        setEmail(data.session.user.email);
        setChecking(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/x-admin/login");
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  async function handleLogout() {
    const supabase = getSupabase();
    if (supabase) await supabase.auth.signOut();
    router.replace("/x-admin/login");
  }

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center text-steel">Memuat...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-bone">Dashboard Admin</h1>
          <p className="text-steel text-sm">{email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-steel hover:text-crimson border border-white/10 px-4 py-2 transition-colors"
        >
          Keluar
        </button>
      </div>

      <div className="flex gap-2 border-b border-white/10 mb-8">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t.key ? "border-crimson text-bone" : "border-transparent text-steel hover:text-bone"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "services" && <ServicesAdmin />}
      {tab === "promo" && <PromoAdmin />}
      {tab === "gallery" && <GalleryAdmin />}
    </div>
  );
}
