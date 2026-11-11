"use client";
import { useState } from "react";

export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex flex-col gap-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`overflow-hidden rounded-2xl border bg-esco-card transition-colors duration-300 ${isOpen ? "border-esco-yellow/60" : "border-esco-cardline hover:border-[#8a5fb0]"}`}
          >
            <h3 className="m-0">
              <button
                type="button"
                id={`faq-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-6 py-5 text-left text-base font-bold text-white"
              >
                <span>{f.q}</span>
                <span aria-hidden="true" className={`flex h-7 w-7 flex-none items-center justify-center rounded-full text-[22px] leading-none transition duration-300 ${isOpen ? "rotate-180 bg-esco-yellow text-esco-purple" : "text-esco-yellow"}`}>
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
              className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out ${isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-5 text-[15px] text-[#e6d9f0]">{f.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
