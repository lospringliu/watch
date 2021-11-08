<script setup lang="ts">
import { onMounted  } from "vue"
import Youtube from './Youtube.vue'
import useYoutubeVideos from "../composables/useYoutubeVideos"
import { videos } from "../stores/useStore"
const { getYoutubeVideos  } = useYoutubeVideos([])
setInterval(() => getYoutubeVideos(), 1000 * 60 * 60)
onMounted(async () => {
  await getYoutubeVideos()
})
</script>

<template>
  <div v-for="video in videos.videos" :key="video.videoId" class="mx-auto">
    <Youtube :videoId="video.videoId" />
  </div>
</template>