import Navbar from "@/components/Navbar";
import Eyebrow from "@/components/Eyebrow";
import Footer from "@/components/Footer";
import TopStrip from "@/components/TopStrip";
import { BackToTop, ScrollProgress } from "@/components/Extras";
import type { Dokumen } from "@/data/hukum";

/** Kerangka halaman dokumen (Kebijakan Privasi, Syarat dan Ketentuan): header gelap, daftar isi, dan isi. */
export default function DokumenHukum({ dok }: { dok: Dokumen }) {
  return (
    <>
      <TopStrip />
      <ScrollProgress />
      <Navbar shrink />

      <main id="konten" className="fx bg-white">
        <section data-dark className="pattern-dots bg-esco-dark text-white">
          <div className="wrap flex flex-col gap-4 pb-12 pt-10 md:pb-14 md:pt-14">
            <Eyebrow light>Dokumen</Eyebrow>
            <h1 className="hero-in hero-in-1 m-0 text-[32px] font-extrabold leading-[1.1] tracking-[-.02em] md:text-[46px]">{dok.judul}</h1>
            <p className="hero-in hero-in-2 m-0 max-w-2xl text-base text-esco-muted md:text-lg">{dok.deskripsi}</p>
            <p className="m-0 text-sm text-esco-muted">Terakhir diperbarui: {dok.diperbarui}</p>
          </div>
        </section>

        <div className="wrap grid gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-14">
          <nav aria-label="Daftar isi" className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-24 border-l border-esco-line pl-5">
              <p className="m-0 mb-3 text-xs font-bold uppercase tracking-[.12em] text-esco-accent">Isi dokumen</p>
              <ol className="m-0 flex list-none flex-col gap-1 p-0 text-sm">
                {dok.bagian.map((b, i) => (
                  <li key={b.judul}>
                    <a href={`#bagian-${i + 1}`} className="flex min-h-[32px] items-center gap-2 text-esco-text2 no-underline transition-colors hover:text-esco-purple">
                      <span className="font-display text-xs font-extrabold text-esco-accent">{String(i + 1).padStart(2, "0")}</span>
                      {b.judul}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="flex min-w-0 flex-col gap-10 lg:col-span-8 lg:col-start-5">
            {dok.bagian.map((b, i) => (
              <section key={b.judul} id={`bagian-${i + 1}`} className="flex flex-col gap-3">
                <h2 className="m-0 flex items-baseline gap-3 text-[22px] font-extrabold leading-tight text-esco-dark md:text-[26px]">
                  <span className="font-display text-sm font-extrabold text-esco-accent">{String(i + 1).padStart(2, "0")}</span>
                  {b.judul}
                </h2>
                {b.paragraf?.map((p, j) => (
                  <p key={j} className="m-0 text-base leading-relaxed text-esco-text2">{p}</p>
                ))}
                {b.daftar && (
                  <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    {b.daftar.map((d, j) => (
                      <li key={j} className="flex gap-3 text-base leading-relaxed text-esco-text2">
                        <span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 flex-none rounded-full bg-esco-gold" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
