import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  // Export /projects as projects/index.html, not projects.html; GitHub Pages
  // would 404 on /projects because a projects/ folder also exists.
  trailingSlash: true,
  turbopack: {
    // Pin the project root to this folder. Without it, a stray package.json in
    // the home folder made Next treat C:\Users\dejap as the root.
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
