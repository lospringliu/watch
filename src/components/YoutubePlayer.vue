<script setup lang="ts">
import { IVideo } from "../types"
import { ref, onMounted, watch } from "vue"
import YID from "get-youtube-id"
import Youtube from './Youtube.vue'
// import useYoutubeVideos from "../composables/useYoutubeVideos"
// const { videos, getYoutubeVideos  } = useYoutubeVideos([])
//    <vue3-youtube :videoid="video.videoId" />
import { playing, playingInList, playlist, featured, prefers } from "../stores"
const youtube = ref(null)
const playingVideo = ref(null)
const play = () => {
  youtube.value.playVideo()
  youtube.value.setPlaybackRate(prefers.playbackRate)
}
const logEvent = () => console.log(`playbackRateChanged`)
watch(playlist.playlist, async (value, old_value) => {
  // console.log(youtube.value)
  let index = -1, currentTime = 0
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
      currentTime = Math.floor(youtube.value.getCurrentTime())
      playingInList.playing.currentTime = Math.floor(currentTime)
    }
  } catch (e) {}
  if (playing.playing.hasOwnProperty("videoId")) {
    index = value.findIndex(v => v.videoId === playing.playing.videoId)
    currentTime = 0
  } else if(playingInList.playing.hasOwnProperty("videoId")) {
    index = value.findIndex(v => v.videoId === playingInList.playing.videoId)
  } else {}
  if (index !== -1) {
    youtube.value.loadPlaylist(playlistVideos.join(","), index, currentTime)
  } else {
    youtube.value.loadPlaylist(playlistVideos.join(","))
  }
  youtube.value.setPlaybackRate(prefers.playbackRate)
})
playingVideo.value = featured.playing
</script>

<template>
  <Youtube
  :src="`https://www.youtube.com/watch?v=${playingVideo.videoId}`"
  @ready="play"
  ref="youtube" />
</template>