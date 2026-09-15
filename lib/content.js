import { getSupabase } from "@/lib/supabaseClient";

// Data ini tampil kalau Supabase belum disetel, atau tabelnya masih kosong —
// supaya website tetap enak dilihat sebelum admin sempat isi data lewat dashboard.
export const FALLBACK_SERVICES = [
  {
    id: "fallback-1",
    name: "Repaint Body Motor",
    description:
      "Pengecatan ulang bodi motor sesuai warna dan motif pilihan, dengan hasil setara pabrikan.",
    price_note: "Mulai dari Rp 750.000",
  },
  {
    id: "fallback-2",
    name: "Repaint Velg Motor",
    description:
      "Ganti warna atau perbaiki tampilan velg yang baret, kusam, atau berkarat.",
    price_note: "Mulai dari Rp 350.000",
  },
  {
    id: "fallback-3",
    name: "Detailing Motor",
    description:
      "Pembersihan menyeluruh bodi, mesin, dan celah motor sampai ke detail terkecil.",
    price_note: "Mulai dari Rp 150.000",
  },
  {
    id: "fallback-4",
    name: "Polishing & Coating",
    description:
      "Kembalikan kilau cat motor dan lindungi dari baret halus serta jamur kaca.",
    price_note: "Mulai dari Rp 250.000",
  },
  {
    id: "fallback-5",
    name: "Restorasi Motor",
    description:
      "Perbaikan menyeluruh untuk motor dengan kondisi bodi menurun akibat usia atau benturan ringan.",
    price_note: "Harga menyesuaikan kondisi",
  },
];

export const FALLBACK_GALLERY = [
  { id: "fallback-1", title: "Repaint bodi — merah metalik", category: "Repaint" },
  { id: "fallback-2", title: "Detailing menyeluruh harian", category: "Detailing" },
  { id: "fallback-3", title: "Restorasi bodi & cat lawas", category: "Restorasi" },
];

/**
 * Mengambil data publik dari Supabase, dan otomatis jatuh ke data statis
 * kalau Supabase belum dikonfigurasi atau tabelnya kosong. Dipanggil dari
 * server component, jadi selalu ambil data terbaru (no-store).
 */
export async function getServices() {
  const supabase = getSupabase();
  if (!supabase) return FALLBACK_SERVICES;

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return FALLBACK_SERVICES;
  return data;
}

export async function getGalleryItems() {
  const supabase = getSupabase();
  if (!supabase) return FALLBACK_GALLERY;

  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return FALLBACK_GALLERY;
  return data;
}

export async function getActivePromos() {
  const supabase = getSupabase();
  if (!supabase) return [];

  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("promos")
    .select("*")
    .eq("active", true)
    .or(`end_date.is.null,end_date.gte.${today}`)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data;
}
