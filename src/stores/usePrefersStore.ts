import { defineStore } from "pinia"
import Storage from "../services/storage"
import { CHANNELS, PLAYLISTS } from "./channels_playlists"
import { IChannel } from "../types"
import pkg from "../../package.json"
const db = new Storage("prefers")
db.read()
const prefers_initial = {
  playbackRate: 1.0,
  maxResults: 50,
  youtubeAppKey: "",
  youtubeAccess: true,
  ipfsGateway: "https://gateway.ipfs.io",
  channels: CHANNELS,
  playlists: PLAYLISTS
}
// db.data = { version: pkg.version, prefers: prefers_initial }
db.data ||= { version: pkg.version, prefers: prefers_initial }
// sync from initial
if (!db.data.prefers.hasOwnProperty("ipfsGateway")) db.data.prefers.ipfsGateway = prefers_initial.ipfsGateway
if (!db.data.prefers.hasOwnProperty("youtubeAppKey")) db.data.prefers.youtubeAppKey = prefers_initial.youtubeAppKey
if (!db.data.prefers.hasOwnProperty("youtubeAccess")) db.data.prefers.youtubeAccess = prefers_initial.youtubeAccess
if (!db.data.prefers.hasOwnProperty("playbackRate")) db.data.prefers.playbackRate = prefers_initial.playbackRate
if (!db.data.prefers.hasOwnProperty("maxResults")) db.data.prefers.maxResults = prefers_initial.maxResults
if (!db.data.prefers.hasOwnProperty("channels")) db.data.prefers.channels = prefers_initial.channels
if (!db.data.prefers.hasOwnProperty("playlists")) db.data.prefers.playlists = prefers_initial.playlists
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
      return [ ...this.channels, ...this.playlists ].filter(c => c.id.length > 20)
    }
  },
  actions: {
    addChannelPlaylist(cp: IChannel) {
      if (cp.id.length < 20) return
      if (this.channels.filter(c => c.id === cp.id).length === 0) {
        if (cp.id.startsWith("UC")) {
          this.channels.push(cp)
        } else {
          this.playlists.push(cp)
        }
      }
    },
    setPlaybackRate(rate) {
      this.playbackRate = rate
    },
    save() {
      db.write()
    }
  }
})
