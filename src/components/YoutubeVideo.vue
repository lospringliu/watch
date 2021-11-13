<script setup lang="ts">
import { IVideo } from "../types"
import { PlayIcon, ViewListIcon } from '@heroicons/vue/outline'
import { playing, playingInList, playlist, videos, filtering } from "../stores/useStore"
import { useTimeAgo } from '@vueuse/core'
const props = defineProps<{
  video: IVideo 
}>()
const play = () => {
  const video = videos.videos.find(v => v.videoId === props.video.videoId)
  playing.playing = JSON.parse(JSON.stringify(props.video))
  let index = -1
  if (playingInList.playing.hasOwnProperty("videoId")) {
    index = playlist.playlist.findIndex(v => v.videoId === playingInList.playing.videoId)
  }
  if (index === -1) {
    playlist.playlist.push(video)
  } else {
    playlist.playlist.splice(index, 0, video)
  }
}
const queue = () => {
  playing.playing = {} as IVideo
  playlist.add(videos.videos.find(v => v.videoId === props.video.videoId))
}
const timeAgo = useTimeAgo(new Date(props.video.videoPublishedAt))
const alertKeyword = () => {
  if (filtering.channel === props.video.channel.name) {
    filtering.setChannel({name: "", id: ""})
  } else {
    filtering.setChannel(props.video.channel)
  }
}
</script>

<template>
  <div class="relative cursor-pointer border-y-2 border-light-100 dark:border-light-800 hover:opacity-90 hover:border-teal-700">
    <img :src="`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`" />
    <PlayIcon class="absolute w-16 h-16 text-white left-0 bottom-0 hover:scale-125 hover:text-teal-300" @click="play" />
    <ViewListIcon class="absolute w-16 h-16 text-white right-0 bottom-0 hover:scale-125 hover:text-teal-300" @click="queue" />
    <p class="absolute left-2 top-1 font-semibold text-2xl text-blue-100 hover:scale-125 hover:text-teal-300" @click="alertKeyword">{{ video.channel.name }}</p>
    <p class="absolute right-2 top-1 text-blue-100">{{ timeAgo }}</p>
  </div>
</template>