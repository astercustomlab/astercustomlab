import Image from "next/image";
import { getActivePromos } from "@/lib/content";

function formatDate(d) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

export default async function Promo() {
  const promos = await getActivePromos();

  return (
    <section id="promo" className="bg-panel2 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display font-semibold text-3xl text-bone mb-2">
          Promo
        </h2>

        {promos.length === 0 ? (
          <p className="text-steel max-w-lg">
            Belum ada promo yang berjalan saat ini. Promo mingguan/bulanan
            kami umumkan lewat{" "}
            <a
              href="https://www.instagram.com/astercustomlab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crimson hover:underline"
            >
              Instagram
            </a>{" "}
            dan{" "}
            <a
              href="https://www.tiktok.com/@aster_custom_lab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crimson hover:underline"
            >
              TikTok
            </a>{" "}
            — pantau terus, ya.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {promos.map((p) => {
              const start = formatDate(p.start_date);
              const end = formatDate(p.end_date);
              return (
                <div key={p.id} className="bg-ink border border-crimson/30 overflow-hidden">
                  {p.image_url && (
                    <div className="relative aspect-[16/9]">
                      <Image src={p.image_url} alt={p.title} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-6">
                    {p.discount_text && (
                      <span className="inline-block text-xs font-semibold tracking-wide text-crimson border border-crimson/50 px-2.5 py-1 mb-4">
                        {p.discount_text}
                      </span>
                    )}
                    <h3 className="font-display text-xl text-bone mb-2">{p.title}</h3>
                    <p className="text-steel text-sm leading-relaxed mb-4">{p.description}</p>
                    {(start || end) && (
                      <p className="text-steel/70 text-xs">
                        Berlaku {start ? `${start}` : ""}
                        {start && end ? " – " : ""}
                        {end ? end : start ? " sampai selesai" : ""}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
