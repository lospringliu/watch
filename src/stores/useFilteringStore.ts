import { IVideo, IChannel } from "../types"
import { defineStore } from "pinia"

export const useFilteringStore = defineStore('filtering', {
  state: () => {
    return { channel: "", keyword: "", limit: 100}
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
