import { IVideo } from "../types"
import { defineStore } from "pinia"
import { globalState } from "./globalState"
import { getRandomElement } from "../api/utils"

export const useVideoFeaturedStore = defineStore('featured', {
  state: () => {
    return { videos: globalState.FEATURED as IVideo[] }
  },
  actions: {
    add(video) {
      const index = this.videos.findIndex(v => v.videoId === video.videoId)
      if (index === -1) {
        this.videos.push(video)
      }
    },
    remove(video) {
      const index = this.videos.findIndex(v => v.videoId === video.videoId)
      if (index !== -1) {
        this.videos.splice(index, 1)
      }
    },
    playing() {
      return getRandomElement(this.videos)
    }
  },
})
