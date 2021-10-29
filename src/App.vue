<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useTimeAgo } from '@vueuse/core'
import ReloadPrompt from './ReloadPrompt.vue'

// replaced dyanmicaly
const date = '__DATE__'
const timeAgo = useTimeAgo(date)
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>Built at: {{ date }} {{ timeAgo }}</div>
  <ReloadPrompt />
</template>
