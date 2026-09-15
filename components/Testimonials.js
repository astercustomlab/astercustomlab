const testimonials = [
  {
    quote:
      "Hasil repaintnya rapi banget, warnanya persis sama referensi yang saya kasih. Prosesnya juga dikabarin terus.",
    name: "Pelanggan Repaint Bodi",
  },
  {
    quote:
      "Motor harian saya jadi kayak baru lagi setelah detailing di sini. Bagian sela-sela bodi juga bersih total.",
    name: "Pelanggan Detailing",
  },
  {
    quote:
      "Restorasinya menyeluruh, karat dan penyok di bodi hilang. Harganya juga dijelaskan di awal, nggak ada tambahan mendadak.",
    name: "Pelanggan Restorasi",
  },
];

export default function Testimonials() {
  return (
    <section id="testimoni" className="bg-panel border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display font-semibold text-3xl text-bone mb-2">
          Kata pelanggan
        </h2>
        <p className="text-steel mb-12 max-w-md">
          Contoh testimoni — ganti dengan ulasan asli begitu ada pelanggan
          pertama.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="border-l-2 border-crimson pl-5">
              <p className="text-bone/90 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <cite className="block mt-4 text-steel text-sm not-italic">
                — {t.name}
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
