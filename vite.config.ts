import { defineConfig } from 'vite'
//@ts-ignore
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      modules: fileURLToPath(new URL("./src/modules", import.meta.url)),
    },
  },
})
