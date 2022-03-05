<script setup lang="ts">
import { watch, watchEffect, computed } from "vue";
import { currentRoom, rootRoom, useBackground } from "@composables";
import Videos from "@/pages/videos.vue"


//  nav-bar
const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200, light: 0.8, overlay: 0.5 }))

// .flex.flex-col.items-end.fixed.bottom-2.left-2.z-10000
//   util-tools
//   component(:is="Videos")
// .p-0.flex.flex-col(style="flex: 1000 1 100%" :style="{ ...bg }")
</script>

<template lang="pug">
transition(name="fade" mode="out-in")
  Videos
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
