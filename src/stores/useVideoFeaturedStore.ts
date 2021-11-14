import { IVideo } from "../types"
import { defineStore } from "pinia"

export const useVideoFeaturedStore = defineStore('featured', {
  state: () => {
    return { videos: [{videoId: "LJ7Y2MRV0kg", videoPublishedAt: "2019-11-26T04:07:54Z"},
                      {videoId: "DPK7D_Q46YI", videoPublishedAt: "2020-04-18T09:01:31Z"}] as IVideo[] }
  },
  getters: {
    playing() {
      return this.videos[Math.floor(Math.random() * this.videos.length)]
    }
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
  },
})
