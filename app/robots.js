export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://astercustomlab.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/x-admin"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
