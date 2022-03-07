// import { computed, reactive, ref } from "vue";
import { useGun } from "@composables";
import { globalState } from "~/stores/globalState"
import { IVideo, IChannel } from "~/types"
import { prefers, videos } from "~/stores"
import AsyncForEach from "async-await-foreach"
const gun = useGun()
const gvideos = reactive({})
const gchannels = reactive({})
const vref = gun.get("moiiommoiiom").get("youtube").get("videos")
const pref = gun.get("moiiommoiiom").get("youtube").get("published") // indexing
const cref = gun.get("moiiommoiiom").get("youtube").get("channels")
// cref.get(`channelId`).get("published") // indexing
let listening = false

watch(gvideos, (value, old_value) => {
  console.log(`watched videos change ${Object.keys(value).length}`)
  Object.values(value).forEach((gvideo: IVideo) => {
    const video = { ...gvideo }
    if (gchannels.hasOwnProperty(gvideo.channelId)) {
      const channel = gchannels[gvideo.channelId]
      video.channel = channel
      videos.add(video) // direct store operation
    } else {
      console.log(`.!. channel not found ${gvideo.channelId} for video ${gvideo.videoId}`)
    }
  })
})
watch(gchannels, (value, old_value) => {
  console.log(`watched channels change ${Object.keys(value).length}`)
})

export async function initChannels() {
  console.log(`init channels`)
  cref.map().once((d,k) => {
    if (!gchannels.hasOwnProperty(k)) {
      console.log(`channel ${d.name}`)
      const cc = prefers.channels_playlists.find(e => e.id === k)
      if (cc) { // channel in prefers
        const channel = { id: cc.id, name: cc.name, title: cc.title}
        gchannels[k] = channel
      } else if (d.id && d.name && d.title) { // read from gun
        // const channel = { id: d.id, name: d.name, title: d.title }
        delete d._
        gchannels[k] = d
        // prefers.addChannelPlaylist(channel)
      } else {
        console.log(`strange channel in gun ${d}`)
      }
    }
  })
  await AsyncForEach(prefers.channels_playlists, async (c) => {
    if (!gchannels[c.id]) {
      await put_channel({id: c.id, name: c.name, title: c.title})
    }
  })
  return { gvideos, vref, pref, gchannels, cref }
}

export async function initVideos() {
  pref.get({'.': {'>': new Date().toJSON().slice(0,9)}}).once().map().once((d,k) => {
    if (!gvideos.hasOwnProperty(k)) {
      console.log(`video ${d.videoId}`)
      if (d.videoId && d.videoPublishedAt && d.channelId) {
        // const video = { videoId: d.videoId, videoPublishedAt: d.videoPublishedAt, channelId: d.channelId}
        delete d._
        gvideos[k] = d
      } else {
        console.log(`strange video in gun ${k}`)
        console.log(d)
      }
    }
  })
}

export async function useVideos() {
  if (!listening) {
    listening = true
    // vref.map().on((d, k) => {
    //   if (k === "published" || k === "channels") { return }
    pref.get({'.': {'>': new Date().toJSON().slice(0,10)}}).once().map().on((d,k) => {
      if (!gvideos.hasOwnProperty(k)) {
        console.log(`video ${d.videoId}`)
        if (d.videoId && d.videoPublishedAt && d.channelId) {
          // const video = { videoId: d.videoId, videoPublishedAt: d.videoPublishedAt, channelId: d.channelId}
          delete d._
          gvideos[k] = d
        } else {
          console.log(`strange video in gun ${d}`)
          console.log(d)
        }
      } else {
        // video property update ?
      }
    // })
    }, true)  // delta value
    cref.map().on((d, k) => {
      if (k === "published") { console.log('key published'); return }
      if (!gchannels.hasOwnProperty(k)) {
        console.log(`channel ${d.name}`)
        const cc = prefers.channels_playlists.find(e => e.id === k)
        if (cc) { // channel in prefers
          const channel = { id: cc.id, name: cc.name, title: cc.title}
          gchannels[k] = channel
        } else if (d.id && d.name && d.title) { // read from gun
          // const channel = { id: d.id, name: d.name, title: d.title }
          delete d._
          gchannels[k] = d
          // prefers.addChannelPlaylist(channel)
        } else {
          console.log(`strange channel in gun ${k}`)
          console.log(d)
        }
      } else {
        // channel property update ?
      }
    // })
    }, true)  // delta value
  }
}

export async function put_channel(pchannel) {
  if (!gchannels[pchannel.id]) {
    if (pchannel.id && pchannel.name && pchannel.title) {
      const channel = {id: pchannel.id, name: pchannel.name, title: pchannel.title}
      const node = await cref.get(channel.id).then()
      if (!node) {
        gchannels[channel.id] = channel
        cref.get(channel.id).put(channel)
        globalState.debug && console.log(`... put channel ${channel.id}`)
      }
    }
  }
}

export async function put_video(video_object) {
  if (video_object.videoId && video_object.videoPublishedAt && video_object.channel) {
    const video: IVideo = {
      videoId: video_object.videoId,
      videoPublishedAt: video_object.videoPublishedAt,
      channelId: video_object.channel.id
    }
    if (video_object.hasOwnProperty("ipfs")) {
      video.ipfs = video_object.ipfs
    }
    if (!gchannels.hasOwnProperty(video.channelId)) {
      await put_channel(video_object.channel)
    }
    let node = await vref.get(video.videoId).then()
    if (!node) {
      node = vref.get(video.videoId).put(video)
    } // video is now in gun, to check if needs update
    let published = await pref.get(video.videoPublishedAt).then()
    if (!published) {
      published = pref.get(video.videoPublishedAt).put(video)
    } // video is now indexed by publish timestamp
    let published_in_channel = await cref.get(video.channelId).get("published").get(video.videoPublishedAt).then()
    if (!published_in_channel) {
      published_in_channel = cref.get(video.channelId).get("published").get(video.videoPublishedAt).put(video)
    } // video is now indexed by publish timestamp
    if (!gvideos[video.videoPublishedAt]) {
      gvideos[video.videoPublishedAt] = video
    }
  }
}