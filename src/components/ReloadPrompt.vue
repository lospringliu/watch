<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
const reloadSW: any = '__RELOAD_SW__'

const {
  offlineReady,
  needRefresh,
  updateServiceWorker,
} = useRegisterSW({
  immediate: true,
  onRegistered(r) {
    if (reloadSW === 'true') {
      r && setInterval(async() => {
        console.log('Checking for sw update')
        await r.update()
      }, 20000 /* 20s for testing purposes */)
    }
    else {
      console.log(`SW Registered: ${r}`)
    }
  },
})

const close = async() => {
  offlineReady.value = false
  needRefresh.value = false
}
//  <div v-if="offlineReady || needRefresh" class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-teal-500 z-1" role="alert">
//    <div class="mb-1">
//      <span v-if="offlineReady">
//        {{ $t('pages.prompt_offline') }}
//      </span>
//      <span v-else>
//        {{ $t('pages.prompt_reload') }}
//      </span>
//    </div>
//    <div class="flex justify-around rounded-lg">
//      <button v-if="needRefresh" @click="updateServiceWorker()" class="button text-cyan-600">
//        {{ $t('button.reload') }}
//      </button>
//      <button @click="close" class="button text-cyan-400">
//        {{ $t('button.close') }}
//      </button>
//    </div>
//    <div> <hr> </div>
//  </div>
</script>

<template>
  <div v-if="offlineReady || needRefresh" class="pwa-toast" role="alert">
    <div class="message">
      <span v-if="offlineReady">
        {{ $t('pages.prompt_offline') }}
      </span>
      <span v-else>
        {{ $t('pages.prompt_reload') }}
      </span>
    </div>
    <div class="flex justify-around">
      <button v-if="needRefresh" @click="updateServiceWorker()">
        {{ $t('button.reload') }}
      </button>
      <button @click="close">
        {{ $t('button.close') }}
      </button>
    </div>
  </div>
</template>

<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 16px;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0px #8885;
}
.pwa-toast .message {
  margin-bottom: 8px;
}
.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}
</style>