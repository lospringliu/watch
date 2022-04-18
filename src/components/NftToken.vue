<script setup lang="ts">
import { INftToken } from "../types"
import { useTimeAgo } from '@vueuse/core'
const props = defineProps<{
  token: INftToken 
}>()
const detail = ref(false)
const goto = () => {
  
}
</script>

<template>
  <div class="relative cursor-pointer border-b-2 border-light-200 dark_border-dark-200 hover_opacity-90 hover_border-teal-700">
    <img :src="token.image" />
    <p class="absolute text-center top-1 font-semibold text-xl text-teal-700 hover_scale-125 hover_text-teal-400" @click="goto()">{{ token.name }}</p>
  </div>
</template>