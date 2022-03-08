<script setup lang="ts">

import { computed } from 'vue'
const { t } = useI18n()

const routes = {
  "/space/": "Space",
  "/chats/": "Chats",
  "/posts/": "Posts",
  "/users/": "Users",
  "/rooms/": "Rooms",
};

const icons = {
  'Space': 'ic-round-filter-center-focus'
}

import { useUser, currentRoom, useBackground, useColor } from '@composables';
const { user } = useUser()
const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200 }))
const color = useColor('light')

// img.w-18.transition-all.duration-500.ease-in-out(src="/favicon.svg")
// a.fixed.left-0.top-0.z-1000(href="/#")
//   p.font-bold.text-6xl.text-left.text-green-500.text-opacity-50.write-vertical-right.text-stroke-sm.text-stroke-blue-500 M
//  .w-4.h-12
//  @apply p-1 py-2 sm_px-2 md_px-4 lg_px-8 rounded-xl cursor-pointer flex items-center;
//  router-link.link(to="/")
//    a(href="/")
</script>

<template lang="pug">
.flex.flex-col
  .min-h-4vh.md_min-h-6vh.justify-between.flex.flex-wrap.items-center.gap-2.p-2.bg-light-900.shadow-xl.z-400.sticky.w-full.bg-cover.top-0(
    :style="{ ...bg }"
    )
    router-link.link(to="/")
      .bg-transparent.font-bold.text-4xl.text-left.write-vertical-right.text-green-700.text-opacity-10.text-stroke-sm.text-stroke-blue-700 M
    router-link.link(to="/videos/")
      ph-video-camera
      .hidden.md_block {{ t('pages.videos') }}
    router-link.link(to="/space/")
      ph-hands-clapping
      .hidden.md_block {{ t('pages.space') }}
    router-link.link(to="/posts/")
      ph-newspaper
      .hidden.md_block {{ t('pages.posts') }}
    router-link.link(to="/chats/")
      ph-chats-teardrop
      .hidden.md_block {{ t('pages.chats') }}
    router-link.link(to="/rooms/")
      ph-house
      .hidden.md_block {{ t('pages.rooms') }}
    user-icon(
      :size="32"
      @user="$router.push(`/users/${$event}`)" @room="$router.push(`/rooms/${$event}`)"
      @post="$router.push(`/posts/${$event}`)"
      @chat="$router.push(`/users/${$event}/chat`)"
      )
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

