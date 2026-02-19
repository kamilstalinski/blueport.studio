/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/oferta", destination: "/uslugi", permanent: true },
      { source: "/oferta/strony", destination: "/uslugi#strony-biznesowe", permanent: true },
      { source: "/oferta/sklepy", destination: "/uslugi#sklepy-internetowe", permanent: true },
    ];
  },
};

export default nextConfig;
