<script setup lang="ts">
import { ref } from "vue"
import { useToggle } from "@vueuse/core"
import { isDark, toggleDark } from '../logic'
import { prefers } from "../stores"
import { globalState } from '../stores/globalState'
const { t } = useI18n()
const flag_settings = ref(false)
const flag_info = ref(false)
const toggleInfo = useToggle(flag_info)
const toggleSettings = useToggle(flag_settings)
const settings_prefers = ref(prefers)
watch(flag_settings, (value, old_value) => {
  prefers.save()
})
// <button class="mx-auto mx-4" @click="toggleDark()">
//    <button class="mx-auto mx-4" :title="t('button.toggle_dark')" @click="toggleDark()">
</script>

<template>
  <nav class="flex justify-center items-center text-center text-xl py-1 mx-auto">
    <button :title="t('button.toggle_dark')" @click="toggleDark()">
      <ph-sun class="mx-2" v-if="isDark" />
      <ph-moon class="mx-2" v-else />
    </button>
    <button :title="t('button.settings')" @click="toggleSettings()">
      <ph-gear class="mx-2" />
    </button>
    <button :title="t('button.info')" @click="toggleInfo()">
      <ph-info class="mx-2" />
    </button>
  </nav>
  <div class="grid grid-col place-content-center" v-if="flag_info">
    <div class="mt-8 max-w-md">
      <div class="grid grid-cols-1 gap-6 text-gray-700 dark_text-gray-500">
        <code>
          <pre>
            {{ globalState.safearea }}
            {{ globalState.platform }}
          </pre>
        </code>
      </div>
    </div>
  </div>
  <div class="grid grid-col place-content-center" v-if="flag_settings">
    <div class="mt-8 max-w-md">
      <div class="grid grid-cols-1 gap-6 text-gray-700 dark_text-gray-500">
        <label class="block">
          <input type="checkbox" v-model="prefers.youtubeAccess" class="mt-1 mr-4" />
          <span> {{ t('pages.youtube_access') }}? {{ prefers.youtubeAccess }}</span>
        </label>
        <label v-show="prefers.youtubeAccess" class="block">
          <span>Youtube API Key</span>
          <input type="text" v-model.lazy="prefers.youtubeAppKey" class="mt-1 block w-full" placeholder="google api key" />
        </label>
        <label v-show="prefers.youtubeAccess" class="block">
          <span> {{ t('pages.youtube_per_query') }} </span>
          <input type="text" v-model.number="prefers.maxResults" class="mt-1 block w-full" :placeholder="t('pages.youtube_per_query')" />
        </label>
        <label class="block">
          <span>{{ t('pages.youtube_playback_rate') }}</span>
          <input type="number" v-model.number="prefers.playbackRate"  class="mt-1 block w-full" placeholder="0.5 0.75 1.0 1.25 1.5 1.75 2.0" />
        </label>
      </div>
    </div>
  </div>
</template>
