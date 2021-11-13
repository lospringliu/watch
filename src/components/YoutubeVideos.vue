<script setup lang="ts">
import { onMounted  } from "vue"
import YoutubeVideo from './YoutubeVideo.vue'
import useYoutubeVideos from "../composables/useYoutubeVideos"
import useVideoSearch from "../composables/useVideoSearch"
const { getYoutubeVideos  } = useYoutubeVideos()
const { videosMatchingSearchQuery  } = useVideoSearch()
setInterval(() => getYoutubeVideos(), 1000 * 60 * 60)
onMounted(async () => {
  await getYoutubeVideos()
})
// import { videos } from "../stores/useStore"
// <div v-for="video in videos.videos" :key="video.videoId" class="mx-auto">
</script>

<template>
  <div v-for="video in videosMatchingSearchQuery" :key="video.videoId" class="mx-auto">
    <YoutubeVideo :video="video" />
  </div>
</template>