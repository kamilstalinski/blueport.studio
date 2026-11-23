/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/uslugi", destination: "/cennik", permanent: true },
      { source: "/oferta", destination: "/cennik", permanent: true },
      { source: "/oferta/strony", destination: "/oferta/strony-www", permanent: true },
      { source: "/oferta/sklepy", destination: "/oferta/sklepy-internetowe", permanent: true },
      { source: "/landing", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
