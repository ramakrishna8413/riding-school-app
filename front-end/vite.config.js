import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/riding-school-app/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../docs",
  },
});