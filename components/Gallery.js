import Image from "next/image";
import { getGalleryItems } from "@/lib/content";

function BeforeAfterCard({ title, category, before_image_url, after_image_url }) {
  const hasPhotos = before_image_url && after_image_url;

  return (
    <div className="group relative aspect-[4/3] overflow-hidden bg-panel2 focus-within:outline focus-within:outline-2 focus-within:outline-crimson">
      {/* "Sebelum" */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-panel2">
        {hasPhotos ? (
          <Image src={before_image_url} alt={`Sebelum — ${title}`} fill className="object-cover" />
        ) : (
          <>
            <span className="text-steel text-xs tracking-wide">SEBELUM</span>
            <span className="text-steel/60 text-[11px] px-6 text-center">
              Foto akan ditambahkan lewat dashboard admin
            </span>
          </>
        )}
      </div>
      {/* "Sesudah", revealed on hover/focus */}
      <div className="reveal-after absolute inset-0 flex flex-col items-center justify-center gap-2 bg-crimsondark">
        {hasPhotos ? (
          <Image src={after_image_url} alt={`Sesudah — ${title}`} fill className="object-cover" />
        ) : (
          <>
            <span className="text-bone text-xs tracking-wide">SESUDAH</span>
            <span className="text-bone/70 text-[11px] px-6 text-center">
              Foto akan ditambahkan lewat dashboard admin
            </span>
          </>
        )}
      </div>
      <button
        type="button"
        className="absolute inset-0 w-full h-full sm:hidden"
        aria-label={`Lihat hasil ${title}`}
        tabIndex={0}
      />
      <div className="absolute bottom-0 inset-x-0 bg-ink/80 px-4 py-3">
        <p className="text-bone text-sm font-medium">{title}</p>
        <p className="text-steel text-xs">{category}</p>
      </div>
    </div>
  );
}

export default async function Gallery() {
  const items = await getGalleryItems();

  return (
    <section id="galeri" className="bg-ink border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display font-semibold text-3xl text-bone mb-2">
          Hasil kerja
        </h2>
        <p className="text-steel mb-12 max-w-lg">
          Arahkan kursor (atau sentuh di HP) untuk lihat hasil sebelum dan
          sesudah. Lihat lebih banyak hasil pengerjaan di{" "}
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
          kami.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {items.map((it) => (
            <BeforeAfterCard key={it.id} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}
