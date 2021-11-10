<script setup lang="ts">
import { onMounted  } from "vue"
import YoutubeVideo from './YoutubeVideo.vue'
import useYoutubeVideos from "../composables/useYoutubeVideos"
import { videos, prefers } from "../stores/useStore"
// const { getYoutubeVideos  } = useYoutubeVideos(prefers.channels_playlists)
const { getYoutubeVideos  } = useYoutubeVideos(prefers)
setInterval(() => getYoutubeVideos(), 1000 * 60 * 60)
onMounted(async () => {
  await getYoutubeVideos()
})
</script>

<template>
  <div v-for="video in videos.videos" :key="video.videoId" class="mx-auto">
    <YoutubeVideo :videoId="video.videoId" />
  </div>
</template>