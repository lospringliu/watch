import platform from 'platform-detect'
import pkg from "../../package.json"
const { load: load_ipfs } = useScriptTag(
  "https://cdn.jsdelivr.net/npm/ipfs/dist/index.min.js",
  // "/ipfs.min.js",
  () => {},
  { manual: true },
)
const { load: load_videostream } = useScriptTag(
  "/videostream.js",
  () => {},
  { manual: true },
)
export const globalState = reactive({
  version: pkg.version,
  debug: true,
  platform,
  show_tools: false,
  show_social: false,
  loaded_ipfs: false,
  loaded_swtc: false,
  loaded_videostream: false,
  FEATURED: [
    {videoId: "LJ7Y2MRV0kg", videoPublishedAt: "2019-11-26T04:07:54Z", channelId: "UC7Ky7FjJBI7ojx2Yqz2pkNQ", ipfs: "QmYkuAKeDQTHVk9wRCw8y1kkvdvyrs1KTJRRntHFRuADFu/video.mp4"},
    {videoId: "DPK7D_Q46YI", videoPublishedAt: "2020-04-18T09:01:31Z", channelId: "UC7Ky7FjJBI7ojx2Yqz2pkNQ", ipfs: "QmVFoaQCkXnjqv2TD3ciihLz8ejgNEauH8W9hCJLhr3nHF/video.mp4"}
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
    "Qme7ojVGevRjWD6KVRPnL5w8fwrNYFn9YTiYptvKhzKHjZ",
    "QmeQ44yxX9SkC5pZvBq6mXAo7JaUxy63LsGPJcdPbMDqcQ",
    "QmVsXBF7xQpxJ8LVCpRkwhvdUfTZPbvgFMZYbtzrW4C9mF",
    "QmYU7B99SfPzHXmTVVBReqcNRBxm725fiowCmFBPiMQGyU",
    "Qme7ojVGevRjWD6KVRPnL5w8fwrNYFn9YTiYptvKhzKHjZ",
    "QmVMMxTVNNixbJMVU1wjwfBgZCr3pJCRLp7BNAdmLhs7gn"
  ],
  node: null,
  ipfs: {
    support: computed(() => globalState.platform.desktop || globalState.platform.laptop),
    tries: 0
  },
  ipfs_supported: computed(() => globalState.ipfs.support || globalState.ipfs.tries < 3),
  ipfs_online: computed(() => globalState.ipfs_supported && globalState.node && globalState.node.isOnline()),
  async ipfs_create() {
    if (globalState.ipfs_supported && !globalState.ipfs_online) {
       globalThis.node = await globalThis.Ipfs.create({repo: `ipfs-${Math.floor(Math.random() * 10000000)}`})
       globalState.node = globalThis.node
    }
  },
  async videostream_load() {
    if (!globalState.loaded_videostream) {
      console.log(`videostream loading`)
      try {
        await load_videostream()
        globalState.loaded_videostream = true
      } catch (e) {
        console.log(e)
        globalState.loaded_videostream = false
      }
    }
  },
  async ipfs_load() {
    await globalState.videostream_load()
    if (globalState.ipfs.support && !globalState.loaded_ipfs) {
      console.log(`ipfs loading`)
      try {
        globalState.ipfs.tries += 1
        await load_ipfs()
        globalState.loaded_ipfs = true
        await globalState.ipfs_create()
      } catch (e) {
        console.log(e)
        globalState.loaded_ipfs = false
      }
    }
  }
})
// export const ipfs_supported = computed(() => globalState.ipfs.support || globalState.ipfs.tries < 3 )
globalThis.globalState = globalState