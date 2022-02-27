export const globalState = reactive({
  debug: true,
  loaded_ipfs: false,
  loaded_swtc: false,
  loaded_videostream: false,
  ipfs: {
    support: false,
    tries: 0
  },
  FEATURED: [
    {videoId: "LJ7Y2MRV0kg", videoPublishedAt: "2019-11-26T04:07:54Z", channelId: "UC7Ky7FjJBI7ojx2Yqz2pkNQ"},
    {videoId: "DPK7D_Q46YI", videoPublishedAt: "2020-04-18T09:01:31Z"}
  ],
  VIDEOKEYS: {
    channelKeys: [
      "id",
      "name",
      "title",
    ],
    channelKeysRequired: [
      "id",
    ],
    videoKeys: [
      "videoId",
      "videoPublishedAt",
      "channelId",
      // "channel",
    ],
    videoKeysRequired: [
      "videoId",
      "videoPublishedAt"
    ],
  },
  IPFSCIDS: [
    // "Qme7ojVGevRjWD6KVRPnL5w8fwrNYFn9YTiYptvKhzKHjZ",
    // "QmeQ44yxX9SkC5pZvBq6mXAo7JaUxy63LsGPJcdPbMDqcQ",
    // "QmVsXBF7xQpxJ8LVCpRkwhvdUfTZPbvgFMZYbtzrW4C9mF",
    // "QmYU7B99SfPzHXmTVVBReqcNRBxm725fiowCmFBPiMQGyU",
    "Qme7ojVGevRjWD6KVRPnL5w8fwrNYFn9YTiYptvKhzKHjZ"
  ],
  ipfs_supported: computed(() => globalState.loaded_ipfs && (globalState.ipfs.support || globalState.ipfs.tries < 3)),
  ipfs_online: computed(() => globalState.ipfs_supported && globalState.node && globalState.node.isOnline()),
  node: null,
  async ipfs_create() {
    if (globalState.ipfs_supported && !globalState.node) {
       globalThis.node = await globalThis.Ipfs.create({repo: `ipfs-${Math.floor(Math.random() * 10000000)}`})
       globalState.node = globalThis.node
    }
  }
})
// export const ipfs_supported = computed(() => globalState.ipfs.support || globalState.ipfs.tries < 3 )
globalThis.globalState = globalState