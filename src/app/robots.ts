import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/",
        "/_next/",
        "/offline.html",
        "/sw.js",
      ],
    },
    sitemap: `${siteConfig.identity.siteUrl}/sitemap.xml`,
    host: siteConfig.identity.siteUrl,
  };
}
