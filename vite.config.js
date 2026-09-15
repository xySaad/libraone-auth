import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  server: {
    port: 5052,
    allowedHosts: true,
  },
});
