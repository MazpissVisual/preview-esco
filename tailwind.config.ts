import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          deep: "#35104D",
          purple: "#4B0875",
          lightPurple: "#F5EFFB",
          border: "#E8E2EE",
          yellow: "#FFD22E",
          yellowHover: "#E6BC24",
          dark: "#292333",
          muted: "#665C74",
          bgLight: "#F8F6FA",
        },
        esco: {
          purple: "#3D1160", // tombol, ikon
          dark: "#25093b", // hero, header
          darker: "#1d0732", // footer, teks
          accent: "#6b3a96", // label eyebrow
          yellow: "#FFD43B", // CTA
          gold: "#F5B82E", // garis eyebrow
          soft: "#f4eef8", // latar lembut
          line: "#e1d6ea", // garis kartu
          text2: "#4a3a5c", // teks sekunder
          card: "#33104d", // kartu pada band gelap
          cardline: "#5b2a86",
          muted: "#d9c8e8", // teks pada band gelap
        },
      },
      // Palet khusus halaman /v2 (perbandingan layout)
      // brand.* dipakai hanya oleh halaman /v2
      fontFamily: {
        sans: ["var(--font-dm)", "system-ui", "sans-serif"],
        display: ["var(--font-mona)", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "1160px" },
      boxShadow: {
        side: "0 10px 30px rgba(37,9,59,.10)",
        float: "0 10px 30px rgba(37,9,59,.12)",
      },
    },
  },
  plugins: [],
};
export default config;
