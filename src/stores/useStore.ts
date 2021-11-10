import { IVideo } from "../types"
import { createPinia, defineStore, setActivePinia } from "pinia"
setActivePinia(createPinia())

const useVideoStore = defineStore('videos', {
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

const usePlaylistStore = defineStore('playlist', {
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

const usePlayingStore = defineStore('playing', {
  state: () => {
    return { playing: { videoId: 'PuiSlj3u47E', videoPublishedAt: '2021-11-05T03:30:02Z' } as IVideo }
  },
  actions: {
    play(video) {
      this.playing = video
    }
  }
})

const usePrefersStore = defineStore('prefers', {
  state: () => {
    return { playbackRate: 1.5 }
  },
  actions: {
    setPlaybackRate(rate) {
      this.playbackRate = rate
    }
  }
})
const playing = usePlayingStore()
const playlist = usePlaylistStore()
const videos = useVideoStore()
const prefers = usePrefersStore()

export {playing, playlist, videos, prefers}