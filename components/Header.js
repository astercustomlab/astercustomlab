import Image from "next/image";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281297002395";

const links = [
  { href: "#tentang", label: "Tentang" },
  { href: "#layanan", label: "Layanan" },
  { href: "#promo", label: "Promo" },
  { href: "#galeri", label: "Galeri" },
  { href: "#testimoni", label: "Testimoni" },
];

export default function Header() {
  const waText = encodeURIComponent(
    "Halo Aster Custom Lab, saya mau konsultasi soal repaint/detailing motor saya."
  );

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-ink/90 backdrop-blur border-b border-white/5">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Aster Custom Lab" width={34} height={34} className="h-8 w-8 object-contain" />
          <span className="font-display font-semibold tracking-wide text-bone text-sm sm:text-base">
            ASTER <span className="text-crimson">CUSTOM LAB</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-steel">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-bone transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium bg-crimson hover:bg-crimsondark text-bone px-4 py-2 rounded-sm transition-colors"
        >
          Konsultasi
        </a>
      </div>
    </header>
  );
}
