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
            Aster berasal dari kata Yunani astēr yang berarti 
            bintang—simbol kualitas tinggi, presisi, dan hasil yang menonjol. 
            Filosofi itu menjadi standar kami dalam setiap pekerjaan: menghadirkan 
            tampilan motor yang rapi, elegan, dan layak menjadi pusat perhatian.
          </p>
          <p className="mt-5 text-steel text-lg leading-relaxed max-w-2xl">
            paint, detailing, polish, dan restorasi motor untuk kendaraan harian 
            maupun motor kesayangan. Setiap proses dikerjakan dengan warna yang presisi, 
            finishing yang detail, serta progres yang dapat dipantau pelanggan dari awal hingga selesai.
          </p>
        </div>
        {/* <div className="sm:col-span-4">
          <h2 className="font-display font-semibold text-3xl text-bone">
            Filosofi Logo
          </h2>
        </div>
        <div className="sm:col-span-8">
          <p className="text-steel text-lg leading-relaxed max-w-2xl">
            Logo Aster Custom Lab menggabungkan siluet perisai dan kepala kuda menjadi satu identitas yang kuat.
          </p>
          <p className="mt-5 text-steel text-lg leading-relaxed max-w-2xl">
            Perisai
            Melambangkan perlindungan terhadap kendaraan pelanggan. Bukan hanya mempercantik tampilan, tetapi juga menjaga kualitas cat dan finishing agar lebih awet.
          </p>
          <p className="mt-5 text-steel text-lg leading-relaxed max-w-2xl">
            Kuda
            Kuda identik dengan istilah tenaga kuda (horsepower) yang menjadi simbol performa, kekuatan, dan karakter dunia otomotif. Elemen ini merepresentasikan semangat kendaraan yang bertenaga dan berkelas.
          </p>
        </div> */}
      </div>
    </section>
  );
}
