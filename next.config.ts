import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // events.alcaincaac.pt → admin eventos
        {
          source: "/",
          has: [{ type: "host", value: "events.alcaincaac.pt" }],
          destination: "/admin/eventos",
        },
        {
          source: "/:path*",
          has: [{ type: "host", value: "events.alcaincaac.pt" }],
          destination: "/admin/eventos/:path*",
        },
        // caixa.alcaincaac.pt → admin caixa
        {
          source: "/",
          has: [{ type: "host", value: "caixa.alcaincaac.pt" }],
          destination: "/admin/caixa",
        },
        {
          source: "/:path*",
          has: [{ type: "host", value: "caixa.alcaincaac.pt" }],
          destination: "/admin/caixa/:path*",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
