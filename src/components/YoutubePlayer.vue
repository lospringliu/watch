<script setup lang="ts">
import { IVideo } from "../types"
import { ref, onMounted, watch } from "vue"
import YID from "get-youtube-id"
import Youtube from './Youtube.vue'
// import useYoutubeVideos from "../composables/useYoutubeVideos"
// const { videos, getYoutubeVideos  } = useYoutubeVideos([])
//    <vue3-youtube :videoid="video.videoId" />
import { playing, playingInList, playlist, videos, prefers } from "../stores/useStore"
const youtube = ref(null)
const play = () => {
  youtube.value.playVideo()
  youtube.value.setPlaybackRate(prefers.playbackRate)
}
watch(playing.playing, async (value, old_value) => {
  youtube.value.setPlaybackRate(prefers.playbackRate)
})
watch(playlist.playlist, async (value, old_value) => {
  // console.log(youtube.value)
  const playlistVideos = value.map(video => video.videoId)
  try {
    const videoId = YID(youtube.value.getVideoUrl())
    if (videoId) {
      const currentVideo = value.find(v => v.videoId === videoId)
      if (currentVideo) {
        playingInList.playing = JSON.parse(JSON.stringify(currentVideo))
      } else {
        playingInList.playing = JSON.parse(JSON.stringify(value[0]))
      }
      const currentTime = Math.floor(youtube.value.getCurrentTime())
      playingInList.playing.currentTime = Math.floor(currentTime)
    }
  } catch (e) {}
  const index = playlistVideos.findIndex(v => v === (playingInList.playing.videoId || ""))
  if (index !== -1) {
    youtube.value.loadPlaylist(playlistVideos.join(","), index, playingInList.playing.currentTime)
    // setTimeout(() => youtube.value.seekTo(playingInList.playing?.currentTime || 1), 1000)
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