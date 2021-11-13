<script setup lang="ts">
import { isDark, toggleDark } from '../logic'
import { PlayIcon, ViewListIcon } from '@heroicons/vue/outline'
</script>

<template>
  <nav class="text-center text-xl mt-0 mx-auto">
    <button class="mx-auto mx-4" @click="toggleDark()">
      <PlayIcon class="w-8 h-8" v-if="isDark" />
      <ViewListIcon class="w-8 h-8" v-else />
    </button>
    <button class="mx-auto mx-4" @click="toggleDark()">
      <ViewListIcon class="w-8 h-8" v-if="isDark" />
      <PlayIcon class="w-8 h-8" v-else />
    </button>
  </nav>
</template>
