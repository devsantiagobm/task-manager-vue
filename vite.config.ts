import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
   css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  },
})


// vite.config.js
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import { fileURLToPath, URL } from 'node:url'

// export default defineConfig({
//   plugins: [vue()],
 
//   resolve: {
//     alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
//   }
// })
