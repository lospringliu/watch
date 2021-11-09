<script setup lang="ts">
import { IVideo } from "../types"
import { onMounted } from "vue"
import { PlayIcon, ViewListIcon } from '@heroicons/vue/outline'
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
    <PlayIcon class="absolute w-8 h-8 text-white left-0 bottom-0 hover:scale-125 hover:text-teal-300" @click="play" />
    <ViewListIcon class="absolute w-8 h-8 text-white right-0 bottom-0 hover:scale-125 hover:text-teal-300" @click="queue" />
  </div>
</template>