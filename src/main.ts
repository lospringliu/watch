import { pinia } from "./stores"
import { createApp } from "vue";
import App from "./app.vue";

import "./index.css";
// import "virtual:windi.css";
import "@components/styles/index.css";

import { createRouter, createWebHashHistory } from "vue-router";
import routes from "~pages";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes],
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

app.use(router).mount("#app");

import { currentRoom } from "@composables";

router.beforeEach((to, from, next) => {
  if (!currentRoom.isRoot && !to.query?.room) {
    next({ ...to, query: { room: currentRoom.pub } });
  } else {
    next();
  }
});
