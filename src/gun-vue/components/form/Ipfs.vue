<script setup>
import { ref, watch } from 'vue'
const link = ref()

const emit = defineEmits(['update', 'close']);

const props = defineProps({
  cid: { type: String }
})

const add = ref()

watch(link, lnk => {
  if (lnk) {
    emit('update', ipfsLinkParser(lnk))
  } else {
    emit('update', null)
  }
})


function ipfsLinkParser(url) {
  let kind = "ipfs"
  if (/ipns.Qm/.test(url)) { kind = "ipns" }
  const regExp = /^.*?(Qm.*)/;
  const match = url.match(regExp);
  if (match && match[1].length > 45) {
    return `${kind}/${match[1].trim()}`;
  } else {
    return null;
  }
}

const { t } = useI18n()
</script>

<template lang='pug'>
.flex.flex-wrap
  button.button.m-1(
    @click="add = !add" 
    :class="{ active: link }"
    )
    simple-icons-ipfs
  ui-layer(:open="add" @close="add = false" :offset="'12vh'")
    .p-4.text-lg
      .flex.items-center.mb-2.gap-2
        simple-icons-ipfs.text-2xl
        .text-xl.ml-2.font-bold {{ t('gunvue.form_ipfs') }}
        .flex-1
        button.button.text-xl
          la-check(@click="add = false")
        button.button.text-xl
          la-trash-alt(@click="link = null; add = false")
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
