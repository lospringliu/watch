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
const { user } = useUser()
watchEffect(() => console.log(user))
const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200 }))
const color = useColor('light')
</script>

<template lang="pug">
.flex.flex-col
  .min-h-4vh.md_min-h-6vh.justify-around.flex.flex-wrap.items-center.bg-light-900.shadow-xl.z-400.text-xl.sticky.w-full.bg-cover.top-0(
    :style="{ ...bg }"
    )
    router-link.link(to="/space/")
      ph-hands-clapping
      .hidden.md_block {{ t('pages.space') }}
    router-link.link(to="/posts/")
      ph-newspaper
      .hidden.md_block {{ t('pages.posts') }}
    router-link.link(to="/chats/")
      ph-chats-teardrop
      .hidden.md_block {{ t('pages.chats') }}
    router-link.link(to="/users/")
      ph-users
      .hidden.md_block {{ t('pages.users') }}
    router-link.link(to="/rooms/")
      ph-house
      .hidden.md_block {{ t('pages.rooms') }}
    room-icon.hidden.lg_block(@room="$router.push(`/rooms/${$event}`)" @rooms="$router.push(`/rooms/`)")
    <button :title="t('button.close')" @click="globalState.show_social=false">
      <ph-x-circle class="mx-2" />
    </button>
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-light-300;
}

.link {
  @apply rounded-xl cursor-pointer flex items-center;
}
</style>

