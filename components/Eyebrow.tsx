export default function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 text-xs font-bold uppercase tracking-[.14em] ${light ? "text-esco-yellow" : "text-esco-accent"}`}>
      <span data-eb aria-hidden="true" className={`block h-[3px] w-7 ${light ? "bg-esco-yellow" : "bg-esco-gold"}`} />
      {children}
    </div>
  );
}
