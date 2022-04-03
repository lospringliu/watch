import platform from 'platform-detect'
import pkg from "../../package.json"
const { load: load_swtc } = useScriptTag(
  "https://unpkg.com/@swtc/rpc@1.1.1/dist/swtc-rpc.js",
  () => {},
  { manual: true },
)
const { load: load_ipfs } = useScriptTag(
  "https://cdn.jsdelivr.net/npm/ipfs/dist/index.min.js",
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
  gunPeer: "https://etogun.glitch.me/gun",
  // gunPeer: "https://relay.bcapps.ca/gun",
  show_tools: false,
  show_social: false,
  loaded_ipfs: false,
  loaded_swtc: false,
  loaded_videostream: false,
  FEATURED: [
    {videoId: "LJ7Y2MRV0kg", videoPublishedAt: "2019-11-26T04:07:54Z", channelId: "UC7Ky7FjJBI7ojx2Yqz2pkNQ", ipfs: "QmYkuAKeDQTHVk9wRCw8y1kkvdvyrs1KTJRRntHFRuADFu/video.mp4"},
    {videoId: "DPK7D_Q46YI", videoPublishedAt: "2020-04-18T09:01:31Z", channelId: "UC7Ky7FjJBI7ojx2Yqz2pkNQ", ipfs: "QmVFoaQCkXnjqv2TD3ciihLz8ejgNEauH8W9hCJLhr3nHF/video.mp4"},
    {
      videoId: 'W9n6Cg4ImEM',
      ipfs: 'Qmei9sWviWnSWBo5nuoN5nchME6vf1149FMetQYyqL59yJ/video.mp4',
      channelId: 'UC7Ky7FjJBI7ojx2Yqz2pkNQ',
      videoPublishedAt: '2022-03-18T09:01:31Z'
    },
    {
      videoId: 'NQjYXF-zM_o',
      ipfs: 'QmPEL4pL9zWZopYm4QopoeDcfidq5wmUy276TgbWMfJHdK/video.mp4',
      channelId: 'UCdXqCN_HtF_RjlsHzDSnJIQ',
      videoPublishedAt: '2022-03-18T09:01:31Z'
    },
    {
      videoId: 'RLtRuC5bf18',
      ipfs: 'QmRS35Mk3ckmDYX28XX4TAwcXiKrj7DwGAFyfy9X6GvfuD/video.mp4',
      channelId: 'UCdXqCN_HtF_RjlsHzDSnJIQ',
      videoPublishedAt: '2022-03-18T09:01:31Z'
    },
    {
      videoId: 'XqiN5ojm_aQ',
      ipfs: 'QmY7PLuzJLtQPkEQshybfJV9rhcUTxX1MMk3bGRDo1DgUJ/video.mp4',
      channelId: 'UCdXqCN_HtF_RjlsHzDSnJIQ',
      videoPublishedAt: '2022-03-18T09:01:31Z'
    },
    {
      videoId: '6OCVNro1SP8',
      ipfs: 'QmZWfHv3bjrraUAVK1MQuuuMefabD7z5QC3e1iDYypkdSK/video.mp4',
      channelId: 'UCE05tYKEsEk7Qmhwg5pqcKw',
      videoPublishedAt: '2022-03-18T09:01:31Z'
    },
    {
      videoId: 'KmQeDP6GfXI',
      ipfs: 'QmacAChRiga1rB4W5jugqMJymw9FpnHgxHnKY4LBZAeMzK/video.mp4',
      channelId: 'UCE05tYKEsEk7Qmhwg5pqcKw',
      videoPublishedAt: '2022-03-18T09:01:31Z'
    },
    {
      videoId: 'Tswq32x4hpQ',
      ipfs: 'QmQqc8hLHzMVwUdXYtpv1cMjPgo9X3a7jSTmStAV7VWtpe/video.mp4',
      channelId: 'UCE05tYKEsEk7Qmhwg5pqcKw',
      videoPublishedAt: '2022-03-18T09:01:31Z'
    },
    {
      videoId: 'gO-N4iAvnjg',
      ipfs: 'QmUtiWUM3qrKpD9pNeE4MJ3vFpDCGkVNZ4aJ7uGaxTYXjn/video.mp4',
      channelId: 'UCE05tYKEsEk7Qmhwg5pqcKw',
      videoPublishedAt: '2022-03-18T09:01:31Z'
    },
    {
      videoId: '1lIvHFQ5OrY',
      ipfs: 'QmXJ8CaEPoKN61c2tENJPzEV1SQ4hzaBRX1QP9o2LfvhU3/video.mp4',
      channelId: 'UCH2BtkEp1kHY7o9TCIhYaFA',
      videoPublishedAt: '2022-03-18T09:01:31Z'
    },
    {
      videoId: 'OJaCb0Nkt6U',
      ipfs: 'Qmdr58wn5sQDmaikVpyiKwWoCEMhNKbfuP4DbE8b1CCp5X/video.mp4',
      channelId: 'UCH2BtkEp1kHY7o9TCIhYaFA',
      videoPublishedAt: '2022-03-18T09:01:31Z'
    },
    {
      videoId: 'rEZ_apIMD9U',
      ipfs: 'QmV7Fs6Xfe1fnabH2EA4MjRS15ane9HbL7eLGfskT37M9t/video.mp4',
      channelId: 'UCH2BtkEp1kHY7o9TCIhYaFA',
      videoPublishedAt: '2022-03-18T09:01:31Z'
    },
    {
      videoId: '9-dDQYlbj1k',
      ipfs: 'QmWYFMmtrFAmhk26LgtDJLEfaKZ3sTr29Pw24kRvpA3XcE/video.mp4',
      channelId: 'UCkZ9vSvx7lg9FvZifpbH2FA',
      videoPublishedAt: '2022-03-18T09:01:31Z'
    },
    {
      videoId: 'pBJJmPQ5sXM',
      ipfs: 'Qma44WU8cTCXm8QnXPeMVkzHNJaq26QX4HoQw2nwxFGmZn/video.mp4',
      channelId: 'UCnyPxKrdrXDjlBBucRAIuuA',
      videoPublishedAt: '2022-03-18T09:01:31Z'
    },
    {
      videoId: 'dAA4cdrUuLk',
      ipfs: 'QmRobE413v7eFq6hmC4NA6BpGc6XKZPAL6C1Eyes8dfTaD/video.mp4',
      channelId: 'UCRByPS00RZsAUe2DTCoHuFQ',
      videoPublishedAt: '2022-03-18T09:01:31Z'
    },
    {
      videoId: '2VuUkKBtX5I',
      ipfs: 'QmV4BWqUPAJ3SqznCDmhz3y2ifp993ojvgm42yh1kio7Cr/video.mp4',
      channelId: 'UCwNGgFvBpxtU8JagZLzztzQ',
      videoPublishedAt: '2022-03-18T09:01:31Z'
    }
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
  },
  async swtc_load() {
    if (!globalState.loaded_swtc) {
      globalState.loaded_swtc = true
      console.log(`swtc loading`)
      try {
        await load_swtc()
      } catch (e) {
        console.log(e)
        globalState.loaded_swtc = false
      }
    }
  }
})
// export const ipfs_supported = computed(() => globalState.ipfs.support || globalState.ipfs.tries < 3 )
globalThis.globalState = globalState