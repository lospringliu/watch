<script setup lang="ts">
import { currentRoom, useBackground } from "@composables";


//  nav-bar
const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200, light: 0.8, overlay: 0.5 }))

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
  <div>
    <div class="bg-black min-w-xs md_px-12 lg_px-24 xl_px-48">
      <YoutubePlayer />
    </div>
    <div class="bg-cyan-300">
      <Navier />
    </div>
    <div class="bg-white dark_bg-gray-800 grid grid-col grid-cols-1 gap-2 min-w-xs place-content-center sm_px-2 sm_gap-4 md_px-4 md_gap-6 md_grid-cols-2 lg_gap-8 lg_grid-cols-3 xl_grid-cols-4 text-center text-gray-700 dark_text-gray-200">
      <YoutubeVideos />
    </div>
    <div class="text-center text-blue-500">Built {{ timeAgo }}</div>
  </div>
</template>

<style lang="postcss">
html {
  scroll-behavior: smooth;
  hyphens: auto;
  overscroll-behavior-y: contain;
}
body {
  @apply bg-light-400 dark_bg-dark-100;
  overscroll-behavior-y: contain;
}
#app {
  @apply min-h-100vh flex flex-col;
}
</style>
