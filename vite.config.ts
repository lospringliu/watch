import path from "node:path"
import { fileURLToPath } from "node:url"
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { VitePWA } from 'vite-plugin-pwa'
import WindiCSS from "vite-plugin-windicss";
import replace from '@rollup/plugin-replace'
import Layouts from 'vite-plugin-vue-layouts'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Pages from 'vite-plugin-pages'

const moduleExclude = match => {
  const m = id => id.indexOf(match) > -1
  return {
    name: `exclude-${match}`,
    resolveId(id) {
      if (m(id)) return id
    },
    load(id) {
      if (m(id)) return `export default {}`
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(dirname, 'src')}/`,
      '@/': `${path.resolve(dirname, 'src')}/`,
      '@composables': path.resolve(dirname, 'src/gun-vue/composables'),
      '@components': path.resolve(dirname, 'src/gun-vue/components'),
      // '@composables': '@gun-vue/composables',
      // '@components': '@gun-vue/components',
      // process: "process/browser",
      stream: "stream-browserify",
      // zlib: "browserify-zlib",
      // util: "util",
      // web3: path.resolve(dirname, "./node_modules/web3/dist/web3.min.js"),
    },
  },
  plugins: [
    vue(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md'],
    }),
    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),
    // https://github.com/antfu/unplugin-icons
    Icons({
      compiler: "vue3",
      autoInstall: true,
    }),
    WindiCSS({
      scan: {
        dirs: ["src"],
        include: ["index.md"],
        exclude: ["**/examples/**/*", "/node_modules/"],
        fileExtensions: ["vue", "ts", "md"],
      },
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      dirs: ["src/components", "src/gun-vue/components"],
      // dirs: ["src/components"],
      directoryAsNamespace: true,
      globalNamespaces: ["global"],
      extensions: ['vue'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
          // enabledCollections: ['carbon']
        }),
      ],
      dts: 'src/components.d.ts',
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),
    VitePWA({
      mode: 'development',
      base: '/',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'MOI',
        short_name: 'MOI',
        display: "standalone",
        theme_color: '#ccebff',
        icons: [
          {
            src: 'pwa-192x192.png', // <== don't add slash, for testing
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png', // <== don't remove slash, for testing
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png', // <== don't add slash, for testing
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
    replace({
      __DATE__: new Date().toISOString(),
    }),
  ],
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      '@vueuse/head',
      'gun',
      'gun/gun',
      'gun/sea',
      'gun/sea.js',
      'gun/lib/then',
      'gun/lib/webrtc',
      'gun/lib/radix',
      'gun/lib/radisk',
      'gun/lib/store',
      'gun/lib/rindexed',
      // 'interactjs',
    ],
    exclude: [
      'vue-demi',
      moduleExclude('text-encoding')
    ],
  },
})
