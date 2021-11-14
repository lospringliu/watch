<script setup lang="ts">
import { isDark, toggleDark } from '../logic'
import { SunIcon, MoonIcon, VariableIcon } from '@heroicons/vue/outline'
</script>

<template>
  <nav class="text-center text-xl mt-0 mx-auto">
    <button class="mx-auto mx-4" @click="toggleDark()">
      <SunIcon class="w-8 h-8" v-if="isDark" />
      <MoonIcon class="w-8 h-8" v-else />
    </button>
    <button class="mx-auto mx-4" @click="toggleDark()">
      <VariableIcon class="w-8 h-8" />
    </button>
  </nav>
</template>
