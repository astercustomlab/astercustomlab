export default function About() {
  return (
    <section id="tentang" className="bg-ink border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-20 grid sm:grid-cols-12 gap-10">
        <div className="sm:col-span-4">
          <h2 className="font-display font-semibold text-3xl text-bone">
            Tentang Aster Custom Lab
          </h2>
        </div>
        <div className="sm:col-span-8">
          <p className="text-steel text-lg leading-relaxed max-w-2xl">
            Aster Custom Lab melayani pemilik motor non-klasik — dari harian
            sampai kesayangan yang ingin tampil beda — dengan jasa repaint,
            detailing, polish, dan restorasi. Kami mengerjakan setiap motor
            dengan pendekatan yang sama: warna presisi, hasil rapi, dan proses
            yang bisa dipantau pelanggan dari awal sampai selesai.
          </p>
          <p className="mt-5 text-steel text-lg leading-relaxed max-w-2xl">
            Baik motor yang catnya sudah kusam dan tergores, maupun yang
            butuh perbaikan bodi ringan akibat usia pakai, kami bantu
            kembalikan tampilannya seperti baru.
          </p>
        </div>
      </div>
    </section>
  );
}
