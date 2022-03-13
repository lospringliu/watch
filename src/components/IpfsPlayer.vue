<script setup lang="ts">
// import { IVideoProp } from "../types"
interface IVideoProp {
  video?: string
  ipfsGateway?: string
}
import { globalState } from '../stores/globalState'
onMounted(async () => {
  await globalState.ipfs_load()
  await globalState.ipfs_create()
})
const props = withDefaults(
  defineProps<IVideoProp>(), {
    video: "QmVMMxTVNNixbJMVU1wjwfBgZCr3pJCRLp7BNAdmLhs7gn",
    ipfsGateway: `https://gateway.ipfs.io/`
  }
)
</script>

<template lang="pug">
.iframe-container
  iframe.shadow-2xl.overflow-hidden.mx-auto(
    v-if="!globalState.ipfs_supported"
    loading="lazy"
    :src="`${ipfsGateway}/ipfs/${video}`",
    title="IPFS video player",
    frameborder="0",
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowfullscreen
    )
  iframe.shadow-2xl.overflow-hidden.mx-auto(
    loading="lazy"
    :src="`https://youtube.com/embed/0Fxua8kJOmE`",
    title="IPFS video player",
    frameborder="0",
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowfullscreen
    )
</template>
<style scoped>
.iframe-container {
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;
}
.iframe-container iframe {
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>