import { defineConfig } from "@tanstack/start/config";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
    build: {
      rollupOptions: {
        external: ["@/components/sidebar", "@/components/global-modal"],
      },
    },
  },
});
