import { useIpfsStore } from '@/stores'
const ipfsStore = useIpfsStore()
export default function useIpfsNode() {
  const createIpfsNode = async () => {
    if (!ipfsNode.value) {
      try {
        videos.value = await fetchYoutubeVideos(prefers.channels_playlists)
      } catch () {
        console.log(`!!! create IPFS node errored out`)
      }
    }
  }

  // onMounted(getYoutubeVideos)
  watch([prefers.channels, prefers.playlists], getYoutubeVideos)

  return {
    ipfsNode,
    createIpfsNode
  }
}
