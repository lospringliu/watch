<script setup lang="ts">
import YoutubeVideos from './components/YoutubeVideos.vue'
import { useTimeAgo } from '@vueuse/core'
import ReloadPrompt from './components/ReloadPrompt.vue'
// replaced dyanmicaly
const date = '__DATE__'
const timeAgo = useTimeAgo(date)
</script>

<template>
  <YoutubeVideos />
  <div class="grid md:col-span-2 lg:col-span-3 xl:col-span-4 text-center text-blue-500">Built {{ timeAgo }}</div>
  <ReloadPrompt />
</template>
