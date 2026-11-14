import FadeImage from "./FadeImage";
import type { KelasCover } from "@/data/kelas";

/** Cover kartu kelas 16:9 dengan lencana nomor. Cover sementara memakai perlakuan duotone ungu. */
export default function KelasCoverImage({ cover, nomor, sizes }: { cover: KelasCover; nomor: string; sizes: string }) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-esco-dark">
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
        <div className="absolute inset-0 bg-esco-dark" style={{ transform: `scale(${cover.zoom})`, transformOrigin: cover.pos }}>
          <FadeImage
            src={cover.src}
            alt=""
            fill
            sizes={sizes}
            className={`object-cover ${cover.duotone ? "opacity-[.7] mix-blend-luminosity" : ""}`}
            style={{ objectPosition: cover.pos }}
          />
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-esco-dark/70 via-esco-dark/10 to-transparent" />
      <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-esco-yellow font-display text-sm font-extrabold text-esco-purple">{nomor}</span>
    </div>
  );
}
