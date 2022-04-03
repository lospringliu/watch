<script setup lang="ts">
import VUpload from "../components/VUpload.vue"
import { user } from "../gun-vue/composables"
const { t } = useI18n()
</script>

<template>
  <div v-if="user.is" class="min-h-80vh flex flex-col justify-center items-around">
    <VUpload />
  </div>
  <div v-else class="flex flex-col justify-center items-center min-h-80vh min-w-80vw">
    {{ t('wallets.login_first') }}
  </div>
</template> 
