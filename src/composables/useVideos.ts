
// import { computed, reactive, ref } from "vue";
import { useGun, useUser } from "@composables";
import { globalState } from "~/stores/globalState"
import { IVideo, IChannel } from "~/types"
import { prefers, videos } from "~/stores"
import AsyncForEach from "async-await-foreach"
const gun = useGun()
const user = useUser()
const gvideos = reactive({})
const gchannels = reactive({})
const vref = gun.get("moimine").get("videos").get("youtube")
const cref = gun.get("moimine").get("channels").get("youtube")
let listening = false
cref.map().once((d,k) => {
  console.log(`${k}: ${d.name || "unknown channel"}`)
  const channel = prefers.channels_playlists.find(c => c.id === k)
  if (channel) {
    console.log(`found channel in gun ${k}`)
    gchannels[channel.id] = d
  }
})
prefers.channels_playlists.forEach(channel => {
  console.log(channel)
  console.log(`.!. not found channel in gun ${channel.id}`)
  put_channel(channel)
  gchannels[channel.id] = channel
})

watch(gvideos, (value, old_value) => {
  console.log(`watched videos change ${Object.keys(value).length}`)
  Object.values(value).forEach((gvideo: IVideo) => {
    const video = { ...gvideo }
    delete video.channelId
    if (gchannels.hasOwnProperty(gvideo.channelId)) {
      const channel = gchannels[gvideo.channelId]
      video.channel = channel
      videos.add(video) // direct store operation
    } else {
      console.log(`.!. unknown channel ${video.channelId}`)
    }
  })
})
watch(gchannels, (value, old_value) => {
  console.log(`watched channels change`)
})

export function useVideos() {
  if (!listening) {
    listening = true
    vref.map().once((data, k) => {
      if (globalState.debug) {
        console.log(`see video update ${key}`)
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
        gvideos[video.videoId] = video
      }
    })
    // }, true)  // delta value
    cref.map().once((data, key) => {
      if (globalState.debug) {
        console.log(`see channel update ${key}`)
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
        gchannels[channel.id] = channel
      } else {
        console.log(channel)
      }
    })
  }
  
  return { gvideos, vref, gchannels, cref }
}

export function put_channel(channel) {
  const keys = Object.keys(channel)
  const node = cref.get(channel.id)
  keys.forEach(k => {
    if (!globalState.VIDEOKEYS.channelKeys.includes(k)) {
      delete channel[k]
      console.log(`.!. delete key ${k}`)
    }
  })
  // node.map().once((v, k) => {
  //   console.log(`k=${k}`)
  //   if (keys.includes(k) && globalState.VIDEOKEYS.channelKeys.includes(k)) {
  //     console.log(k)
  //     console.log(v)
  //     if (channel[k] !== v ) {
  //       globalState.debug && console.log(`... updating channel ${channel.id}`)
  //       node.put({[k]: channel[k]})
  //     }
  //   } else {
  //     console.log(`.!. strange key ${k}`)
  //     globalState.debug && console.log(v)
  //   }
  //   globalState.debug && console.log(`... ignore channel ${channel.id}`)
  // })
  if (!gchannels.hasOwnProperty(channel.id)) {
    globalState.debug && console.log(`... put channel ${channel.id}`)
    node.put(channel)
    gchannels[channel.id] = channel
  }
}

export function put_video(video_object) {
  console.log(video_object)
  const { videoId, videoPublishedAt, channel } = video_object
  if (!gchannels.hasOwnProperty(channel.id)) {
    put_channel(channel)
  }
  const video = { videoId, videoPublishedAt, channelId: channel.id }
  const keys = Object.keys(video)
  const node = vref.get(video.videoId)
  keys.forEach(k => {
    if (!globalState.VIDEOKEYS.videoKeys.includes(k)) {
      delete video[k]
      console.log(`.!. delete key ${k}`)
    }
  })
  // node.map().once((v, k) => {
  //   console.log(`k=${k}`)
  //   console.log(v)
  //   if (keys.includes(k) && globalState.VIDEOKEYS.videoKeys.includes(k)) {
  //     if (video[k] !== v ) {
  //       globalState.debug && console.log(`... updating video ${video.videoId}`)
  //       node.put({[k]: video[k]})
  //     }
  //   } else {
  //     console.log(`.!. strange key ${k}`)
  //     globalState.debug && console.log(v)
  //   }
  //   globalState.debug && console.log(`... ignore video ${video.videoId}`)
  // })
  // globalState.debug && console.log(`... put video ${video.videoId}`)
  node.put(video)
  gvideos[video.videoId] = video
}