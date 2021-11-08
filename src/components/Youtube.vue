<script setup lang="ts">
import { IVideo } from "../types"
import { onMounted } from "vue"
import { playing, playlist, videos } from "../stores/useStore"
const props = defineProps<{
  videoId: string
}>()
const play = () => {
  playing.playing = videos.videos.find(v => v.videoId === props.videoId)
}
const queue = () => {
  playlist.add(videos.videos.find(v => v.videoId === props.videoId))
}
</script>

<template>
  <div class="relative">
    <img :src="`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`" />
    <p class="absolute text-white font-4xl left-0 bottom-0" @click="play">PLAY</p>
    <p class="absolute text-white font-4xl right-0 bottom-0" @click="queue">QUEUE</p>
  </div>
</template>