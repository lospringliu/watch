<script setup lang="ts">
import { IVideo } from "../types"
import { onMounted, PropType } from "vue"
import { PlayIcon, ViewListIcon } from '@heroicons/vue/outline'
import { playing, playlist, videos } from "../stores/useStore"
import { useTimeAgo } from '@vueuse/core'
const props = defineProps<{
  video: IVideo 
}>()
const play = () => {
  playing.playing = videos.videos.find(v => v.videoId === props.video.videoId)
}
const queue = () => {
  playlist.add(videos.videos.find(v => v.videoId === props.video.videoId))
}
const timeAgo = useTimeAgo(new Date(props.video.videoPublishedAt))
</script>

<template>
  <div class="relative">
    <img :src="`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`" />
    <PlayIcon class="absolute w-16 h-16 text-white left-0 bottom-0 hover:scale-125 hover:text-teal-300" @click="play" />
    <ViewListIcon class="absolute w-16 h-16 text-white right-0 bottom-0 hover:scale-125 hover:text-teal-300" @click="queue" />
    <p class="absolute left-1 top-0 text-blue-200">
      {{ timeAgo }}
    </p>
  </div>
</template>