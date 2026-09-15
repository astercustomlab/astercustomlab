# Aster Custom Lab — Website

Landing page untuk Aster Custom Lab (jasa repaint, detailing, polish, dan
restorasi motor), dibangun dengan Next.js + Tailwind CSS, siap deploy
gratis ke Vercel. Layanan, galeri hasil kerja, dan promo dikelola lewat
dashboard admin tersembunyi yang tersambung ke Supabase.

## Isi project

```
app/            Halaman & route admin (App Router)
  x-admin/      Dashboard admin (login tersembunyi, tidak ada link di menu)
components/     Komponen per section (Hero, Layanan, Promo, Galeri, dst.)
  admin/        Form CRUD untuk Layanan, Promo, Galeri
lib/            Helper koneksi Supabase & pengambilan data
public/logo.png Logo Aster Custom Lab
supabase/       SQL untuk membuat tabel services, gallery_items, promos
```

## 1. Jalankan di komputer sendiri (opsional)

Butuh Node.js versi 18 ke atas.

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## 2. Deploy ke Vercel (gratis)

1. Buat repository baru di GitHub, upload semua isi folder ini (jangan upload folder `node_modules`).
2. Buka https://vercel.com, login dengan akun GitHub.
3. Klik **Add New > Project**, pilih repository yang tadi dibuat.
4. Biarkan pengaturan default (Vercel otomatis mendeteksi Next.js), lalu klik **Deploy**.
5. Setelah selesai, kamu dapat URL seperti `aster-custom-lab.vercel.app`.
6. Di Vercel: **Settings > Environment Variables**, tambahkan `NEXT_PUBLIC_SITE_URL` dengan URL tersebut, lalu **Redeploy** — supaya sitemap dan meta SEO memakai domain yang benar.

## 3. Setup Supabase (wajib untuk dashboard admin, layanan/galeri/promo dinamis)

Tanpa langkah ini, website tetap tampil dengan data contoh (statis) dan
dashboard admin tidak bisa dipakai.

1. Buat akun & project baru di https://supabase.com (gratis).
2. Buka **Storage**, buat bucket baru bernama `gallery`, dan set sebagai **Public bucket** — untuk menyimpan foto sebelum/sesudah yang diunggah dari dashboard admin.
3. Buka **SQL Editor**, jalankan isi file `supabase/schema.sql` — ini membuat tabel `services`, `gallery_items`, `promos` beserta aturan keamanannya (publik hanya bisa **membaca**, hanya admin yang login yang bisa **mengubah**), **dan** izin upload/hapus foto ke bucket `gallery` (izin Storage diatur terpisah dari izin tabel, jadi wajib dijalankan meskipun bucket sudah dibuat).
4. Buka **Authentication > Providers**, matikan **"Allow new users to sign up"** — supaya orang lain tidak bisa daftar akun admin sendiri.
5. Buka **Authentication > Users > Add user**, buat satu akun admin (email + password) untuk kamu sendiri.
6. Buka **Project Settings > API**, salin **Project URL** dan **anon public key**.
7. Di Vercel: **Settings > Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
8. **Redeploy** project di Vercel agar environment variables terbaca.

## 4. Login ke dashboard admin

Buka `https://domainkamu.vercel.app/x-admin/login` (URL ini sengaja tidak
ditautkan di menu manapun di website). Login dengan akun yang dibuat di
langkah 5 di atas. Dari dashboard kamu bisa tambah/edit/hapus:

- **Layanan** — nama, deskripsi, harga
- **Promo** — judul, label diskon, tanggal mulai/selesai, aktif/nonaktif
- **Galeri** — judul, kategori, foto sebelum & sesudah (upload langsung)

Perubahan langsung tampil di halaman utama, tidak perlu deploy ulang.

## 5. Yang masih perlu disesuaikan

- **Nomor WhatsApp** — sudah diisi `0812-9700-2395`, ganti lewat environment variable `NEXT_PUBLIC_WHATSAPP_NUMBER` kalau berubah.
- **Instagram & TikTok** — sudah ditautkan ke akun yang diberikan; cek lagi linknya di `components/Contact.js`, `components/Footer.js`, dan `components/Gallery.js` kalau username berubah.
- **Isi awal layanan/galeri/promo** — sebelum Supabase disetel, website menampilkan data contoh dari `lib/content.js`. Setelah dashboard admin aktif, isi datanya dari sana.

## SEO

- Title, meta description, Open Graph, dan Twitter Card sudah diisi dengan kata kunci lokasi + layanan (`app/layout.js`).
- Data terstruktur (JSON-LD, schema `AutoRepair`) sudah disematkan supaya Google bisa menampilkan info bisnis (alamat, jam buka, kontak) langsung di hasil pencarian.
- `app/sitemap.js` dan `app/robots.js` otomatis dibuat Next.js — halaman `/x-admin` sengaja di-*disallow* dari crawler.
- Setelah live, daftarkan domain ke [Google Search Console](https://search.google.com/search-console) dan submit `https://domainkamu.vercel.app/sitemap.xml` supaya lebih cepat terindeks.

## Teknologi

- Next.js 14 (App Router)
- Tailwind CSS
- Supabase (database + auth admin + storage foto)
- Hosting: Vercel (gratis untuk project personal)
