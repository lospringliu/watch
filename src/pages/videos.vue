<script setup lang="ts">
import YoutubeVideos from '~/components/YoutubeVideos.vue'
import { useTimeAgo } from '@vueuse/core'
import ReloadPrompt from '~/components/ReloadPrompt.vue'
import YoutubePlayer from '~/components/YoutubePlayer.vue'
import Navier from '~/components/Navier.vue'
// import VuePlyr from 'vue-plyr'
// import 'vue-plyr/dist/vue-plyr.css'
// replaced dyanmicaly
const date = '__DATE__'
const timeAgo = useTimeAgo(date)
</script>

<template>
  <ReloadPrompt />
  <div class="bg-black">
    <div class="min-w-xs lg_mx-12 xl_mx-24">
      <YoutubePlayer />
    </div>
  </div>
  <div class="bg-cyan-300">
    <Navier />
  </div>
  <div class="bg-white dark_bg-gray-800 grid grid-col grid-cols-1 gap-2 min-w-xs place-content-center sm_px-2 sm_gap-4 md_px-4 md_gap-6 md_grid-cols-2 lg_gap-8 lg_grid-cols-3 xl_grid-cols-4 text-center text-gray-700 dark_text-gray-200">
    <YoutubeVideos />
  </div>
  <div class="text-center text-blue-500">Built {{ timeAgo }}</div>
</template>
