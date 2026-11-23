/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Self-contained server bundle for the Hetzner deploy (see docs/DEPLOY.md).
  output: "standalone",
  async redirects() {
    return [
      { source: "/uslugi", destination: "/oferta", permanent: true },
      { source: "/oferta/strony", destination: "/oferta/strony-www", permanent: true },
      { source: "/oferta/sklepy", destination: "/oferta/sklepy-internetowe", permanent: true },
      { source: "/kalkulator", destination: "/oferta", permanent: true },
      { source: "/wycena", destination: "/oferta", permanent: true },
      { source: "/landing", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
