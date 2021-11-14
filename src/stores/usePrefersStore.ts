import { IVideo, IChannel } from "../types"
import { defineStore } from "pinia"

export const usePrefersStore = defineStore('prefers', {
  state: () => {
    return {
      youtubeAccess: true,
      youtubeAppKey: "AIzaSyB13mMqUQ9q7GxSJ4c28l1wAoYGLNw-rkE",
      playbackRate: 1.5,
      maxResults: 50,
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
        { id: 'UCI-ECZ-pbvFL2fLtskq2GPA', name: "老伍" },
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
        { id: 'UUgo_-fjJxnLwwwq5dSY72rg', name: "自话总裁" },
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
