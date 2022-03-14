<script setup lang="ts">
import 'plyr/dist/plyr.css'
import type { IVideo } from "../types"
interface IVideoProp {
  video?: IVideo
  ipfsGateway?: string
}
import { globalState } from '../stores/globalState'
import { playing, playingInList, playlist, featured, prefers } from "../stores"
import Plyr from 'plyr'
import toStream from 'it-to-stream'
import {
  statusMessages,
  createVideoElement,
  log
} from '../services/videoStreamUtils'

const props = withDefaults(
  defineProps<IVideoProp>(), {
    // video: globalState.IPFSCIDS[5],
    video: {
      videoId: "6Wz50ieTl5g",
      channelId: "channelId",
      videoPublishedAt: "20220222T081324",
      ipfs: globalState.IPFSCIDS[5]
    } as IVideo,
    ipfsGateway: `https://gateway.ipfs.io`
  }
)

const playingVideo = ref(props.video)
const logEvent = () => console.log(`playbackRateChanged`)
watch(playlist.playlist, async (value, old_value) => {
  console.log(value)
})

let stream, stream2, videoElement, plyrPlayer=ref(null)
onMounted(async () => {
  if (globalState.ipfs.support) {
    await globalState.ipfs_load()
    await globalState.ipfs_create()
  }
  if (globalState.ipfs_online) {
  }
  if (globalState.ipfs.support) {
    watchEffect(videoIpfs)
  }
})

async function videoIpfs () {
  console.log(`catched prop change`)
  videoElement = createVideoElement()
  if (!playingVideo.value.ipfs) {
    console.log(`ipfs no support`)
    return
  }
  if (!globalState.ipfs_supported) {
    console.log(`ipfs not supported`)
    return
  }
  try {
    plyrPlayer.value.stop()
    plyrPlayer.value.reset()
    // plyr.pause()
  } catch (e) {console.error(`error to stop player`)}
  plyrPlayer.value = new Plyr('#video', {enabled: true, key: 'plyr'})
  globalThis.plyr = plyrPlayer.value
  // watch(playingInList.playing, () => {
  // })
  if (!globalState.ipfs_online) {
    await globalThis.node.start()
  }
  videoStream = new globalThis.videostream({
    createReadStream: function createReadStream (opts) {
      const start = opts.start
      const end = opts.end ? start + opts.end + 1 : undefined
      log(`Stream: Asked for data starting at byte ${start} and ending at byte ${end}`)
      stream2 = stream
      if (stream2 && stream2.destroy) {
        try { stream2.destroy() } catch (e) {}
      }
      stream = toStream.readable(globalThis.node.cat(to_ipfs_cid(playingVideo.value), {
        offset: start,
        length: end && end - start
      }))
      stream.on('error', console.log)
      if (start === 0) {
        statusMessages(stream, log)
      }
      return stream
    }
  }, videoElement)
}
function to_ipfs_cid(video: IVideo) {
  if (!video.ipfs) {
    console.log(`not ipfs compatible, need .ipfs property`)
  } else {
    return video.ipfs
  }
}
</script>

<template lang="pug">
.aspect-video(v-if="prefers.youtubeAccess")
  iframe.w-full.aspect-video.shadow-2xl.overflow-hidden(
    loading="lazy"
    :src="`https://youtube.com/embed/${video?.videoId}`",
    title="IPFS video player",
    frameborder="0",
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowfullscreen
    )
.aspect-video(v-else-if="!globalState.ipfs.support")
  iframe.w-full.aspect-video.shadow-2xl.overflow-hidden(
    loading="lazy"
    :src="`${ipfsGateway}/ipfs/${video?.ipfs}`",
    title="IPFS video player",
    frameborder="0",
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowfullscreen
    )
.aspect-video(v-else-if="globalState.ipfs_supported")
  video.w-full.aspect-video(
    id="video"
    controls
    autoplay
    allowfullscren
    )
.aspect-video(v-else)
  iframe.w-full.aspect-video.shadow-2xl.overflow-hidden(
    loading="lazy"
    :src="`${ipfsGateway}/ipfs/${video?.ipfs}`",
    title="IPFS video player",
    frameborder="0",
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowfullscreen
    )
</template>