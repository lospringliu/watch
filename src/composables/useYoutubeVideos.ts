import { fetchYoutubeVideos } from '../api/fetchYoutubeVideos'
import { ref, onMounted, watch } from 'vue'

export default function useYoutubeVideos(prefers: any) {
  const videos = ref(<any>[])
  const getYoutubeVideos = async () => {
    videos.value = await fetchYoutubeVideos(prefers.channels_playlists)
  }

  onMounted(getYoutubeVideos)
  watch(prefers, getYoutubeVideos)

  return {
    videos,
    getYoutubeVideos
  }
}