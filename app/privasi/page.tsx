import type { Metadata } from "next";
import DokumenHukum from "@/components/DokumenHukum";
import { privasi } from "@/data/hukum";

export const metadata: Metadata = {
  title: privasi.judul,
  description: privasi.deskripsi,
};

export default function Privasi() {
  return <DokumenHukum dok={privasi} />;
}
