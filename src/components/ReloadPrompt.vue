
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
    class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-teal-400"
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
    <div class="flex justify-between rounded-lg px-4">
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

<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0px #8885;
}
</style>
