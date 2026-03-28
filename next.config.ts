import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // events.alcaincaac.pt → admin panel
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
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
