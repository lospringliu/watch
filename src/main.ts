import { createApp } from "vue";
import platform from 'platform-detect'
import { globalState } from './stores/globalState'

import "virtual:windi.css";
import "@components/styles/index.css";
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

import App from "./App.vue";
import { useVideos } from "./composables/useVideos"

watch(globalState, (value, old_value) => {
  console.log(`... watched ...`)
  console.log(value)
})
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
