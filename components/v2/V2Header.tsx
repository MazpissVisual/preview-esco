"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "Tentang", href: "#program" },
  { label: "Program Utama", href: "#program" },
  { label: "Kelas", href: "#kelas" },
  { label: "Narasumber", href: "#narasumber" },
  { label: "Alur Pendaftaran", href: "#alur" },
  { label: "Pengumuman", href: "#pengumuman" },
  { label: "FAQ", href: "#faq" },
];

export default function V2Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/v2" aria-label="Beranda ESCO FKIP Unila" className="flex items-center">
            <Image src="/esco-logo.png" alt="ESCO Unila, Education Summer Course Online" width={157} height={52} priority className="h-11 w-auto md:h-[52px]" />
          </Link>
          <nav aria-label="Menu utama" className="hidden items-center space-x-7 text-sm font-medium text-brand-muted lg:flex">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="transition-colors hover:text-brand-purple">{l.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/daftar" className="hidden items-center justify-center rounded-lg bg-brand-yellow px-5 py-2.5 text-sm font-bold text-brand-deep shadow-sm transition-transform duration-150 hover:bg-brand-yellowHover active:scale-95 sm:inline-flex">
              Daftar Sekarang
            </Link>
            <button
              type="button"
              aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={open}
              aria-controls="v2-mobile-menu"
              onClick={() => setOpen(!open)}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-brand-deep hover:bg-brand-lightPurple lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeWidth="2" /> : <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div id="v2-mobile-menu" className="space-y-3 border-b border-brand-border bg-white px-4 pb-6 pt-2 lg:hidden">
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block py-2 text-sm font-semibold text-brand-dark hover:text-brand-purple">{l.label}</a>
          ))}
          <div className="pt-2">
            <Link href="/daftar" className="block w-full rounded-lg bg-brand-yellow py-2.5 text-center font-bold text-brand-deep">Daftar Sekarang</Link>
          </div>
        </div>
      )}
    </header>
  );
}
