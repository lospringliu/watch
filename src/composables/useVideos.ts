// import { computed, reactive, ref } from "vue";
import { useGun } from "@composables";
import { globalState } from "~/stores/globalState"
import { IVideo, IChannel } from "~/types"
import { prefers, videos } from "~/stores"
const gun = useGun()
const gvideos = reactive({})
const gchannels = reactive({})
const vref = gun.get("testmoimoi").get("videos").get("youtube")
const cref = gun.get("testmoimoi").get("channels").get("youtube")
let listening = false

cref.map().once((d,k) => {
  console.log(`channel ${k}: ${d.name || "unknown channel"}`)
  if (gchannels.hasOwnProperty(k)) return
  if (d.hasOwnProperty("id") && d.hasOwnProperty("name") && d.hasOwnProperty("title")) {
    const channel = { id: d.id, name: d.name, title: d.title }
    gchannels[k] = channel
  }
})
vref.map().once((d,k) => {
  console.log(`video ${k}: ${d.videoId || "unknown video"}`)
  if (gvideos.hasOwnProperty(k)) return
  if (d.hasOwnProperty("videoId") && d.hasOwnProperty("videoPublsihedAt") && d.hasOwnProperty("channelId")) {
    const video = { videoId: d.videoId, videoPublishedAt: d.videoPublishedAt, channelId: d.channelId}
    console.log(`found video in gun ${k}`)
    gvideos[k] = video
  }
})

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

export function useVideos() {
  if (!listening) {
    listening = true
    vref.map().on((data, k) => {
      // if (globalState.debug) {
      //   console.log(`    see video update ${k}`)
      // }
      const video = {} as IVideo
      const video_keys = []
      let valid = true
      Object.keys(data).forEach(key => {
        if (globalState.VIDEOKEYS.videoKeys.includes(key)) {
          video[key] = data[key]
          video_keys.push(key)
        }
      })
      globalState.VIDEOKEYS.videoKeysRequired.forEach(key => {
        if (!video_keys.includes(key)) {
          valid = false
        }
      })
      if (valid) {
        gvideos[video.videoId] = video
      }
    })
    // }, true)  // delta value
    cref.map().on((data, k) => {
      // if (globalState.debug) {
      //   console.log(`    see channel update ${k}`)
      // }
      const channel = {} as IChannel
      const channel_keys = []
      let valid = true
      Object.keys(data).forEach(key => {
        if (globalState.VIDEOKEYS.channelKeys.includes(key)) {
          channel[key] = data[key]
          channel_keys.push(key)
        }
      })
      globalState.VIDEOKEYS.channelKeysRequired.forEach(key => {
        if (!channel_keys.includes(key)) {
          valid = false
        }
      })
      if (valid) {
        gchannels[channel.id] = channel
      } else {
        console.log(`missing keys?`)
        console.log(channel)
      }
    })
  }
  
  return { gvideos, vref, gchannels, cref }
}

export async function put_channel(pchannel) {
  if (gchannels.hasOwnProperty(pchannel.id)) {
    return
  }
  const {id, name, title} = pchannel
  const channel = {id, name, title}
  const node = await cref.get(id).then()
  if (!node) {
    gchannels[channel.id] = channel
    cref.get(id).put(channel)
    globalState.debug && console.log(`... put channel ${channel.id}`)
  } else { // channel is already in gun, check if needs update
    console.log(`channel exists ${node.name}`)
  }
}

export async function put_video(video_object) {
  const { videoId, videoPublishedAt, channel } = video_object
  if (channel && !gchannels.hasOwnProperty(channel.id)) {
    await put_channel(channel)
  }
  const video = { videoId, videoPublishedAt, channelId: channel.id }
  const node = await vref.get(videoId).then()
  if (!node) { // video is already in gun, check if needs update
    vref.get(videoId).put(video)
  } else {
    console.log(`video exists ${node.videoId}`)
  }
  gvideos[video.videoId] = video
}