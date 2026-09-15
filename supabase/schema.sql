-- Jalankan di Supabase Dashboard > SQL Editor (klik "Run").
-- Aman dijalankan berkali-kali (idempotent) kalau perlu re-run.
-- Membuat 3 tabel yang dikelola lewat dashboard admin (/x-admin):
-- services (Layanan), gallery_items (Hasil Kerja), promos (Promo).

create extension if not exists "pgcrypto";

-- ========== SERVICES ==========
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price_note text,
  image_url text,
  sort_order int default 0,
  updated_at timestamptz not null default now()
);
alter table services add column if not exists image_url text;
alter table services enable row level security;

drop policy if exists "Public can read services" on services;
create policy "Public can read services" on services for select to anon using (true);

drop policy if exists "Logged-in admin can manage services" on services;
create policy "Logged-in admin can manage services" on services for all to authenticated using (true) with check (true);

grant select on services to anon;
grant select, insert, update, delete on services to authenticated;

-- ========== GALLERY ==========
create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  before_image_url text,
  after_image_url text,
  sort_order int default 0,
  created_at timestamptz not null default now()
);
alter table gallery_items enable row level security;

drop policy if exists "Public can read gallery" on gallery_items;
create policy "Public can read gallery" on gallery_items for select to anon using (true);

drop policy if exists "Logged-in admin can manage gallery" on gallery_items;
create policy "Logged-in admin can manage gallery" on gallery_items for all to authenticated using (true) with check (true);

grant select on gallery_items to anon;
grant select, insert, update, delete on gallery_items to authenticated;

-- ========== PROMOS ==========
create table if not exists promos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  discount_text text,
  image_url text,
  start_date date,
  end_date date,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table promos add column if not exists image_url text;
alter table promos enable row level security;

drop policy if exists "Public can read active promos" on promos;
create policy "Public can read active promos" on promos for select to anon using (true);

drop policy if exists "Logged-in admin can manage promos" on promos;
create policy "Logged-in admin can manage promos" on promos for all to authenticated using (true) with check (true);

grant select on promos to anon;
grant select, insert, update, delete on promos to authenticated;

-- ========== STORAGE: bucket "gallery" ==========
-- Bucket-nya sendiri dibuat lewat Dashboard > Storage (bukan lewat SQL).
-- Tapi izin siapa yang boleh upload/baca foto tetap diatur lewat RLS,
-- persis seperti tabel biasa — jadi tetap perlu policy di bawah ini.

drop policy if exists "Public can view gallery photos" on storage.objects;
create policy "Public can view gallery photos"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'gallery');

drop policy if exists "Admin can upload gallery photos" on storage.objects;
create policy "Admin can upload gallery photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'gallery');

drop policy if exists "Admin can update gallery photos" on storage.objects;
create policy "Admin can update gallery photos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'gallery')
  with check (bucket_id = 'gallery');

drop policy if exists "Admin can delete gallery photos" on storage.objects;
create policy "Admin can delete gallery photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'gallery');
