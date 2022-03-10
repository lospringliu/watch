<template>
  <main>
    <ReloadPrompt />
    <router-view />
    <div :style="style">
      <hr>
    </div>
    <div ref="navbar" class="fixed left-0 bottom-0 z-400 inset-x-0 opacity-95">
      <nav-bar />
    </div>
  </main>
</template>
<script setup lang="ts">
import { globalState } from '../stores/globalState'
const {
  top,
  right,
  bottom,
  left,
} = useScreenSafeArea()
globalState.safearea = {top, right, bottom, left}
const navbar = ref(null)
const { height } = useElementSize(navbar)
// const clstop = computed(() => `top-${top.value}`)
// const stltop = computed(() => `padding-top: ${top.value === "0px" ? +top.value.replace("px","") - 21 : 0}px;`)
const style = computed(() => `padding-top: ${Math.floor(height.value)}px;`)
</script>