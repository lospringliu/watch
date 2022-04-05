<script setup lang="ts">
import { prefers } from "../stores"
// import VuePlyr from 'vue-plyr'
// import 'vue-plyr/dist/vue-plyr.css'
// replaced dyanmicaly
const date = '__DATE__'
const timeAgo = useTimeAgo(date)
</script>

<template>
  <div>
    <div v-if="prefers.youtubeAccess" class="bg-black min-w-xs md_px-12 lg_px-24 xl_px-48">
      <YoutubePlayer />
    </div>
    <div v-else class="bg-black min-w-xs md_px-12 lg_px-24 xl_px-48">
      <IpfsPlayer />
    </div>
    <div class="bg-white dark_bg-gray-800 grid grid-col grid-cols-1 gap-2 min-w-xs place-content-center sm_px-2 sm_gap-4 md_px-4 md_gap-6 md_grid-cols-2 lg_gap-8 lg_grid-cols-3 xl_grid-cols-4 text-center text-gray-700 dark_text-gray-200">
      <YoutubeVideos />
    </div>
    <div class="text-center text-blue-500">Built {{ timeAgo }}</div>
  </div>
</template>
