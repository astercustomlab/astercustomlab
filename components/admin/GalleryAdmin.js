"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabaseClient";

const EMPTY = {
  id: null,
  title: "",
  category: "",
  before_image_url: "",
  after_image_url: "",
  sort_order: 0,
};

export default function GalleryAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState("");
  const [error, setError] = useState("");

  const supabase = getSupabase();

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery_items")
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

  async function handleUpload(e, field) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(field);
    setError("");

    const path = `${field}-${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("gallery").upload(path, file, {
      upsert: true,
    });

    if (uploadError) {
      setError(
        `Gagal unggah foto: ${uploadError.message}. Pastikan bucket "gallery" sudah dibuat dan bersifat public di Supabase Storage.`
      );
      setUploading("");
      return;
    }

    const { data } = supabase.storage.from("gallery").getPublicUrl(path);
    setForm((f) => ({ ...f, [field]: data.publicUrl }));
    setUploading("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      title: form.title,
      category: form.category,
      before_image_url: form.before_image_url,
      after_image_url: form.after_image_url,
      sort_order: Number(form.sort_order) || 0,
    };

    const { error: saveError } = form.id
      ? await supabase.from("gallery_items").update(payload).eq("id", form.id)
      : await supabase.from("gallery_items").insert([payload]);

    setSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    setForm(EMPTY);
    load();
  }

  async function handleDelete(id) {
    if (!confirm("Hapus item galeri ini?")) return;
    await supabase.from("gallery_items").delete().eq("id", id);
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
          {form.id ? "Edit item galeri" : "Tambah item galeri"}
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            required
            placeholder="Judul (mis. Repaint bodi merah metalik)"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="bg-ink border border-white/10 focus:border-crimson outline-none px-4 py-2.5 text-bone"
          />
          <input
            placeholder="Kategori (mis. Repaint)"
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="bg-ink border border-white/10 focus:border-crimson outline-none px-4 py-2.5 text-bone"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-steel mb-1.5">Foto "Sebelum"</label>
            <input type="file" accept="image/*" onChange={(e) => handleUpload(e, "before_image_url")} className="text-sm text-steel" />
            {uploading === "before_image_url" && <p className="text-xs text-steel mt-1">Mengunggah...</p>}
            {form.before_image_url && (
              <p className="text-xs text-crimson mt-1 truncate">Tersimpan ✓</p>
            )}
          </div>
          <div>
            <label className="block text-xs text-steel mb-1.5">Foto "Sesudah"</label>
            <input type="file" accept="image/*" onChange={(e) => handleUpload(e, "after_image_url")} className="text-sm text-steel" />
            {uploading === "after_image_url" && <p className="text-xs text-steel mt-1">Mengunggah...</p>}
            {form.after_image_url && (
              <p className="text-xs text-crimson mt-1 truncate">Tersimpan ✓</p>
            )}
          </div>
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
        <h2 className="font-display text-lg text-bone mb-4">Daftar galeri</h2>
        {loading ? (
          <p className="text-steel text-sm">Memuat...</p>
        ) : items.length === 0 ? (
          <p className="text-steel text-sm">Belum ada item galeri.</p>
        ) : (
          <div className="divide-y divide-white/10 border border-white/10">
            {items.map((it) => (
              <div key={it.id} className="p-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-bone font-medium">{it.title}</p>
                  <p className="text-steel text-sm">{it.category}</p>
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
