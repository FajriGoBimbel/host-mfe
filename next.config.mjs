import NextFederationPlugin from "@module-federation/nextjs-mf";

const REMOTE_APP_URL = "https://module-psi.vercel.app";

const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  return {
    remote: `remote@${REMOTE_APP_URL}/_next/static/${location}/remoteEntry.js`,
  };
};

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["ui"],
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
    ],
  },
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        remotes: remotes(isServer),
        filename: "static/chunks/remoteEntry.js",
        exposes: {},
        shared: ["react", "react-dom"],
      })
    );

    return config;
  },
};

export default nextConfig;
