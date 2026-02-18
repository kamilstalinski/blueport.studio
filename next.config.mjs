import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/:locale/oferta", destination: "/:locale/uslugi", permanent: true },
      { source: "/:locale/oferta/strony", destination: "/:locale/uslugi#strony-biznesowe", permanent: true },
      { source: "/:locale/oferta/sklepy", destination: "/:locale/uslugi#sklepy-internetowe", permanent: true }
    ];
  }
};

export default withNextIntl(nextConfig);
