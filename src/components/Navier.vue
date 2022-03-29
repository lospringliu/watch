<script setup lang="ts">
import { isDark, toggleDark } from '../logic'
import { prefers, playlist } from "../stores"
import { useRoute } from 'vue-router'
const language = ref(null)
const route = useRoute()
const location_origin = ref(location.origin)
const { t, availableLocales, locale } = useI18n()
const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
const flag_settings = ref(false)
const flag_info = ref(false)
const flag_playlist = ref(false)
const toggleInfo = useToggle(flag_info)
const togglePlayList = useToggle(flag_playlist)
const toggleSettings = useToggle(flag_settings)
const route_videos = computed(() => /videos/.test(route.path))
const show = reactive({
  graph: false,
  log: false,
  share: false,
  info: false,
  settings: false,
})
watch(show, (value, old_value) => {
  if (value.settings && !old_value.settings) {
    prefers.save()
  } else {
    console.log(`not settings`)
  }
})
//    <button :title="t('button.relays')">
//      <UtilRelay />
//    </button>
</script>

<template>
  <nav class="flex justify-around sm_px-8 md_px-16 lg_px-32 items-center text-center bg-cyan-300 text-xl py-1 mx-auto">
    <button :title="t('button.info')" @click="show.info = !show.info">
      <ph-info />
    </button>
    <button :title="t('button.toggle_dark')" @click="toggleDark">
      <ph-sun v-if="isDark" />
      <ph-moon v-else />
    </button>
    <button ref="language" :title="t('button.toggle_langs')" @click="toggleLocales">
      <ph-translate />
    </button>
    <button :title="t('button.settings')" @click="show.settings = !show.settings">
      <ph-gear />
    </button>
    <button v-if="route_videos" :title="t('button.playlist')" @click="togglePlayList">
      <ph-playlist />
    </button>
    <button :title="t('button.graph')" @click="show.graph = !show.graph">
      <mdi-graph-outline />
    </button>
    <button v-if="!/3000/.test(location_origin)" :title="t('button.relays')">
      <UtilRelay />
    </button>
    <router-link to="/upload/">
      <ph-upload />
    </router-link>
  </nav>
  <UiLayer :open="show.graph" @close="show.graph=false">
    <UtilGraph />
  </UiLayer>
  <UiLayer :open="show.info" @close="show.info=false">
    <ShowInfo />
  </UiLayer>
  <UiLayer :open="show.settings" @close="show.settings=false">
    <Settings />
  </UiLayer>
  <div class="grid grid-col place-content-center" v-if="flag_playlist">
    <div class="mt-8 max-w-lg">
      <div class="grid grid-cols-1 gap-6 text-gray-700 dark_text-gray-500">
        <ol class="list-decimal">
          <li v-for="video of playlist.playlist" :key="video.videoId">
            {{ video.videoId }} {{ video?.channel?.name }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-light-300;
}

.link {
  @apply rounded-xl cursor-pointer flex items-center;
}
</style>