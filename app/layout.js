import { Oswald, Work_Sans } from "next/font/google";
import "./globals.css";

const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://astercustomlab.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aster Custom Lab | Repaint & Detailing Motor Setu, Tangerang Selatan",
    template: "%s | Aster Custom Lab",
  },
  description:
    "Bengkel repaint, detailing, polish, dan restorasi motor di Bakti Jaya, Setu, Tangerang Selatan. Warna presisi, hasil rapi. Konsultasi gratis via WhatsApp.",
  keywords: [
    "repaint motor Tangerang Selatan",
    "detailing motor Setu",
    "bengkel repaint motor Bakti Jaya",
    "restorasi motor Tangsel",
    "polish motor Tangerang Selatan",
    "Aster Custom Lab",
  ],
  authors: [{ name: "Aster Custom Lab" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Aster Custom Lab",
    title: "Aster Custom Lab | Repaint & Detailing Motor Setu, Tangerang Selatan",
    description:
      "Motor kusam jadi kinclong lagi. Repaint, detailing, polish, dan restorasi motor dengan hasil rapi dan warna presisi.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Aster Custom Lab" }],
  },
  twitter: {
    card: "summary",
    title: "Aster Custom Lab | Repaint & Detailing Motor Tangerang Selatan",
    description: "Motor kusam jadi kinclong lagi. Konsultasi gratis via WhatsApp.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "Aster Custom Lab",
  image: "/logo.png",
  description:
    "Jasa repaint, detailing, polish, dan restorasi motor di Bakti Jaya, Setu, Tangerang Selatan.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bakti Jaya, Kec. Setu",
    addressLocality: "Tangerang Selatan",
    addressRegion: "Banten",
    postalCode: "15315",
    addressCountry: "ID",
  },
  telephone: "+6281297002395",
  priceRange: "Rp150.000 - Rp5.000.000",
  openingHours: "Mo-Su 09:00-18:00",
  sameAs: [
    "https://www.instagram.com/astercustomlab",
    "https://www.tiktok.com/@aster_custom_lab",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
