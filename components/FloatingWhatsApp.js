const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281297002395";

export default function FloatingWhatsApp() {
  const text = encodeURIComponent(
    "Halo Aster Custom Lab, saya mau tanya-tanya soal repaint/detailing motor."
  );

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-crimson hover:bg-crimsondark text-bone px-5 py-3.5 rounded-full shadow-lg shadow-black/40 transition-colors"
      aria-label="Chat via WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.89.525 3.66 1.436 5.166L2 22l4.958-1.4A9.953 9.953 0 0012.001 22C17.524 22 22 17.523 22 12S17.524 2 12.001 2zm0 18.2a8.167 8.167 0 01-4.412-1.295l-.316-.188-2.941.83.812-2.868-.205-.294A8.16 8.16 0 013.8 12c0-4.522 3.679-8.2 8.201-8.2 4.521 0 8.199 3.678 8.199 8.2 0 4.522-3.678 8.2-8.199 8.2z" />
      </svg>
      <span className="text-sm font-medium hidden sm:inline">Chat WhatsApp</span>
    </a>
  );
}
