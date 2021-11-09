<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import Vue3Youtube from './Vue3Youtube.vue'
// import useYoutubeVideos from "../composables/useYoutubeVideos"
// const { videos, getYoutubeVideos  } = useYoutubeVideos([])
//    <vue3-youtube :videoid="video.videoId" />
import { playing, playlist, videos } from "../stores/useStore"
const youtube = ref(null)
watch(playlist.playlist, async (value, old_value) => {
  console.log(youtube.value)
  const playlistVideos = value.map(video => video.videoId)
  const index = playlistVideos.findIndex(v => v === playing.playing.videoId)
  // try {
  //   const videoId = youtube.value.getVideoEmbedCode()
  //   console.log(`videoId=${videoId}`)
  //   const currentTime = youtube.value.getCurrentTime()
  //   console.log(`currentTime=${currentTime}`)
  //   playing.playing = videos.videos.find(v => v.videoId === videoId)
  //   playing.playing.currentTime = currentTime
  // } catch (e) {}
  if (index !== -1) {
    youtube.value.loadPlaylist(playlistVideos.join(","), index)
  } else {
    youtube.value.loadPlaylist(playlistVideos.join(","))
  }
  youtube.value.setPlaybackRate(1.5)
})
</script>

<template>
  <Vue3Youtube
  :src="`https://www.youtube.com/watch?v=${playing.playing.videoId}`"
  @ready="()=>{}"
  ref="youtube" />
</template>