import type { MetadataRoute } from "next";
import { kelasList } from "@/data/kelas";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const halaman = ["", "/daftar", "/privasi", "/syarat", ...kelasList.map((k) => `/kelas/${k.slug}`)];
  return halaman.map((p) => ({ url: `${base}${p}` }));
}
