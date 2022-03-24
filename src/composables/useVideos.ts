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
const vref = gun.get("gunswtcmoac").get("videos").get("youtube")
const cref = gun.get("gunswtcmoac").get("channels").get("youtube")
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
    delete d._
    if (gchannels.hasOwnProperty(k)) {
      Object.assign(gchannels[k], d)
    } else {
      console.log(`channel ${d.name}`)
      gchannels[k] = d
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
    delete d._
    if (gvideos.hasOwnProperty(k)) {
      Object.assign(gvideos[k], d)
    } else {
      if (d.videoId) {
        gvideos[k] = d
      } else {
        console.log(`video ${k} ${d.videoId}`)
        console.log(d)
      }
    }
  })
}

export async function useVideos() {
  if (!listening) {
    listening = true
    vref.map().on((d, k) => {
      delete d._
      if (gvideos.hasOwnProperty(k)) {
        Object.assign(gvideos[k], d)
      } else {
        if (d.videoId) {
          gvideos[k] = d
        } else {
          console.log(`video ${k} ${d.videoId}`)
          console.log(d)
        }
      }
    // })
    }, true)  // delta value
    cref.map().on((d, k) => {
      delete d._
      if (gchannels.hasOwnProperty(k)) {
        Object.assign(gchannels[k], d)
      } else {
        console.log(`channel ${d.name}`)
        gchannels[k] = d
      }
    }, true)  // delta value
    // })
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
  if (gvideos[video_object.videoId] && gvideos[video_object.videoId].videoId) return
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
    } else if (!node.videoId) {
      console.log(video)
      vref.get(video.videoId).put(video)
    } else {}
    gvideos[video.videoId] = video
  }
}