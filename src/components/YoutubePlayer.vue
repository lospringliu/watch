<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import YID from "get-youtube-id"
import Youtube from './Youtube.vue'
// import useYoutubeVideos from "../composables/useYoutubeVideos"
// const { videos, getYoutubeVideos  } = useYoutubeVideos([])
//    <vue3-youtube :videoid="video.videoId" />
import { playing, playlist, videos, prefers } from "../stores/useStore"
const youtube = ref(null)
const play = () => {
  youtube.value.seekTo(playing.playing?.currentTime || 1)
  youtube.value.playVideo()
  youtube.value.setPlaybackRate(prefers.playbackRate)
}
watch(playing.playing, async (value, old_value) => {
  youtube.value.setPlaybackRate(prefers.playbackRate)
})
watch(playlist.playlist, async (value, old_value) => {
  // console.log(youtube.value)
  const playlistVideos = value.map(video => video.videoId)
  const index = playlistVideos.findIndex(v => v === (playing.playing.videoId || ""))
  try {
    const videoId = YID(youtube.value.getVideoUrl())
    if (videoId) {
      const video = videos.videos.find(v => v.videoId === videoId)
      // if (video) { playing.playing = video }
      const currentTime = youtube.value.getCurrentTime()
      console.log(currentTime)
      // playing.playing.currentTime = Math.floor(currentTime)
    }
  } catch (e) {}
  if (index !== -1) {
    youtube.value.loadPlaylist(playlistVideos.join(","), index)
  } else {
    youtube.value.loadPlaylist(playlistVideos.join(","))
  }
  youtube.value.setPlaybackRate(prefers.playbackRate)
})
</script>

<template>
  <Youtube
  :src="`https://www.youtube.com/watch?v=${playing.playing.videoId}`"
  @ready="play"
  ref="youtube" />
</template>