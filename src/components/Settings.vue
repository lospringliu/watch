
<script setup lang="ts">
import { prefers } from "../stores"
const { t } = useI18n()
</script>

<template>
  <div class="grid grid-col place-content-center p-8">
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
          <span>{{ t('pages.ipfs_gateway') }}</span>
          <input type="text" v-model.lazy="prefers.ipfsGateway" class="mt-1 block w-full" placeholder="ipfs gateway url" />
        </label>
        <label class="block">
          <span>{{ t('pages.youtube_playback_rate') }}</span>
          <input type="number" v-model.number="prefers.playbackRate"  class="mt-1 block w-full" placeholder="0.5 0.75 1.0 1.25 1.5 1.75 2.0" />
        </label>
      </div>
  </div>
</template>
