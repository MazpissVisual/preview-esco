import RegisterButton from "./RegisterButton";

/** Bar CTA lengket di bawah layar, hanya mobile/tablet (sidebar desktop sudah lengket sendiri). */
export default function StickyCta({ kelas, nama, info, base = "" }: { kelas: string; nama: string; info: string; base?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-esco-line bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(37,9,59,.12)] backdrop-blur lg:hidden" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
      <div className="mx-auto flex max-w-content items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-extrabold text-esco-dark">{nama}</div>
          <div className="truncate text-xs text-[#5a4a6c]">{info}</div>
        </div>
        <RegisterButton variant="purple" kelas={kelas} base={base} className="flex-none !px-6">Daftar</RegisterButton>
      </div>
    </div>
  );
}
