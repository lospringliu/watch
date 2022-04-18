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
watchEffect(() => console.log(playingVideo))

onMounted(async () => {
  console.log(`mounted`)
})
</script>

<template>
  <IpfsGateway v-if="globalState.platform.phone || globalState.platform.tablet || globalState.platform.desktop || globalState.platform.laptop" :video="video" />
  <IpfsVideo v-else :video="video" />
  <div class="flex justify-center">
    <button class="text-center rounded-sm bg-cyan-500" @click="playing.play(featured.playing())">
      <MdiShuffle class="h-8 w-8 text-center" />
    </button>
  </div>
</template>
