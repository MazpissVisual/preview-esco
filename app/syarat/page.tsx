import type { Metadata } from "next";
import DokumenHukum from "@/components/DokumenHukum";
import { syarat } from "@/data/hukum";

export const metadata: Metadata = {
  title: syarat.judul,
  description: syarat.deskripsi,
};

export default function Syarat() {
  return <DokumenHukum dok={syarat} />;
}
