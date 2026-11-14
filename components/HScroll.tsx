"use client";
import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

/**
 * Baris kartu yang bisa digeser horizontal. Mobile: usap. Desktop: tombol panah di kanan judul
 * (scrollbar disembunyikan) dan baris meluber sampai tepi kanan layar agar jelas bisa digeser.
 * `header` ditampilkan di kiri tombol panah; `children` berisi <li> kartu.
 *
 * autoScroll: bergeser pelan dan halus tanpa putus (kartu pertama menyambung setelah terakhir).
 * Berhenti saat kursor/fokus/sentuhan, saat tab tersembunyi atau baris di luar layar, dan bisa
 * dijeda lewat tombol. Tidak aktif untuk pengguna dengan prefers-reduced-motion.
 */
export default function HScroll({
  header,
  children,
  label,
  step = 300,
  autoScroll = false,
  speed = 26,
}: {
  header: ReactNode;
  children: ReactNode;
  label: string;
  step?: number;
  autoScroll?: boolean;
  /** kecepatan geser otomatis, piksel per detik */
  speed?: number;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [loop, setLoop] = useState(false); // klon kartu untuk putaran tanpa putus (hanya bila gerak diizinkan)
  const [paused, setPaused] = useState(false); // dijeda pengguna lewat tombol
  const count = Children.count(children);
  const st = useRef({ hover: false, focus: false, visible: true, resumeAt: 0, paused: false });
  st.current.paused = paused;

  // lebar satu set kartu = jarak kartu pertama ke klon pertamanya
  const setWidth = useCallback(() => {
    const el = ref.current;
    if (!el || el.children.length <= count) return 0;
    return (el.children[count] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft;
  }, [count]);

  // aktifkan putaran hanya bila pengguna tidak meminta gerak dikurangi
  useEffect(() => {
    if (!autoScroll) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setLoop(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [autoScroll]);

  // status tombol panah dan putaran manual melewati klon
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      if (loop) {
        const w = setWidth();
        if (w && el.scrollLeft >= w) el.scrollLeft -= w; // lompat tanpa terlihat (isi klon identik)
        setAtStart(false);
        setAtEnd(false);
        return;
      }
      setAtStart(el.scrollLeft <= 4);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [loop, setWidth]);

  // hanya bergeser saat baris terlihat di layar
  useEffect(() => {
    const el = ref.current;
    if (!el || !loop) return;
    const io = new IntersectionObserver(([e]) => (st.current.visible = e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [loop]);

  // geser otomatis: posisi disimpan sebagai angka desimal agar kecepatan pelan tetap halus
  useEffect(() => {
    const el = ref.current;
    if (!el || !loop) return;
    let raf = 0;
    let last = 0;
    let pos = el.scrollLeft;
    let applied = el.scrollLeft;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min(t - last, 100) : 0;
      last = t;
      if (Math.abs(el.scrollLeft - applied) > 1.5) pos = el.scrollLeft; // pengguna menggeser sendiri
      const s = st.current;
      const jalan = !s.paused && !s.hover && !s.focus && s.visible && performance.now() >= s.resumeAt && document.visibilityState === "visible";
      const w = setWidth();
      if (jalan && w > 0) {
        pos += (speed * dt) / 1000;
        if (pos >= w) pos -= w;
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft;
      }
      applied = el.scrollLeft;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loop, speed, setWidth]);

  const tundaOtomatis = (ms: number) => {
    st.current.resumeAt = performance.now() + ms;
  };

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    tundaOtomatis(5000);
    if (loop && dir === -1) {
      const w = setWidth();
      if (w && el.scrollLeft < step) el.scrollLeft += w; // beri ruang ke kiri tanpa terlihat
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  const btn =
    "flex h-11 w-11 items-center justify-center rounded-full border border-esco-line bg-white text-esco-purple transition hover:border-esco-yellow hover:bg-esco-yellow active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-esco-line disabled:hover:bg-white";

  // Putaran tanpa putus: set kartu kedua adalah klon (disembunyikan dari pembaca layar)
  const asli = Children.toArray(children);
  const items: ReactNode = loop
    ? [
        ...asli,
        ...asli.map((c, i) =>
          isValidElement(c)
            ? cloneElement(c as ReactElement<Record<string, unknown>>, { key: `klon-${i}`, "aria-hidden": true, "data-clone": "" })
            : c,
        ),
      ]
    : children;

  return (
    <>
      <div className="flex items-end justify-between gap-6">
        {header}
        <div className="flex flex-none gap-2">
          {loop && (
            <button
              type="button"
              aria-label={paused ? "Putar geser otomatis" : "Jeda geser otomatis"}
              aria-pressed={paused}
              onClick={() => setPaused((p) => !p)}
              className={btn}
            >
              {paused ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
              )}
            </button>
          )}
          <div className="hidden gap-2 md:flex">
            <button type="button" aria-label="Geser ke kiri" disabled={atStart} onClick={() => go(-1)} className={btn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            </button>
            <button type="button" aria-label="Geser ke kanan" disabled={atEnd} onClick={() => go(1)} className={btn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
      <ul
        ref={ref}
        tabIndex={0}
        aria-label={label}
        onMouseEnter={() => (st.current.hover = true)}
        onMouseLeave={() => (st.current.hover = false)}
        onFocus={() => (st.current.focus = true)}
        onBlur={() => (st.current.focus = false)}
        onPointerDown={() => tundaOtomatis(4000)}
        onTouchStart={() => tundaOtomatis(4000)}
        onWheel={() => tundaOtomatis(4000)}
        className={`bleed-right -mx-5 m-0 flex list-none ${autoScroll ? "" : "snap-x snap-mandatory scroll-px-5"} gap-4 overflow-x-auto px-5 pb-4 pt-1 [scrollbar-width:none] md:scroll-px-0 md:gap-5 [&::-webkit-scrollbar]:hidden`}
      >
        {items}
      </ul>
    </>
  );
}
