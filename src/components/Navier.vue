<script setup lang="ts">
import { ref } from "vue"
import { useToggle } from "@vueuse/core"
import { isDark, toggleDark } from '../logic'
import IconSun from '~icons/heroicons-outline/sun'
import IconMoon from '~icons/heroicons-outline/moon'
import IconSettings from '~icons/carbon/settings'
import { prefers } from "../stores"
const flag_settings = ref(false)
const toggleSettings = useToggle(flag_settings)
const settings_prefers = ref(prefers)
</script>

<template>
  <nav class="text-center text-xl mt-0 mx-auto">
    <button class="mx-auto mx-4" @click="toggleDark()">
      <IconSun class="w-8 h-8" v-if="isDark" />
      <IconMoon class="w-8 h-8" v-else />
    </button>
    <button class="mx-auto mx-4" @click="toggleSettings()">
      <IconSettings class="w-8 h-8" />
    </button>
  </nav>
  <div class="grid grid-col place-content-center w-sm" v-if="flag_settings">
    <div>youtube access:
      <input type="checkbox" :value="settings_prefers.youtubeAccess ? 'checked' : ''" />
    </div>
    <div v-show="settings_prefers.youtubeAccess">
      <div>youtube api key:
        <input type="text" v-model="settings_prefers.youtubeAppKey" />
      </div>
      <div>play back rate:
        <input type="number" v-model="settings_prefers.playbackRate" />
      </div>
      <div>max items per query:
        <input type="number" v-model="settings_prefers.maxResults" />
      </div>
    </div>
  </div>
</template>
