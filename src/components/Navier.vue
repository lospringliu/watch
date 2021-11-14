<script setup lang="ts">
import { isDark, toggleDark } from '../logic'
import IconSun from '~icons/heroicons-outline/sun'
import IconMoon from '~icons/heroicons-outline/moon'
import IconSettings from '~icons/carbon/settings'
</script>

<template>
  <nav class="text-center text-xl mt-0 mx-auto">
    <button class="mx-auto mx-4" @click="toggleDark()">
      <IconSun class="w-8 h-8" v-if="isDark" />
      <IconMoon class="w-8 h-8" v-else />
    </button>
    <button class="mx-auto mx-4" @click="toggleDark()">
      <IconSettings class="w-8 h-8" />
    </button>
  </nav>
</template>
