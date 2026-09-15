import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabaseClient";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
  }

  const { name, phone, service, message } = body || {};

  if (!name || !phone) {
    return NextResponse.json(
      { error: "Nama dan nomor WhatsApp wajib diisi." },
      { status: 400 }
    );
  }

  const supabase = getSupabase();

  if (!supabase) {
    // Supabase belum dikonfigurasi (NEXT_PUBLIC_SUPABASE_URL / ANON_KEY kosong).
    // Form tetap dianggap berhasil supaya pengunjung tidak melihat error,
    // tapi datanya hanya tercatat di log server, tidak tersimpan permanen.
    console.log("Inquiry baru (Supabase belum diset):", { name, phone, service, message });
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await supabase.from("inquiries").insert([
    { name, phone, service: service || null, message: message || null },
  ]);

  if (error) {
    console.error("Supabase insert error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, stored: true });
}
