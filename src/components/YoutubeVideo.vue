<script setup lang="ts">
import { IVideo } from "../types"
import IconPlay from '~icons/heroicons-outline/play'
import IconPlaylist from '~icons/ic/outline-playlist-add-check-circle'
import { playing, playingInList, playlist, videos, filtering } from "../stores"
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
    playlist.add(video)
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
  <div class="relative cursor-pointer border-b-2 border-light-200 dark_border-dark-200 hover_opacity-90 hover_border-teal-700">
    <img :src="`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`" />
    <IconPlay class="absolute w-16 h-16 text-white left-0 bottom-0 hover_scale-125 hover_text-teal-300" @click="play" />
    <IconPlaylist class="absolute w-16 h-16 text-white right-0 bottom-0 hover_scale-125 hover_text-teal-300" @click="queue" />
    <p class="absolute left-2 top-1 font-semibold text-xl text-blue-100 hover_scale-125 hover_text-teal-300" @click="alertKeyword">{{ video.channel.title || video.channel.name }}</p>
    <p class="absolute right-2 top-1 text-blue-100">{{ timeAgo }}</p>
  </div>
</template>