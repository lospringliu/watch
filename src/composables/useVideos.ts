// import { computed, reactive, ref } from "vue";
import { useGun } from "@composables";
import { globalState } from "~/stores/globalState"
import { IVideo, IChannel } from "~/types"
import { prefers, videos } from "~/stores"
import AsyncForEach from "async-await-foreach"
const gun = useGun()
const gvideos = reactive({})
const gchannels = reactive({})
// const baseref = gun.get("moitestmoitestmoitest")
const vref = gun.get("moitestmoitestmoitest").get("videos").get("youtube")
const cref = gun.get("moitestmoitestmoitest").get("channels").get("youtube")
let listening = false

watch(gvideos, (value, old_value) => {
  console.log(`watched videos change ${Object.keys(value).length}`)
  Object.values(value).forEach((gvideo: IVideo) => {
    const video = { ...gvideo }
    if (gchannels.hasOwnProperty(gvideo.channelId)) {
      const channel = gchannels[gvideo.channelId]
      video.channel = channel
      videos.add(video) // direct store operation
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
        const channel = { id: d.id, name: d.name, title: d.title }
        gchannels[k] = channel
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
  return { gvideos, vref, gchannels, cref }
}

export async function initVideos() {
  vref.map().once((d,k) => {
    if (!gvideos.hasOwnProperty(k)) {
      console.log(`video ${d.videoId}`)
      if (d.videoId && d.videoPublishedAt && d.channelId) {
        const video: IVideo = { videoId: d.videoId, videoPublishedAt: d.videoPublishedAt, channelId: d.channelId}
        if (d.ipfs) { video.ipfs = d.ipfs }
        gvideos[k] = video
      } else {
        console.log(`strange video in gun ${d}`)
      }
    }
  })
}

export async function useVideos() {
  if (!listening) {
    listening = true
    vref.map().on((d, k) => {
      if (!gvideos.hasOwnProperty(k)) {
        console.log(`video ${d.videoId}`)
        if (d.videoId && d.videoPublishedAt && d.channelId) {
          const video: IVideo = { videoId: d.videoId, videoPublishedAt: d.videoPublishedAt, channelId: d.channelId}
          if (d.ipfs) { video.ipfs = d.ipfs }
          gvideos[k] = video
        } else {
          // console.log(`strange video in gun ${d}`)
          console.log(d)
        }
      }
    // })
    }, true)  // delta value
    cref.map().on((d, k) => {
      if (!gchannels.hasOwnProperty(k)) {
        console.log(`channel ${d.name}`)
        const cc = prefers.channels_playlists.find(e => e.id === k)
        if (cc) { // channel in prefers
          const channel = { id: cc.id, name: cc.name, title: cc.title}
          gchannels[k] = channel
        } else if (d.id && d.name && d.title) { // read from gun
          const channel = { id: d.id, name: d.name, title: d.title }
          gchannels[k] = channel
          prefers.addChannelPlaylist(channel)
        } else {
          console.log(`strange channel in gun ${d}`)
        }
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
  if (gvideos[video_object.videoId]) return
  if (video_object.videoId && video_object.videoPublishedAt && video_object.channel) {
    const video: IVideo = {
      videoId: video_object.videoId,
      videoPublishedAt: video_object.videoPublishedAt,
      channelId: video_object.channel.id
    }
    if (video_object.ipfs) { video.ipfs = video_object.ipfs }
    if (!gchannels.hasOwnProperty(video.channelId)) {
      await put_channel(video_object.channel)
    }
    const node = await vref.get(video.videoId).then()
    if (!node) { // video is already in gun, check if needs update
      vref.get(video.videoId).put(video)
    } else {}
    gvideos[video.videoId] = video
  }
}