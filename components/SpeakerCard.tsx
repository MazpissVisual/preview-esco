export default function SpeakerCard({ s }: { s: { name: string; org: string; topic: string; keynote: boolean } }) {
  const dark = s.keynote;
  return (
    <div className={`card-hover flex min-w-0 flex-[1_1_240px] flex-col items-center gap-1.5 rounded-[22px] border border-esco-line p-7 text-center ${dark ? "bg-esco-purple text-white" : "bg-esco-soft text-esco-darker"}`}>
      <div className="mb-2.5 flex h-[104px] w-[104px] items-center justify-center rounded-full bg-[#ebe2f3] text-xs text-[#4f3566]">Foto</div>
      {dark && <span className="rounded-full bg-esco-yellow px-3 py-[3px] text-[11px] font-extrabold tracking-[.06em] text-esco-purple">KEYNOTE</span>}
      <div className="text-[17px] font-extrabold">{s.name}</div>
      <div className="text-sm opacity-90">{s.org}</div>
      <div className={`mt-1.5 w-full border-t pt-2.5 text-sm ${dark ? "border-esco-cardline" : "border-[#dccbe8]"}`}>{s.topic}</div>
    </div>
  );
}
