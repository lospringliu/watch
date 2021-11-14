import { IVideo, IChannel } from "../types"
import { defineStore } from "pinia"

export const usePlaylistStore = defineStore('playlist', {
  state: () => {
    return { playlist: [] as IVideo[] }
  },
  actions: {
    add(video, leading=false) {
      const index = this.playlist.findIndex(v => v.videoId === video.videoId)
      if (index === -1) {
        if (leading) {
          this.playlist.unshift(video)
        } else {
          this.playlist.push(video)
        }
      }
    },
    remove(video) {
      const index = this.playlist.findIndex(v => v.videoId === video.videoId)
      if (index !== -1) {
        this.playlist.splice(index, 1)
      }
    },
  },
})
