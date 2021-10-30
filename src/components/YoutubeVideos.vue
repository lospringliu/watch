<script setup lang="ts">
import { computed, onMounted  } from "vue"
import Youtube from './Youtube.vue'
import useYoutubeVideos from "../composables/useYoutubeVideos"
const { videos, getYoutubeVideos  } = useYoutubeVideos([])
const videosComputed = computed(() => videos.value.slice(0,24))
onMounted(async () => {
  await getYoutubeVideos()
})
</script>

<template>
  <div v-for="video in videosComputed" :key="video.videoId" :id="video.videoId">
    <Youtube :id="video.videoId" :title="video.videoId" :date="video.videoPublishedAt" />
  </div>
</template>