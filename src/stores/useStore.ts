import { IVideo, IChannel } from "../types"
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

const useVideoFeaturedStore = defineStore('featured', {
  state: () => {
    return { videos: [{videoId: "LJ7Y2MRV0kg", videoPublishedAt: "2019-11-26T04:07:54Z"},
                      {videoId: "DPK7D_Q46YI", videoPublishedAt: "2020-04-18T09:01:31Z"}] as IVideo[] }
  },
  getters: {
    playing() {
      return this.videos[Math.floor(Math.random() * this.videos.length)]
    }
  },
  actions: {
    add(video) {
      const index = this.videos.findIndex(v => v.videoId === video.videoId)
      if (index === -1) {
        this.videos.push(video)
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
    return { playing: { } as IVideo }
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
        { id: 'UC7Ky7FjJBI7ojx2Yqz2pkNQ', name: "萨沙" },
        { id: 'UCH2BtkEp1kHY7o9TCIhYaFA', name: "萨沙环球" },
        { id: 'UCwNGgFvBpxtU8JagZLzztzQ', name: "岩论" },
        { id: 'UCkZ9vSvx7lg9FvZifpbH2FA', name: "老兵" },
        { id: 'UCE05tYKEsEk7Qmhwg5pqcKw', name: "杨峰" },
        { id: 'UCd6umYVQpBZ9CIyCwe8Kg7w', name: "诚阅" },
        { id: 'UCXRoo1Gp89SCbhdR_xEIp0w', name: "北美崔哥" },
        { id: 'UCnrxxRlv2ZSSW4ApuEy8C0w', name: "谦秋论" },
        { id: 'UCnUprfZhHRzfcLHdLS-f6aw', name: "司马南" },
        { id: 'UCC22zTYPmf9p20E_abhp-uw', name: "残月" },
        { id: 'UCr_F4Y9iboUKlg_ZPm4jkVQ', name: "老梁" },
        { id: 'UCJncdiH3BQUBgCroBmhsUhQ', name: "观察网" },
        { id: 'UCXkOTZJ743JgVhJWmNV8F3Q', name: "寒国人" },
        { id: 'UCSgGqt-30oXBq0-n0K-t4Nw', name: "科技袁人" },
        { id: 'UCEjqTrvJdLG7Eo0KP1AzYJw', name: "大佬时空" },
        { id: 'UCUBhobCkTLhgfUNRAgHSYmw', name: "科学声音" },
        { id: 'UCD_gy8DWV_DhjJ-bQXF5dGQ', name: "磊哥" },
      ] as IChannel[],
      playlists: [
        { id: 'PLBsA1M_J2ICIvMjsj_U7lIdeq-E8AW-bM', name: "杨世光" },
        { id: 'UURdpxiOm4HrwGI24Kv6MBKQ', name: "David郑经纬" },
        { id: 'UURByPS00RZsAUe2DTCoHuFQ', name: "好奇大叔" },
        { id: 'UUdXqCN_HtF_RjlsHzDSnJIQ', name: "德国知事" },
        { id: 'UUoCHlYM3srHBmg21mK1-JPg', name: "老楊到處說" },
        { id: 'UU2IpIQXiLrMV3EAMjfKbcUw', name: "雪石" },
        { id: 'UU-8fdTrDRgiJhSq3wRsaF-g', name: "寒梅" },
        { id: 'UUOo6xtjQu3LuRzMTfFkGrSA', name: "迷彩虎" },
        { id: 'UU5uh3zVGmvyQoks_LxBJ-5Q', name: "郑国成" },
        { id: 'UUnyPxKrdrXDjlBBucRAIuuA', name: "圆脸波士顿" },
      ] as IChannel[]
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

const useFilteringStore = defineStore('filtering', {
  state: () => {
    return { channel: "", keyword: "", limit: 60}
  },
  actions: {
    setChannel(channel: IChannel) {
      this.channel = channel.name
    },
    setKeyword(keyword) {
      this.keyword = keyword
    },
    setLimit(limit) {
      this.limit = +limit
    }
  }
})

const playing = usePlayingStore()
const playingInList = usePlayingInListStore()
const playlist = usePlaylistStore()
const videos = useVideoStore()
const featured = useVideoFeaturedStore()
const prefers = usePrefersStore()
const filtering = useFilteringStore()

export {playing, playingInList, playlist, videos, featured, prefers, filtering}