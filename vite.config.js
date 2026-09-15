import { defineConfig } from "vite";

export default defineConfig({
  base: "/libraone-auth/",
  server: {
    port: 5052,
    allowedHosts: true,
  },
});
