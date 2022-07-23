import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import AutoImport from 'unplugin-auto-import/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({}),
    Components({
      dts:true,
      resolvers: [VantResolver()],
      extensions: ['vue'],
    }),
    AutoImport({ 
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      eslintrc: {
        enabled: true, // <-- this
      },
      dts: './auto-imports.d.ts',
      imports: [
        // presets
        'vue',
        'vue-router',
        // custom
        {
          '@vueuse/core': [
            // named imports
            'useMouse', // import { useMouse } from '@vueuse/core',
            // alias
            ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
          'axios': [
            // default imports
            ['default', 'axios'], // import { default as axios } from 'axios',
          ]
        },
      ],
      vueTemplate: false,
     }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
  server: {
    port: 3000,
  },
});
