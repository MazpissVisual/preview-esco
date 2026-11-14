"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getStatus } from "@/lib/register";

type Variant = "yellow" | "purple" | "nav";
const cls: Record<Variant, string> = {
  yellow: "btn-yellow",
  purple: "btn-purple",
  nav: "btn-yellow !px-6 !py-3 text-sm",
};

export default function RegisterButton({
  variant = "yellow",
  children = "Daftar Sekarang",
  className = "",
}: {
  variant?: Variant;
  children?: React.ReactNode;
  className?: string;
}) {
  const [closed, setClosed] = useState(false);
  useEffect(() => {
    getStatus().then((s) => s && setClosed(s.status === "closed"));
  }, []);
  if (closed) {
    return (
      <span className={`btn ${className} cursor-not-allowed bg-[#cdbbdc] text-esco-dark`} aria-disabled="true">
        Pendaftaran Ditutup
      </span>
    );
  }
  return (
    <Link href="/daftar" className={`group ${cls[variant]} ${className}`}>
      {children}
    </Link>
  );
}
