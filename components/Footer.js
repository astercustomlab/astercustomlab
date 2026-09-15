import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-panel border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Aster Custom Lab" width={24} height={24} className="h-6 w-6 object-contain" />
          <span className="font-display text-bone text-sm">ASTER CUSTOM LAB</span>
        </div>

        <div className="flex items-center gap-5 text-steel text-sm">
          <a href="https://www.instagram.com/astercustomlab" target="_blank" rel="noopener noreferrer" className="hover:text-crimson transition-colors">
            Instagram
          </a>
          <a href="https://www.tiktok.com/@aster_custom_lab" target="_blank" rel="noopener noreferrer" className="hover:text-crimson transition-colors">
            TikTok
          </a>
          <a href="https://wa.me/6281297002395" target="_blank" rel="noopener noreferrer" className="hover:text-crimson transition-colors">
            0812-9700-2395
          </a>
        </div>

        <p className="text-steel text-xs text-center">
          © {new Date().getFullYear()} Aster Custom Lab · Bakti Jaya, Kec. Setu, Tangerang Selatan
        </p>
      </div>
    </footer>
  );
}
