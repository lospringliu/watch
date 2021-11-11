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

const usePlayingInListStore = defineStore('playingInList', {
  state: () => {
    return { playing: {} as IVideo }
  },
  actions: {
    play(video) {
      this.playing = video
    }
  }
})

const usePrefersStore = defineStore('prefers', {
  state: () => {
    return {
      youtubeAppKey: "AIzaSyB45Wu2r4NUvLS04fC4UDCEhi2ofPEOxNo",
      playbackRate: 1.5,
      channels: [
        'UC7Ky7FjJBI7ojx2Yqz2pkNQ', // 萨沙
        'UCH2BtkEp1kHY7o9TCIhYaFA', // 萨沙环球
        'UCwNGgFvBpxtU8JagZLzztzQ', // 岩论
        'UCkZ9vSvx7lg9FvZifpbH2FA', // 老兵
        'UCE05tYKEsEk7Qmhwg5pqcKw', // 杨峰
        'UCd6umYVQpBZ9CIyCwe8Kg7w', // 诚阅
        'UCXRoo1Gp89SCbhdR_xEIp0w', // 北美崔哥
        'UCnrxxRlv2ZSSW4ApuEy8C0w', // 谦秋论
        'UCnUprfZhHRzfcLHdLS-f6aw', // 司马南
        'UCC22zTYPmf9p20E_abhp-uw', // 残月
        'UCr_F4Y9iboUKlg_ZPm4jkVQ', // 老梁
        'UCJncdiH3BQUBgCroBmhsUhQ', // 观察网
        'UCXkOTZJ743JgVhJWmNV8F3Q', // 寒国人
        'UCSgGqt-30oXBq0-n0K-t4Nw', // 科技袁人
        'UCEjqTrvJdLG7Eo0KP1AzYJw', // 大佬时空
      ],
      playlists: [
        'UURdpxiOm4HrwGI24Kv6MBKQ', // David郑经纬
        'UURByPS00RZsAUe2DTCoHuFQ', // 好奇大叔
        'UUdXqCN_HtF_RjlsHzDSnJIQ', // 德国知事
        'UUoCHlYM3srHBmg21mK1-JPg', // 老楊到處說
        'PLBsA1M_J2ICIvMjsj_U7lIdeq-E8AW-bM', // 杨世光
        'UU2IpIQXiLrMV3EAMjfKbcUw', // 雪石
        'UU-8fdTrDRgiJhSq3wRsaF-g', // 寒梅
        'UUOo6xtjQu3LuRzMTfFkGrSA', // 迷彩虎
        'UU5uh3zVGmvyQoks_LxBJ-5Q', // 郑国成
      ],
    }
  },
  getters: {
    channels_playlists() {
      return [ ...this.channels, ...this.playlists ]
    }
  },
  actions: {
    setPlaybackRate(rate) {
      this.playbackRate = rate
    }
  }
})
const playing = usePlayingStore()
const playingInList = usePlayingInListStore()
const playlist = usePlaylistStore()
const videos = useVideoStore()
const prefers = usePrefersStore()

export {playing, playingInList, playlist, videos, prefers}