<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import Vue3Youtube from './Vue3Youtube.vue'
// import useYoutubeVideos from "../composables/useYoutubeVideos"
// const { videos, getYoutubeVideos  } = useYoutubeVideos([])
//    <vue3-youtube :videoid="video.videoId" />
import { playing, playlist } from "../stores/useStore"
const youtube = ref(null)
watch(playlist.playlist, (value, old_value) => {
  const videos = value.map(video => video.videoId)
  const index = videos.findIndex(v => v === playing.playing.videoId)
  if (index !== -1) {
    youtube.value.loadPlaylist(videos.join(","), index)
  } else {
    youtube.value.loadPlaylist(videos.join(","))
  }
})
</script>

<template>
  <Vue3Youtube
  :src="`https://www.youtube.com/watch?v=${playing.playing.videoId}`"
  @ready="()=>{}"
  ref="youtube" />
</template>