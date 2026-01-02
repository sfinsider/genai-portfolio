import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  turbopack: {
    rules: {
      "*.tsx": {
        loaders: [LOADER],
        as: "*.tsx"
      },
      "*.jsx": {
        loaders: [LOADER],
        as: "*.jsx"
      }
    }
  }
};

export default nextConfig;
