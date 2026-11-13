import { site } from "@/data/site";

export default function TopStrip() {
  return (
    <div data-dark className="bg-esco-darker text-esco-muted">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2 text-[13px]">
        <p className="m-0">Pendaftaran dibuka sampai {site.tanggalPenutupan}</p>
        <a href="/#alur" className="hidden font-semibold text-esco-yellow no-underline hover:underline sm:inline">Panduan pendaftaran →</a>
      </div>
    </div>
  );
}
