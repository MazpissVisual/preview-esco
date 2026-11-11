import Image from "next/image";
import { site } from "@/data/site";

export default function Footer({ showAddress = false }: { showAddress?: boolean }) {
  const k = site.kontak;
  return (
    <footer data-dark className="bg-esco-darker text-esco-muted">
      <div className="wrap flex flex-wrap gap-10 pb-8 pt-14">
        <div className="flex min-w-0 flex-[1.4_1_300px] flex-col gap-3.5">
          <div className="self-start rounded-[14px] bg-white px-3.5 py-2.5">
            <Image src="/esco-logo.png" alt="ESCO Unila" width={157} height={52} className="h-[52px] w-auto" />
          </div>
          <p className="m-0 text-sm">{site.namaLengkap}<br />{site.penyelenggara}</p>
        </div>
        {showAddress && (
          <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-2 text-sm">
            <div className="font-extrabold text-white">Alamat</div>
            <div>{k.alamat}</div>
          </div>
        )}
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-2 text-sm">
          <div className="font-extrabold text-white">Kontak</div>
          <div>{k.email}</div>
          <div>{k.whatsapp}</div>
        </div>
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-2 text-sm">
          <div className="font-extrabold text-white">Media sosial</div>
          <div>{k.instagram}</div>
          <div>{k.youtube}</div>
        </div>
      </div>
      <div className="border-t border-[#3b1859]">
        <div className="wrap py-5 text-xs text-[#c9b3dc]">{site.hakCipta}</div>
      </div>
    </footer>
  );
}
