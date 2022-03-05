import { createApp } from "vue";

import "virtual:windi.css";
import "@components/styles/index.css";

import { createRouter, createWebHashHistory } from "vue-router";
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

import platform from 'platform-detect'
import { globalState } from './stores/globalState'
globalState.platform = platform

import { useGun, useGun2 } from "@composables/gun"
let gun, gun2
if (globalState.platform.android) {
  gun = useGun({})
  gun2 = useGun2({})
} else {
  gun = useGun()
  gun = useGun2()
}
import { currentRoom } from "@composables";
import { useVideos } from "@/composables/useVideos"

import App from "./App.vue";

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
app.use(router)
// install all modules under `modules/`
Object.values(import.meta.globEager('./modules/*.ts')).forEach(i => i.install?.({ app, router, routes: routes_layouts }))

app.mount("#app");

Promise.resolve().then(async () => {
  const {vref, cref, gvideos, gchannels} = await useVideos()
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
