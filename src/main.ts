import { createApp } from "vue";

import "virtual:windi.css";
import "@components/styles/index.css";

import { createRouter, createWebHashHistory } from "vue-router"
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

import { globalState } from "./stores/globalState"
import { peer } from "@composables/gun"
peer.value = globalState.gunPeer || "https://relay.bcapps.ca/gun"
import { currentRoom } from "@composables"

import App from "./App.vue";
import { initChannels, useVideos } from "./composables/useVideos";

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

router.beforeEach((to, from, next) => {
  if (!currentRoom.isRoot && !to.query?.room) {
    next({ ...to, query: { room: currentRoom.pub } });
  } else {
    next();
  }
});

Promise.resolve().then(async () => {
  const {vref, cref, gvideos, gchannels} = await initChannels()
  globalThis.gvideos = gvideos
  globalThis.vref = vref
  globalThis.gchannels = gchannels
  globalThis.cref = cref
}) 
useVideos().then(console.log(`loading videos`))
