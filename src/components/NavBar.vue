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
};

const icons = {
  'Space': 'ic-round-filter-center-focus'
}

import { useUser, currentRoom, useBackground, useColor } from '@composables';
const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200 }))
const color = useColor('light')

</script>

<template lang="pug">
.flex.flex-col
  .min-h-4vh.md_min-h-6vh.justify-around.flex.flex-wrap.items-center.bg-light-900.shadow-xl.z-400.text-xl.sticky.w-full.bg-cover.top-0(
    :style="{ ...bg }"
    )
    router-link.link(to="/")
      .bg-transparent.font-bold.py-2.text-4xl.text-left.write-vertical-right.text-green-700.text-opacity-10.text-stroke-sm.text-stroke-blue-700 M
    <button v-if="!globalState.show_social" :title="t('button.social')" @click="globalState.show_social=!globalState.show_social">
      <ph-users />
    </button>
    router-link.link(to="/videos/")
      ph-video-camera
      .hidden.md_block {{ t('pages.videos') }}
    <button v-if="!globalState.show_tools" :title="t('button.tools')" @click="globalState.show_tools=!globalState.show_tools">
      <ph-gear />
    </button>
    user-icon(
      :size="32"
      @user="$router.push(`/users/${$event}`)" @room="$router.push(`/rooms/${$event}`)"
      @post="$router.push(`/posts/${$event}`)"
      @chat="$router.push(`/users/${$event}/chat`)"
      )

    
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-light-300;
}

.link {
  @apply rounded-xl cursor-pointer flex items-center;
}
</style>

