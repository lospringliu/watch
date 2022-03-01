import { fetchYoutubeVideos } from '../api/fetchYoutubeVideos'
import { prefers } from '../stores'
import { watch } from 'vue'

export default function useYoutubeVideos() {
  const getYoutubeVideos = async () => {
    await fetchYoutubeVideos(prefers.channels_playlists)
  }

  // onMounted(getYoutubeVideos)
  watch([prefers.channels, prefers.playlists], getYoutubeVideos)

  return {
    getYoutubeVideos
  }
}