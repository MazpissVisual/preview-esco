import type { Metadata, Viewport } from "next";
import { DM_Sans, Mona_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

// Mona Sans untuk judul, DM Sans untuk deskripsi/teks isi (keduanya variable font)
const mona = Mona_Sans({ subsets: ["latin"], variable: "--font-mona", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: `${site.namaLengkap} | ${site.penyelenggara}`, template: `%s | ${site.nama}` },
  alternates: { canonical: "./" },
  description: `Situs resmi ${site.namaLengkap} (ESCO) ${site.penyelenggara}. Informasi program, kelas, narasumber, dan pendaftaran.`,
  icons: { icon: "/esco-logo.png", apple: "/esco-logo.png" },
  openGraph: {
    title: `${site.namaLengkap} | ${site.penyelenggara}`,
    description: "Kelas musim panas daring. Daftar sekarang.",
    images: [{ url: "/esco-logo.png" }],
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#25093b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${dmSans.variable} ${mona.variable}`} suppressHydrationWarning>
      <head>
        {/* Aktifkan animasi reveal hanya bila JS tersedia, agar konten tetap terlihat tanpa JS */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js-reveal')" }} />
      </head>
      <body>
        <a href="#konten" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-esco-yellow focus:px-4 focus:py-2 focus:text-esco-purple">
          Lewati ke konten
        </a>
        {children}
      </body>
    </html>
  );
}
