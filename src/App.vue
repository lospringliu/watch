<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { watch, watchEffect, computed } from "vue";
import { currentRoom, rootRoom, useBackground } from "@composables";


const router = useRouter()
const route = useRoute();
onMounted(() => {
  console.log(`app mounted`)
  const languages = usePreferredLanguages()
  const { locale } = useI18n()
  const language = languages.value[0]
  if (language.startsWith("zh")) {
    locale.value = "zh-CN"
  } else if (language.startsWith("ru")) {
  } else {}
})
watchEffect(() => {
  if (route.query?.room) {
    currentRoom.pub = route.query.room
  }
});

watch(() => currentRoom.pub, (pub) => {
  if (pub == rootRoom.pub) {
    router.push({ path: route.path, query: {} })
  } else {
    router.push({ path: route.path, query: { room: pub } })
  }
})


//  nav-bar
const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200, light: 0.8, overlay: 0.5 }))

// .flex.flex-col.items-end.fixed.bottom-2.left-2.z-10000
//   util-tools
//  overscroll-behavior-y: contain;
//  overscroll-behavior-y: contain;
// .flex.flex-col.items-end.fixed.top-2.left-2.z-10000
//   util-tools
</script>

<template lang="pug">
.p-0.flex.flex-col.h-100vh(style="flex: 1000 1 100%" )
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in")
      keep-alive
        component.flex-auto.overflow-y-scroll(:is="Component")
</template>

<style lang="postcss">
html {
  scroll-behavior: smooth;
  hyphens: auto;
}
body {
  @apply bg-light-600 dark_bg-dark-200;
}
#app {
  @apply h-full w-full flex flex-col;
}
</style>
