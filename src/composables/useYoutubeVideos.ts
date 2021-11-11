import { IVideo } from '../types'
import { fetchYoutubeVideos } from '../api/fetchYoutubeVideos'
import { prefers } from '../stores/useStore'
import { ref, watch } from 'vue'

export default function useYoutubeVideos() {
  const videos = ref([] as IVideo[])
  const getYoutubeVideos = async () => {
    videos.value = await fetchYoutubeVideos(prefers.channels_playlists)
  }

  // onMounted(getYoutubeVideos)
  watch([prefers.channels, prefers.playlists], getYoutubeVideos)

  return {
    videos,
    getYoutubeVideos
  }
}