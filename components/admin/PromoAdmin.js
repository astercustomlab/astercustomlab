"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabaseClient";

const EMPTY = {
  id: null,
  title: "",
  description: "",
  discount_text: "",
  image_url: "",
  start_date: "",
  end_date: "",
  active: true,
};

export default function PromoAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const supabase = getSupabase();

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("promos")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setItems(data || []);
    setLoading(false);
  }

  useEffect(() => {
    if (supabase) load();
    else setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    const path = `promos/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("gallery").upload(path, file, {
      upsert: true,
    });

    if (uploadError) {
      setError(
        `Gagal unggah foto: ${uploadError.message}. Pastikan bucket "gallery" sudah dibuat, bersifat public, dan policy Storage di schema.sql sudah dijalankan.`
      );
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("gallery").getPublicUrl(path);
    setForm((f) => ({ ...f, image_url: data.publicUrl }));
    setUploading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      title: form.title,
      description: form.description,
      discount_text: form.discount_text,
      image_url: form.image_url,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      active: form.active,
    };

    const { error: saveError } = form.id
      ? await supabase.from("promos").update(payload).eq("id", form.id)
      : await supabase.from("promos").insert([payload]);

    setSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    setForm(EMPTY);
    load();
  }

  async function toggleActive(item) {
    await supabase.from("promos").update({ active: !item.active }).eq("id", item.id);
    load();
  }

  async function handleDelete(id) {
    if (!confirm("Hapus promo ini?")) return;
    await supabase.from("promos").delete().eq("id", id);
    load();
  }

  if (!supabase) {
    return (
      <p className="text-steel text-sm">
        Supabase belum dikonfigurasi. Tambahkan environment variable
        NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      <form onSubmit={handleSubmit} className="space-y-4 bg-panel p-6">
        <h2 className="font-display text-lg text-bone">
          {form.id ? "Edit promo" : "Tambah promo"}
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            required
            placeholder="Judul promo"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="bg-ink border border-white/10 focus:border-crimson outline-none px-4 py-2.5 text-bone"
          />
          <input
            placeholder="Label diskon (mis. Diskon 20%)"
            value={form.discount_text}
            onChange={(e) => setForm((f) => ({ ...f, discount_text: e.target.value }))}
            className="bg-ink border border-white/10 focus:border-crimson outline-none px-4 py-2.5 text-bone"
          />
        </div>
        <textarea
          placeholder="Deskripsi promo"
          rows={2}
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="w-full bg-ink border border-white/10 focus:border-crimson outline-none px-4 py-2.5 text-bone"
        />

        <div>
          <label className="block text-xs text-steel mb-1.5">Foto promo (opsional)</label>
          <input type="file" accept="image/*" onChange={handleUpload} className="text-sm text-steel" />
          {uploading && <p className="text-xs text-steel mt-1">Mengunggah...</p>}
          {form.image_url && <p className="text-xs text-crimson mt-1">Foto tersimpan ✓</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-steel mb-1">Mulai</label>
            <input
              type="date"
              value={form.start_date}
              onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))}
              className="w-full bg-ink border border-white/10 focus:border-crimson outline-none px-4 py-2.5 text-bone"
            />
          </div>
          <div>
            <label className="block text-xs text-steel mb-1">Sampai (kosongkan jika tanpa batas)</label>
            <input
              type="date"
              value={form.end_date}
              onChange={(e) => setForm((f) => ({ ...f, end_date: e.target.value }))}
              className="w-full bg-ink border border-white/10 focus:border-crimson outline-none px-4 py-2.5 text-bone"
            />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-steel">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
          />
          Tampilkan di website sekarang
        </label>
        {error && <p className="text-crimson text-sm">{error}</p>}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-crimson hover:bg-crimsondark disabled:opacity-60 text-bone px-5 py-2.5 text-sm font-medium transition-colors"
          >
            {saving ? "Menyimpan..." : form.id ? "Simpan perubahan" : "Tambah"}
          </button>
          {form.id && (
            <button
              type="button"
              onClick={() => setForm(EMPTY)}
              className="text-steel hover:text-bone px-5 py-2.5 text-sm"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      <div>
        <h2 className="font-display text-lg text-bone mb-4">Daftar promo</h2>
        {loading ? (
          <p className="text-steel text-sm">Memuat...</p>
        ) : items.length === 0 ? (
          <p className="text-steel text-sm">Belum ada promo.</p>
        ) : (
          <div className="divide-y divide-white/10 border border-white/10">
            {items.map((it) => (
              <div key={it.id} className="p-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-bone font-medium">
                    {it.title}{" "}
                    <span className={`text-xs ml-2 ${it.active ? "text-crimson" : "text-steel"}`}>
                      {it.active ? "Aktif" : "Nonaktif"}
                    </span>
                  </p>
                  <p className="text-steel text-sm">{it.description}</p>
                  <p className="text-steel/70 text-xs mt-1">
                    {it.start_date || "-"} s/d {it.end_date || "tanpa batas"}
                  </p>
                </div>
                <div className="flex gap-3 shrink-0 text-sm">
                  <button onClick={() => toggleActive(it)} className="text-steel hover:text-bone">
                    {it.active ? "Nonaktifkan" : "Aktifkan"}
                  </button>
                  <button onClick={() => setForm({ ...EMPTY, ...it })} className="text-steel hover:text-bone">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(it.id)} className="text-steel hover:text-crimson">
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
