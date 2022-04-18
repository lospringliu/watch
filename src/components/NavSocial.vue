<script setup lang="ts">
import { globalState } from "../stores/globalState"
const { t } = useI18n()
onMounted(() => {
  // const { x, y, top, right, bottom, left, width, height } = useElementBounding(language)
  // globalState.language = { x, y, top, right, bottom, left, width, height }
})

const routes = {
  "/space/": "Space",
  "/chats/": "Chats",
  "/posts/": "Posts",
  "/users/": "Users",
  "/rooms/": "Rooms",
  "/upload/": "VUpload",
};

import { useUser, currentRoom, useBackground, useColor } from '../gun-vue/composables';
const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200 }))
const color = useColor('light')
// flex justify-around sm_px-8 md_px-16 lg_px-32 items-center text-center bg-cyan-300 text-xl py-1 mx-auto"
</script>

<template lang="pug">
.flex.justify-around.sm_px-8.md_px-16.lg_px-32.items-center.text-center.bg-cyan-300.text-xl.py-1.mx-auto
  router-link.link(to="/space/")
    ph-hands-clapping
    .hidden.md_block {{ t('pages.space') }}
  router-link.link(to="/topics/")
    la-broadcast-tower
    .hidden.md_block {{ t('pages.topics') }}
  router-link.link(to="/posts/")
    ph-newspaper
    .hidden.md_block {{ t('pages.posts') }}
  router-link.link(to="/users/")
    ph-users
    .hidden.md_block {{ t('pages.users') }}
  router-link.link(to="/dict/")
    ph-books
    .hidden.md_block {{ t('pages.dicts') }}
  router-link.link(to="/rooms/")
    simple-icons-qzone 
    .hidden.md_block {{ t('pages.rooms') }}
  room-icon.hidden.lg_block(@room="$router.push(`/rooms/${$event}`)" @rooms="$router.push(`/rooms/`)")
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-light-300;
}

.link {
  @apply rounded-xl cursor-pointer flex items-center;
}
</style>

