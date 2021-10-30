<script setup lang="ts">
import { ref, onMounted  } from "vue"
import Youtube from './Youtube.vue'
import useYoutubeVideos from "../composables/useYoutubeVideos"
const { videos, getYoutubeVideos  } = useYoutubeVideos([])
onMounted(async () => {
  await getYoutubeVideos()
})
//    <vue3-youtube :videoid="video.videoId" />
</script>

<template>
  <div v-for="video in videos" :key="video.videoId" class="grid">
    <Youtube :id="video.videoId" />
  </div>
</template>