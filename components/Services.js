import Image from "next/image";
import { getServices } from "@/lib/content";

export default async function Services() {
  const services = await getServices();

  return (
    <section id="layanan" className="bg-panel border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display font-semibold text-3xl text-bone mb-2">
          Layanan
        </h2>
        <p className="text-steel mb-3 max-w-lg">
          Harga adalah estimasi awal dan dapat berubah sewaktu-waktu
          mengikuti harga pasar. Konfirmasi harga pasti lewat WhatsApp
          setelah kami lihat kondisi motor.
        </p>
        <p className="text-crimson text-sm font-medium mb-12">
          Pantau promo bulanan kami di bagian Promo dan media sosial ↓
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {services.map((s) => (
            <div key={s.id} className="bg-panel hover:bg-panel2 transition-colors">
              {s.image_url && (
                <div className="relative aspect-[16/10]">
                  <Image src={s.image_url} alt={s.name} fill className="object-cover" />
                </div>
              )}
              <div className="p-7">
                <h3 className="font-display text-xl text-bone mb-2">{s.name}</h3>
                <p className="text-steel text-sm leading-relaxed mb-5">{s.description}</p>
                <p className="text-crimson text-sm font-medium">{s.price_note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
