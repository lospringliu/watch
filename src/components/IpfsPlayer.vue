<script setup lang="ts">
import type { IVideo } from "../types"
interface IVideoProp {
  video?: IVideo
  // video?: string
  ipfsGateway?: string
}
import { globalState } from '../stores/globalState'
import { prefers } from '../stores'
onMounted(async () => {
  await globalState.ipfs_load()
  await globalState.ipfs_create()
})
const props = withDefaults(
  defineProps<IVideoProp>(), {
    // video: globalState.IPFSCIDS[5],
    video: {
      videoId: "6Wz50ieTl5g",
      channelId: "channelId",
      videoPublishedAt: "20220222T081324",
      // ipfs: globalState.IPFSCIDS[Math.floor(Math.random() * globalState.IPFSCIDS.length)],
      ipfs: globalState.IPFSCIDS[5],
    } as IVideo,
    ipfsGateway: `https://gateway.ipfs.io`
  }
)
</script>

<template lang="pug">
.iframe-container
  iframe.shadow-2xl.overflow-hidden.mx-auto(
    v-if="prefers.youtubeAccess"
    loading="lazy"
    :src="`https://youtube.com/embed/${video?.videoId}`",
    title="IPFS video player",
    frameborder="0",
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowfullscreen
    )
  iframe.shadow-2xl.overflow-hidden.mx-auto(
    v-else-if="globalState.ipfs_supported"
    loading="lazy"
    :src="`${ipfsGateway}/ipfs/${video?.ipfs}`",
    title="ipfs video player",
    frameborder="0",
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowfullscreen
    )
  iframe.shadow-2xl.overflow-hidden.mx-auto(
    v-else
    loading="lazy"
    :src="`${ipfsGateway}/ipfs/${video?.ipfs}`",
    title="ipfs video player",
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