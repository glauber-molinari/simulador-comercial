import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  /** GitHub Pages: definido no Actions como /nome-do-repositório/ */
  base: process.env.VITE_BASE || "/",
});
