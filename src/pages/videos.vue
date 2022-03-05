<script setup lang="ts">
import YoutubeVideos from '~/components/YoutubeVideos.vue'
import YoutubePlayer from '~/components/YoutubePlayer.vue'
import Navier from '~/components/Navier.vue'
// import VuePlyr from 'vue-plyr'
// import 'vue-plyr/dist/vue-plyr.css'
// replaced dyanmicaly
import { useTimeAgo } from '@vueuse/core'
</script>

<template>
  <div class="bg-black min-w-xs md_px-12 lg_px-24 xl_px-48">
    <YoutubePlayer />
  </div>
  <div class="bg-cyan-300">
    <Navier />
  </div>
  <div class="bg-white dark_bg-gray-800 grid grid-col grid-cols-1 gap-2 min-w-xs place-content-center sm_px-2 sm_gap-4 md_px-4 md_gap-6 md_grid-cols-2 lg_gap-8 lg_grid-cols-3 xl_grid-cols-4 text-center text-gray-700 dark_text-gray-200">
    <YoutubeVideos />
  </div>
</template>
