"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabaseClient";

const EMPTY = { id: null, name: "", description: "", price_note: "", image_url: "", sort_order: 0 };

export default function ServicesAdmin() {
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
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });
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

    const path = `services/${Date.now()}-${file.name}`;
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
      name: form.name,
      description: form.description,
      price_note: form.price_note,
      image_url: form.image_url,
      sort_order: Number(form.sort_order) || 0,
      updated_at: new Date().toISOString(),
    };

    const { error: saveError } = form.id
      ? await supabase.from("services").update(payload).eq("id", form.id)
      : await supabase.from("services").insert([payload]);

    setSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    setForm(EMPTY);
    load();
  }

  async function handleDelete(id) {
    if (!confirm("Hapus layanan ini?")) return;
    await supabase.from("services").delete().eq("id", id);
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
          {form.id ? "Edit layanan" : "Tambah layanan"}
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            required
            placeholder="Nama layanan"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="bg-ink border border-white/10 focus:border-crimson outline-none px-4 py-2.5 text-bone"
          />
          <input
            placeholder="Harga (mis. Mulai dari Rp 150.000)"
            value={form.price_note}
            onChange={(e) => setForm((f) => ({ ...f, price_note: e.target.value }))}
            className="bg-ink border border-white/10 focus:border-crimson outline-none px-4 py-2.5 text-bone"
          />
        </div>
        <textarea
          placeholder="Deskripsi singkat"
          rows={3}
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="w-full bg-ink border border-white/10 focus:border-crimson outline-none px-4 py-2.5 text-bone"
        />

        <div>
          <label className="block text-xs text-steel mb-1.5">Foto layanan (opsional)</label>
          <input type="file" accept="image/*" onChange={handleUpload} className="text-sm text-steel" />
          {uploading && <p className="text-xs text-steel mt-1">Mengunggah...</p>}
          {form.image_url && <p className="text-xs text-crimson mt-1">Foto tersimpan ✓</p>}
        </div>

        <input
          type="number"
          placeholder="Urutan tampil (0, 1, 2, ...)"
          value={form.sort_order}
          onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
          className="w-32 bg-ink border border-white/10 focus:border-crimson outline-none px-4 py-2.5 text-bone"
        />
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
        <h2 className="font-display text-lg text-bone mb-4">Daftar layanan</h2>
        {loading ? (
          <p className="text-steel text-sm">Memuat...</p>
        ) : items.length === 0 ? (
          <p className="text-steel text-sm">Belum ada layanan.</p>
        ) : (
          <div className="divide-y divide-white/10 border border-white/10">
            {items.map((it) => (
              <div key={it.id} className="p-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-bone font-medium">{it.name}</p>
                  <p className="text-steel text-sm">{it.description}</p>
                  <p className="text-crimson text-sm mt-1">{it.price_note}</p>
                </div>
                <div className="flex gap-3 shrink-0 text-sm">
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
