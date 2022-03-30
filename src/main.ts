import { createApp, ref } from "vue";
import { pinia } from "./stores"

import "virtual:windi.css";
import "./gun-vue/components/styles/index.css";
import "./styles/styles.scss";
import "notyf/notyf.min.css";

import { createRouter, createWebHashHistory } from "vue-router"
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

// polyfill start
import { Buffer } from 'buffer'
if (!globalThis.hasOwnProperty("global")) globalThis.global = globalThis
if (!globalThis.hasOwnProperty("Buffer")) globalThis.Buffer = Buffer
if (!globalThis.hasOwnProperty("setImmediate")) globalThis.setImmediate = setTimeout
// polyfill end

import { globalState } from "./stores/globalState"
import { peer } from "./gun-vue/composables/gun/useRelay"
peer.value = globalState.gunPeer || "https://relay.bcapps.ca/gun"
// import { useGun, currentRoom } from './gun-vue/composables'
// const gun = useGun()
// globalThis.gun = gun
import * as GunComposable from './gun-vue/composables'
const gun = GunComposable.useGun()
const currentRoom = GunComposable.currentRoom
globalThis.gun = gun
globalThis.ref = ref
globalThis.GunComposable = GunComposable

import App from "./App.vue"
import { initChannels } from "./composables/useVideos"

const routes_layouts = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes_layouts],
  // routes: [...routes],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

const app = createApp(App);
app.use(pinia)
app.use(router)
// install all modules under `modules/`
Object.values(import.meta.globEager('./modules/*.ts')).forEach(i => i.install?.({ app, router, routes: routes_layouts }))

router.isReady().then(async () => {
  app.mount("#app");
  const {vref, cref, gvideos, gchannels} = await initChannels()
  globalThis.gvideos = gvideos
  globalThis.vref = vref
  globalThis.gchannels = gchannels
  globalThis.cref = cref
})

router.beforeEach((to, from, next) => {
  if (!currentRoom.isRoot && !to.query?.room) {
    next({ ...to, query: { room: currentRoom.pub } });
  } else {
    next();
  }
});
