import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [vue()],
    root: fileURLToPath(new URL("./", import.meta.url)),
    base: fileURLToPath(new URL("./", import.meta.url)),
    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./src", import.meta.url)),
        },
      ],
    },
  };
});
