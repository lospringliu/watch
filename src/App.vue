<script setup lang="ts">
import YoutubeVideos from './components/YoutubeVideos.vue'
import { useTimeAgo } from '@vueuse/core'
import ReloadPrompt from './components/ReloadPrompt.vue'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
// replaced dyanmicaly
const date = '__DATE__'
const timeAgo = useTimeAgo(date)
</script>

<template>
  <!--
  <div class="md:col-span-2 lg:col-span-3 xl:col-span-4">
    <div class="grid aspect-w-16 aspect-h-9">
    <iframe id="player" type="text/html" width="100%"
       src="http://www.youtube.com/embed/145dWxNpwLU?enablejsapi=1&origin=http://localhost:3000"
       frameborder="0">
    </iframe>
    </div>
  </div>
  -->
  <div class="md:col-span-2 lg:col-span-3 xl:col-span-4">
    <vue-plyr>
      <div data-plyr-provider="youtube" data-plyr-embed-id="WBt6NZJ985o"></div>
    </vue-plyr>
  </div>
  <YoutubeVideos />
  <div class="md:col-span-2 lg:col-span-3 xl:col-span-4 text-center text-blue-500">Built {{ timeAgo }}</div>
  <ReloadPrompt />
</template>
