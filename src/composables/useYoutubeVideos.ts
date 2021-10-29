import { fetchYoutubeVideos } from '../api/fetchYoutubeVideos'
import { ref, onMounted, watch } from 'vue'

export default function useYoutubeVideos(channels: any) {
  const videos = ref(<any>[])
  const getYoutubeVideos = async () => {
    videos.value = await fetchYoutubeVideos(channels.value)
  }

  onMounted(getYoutubeVideos)
  watch(channels, getYoutubeVideos)

  return {
    videos,
    getYoutubeVideos
  }
}