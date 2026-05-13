import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "http://localhost:3000";
  const routes = [
    "",
    "/pricing",
    "/ear-training-for-guitar",
    "/chord-progression-ear-training",
    "/interval-training-app",
    "/music-practice-app-self-taught",
    "/for-singers",
    "/for-songwriters",
  ];

  return [
    ...routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() })),
    ...blogPosts.map((post) => ({ url: `${base}/blog/${post.slug}`, lastModified: new Date() })),
  ];
}
