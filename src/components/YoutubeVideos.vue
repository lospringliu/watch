<script setup lang="ts">
import { ref, computed, onMounted  } from "vue"
import Youtube from './Youtube.vue'
import useYoutubeVideos from "../composables/useYoutubeVideos"
const { videos, getYoutubeVideos  } = useYoutubeVideos([])
const videosComputed = computed(() => videos.value.slice(0,24))
onMounted(async () => {
  await getYoutubeVideos()
})
//    <vue3-youtube :videoid="video.videoId" />
</script>

<template>
  <div v-for="video in videosComputed" :key="video.videoId" :id="video.videoId">
    <Youtube :id="video.videoId" :title="video.videoId" />
  </div>
</template>