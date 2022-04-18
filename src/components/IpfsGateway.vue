<script setup lang="ts">
import 'plyr/dist/plyr.css'
import type { IVideo } from "../types"
interface IVideoProp {
  video?: IVideo
}
import { globalState } from '../stores/globalState'
import { getRandomElement } from "../api/utils"
import Plyr from 'plyr'
import { playing, playingInList, playlist, featured, prefers } from "../stores"
const props = withDefaults(
  defineProps<IVideoProp>(), {
    video: getRandomElement(globalState.FEATURED),
  }
)

let plyrPlayer=ref(null)
const playingVideo = ref(props.video)

watch(playlist.playlist, async (value) => {
  console.log(`watched playlist change of #${value.length} items`)
  if (!playingInList.playing.hasOwnProperty("videoId") && playlist.playlist.length === 1) {
    playingInList.playing = playlist.playlist[0]
  }
})
watch(playingInList, async (value, old_value) => {
  console.log(`watched playingInList change`)
  console.log(value.playing)
  console.log(old_value.playing)
  if (playingInList.playing.hasOwnProperty("ipfs")) {
    playingVideo.value = JSON.parse(JSON.stringify(playingInList.playing))
  } else {
    console.log(`... no .ipfs property`)
  }
})
watch(playing, (value) => {
  console.log(`watched playing change`)
  console.log(value.playing)
  if (playing?.playing?.hasOwnProperty("ipfs")) {
    if (playing.playing.ipfs !== playingVideo.value.ipfs) {
      console.log(`setting playing.playing for hi priority`)
      plyrPlayer.value?.stop()
      plyrPlayer.value?.destroy()
      playingVideo.value = JSON.parse(JSON.stringify(playing.playing))
    }
  }
})

onMounted(async () => {
  if (prefers.youtubeAccess) {
    if (globalState.ipfs_online) {
      globalState.node.stop()
    }
  } else {
    plyrPlayer.value = new Plyr('#player', {enabled: true, key: 'plyr', autoplay: true, resetOnEnd: true})
    watch(playingVideo, videoGateway)
    playingVideo.value = featured.playing
  }
})

async function videoGateway () {
  console.log(`catched props.video change ${playingVideo.value.ipfs}`)
  try {
    plyrPlayer.value?.stop()
  } catch (e) {}
  try { 
    plyrPlayer.value?.destroy()
  } catch (e) {
    console.log(e)
  }
  plyrPlayer.value = new Plyr('#player', {enabled: true, key: 'plyr', resetOnEnd: true})
  globalThis.plyr = plyrPlayer.value
  plyrPlayer.value.on("ratechange", () => console.log(`plyr event ..... ratechange`))
  plyrPlayer.value.once("ended", () => {
    console.log(`plyr event ..... ended`)
    const index = playlist.playlist.findIndex(v => v.videoId === playingVideo.value.videoId)
    if (index !== -1) {
      playlist.playlist.splice(index, 1)
    }
    if (playlist.playlist.length > 0) {
      playingVideo.value = JSON.parse(JSON.stringify(getRandomElement(playlist.playlist)))
    }
  })
  plyrPlayer.value.once("ready", (event) => {
    console.log(`plyr event ..... ready`)
  })
  plyrPlayer.value.on("canplay", (event) => {
    console.log(`plyr event ..... canplay`)
    const instance = event.detail.plyr
    instance.speed = prefers.playbackRate
    instance.play()
  })
  plyrPlayer.value.source = {
    type: 'video',
    title: 'IPFS video',
    sources: [
      {
        src: `${prefers.ipfsGateway}/ipfs/${to_ipfs_cid(playingVideo.value)}`,
        type: 'video/mp4',
      }
    ]
  }
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
.aspect-video(v-if="prefers.youtubeAccess" id="player")
  iframe.w-full.aspect-video.shadow-2xl.overflow-hidden(
    loading="lazy",
    :src="`https://youtube.com/embed/${video?.videoId}`",
    title="IPFS video player",
    frameborder="0",
    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowfullscreen
    )
.aspect-video(v-else)
  video.w-full.aspect-video(
    id="player"
    autoplay
    controls
    allowfullscren
    )
    source(
      :src="`${prefers.ipfsGateway}/ipfs/${to_ipfs_cid(video)}`",
      type="video/mp4"
    )
</template>