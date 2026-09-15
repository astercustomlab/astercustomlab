const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281297002395";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/astercustomlab",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.14 0-3.5.01-4.74.07-.96.04-1.48.2-1.82.34-.46.18-.78.39-1.13.73-.34.35-.55.67-.73 1.13-.14.34-.3.86-.34 1.82-.06 1.24-.07 1.6-.07 4.74s.01 3.5.07 4.74c.04.96.2 1.48.34 1.82.18.46.39.78.73 1.13.35.34.67.55 1.13.73.34.14.86.3 1.82.34 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c.96-.04 1.48-.2 1.82-.34.46-.18.78-.39 1.13-.73.34-.35.55-.67.73-1.13.14-.34.3-.86.34-1.82.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.04-.96-.2-1.48-.34-1.82-.18-.46-.39-.78-.73-1.13a3.03 3.03 0 00-1.13-.73c-.34-.14-.86-.3-1.82-.34C15.5 4.01 15.14 4 12 4zm0 3.6a4.4 4.4 0 110 8.8 4.4 4.4 0 010-8.8zm0 1.8a2.6 2.6 0 100 5.2 2.6 2.6 0 000-5.2zm4.6-2a1.03 1.03 0 110 2.06 1.03 1.03 0 010-2.06z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@aster_custom_lab",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M16.6 5.82c-.9-.98-1.4-2.25-1.4-3.57h-3.08v13.6a3.08 3.08 0 11-2.53-3.03V9.7a6.15 6.15 0 105.28 6.09V9.15a8.29 8.29 0 004.63 1.4V7.47a4.85 4.85 0 01-2.9-1.65z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const waText = encodeURIComponent(
    "Halo Aster Custom Lab, saya mau konsultasi soal repaint/detailing motor saya."
  );

  return (
    <section id="kontak" className="bg-ink border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-20 grid sm:grid-cols-12 gap-10 items-center">
        <div className="sm:col-span-7">
          <h2 className="font-display font-semibold text-3xl text-bone mb-4">
            Langsung chat, tanpa isi form
          </h2>
          <p className="text-steel leading-relaxed max-w-md mb-8">
            Ceritakan kondisi motor kamu langsung ke WhatsApp, dan kami balas
            secepatnya dengan estimasi harga dan jadwal pengerjaan.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-crimson hover:bg-crimsondark text-bone font-medium px-6 py-3.5 rounded-sm transition-colors"
          >
            Chat via WhatsApp
          </a>

          <div className="mt-10 flex items-center gap-5">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="text-steel hover:text-crimson transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="sm:col-span-5 text-sm text-steel space-y-1.5">
          <p className="text-bone/90 font-medium text-base">Aster Custom Lab</p>
          <p>Bakti Jaya, Kec. Setu, Kota Tangerang Selatan, Banten 15315</p>
          <p>Setiap hari, 09.00–18.00 WIB</p>
          <p className="pt-2">WhatsApp: 0812-9700-2395</p>
        </div>
      </div>
    </section>
  );
}
