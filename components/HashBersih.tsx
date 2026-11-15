"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const KUNCI = "esco-gulir";
const lewati = new Set(["", "konten"]); // "#" kosong dan tautan lompat ke konten dibiarkan bawaan browser

const gulir = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/**
 * Tautan ke bagian beranda (/#kelas, #alur, dan seterusnya) menggulir mulus tanpa
 * menambahkan #bagian di alamat. Dari halaman lain, pengguna dibawa ke beranda lalu digulirkan.
 */
export default function HashBersih() {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const klik = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const u = new URL(a.href, location.href);
      const id = u.hash.slice(1);
      if (u.origin !== location.origin || u.pathname !== "/" || lewati.has(id)) return;
      e.preventDefault();
      if (location.pathname === "/") {
        gulir(id);
        history.replaceState(null, "", "/");
      } else {
        try { sessionStorage.setItem(KUNCI, id); } catch {}
        router.push("/");
      }
    };
    document.addEventListener("click", klik, true);
    return () => document.removeEventListener("click", klik, true);
  }, [router]);

  // setelah pindah ke beranda, gulirkan ke bagian yang dituju
  useEffect(() => {
    if (path !== "/") return;
    let id: string | null = null;
    try { id = sessionStorage.getItem(KUNCI); } catch {}
    if (!id) return;
    const t = setTimeout(() => {
      try { sessionStorage.removeItem(KUNCI); } catch {}
      gulir(id!);
    }, 150);
    return () => clearTimeout(t);
  }, [path]);

  return null;
}
