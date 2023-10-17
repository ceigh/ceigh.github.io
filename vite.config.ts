import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import components from "unplugin-vue-components/vite"
import iconsResolver from "unplugin-icons/resolver"
import icons from "unplugin-icons/vite"

const server = { host: "0.0.0.0", port: 3000 }

// https://vitejs.dev/config/
export default defineConfig({
  server,
  preview: server,

  plugins: [
    vue(),

    components({
      resolvers: [iconsResolver({
        alias: {
          si: "simple-icons",
          ai: "akar-icons",
        },
      })],
    }),

    icons(),
  ],
})
