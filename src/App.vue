<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import ReloadPrompt from './components/ReloadPrompt.vue'
import Vue3Youtube from './components/Vue3Youtube.vue'
import YoutubeVideos from './components/YoutubeVideos.vue'

// replaced dyanmicaly
const date = '__DATE__'
const timeAgo = useTimeAgo(date)
</script>

<template>
  <youtube-videos />
  <div>Built {{ timeAgo }}</div>
  <ReloadPrompt />
</template>
