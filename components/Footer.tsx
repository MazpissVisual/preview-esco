import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

const quick = [
  { label: "Tentang", href: "/#tentang" },
  { label: "Kelas", href: "/#kelas" },
  { label: "Alur pendaftaran", href: "/#alur" },
  { label: "FAQ", href: "/#faq" },
];

export default function Footer() {
  const k = site.kontak;
  const head = "mb-3 text-sm font-bold text-esco-dark";
  return (
    <footer className="border-t border-esco-line bg-esco-soft text-esco-text2">
      <div className="wrap grid gap-10 pb-8 pt-10 md:grid-cols-2 md:pt-12 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-4">
          <Link href="/" aria-label="ESCO Unila, ke beranda" className="self-start">
            <Image src="/esco-logo-transparan.png" alt="ESCO Unila" width={157} height={52} className="h-[48px] w-auto" />
          </Link>
          <p className="m-0 max-w-sm text-sm leading-relaxed">{site.namaLengkap}, diselenggarakan oleh {site.penyelenggara}.</p>
        </div>
        <div className="lg:col-span-3">
          <h3 className={head}>Sekretariat</h3>
          <p className="m-0 text-sm leading-relaxed">{k.alamat}</p>
        </div>
        <div className="lg:col-span-2">
          <h3 className={head}>Tautan</h3>
          <ul className="m-0 flex list-none flex-col gap-1 p-0 text-sm">
            {quick.map((q) => (
              <li key={q.href}>
                <a href={q.href} className="relative flex min-h-[32px] w-fit items-center text-esco-text2 no-underline transition-colors after:absolute after:bottom-[5px] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-esco-purple after:transition-transform after:duration-300 hover:text-esco-purple hover:after:scale-x-100">{q.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h3 className={head}>Kontak</h3>
          <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-sm">
            <li>{k.email}</li>
            <li>{k.whatsapp}</li>
            <li>{k.instagram}</li>
            <li>{k.youtube}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-esco-line">
        <div className="wrap flex flex-col justify-between gap-3 py-5 text-xs text-[#6f5a85] sm:flex-row">
          <p className="m-0">{site.hakCipta}</p>
          <p className="m-0">[Kebijakan privasi] · [Syarat dan ketentuan]</p>
        </div>
      </div>
    </footer>
  );
}
