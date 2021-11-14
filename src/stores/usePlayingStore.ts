import { IVideo, IChannel } from "../types"
import { defineStore } from "pinia"

export const usePlayingStore = defineStore('playing', {
  state: () => {
    return { playing: { } as IVideo }
  },
  actions: {
    play(video) {
      this.playing = video
    }
  }
})
