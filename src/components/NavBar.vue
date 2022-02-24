<script setup>

import { computed } from 'vue'

const routes = {
  "/videos/": "Videos",
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
</script>

<template lang="pug">
.flex.flex-col
  a.fixed.left-0.top-0.z-1000.hidden.sm_block(href="/#")
    p.font-bold.text-6xl.text-left.text-green-500.text-opacity-50.write-vertical-right.text-stroke-sm.text-stroke-blue-500 W
  .min-h-4vh.md_min-h-6vh.flex.flex-wrap.items-center.gap-2.p-2.bg-light-900.shadow-xl.z-400.sticky.w-full.bg-cover.top-0(
    :style="{ ...bg }"
    )
    .w-4.h-12
    .flex-1.hidden.sm_block
    router-link.link(
      v-for="(link, l) in routes" :key="link" 
      :to="l" ) 
      ph-video-camera(v-if="link == 'Videos'")
      ph-hands-clapping(v-if="link == 'Space'")
      ph-newspaper(v-if="link == 'Posts'")
      ph-house(v-if="link == 'Rooms'")
      ph-chats-teardrop(v-if="link == 'Chats'")
      ph-users(v-if="link == 'Users'")
      .hidden.md_block {{ link }}
    .flex-1.hidden.sm_block
    user-icon(
      :size="40"
      @user="$router.push(`/users/${$event}`)" @room="$router.push(`/rooms/${$event}`)"
      @post="$router.push(`/posts/${$event}`)"
      )
    room-icon.hidden.md_block(@room="$router.push(`/rooms/${$event}`)" @rooms="$router.push(`/rooms/`)")

    
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-light-300;
}

.link {
  @apply p-1 py-2 sm_px-2 md_px-4 lg_px-8 rounded-xl cursor-pointer flex items-center;
}
</style>

