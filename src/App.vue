<script setup lang="ts">
import { currentRoom, useBackground } from "@composables"
import Videos from "./pages/videos.vue" 

// const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200, light: 0.8, overlay: 0.5 }))

// .flex.flex-col.items-end.fixed.bottom-2.left-2.z-10000
//   util-tools
//   component(:is="Videos")
// .p-0.flex.flex-col(style="flex: 1000 1 100%" :style="{ ...bg }")
// transition(name="fade" mode="out-in")
import { useTimeAgo } from '@vueuse/core'
const date = '__DATE__'
const timeAgo = useTimeAgo(date)
</script>

<template>
  <ReloadPrompt />
  <Videos />
  <div class="text-center text-blue-500">Built {{ timeAgo }}</div>
</template>

<style lang="postcss">
html {
  scroll-behavior: smooth;
  hyphens: auto;
}
body {
  @apply bg-light-400 dark_bg-dark-100;
}
#app {
  @apply w-100vw min-h-100vh flex flex-col;
}
</style>
