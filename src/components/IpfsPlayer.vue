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

const playingVideo = ref(props.video)

onMounted(async () => {
  console.log(`mounted`)
})
</script>

<template>
  <IpfsGateway v-if="globalState.platform.phone || globalState.platform.tablet" :video="video" />
  <IpfsVideo v-else :video="video" />
</template>