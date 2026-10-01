import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: `./`,
  build: {
    outDir: "dist/client",
    rollupOptions: { input: `source.html` },
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react(), {
    name: `github-pages-index`,
    enforce: `post`,
    generateBundle(options, bundle) {
      if (bundle[`source.html`]) {
        bundle[`source.html`].fileName = `index.html`;
        bundle[`index.html`] = bundle[`source.html`];
        delete bundle[`source.html`];
      }
    },
  }],
});
