import type { MetadataRoute } from "next";
import { getAllSlugs } from "./blog/blogRegistry";

const routes = ["", "/about", "/blog", "/pricing", "/quickstart", "/docs"];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_ENV === "production" ? "https://www.n00dles.com" : undefined) ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const blogPostRoutes = getAllSlugs().map((slug) => `/blog/${slug}`);

  return [...routes, ...blogPostRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
