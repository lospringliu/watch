import { IVideo, IChannel } from "../types"
import { defineStore } from "pinia"

export const useVideoStore = defineStore('videos', {
  state: () => {
    return { videos: [] as IVideo[] }
  },
  actions: {
    add(video) {
      const index = this.videos.findIndex(v => v.videoId === video.videoId)
      if (index === -1) {
        this.videos.push(video)
      }
    },
    sort(opts = {key: "date"} as any) {
      switch (opts.key) {
        case "date":
          this.videos.sort((x,y) => x.videoPublishedAt > y.videoPublishedAt ? 1 : -1)
          break
        case "id":
          this.videos.sort((x,y) => x.videoId > y.videoId ? 1 : -1)
          break
        default:
          console.log("no sort")
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
