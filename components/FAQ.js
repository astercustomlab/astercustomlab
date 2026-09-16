const faqs = [
  {
    q: "Di mana lokasi bengkel repaint motor Aster Custom Lab di Tangerang Selatan?",
    a: "Aster Custom Lab berlokasi di Bakti Jaya, Kecamatan Setu, Kota Tangerang Selatan — mudah dijangkau dari Serpong, Pamulang, dan sekitar Setu.",
  },
  {
    q: "Berapa harga repaint body motor terbaru di Aster Custom Lab?",
    a: "Harga repaint body motor mulai dari Rp750.000, tergantung ukuran motor dan tingkat kerusakan cat. Untuk estimasi pasti, kirim foto kondisi motor lewat WhatsApp dan kami balas dengan perkiraan harga.",
  },
  {
    q: "Bisa jasa repaint velg motor saja tanpa repaint bodi?",
    a: "Bisa. Repaint velg motor tersedia sebagai layanan terpisah, cocok untuk kamu yang cuma mau ganti warna atau perbaiki velg yang baret dan berkarat tanpa mengecat ulang seluruh bodi.",
  },
  {
    q: "Motor matic kusam apa harus direpaint total atau cukup di-polish?",
    a: "Tergantung kondisinya. Kalau cat masih bagus tapi kusam dan baret halus, polishing & coating biasanya cukup untuk mengembalikan kilaunya. Kalau cat sudah pudar, tergores dalam, atau ada karat, baru disarankan repaint.",
  },
  {
    q: "Bisa restorasi motor tua yang bodinya sudah karatan?",
    a: "Bisa. Layanan restorasi motor kami khusus menangani motor dengan kondisi bodi menurun akibat usia pemakaian, karat, atau bekas benturan ringan — dikembalikan senormal mungkin seperti kondisi awal.",
  },
  {
    q: "Berapa lama proses pengerjaan repaint atau detailing motor?",
    a: "Lama pengerjaan tergantung jenis layanan dan tingkat kerusakan — detailing biasanya selesai dalam sehari, sementara repaint atau restorasi bisa memakan waktu lebih lama. Estimasi waktu pasti akan diinfokan setelah kami cek kondisi motor.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function FAQ() {
  return (
    <section id="faq" className="bg-panel border-t border-white/5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display font-semibold text-3xl text-bone mb-2">
          Pertanyaan yang sering ditanyakan
        </h2>
        <p className="text-steel mb-12 max-w-lg">
          Seputar repaint, detailing, dan restorasi motor di Bakti Jaya, Setu,
          Tangerang Selatan.
        </p>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="text-bone font-medium mb-2">{f.q}</h3>
              <p className="text-steel text-sm leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
