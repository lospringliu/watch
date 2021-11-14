import { IVideo, IChannel } from "../types"
import { defineStore } from "pinia"

export const usePlayingInListStore = defineStore('playingInList', {
  state: () => {
    return { playing: {} as IVideo }
  },
  actions: {
    play(video) {
      this.playing = video
    }
  }
})
