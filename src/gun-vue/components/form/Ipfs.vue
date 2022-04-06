<script setup>
import { ref, watch } from 'vue'
const link = ref()

const emit = defineEmits(['update:cid']);

const props = defineProps({
  cid: { type: String }
})

watch(link, lnk => {
  if (lnk) {
    emit('update:cid', ipfsLinkParser(lnk))
  } else {
    emit('update:cid', null)
  }
})


function ipfsLinkParser(url) {
  var regExp = /^.*?(Qm.*)/;
  var match = url.match(regExp);
  if (match && match[1].length > 45) {
    return match[1].trim();
  } else {
    return null;
  }
}

const { t } = useI18n()
</script>

<template lang='pug'>
.p-4.text-lg
  .flex.items-center.mb-2
    simple-icons-ipfs
    .text-xl.ml-2.font-bold {{ t('gunvue.form_ipfs') }}
  input.p-4.my-4.w-full.border-1.border-dark-300(v-model="link" autofocus :placeholder="t('gunvue.form_ipfs_video')")
  embed-ipfs.min-w-80vw.mt-2(v-if="cid" :video="cid")
</template>

<style lang="postcss" scoped>
input,
textarea {
  @apply p-2 rounded-xl m-1;
}
.active {
  @apply bg-fuchsia-500;
}
</style>
