
// import { computed, reactive, ref } from "vue";
import { useGun, useUser } from "@composables";
import { globalState } from "~/stores/globalState"
import { IVideo, IChannel } from "~/types"
import { prefers, videos as videoStore } from "~/stores"
import AsyncForEach from "async-await-foreach"
const gun = useGun()
const user = useUser()
const videos = reactive({})
const channels = reactive({})
const vref = gun.get("minemoi").get("videos").get("youtube")
const cref = gun.get("minemoi").get("channels").get("youtube")
let listening = false
cref.map().once((d,k) => {
  console.log(k)
  console.log(d)
  prefers.channels_playlists.forEach(channel => {
    if (channel.id === k) {
      channel.found = true
      console.log(`found channel in gun ${k}`)
      console.log(channel)
      channels[channel.id] = d
    }
  })
})
prefers.channels_playlists.forEach(channel => {
  if (!channel.hasOwnProperty("found")) {
    console.log(`.!. not found channel in gun ${channel.id}`)
    put_channel(channel)
    channels[channel.id] = channel
  }
})

watch(videos, (value, old_value) => {
  console.log(`watched videos change`)
  Object.values(value).forEach(video => {
    if (channels.hasOwnProperty(video.channelId)) {
      video.channel = channels[video.channelId]
      videoStore.add(video) // direct store operation
    } else {
      console.log(`.!. did not find channel ${video.channelId}`)
    }
  })
})
watch(channels, (value, old_value) => {
  console.log(`watched channels change`)
})

export function useVideos() {
  if (!listening) {
    listening = true
    vref.map().on((data, key) => {
      if (globalState.debug) {
        // console.log(`see video key update`)
        // console.log(`key=${key}`)
        // console.log(data)
      }
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
        videos[video.videoId] = video
      }
    })
    // }, true)  // delta value
    cref.map().on((data, key) => {
      if (globalState.debug) {
        // console.log(`see channel key update`)
        // console.log(`key=${key}`)
        // console.log(data)
      }
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
        channels[channel.id] = channel
      }
    })
  }
  
  return { videos, vref, channels, cref }
}

export async function put_channel(channel) {
  const keys = Object.keys(channel)
  const node = cref.get(channel.id)
  keys.forEach(k => {
    if (!globalState.VIDEOKEYS.channelKeys.includes(k)) {
      delete channel[k]
      console.log(`.!. delete key ${k}`)
    }
  })
  node.map().once((v, k) => {
    console.log(k)
    console.log(v)
    if (keys.includes(k) && globalState.VIDEOKEYS.channelKeys.includes(k)) {
      if (channel[k] !== v ) {
        globalState.debug && console.log(`... updating channel ${channel.id}`)
        node.put(channel)
        return
      }
    } else {
      console.log(`.!. strange key ${k}`)
      globalState.debug && console.log(v)
    }
    globalState.debug && console.log(`... ignore channel ${channel.id}`)
  })
  if (!channels.hasOwnProperty(channel.id)) {
    globalState.debug && console.log(`... put channel ${channel.id}`)
    node.put(channel)
    channels[channel.id] = channel
  }
}
export async function put_video(video_object) {
  let valid = true
  const { videoId, videoPublishedAt, channel } = video_object
  const { id: channelId } = channel
  if (!channels.hasOwnProperty(channelId)) {
    put_channel(channel)
  }
  const video = { videoId, videoPublishedAt, channelId }
  const keys = Object.keys(video)
  const node = vref.get(video.videoId)
  keys.forEach(k => {
    if (!globalState.VIDEOKEYS.videoKeys.includes(k)) {
      delete video[k]
      console.log(`.!. delete key ${k}`)
    }
  })
  node.map().once((v, k) => {
    console.log(k)
    console.log(v)
    if (keys.includes(k) && globalState.VIDEOKEYS.videoKeys.includes(k)) {
      if (video[k] !== v ) {
        globalState.debug && console.log(`... updating video ${video.videoId}`)
        node.put(video)
        return
      }
    } else {
      console.log(`.!. strange key ${k}`)
      globalState.debug && console.log(v)
    }
    globalState.debug && console.log(`... ignore video ${video.videoId}`)
  })
  globalState.debug && console.log(`... put video ${video.videoId}`)
  node.put(video)
}