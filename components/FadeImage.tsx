"use client";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * next/image yang memudar masuk setelah selesai dimuat (tanpa "muncul tiba-tiba").
 * Jangan dipakai untuk gambar hero/LCP. Tanpa JavaScript gambar tetap terlihat (lihat .img-fade di globals.css).
 */
export default function FadeImage({ className = "", onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      {...props}
      // gambar yang sudah ada di cache bisa selesai sebelum React menempelkan onLoad
      ref={(el) => {
        if (el && el.complete && el.naturalWidth > 0) setLoaded(true);
      }}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      className={`img-fade ${loaded ? "is-loaded" : ""} ${className}`}
    />
  );
}
