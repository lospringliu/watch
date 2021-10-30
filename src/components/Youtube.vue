<script setup lang="ts">
defineProps<{
  id: string
  title?: string
  width?: number
  height?: number
}>()
//    :width="width"
//    :height="height"
</script>

<template>
  <iframe
    :src="`https://www.youtube.com/embed/${id}`"
    :title="title"
    frameborder="1"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</template>