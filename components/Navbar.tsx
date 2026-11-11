"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import RegisterButton from "./RegisterButton";

const idOf = (href: string) => {
  const i = href.indexOf("#");
  return i >= 0 ? href.slice(i + 1) : "";
};

type MenuItem = { label: string; href: string };

export default function Navbar({
  variant = "home",
  cta = false,
  menu = site.menu,
  homeHref = "/",
  shrink = false,
  registerBase = "",
}: {
  variant?: "home" | "back";
  cta?: boolean;
  menu?: MenuItem[];
  homeHref?: string;
  shrink?: boolean;
  registerBase?: string;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  // bayangan navbar saat halaman digulir
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // tandai section yang sedang terlihat (hanya di beranda)
  useEffect(() => {
    if (variant !== "home") return;
    // hanya elemen <section>; id yang sama pada kolom formulir (mis. #kelas) tidak boleh ikut terhitung
    const els = menu
      .map((m) => document.getElementById(idOf(m.href)))
      .filter((el): el is HTMLElement => !!el && el.tagName === "SECTION");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const hero = () => window.scrollY < 300 && setActive("");
    window.addEventListener("scroll", hero, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", hero);
    };
  }, [variant, menu]);

  return (
    <header className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-shadow duration-300 ${scrolled ? "border-transparent shadow-[0_6px_24px_rgba(37,9,59,.12)]" : "border-esco-line"}`}>
      <div className={`wrap flex items-center justify-between gap-4 transition-[padding] duration-300 ${shrink && scrolled ? "py-1.5" : "py-3"}`}>
        <Link href={homeHref} aria-label="ESCO Unila, ke beranda" className="flex items-center">
          <Image src="/esco-logo.png" alt="ESCO Unila, Education Summer Course Online" width={157} height={52} priority className={`w-auto transition-[height] duration-300 ${shrink && scrolled ? "h-9 md:h-10" : "h-11 md:h-[52px]"}`} />
        </Link>
        {variant === "home" ? (
          <>
            <nav className="hidden items-center gap-7 text-sm font-medium md:flex" aria-label="Menu utama">
              {menu.map((m) => {
                const on = active === idOf(m.href);
                return (
                  <a
                    key={m.href}
                    href={m.href}
                    aria-current={on ? "true" : undefined}
                    className={`relative py-2 no-underline transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[3px] after:origin-left after:rounded-full after:bg-esco-gold after:transition-transform after:duration-300 ${on ? "text-esco-purple after:scale-x-100" : "text-[#3a2150] after:scale-x-0 hover:text-esco-purple hover:after:scale-x-100"}`}
                  >
                    {m.label}
                  </a>
                );
              })}
              <RegisterButton variant="nav" base={registerBase} />
            </nav>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-esco-line transition active:scale-95 md:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Tutup menu" : "Buka menu"}
              onClick={() => setOpen(!open)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D1160" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </>
        ) : (
          <div className="flex items-center gap-4 text-sm font-medium md:gap-6">
            <Link href={homeHref} className="flex min-h-[44px] items-center text-[#3a2150] no-underline hover:text-esco-purple">← Kembali ke beranda</Link>
            {cta && <RegisterButton variant="nav" base={registerBase} className="hidden sm:inline-flex" />}
          </div>
        )}
      </div>

      {variant === "home" && (
        <div className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out md:hidden ${open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"}`}>
          <nav id="menu-mobile" aria-label="Menu mobile" className="overflow-hidden bg-white">
            <ul className="m-0 flex list-none flex-col border-t border-esco-line px-5 pt-1">
              {menu.map((m) => (
                <li key={m.href}>
                  <a href={m.href} onClick={() => setOpen(false)} className="flex min-h-[48px] items-center border-b border-esco-line/60 text-[15px] font-medium text-[#3a2150] no-underline">{m.label}</a>
                </li>
              ))}
            </ul>
            <div className="px-5 pb-5 pt-3">
              <RegisterButton variant="nav" base={registerBase} className="w-full" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
