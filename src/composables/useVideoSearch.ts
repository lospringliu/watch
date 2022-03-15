import { ref, computed } from 'vue'
import { videos, filtering, prefers } from "../stores"

export default function useVideoSearch() {
  const searchQuery = ref(filtering)
  const videosMatchingSearchQuery = computed(() => {
    let filtered = videos.videos
    if (filtering.channel) {
      filtered = filtered.filter(video => video.channel.name.includes(filtering.channel))
    } else if (filtering.keyword) {
      filtered = filtered.filter(video => video.channel.name.includes(filtering.keyword))
    } else {}
    filtered = prefers.youtubeAccess ? filtered : filtered.filter(video => video.ipfs)
    return filtered.sort((x, y) => x.videoPublishedAt > y.videoPublishedAt ? -1 : 1).slice(0, searchQuery.value.limit)
  })
    // videos.videos.filter(video => JSON.stringify(video).includes(searchQuery.value.keyword))
    // videos.videos

  return {
    searchQuery,
    videosMatchingSearchQuery
  }
}