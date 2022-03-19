<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

const {
  offlineReady,
  needRefresh,
  updateServiceWorker,
} = useRegisterSW()

const close = async() => {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <div
    v-if="offlineReady || needRefresh"
    class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-teal-500"
    role="alert"
  >
    <div class="mb-1">
      <span v-if="offlineReady">
        {{ $t('pages.prompt_offline') }}
      </span>
      <span v-else>
        {{ $t('pages.prompt_reload') }}
      </span>
    </div>
    <div class="flex justify-around rounded-lg">
      <button v-if="needRefresh" @click="updateServiceWorker()" class="button text-cyan-600">
        Reload
        {{ $t('button.reload') }}
      </button>
      <button @click="close" class="button text-cyan-400">
        Close
        {{ $t('button.close') }}
      </button>
    </div>
  </div>
</template>
