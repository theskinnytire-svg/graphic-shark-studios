import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defaultServerConditions, defineConfig } from "vite";

// The site renders on the server per request and runs as ONE Cloudflare Worker.
// `vite build` emits dist/server/server.js (`export default { fetch }`) plus
// dist/client (hashed static assets). See wrangler.jsonc for the deploy wiring.
export default defineConfig(({ command }) => ({
  // fsevents can miss edits under some setups; polling keeps HMR reliable.
  server: {
    watch: { usePolling: true, interval: 150 },
  },
  resolve: {
    tsconfigPaths: true,
  },
  // BUILD ONLY: the SSR bundle runs on workerd, not Node, so every npm dep is
  // bundled in and resolved through the edge export conditions.
  ssr: {
    ...(command === "build"
      ? {
          target: "webworker" as const,
          resolve: {
            conditions: [
              "workerd",
              "worker",
              "browser",
              ...defaultServerConditions.filter((c) => c !== "node"),
            ],
          },
        }
      : {}),
    noExternal: command === "build" ? true : undefined,
    // `cloudflare:workers` is a runtime built-in (it exposes the D1 binding);
    // it must not be bundled.
    external: ["cloudflare:workers"],
  },
  build: {
    rollupOptions: { external: [/^cloudflare:/] },
  },
  plugins: [
    // TanStack Start must run before React's plugin.
    tanstackStart({ server: { entry: "server" } }),
    react(),
    tailwindcss(),
  ],
}));
