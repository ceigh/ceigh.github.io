import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import components from "unplugin-vue-components/vite"
import iconsResolver from "unplugin-icons/resolver"
import icons from "unplugin-icons/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    components({
      resolvers: [iconsResolver({
        alias: { si: "simple-icons" },
      })],
    }),

    icons(),
  ],
})
