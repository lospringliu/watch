<script setup lang="ts">
import { UseTimeAgo } from '@vueuse/components'
defineProps<{
  id: string
  title?: string
  date?: string
  width?: number
  height?: number
}>()
//    :width="width"
//    :height="height"
</script>

<template>
  <div class="grid aspect-w-16 aspect-h-9">
  <iframe
    :src="`https://www.youtube.com/embed/${id}`"
    :title="title"
    frameborder="1"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
  </div>
  <div class="min-w-xs min-h-4">
  <UseTimeAgo v-slot="{ timeAgo }" :time="new Date(date)">
    {{ timeAgo }}
  </UseTimeAgo>
  </div>
</template>