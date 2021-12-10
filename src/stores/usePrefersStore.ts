import { IVideo, IChannel } from "../types"
import { defineStore } from "pinia"
import { Storage } from "../services/storage"
import { CHANNELS, PLAYLISTS } from "./channels_playlists"
const db = new Storage("local_prefers")
db.read()
const prefers_initial = { playbackRate: 1.0,
  maxResults: 50,
  youtubeAppKey: "",
  youtubeAccess: true,
  channels: CHANNELS,
  playlists: PLAYLISTS
}
// db.data = { version: "0.0.1", prefers: prefers_initial }
db.data ||= { version: "0.0.1", prefers: prefers_initial }

export const usePrefersStore = defineStore('prefers', {
  state: () => {
    return db.data.prefers
  },
  getters: {
    channels_playlists() {
      return [ ...this.channels, ...this.playlists ]
    }
  },
  actions: {
    setPlaybackRate(rate) {
      this.playbackRate = rate
    },
    save() {
      db.write()
    }
  }
})
