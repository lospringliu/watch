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
// sync from initial
prefers_initial.channels.forEach(channel => {
  if (db.data.prefers.channels.filter(c => c.id === channel.id).length === 0) {
    db.data.prefers.channels.push(channel)
  }
})
prefers_initial.playlists.forEach(playlist => {
  if (db.data.prefers.playlists.filter(p => p.id === playlist.id).length === 0) {
    db.data.prefers.playlists.push(playlist)
  }
})

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
