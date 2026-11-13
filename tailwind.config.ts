import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
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
