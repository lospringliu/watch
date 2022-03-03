<script setup lang="ts">
import { ref } from "vue"
import { useToggle } from "@vueuse/core"
import { isDark, toggleDark } from '../logic'
import IconSun from '~icons/heroicons-outline/sun'
import IconMoon from '~icons/heroicons-outline/moon'
import IconSettings from '~icons/carbon/settings'
import { prefers } from "../stores"
const { t, availableLocales, locale } = useI18n()
const flag_settings = ref(false)
const flag_user = ref(false)
const toggleSettings = useToggle(flag_settings)
const toggleUser = useToggle(flag_user)
const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
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
    <button :title="t('button.toggle_langs')" @click="toggleLocales">
      <ph-translate class="mx-2" />
    </button>
    <button :title="t('button.settings')" @click="toggleSettings()">
      <ph-gear class="mx-2" />
    </button>
  </nav>
  <div class="grid grid-col place-content-center w-sm" v-if="flag_settings">
    <div class="mt-8 max-w-lg">
      <div class="grid grid-cols-1 gap-6 text-gray-700 dark_text-gray-500">
        <label class="block">
          <input type="checkbox" v-model="prefers.youtubeAccess"  class="mt-1 mr-4" />
          <span>Have Youtube access? {{ prefers.youtubeAccess }}</span>
        </label>
        <label v-show="prefers.youtubeAccess" class="block">
          <span>Youtube API Key</span>
          <input type="text" v-model.lazy="prefers.youtubeAppKey" class="mt-1 block w-full" placeholder="google api key" />
        </label>
        <label v-show="prefers.youtubeAccess" class="block">
          <span>API return max results</span>
          <input type="text" v-model.number="prefers.maxResults" class="mt-1 block w-full" placeholder="google api key" />
        </label>
        <label class="block">
          <span>Playback rate</span>
          <input type="number" v-model.number="prefers.playbackRate"  class="mt-1 block w-full" />
        </label>
      </div>
    </div>
  </div>
</template>
