<script setup lang="ts">
import { onMounted  } from "vue"
import YoutubeVideo from './YoutubeVideo.vue'
import useYoutubeVideos from "../composables/useYoutubeVideos"
import { videos, prefers } from "../stores/useStore"
// const timeAgo = useTimeAgo(new Date(props.videoPublishedAt))
const { getYoutubeVideos  } = useYoutubeVideos()
setInterval(() => getYoutubeVideos(), 1000 * 60 * 60)
onMounted(async () => {
  await getYoutubeVideos()
})
</script>

<template>
  <div v-for="video in videos.videos" :key="video.videoId" class="mx-auto">
    <YoutubeVideo :video="video" />
  </div>
</template>