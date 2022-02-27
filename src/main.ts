import { createApp } from "vue";
import App from "./App.vue";

import "virtual:windi.css";
import "@components/styles/index.css";

import { createRouter, createWebHashHistory } from "vue-router";
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
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

app.use(router).mount("#app");

import { useVideos } from "@/composables/useVideos"
import { currentRoom } from "@composables";

const {vref, cref, videos, channels} = useVideos()
globalThis.videos = videos
globalThis.vref = vref
globalThis.channels = channels
globalThis.cref = cref
router.beforeEach((to, from, next) => {
  if (!currentRoom.isRoot && !to.query?.room) {
    next({ ...to, query: { room: currentRoom.pub } });
  } else {
    next();
  }
});
