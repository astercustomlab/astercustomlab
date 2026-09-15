const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281297002395";

export default function Hero() {
  const waText = encodeURIComponent(
    "Halo Aster Custom Lab, saya mau konsultasi soal repaint/detailing motor saya."
  );

  return (
    <section id="top" className="relative pt-16 overflow-hidden bg-ink">
      {/* Diagonal crimson panel, right side */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[70%] sm:w-[55%]"
        style={{ clipPath: "polygon(28% 0, 100% 0, 100% 100%, 0% 100%)" }}
      >
        <div className="h-full w-full bg-crimson" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 70% 30%, rgba(239,233,220,0.14), transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 grid sm:grid-cols-12 gap-8 items-center">
        <div className="sm:col-span-7">
          <div className="flex flex-wrap gap-2 mb-6">
            {["Repaint", "Detailing", "Polish", "Restorasi"].map((t) => (
              <span
                key={t}
                className="text-xs tracking-wide text-steel border border-white/15 px-2.5 py-1"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-display font-semibold text-4xl sm:text-6xl leading-[1.05] text-bone text-balance">
            Motor kusam jadi kinclong lagi.
          </h1>
          <p className="mt-6 text-lg text-steel max-w-md">
            Repaint, detailing, polish, dan restorasi motor dengan hasil rapi
            dan warna presisi — dikerjakan langsung di Bakti Jaya, Setu,
            Tangerang Selatan.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-crimson hover:bg-crimsondark text-bone font-medium px-6 py-3.5 rounded-sm transition-colors"
            >
              Konsultasi gratis via WhatsApp
            </a>
            <a
              href="#layanan"
              className="text-bone/90 hover:text-bone font-medium px-2 py-3.5 border-b border-transparent hover:border-bone transition-colors"
            >
              Lihat layanan
            </a>
          </div>
        </div>

        <div className="sm:col-span-5 flex justify-center sm:justify-end">
          <svg viewBox="0 0 260 260" className="w-48 h-48 sm:w-64 sm:h-64" aria-hidden="true">
            <circle cx="130" cy="130" r="118" fill="none" stroke="#EFE9DC" strokeWidth="3" opacity="0.9" />
            <circle cx="130" cy="130" r="86" fill="none" stroke="#EFE9DC" strokeWidth="2" opacity="0.55" />
            <circle cx="130" cy="130" r="20" fill="none" stroke="#EFE9DC" strokeWidth="3" />
            {Array.from({ length: 9 }).map((_, i) => {
              const angle = (i * 360) / 9;
              const rad = (angle * Math.PI) / 180;
              const x2 = 130 + 86 * Math.cos(rad);
              const y2 = 130 + 86 * Math.sin(rad);
              const x1 = 130 + 20 * Math.cos(rad);
              const y1 = 130 + 20 * Math.sin(rad);
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#EFE9DC" strokeWidth="2.5" opacity="0.8" />
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
