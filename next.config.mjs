/** @type {import('next').NextConfig} */
const keamanan = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: keamanan }];
  },
  // Untuk hosting statis (GitHub Pages/Netlify) aktifkan: output: 'export', images: { unoptimized: true }
  // (header di atas hanya berlaku di Vercel/server Node; di hosting statis atur lewat pengaturan host)
};
export default nextConfig;
