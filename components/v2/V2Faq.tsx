"use client";
import { useState } from "react";

export default function V2Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="overflow-hidden rounded-xl border border-purple-800 bg-purple-950/40">
            <h3 className="m-0">
              <button
                type="button"
                id={`v2-faq-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`v2-faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex min-h-[44px] w-full items-center justify-between px-6 py-4 text-left text-sm font-bold text-white hover:text-brand-yellow sm:text-base"
              >
                <span>{f.q}</span>
                <span aria-hidden="true" className="text-lg font-bold text-brand-yellow">{isOpen ? "−" : "+"}</span>
              </button>
            </h3>
            {isOpen && (
              <div id={`v2-faq-panel-${i}`} role="region" aria-labelledby={`v2-faq-btn-${i}`} className="border-t border-purple-900/60 px-6 pb-4 pt-3 text-xs leading-relaxed text-purple-200 sm:text-sm">
                {f.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
