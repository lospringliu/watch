import { createApp } from "vue";
import App from "./App.vue";
import { useVideos } from "@/composables/useVideos"

import "virtual:windi.css";
import "@components/styles/index.css";

Promise.resolve().then(async () => {
  const {vref, cref, gvideos, gchannels} = await useVideos()
  globalThis.gvideos = gvideos
  globalThis.vref = vref
  globalThis.gchannels = gchannels
  globalThis.cref = cref
}) 

const app = createApp(App);
Object.values(import.meta.globEager('./modules/*.ts')).forEach(i => i.install?.({ app }))
app.mount("#app");
