import { ref, computed } from 'vue'
import { videos, filtering } from "../stores"

export default function useVideoSearch() {
  const searchQuery = ref(filtering)
  const videosMatchingSearchQuery = computed(() => {
    if (filtering.channel) {
      return videos.videos.sort((x, y) => x.videoPublishedAt > y.videoPublishedAt ? -1 : 1).filter(video => video.channel.name.includes(filtering.channel)).slice(0, searchQuery.value.limit)
    } else if (filtering.keyword) {
      return videos.videos.sort((x, y) => x.videoPublishedAt > y.videoPublishedAt ? -1 : 1).filter(video => video.channel.name.includes(filtering.keyword)).slice(0, searchQuery.value.limit)
    } else {
      return videos.videos.sort((x, y) => x.videoPublishedAt > y.videoPublishedAt ? -1 : 1).slice(0, searchQuery.value.limit)
    }
  })
    // videos.videos.filter(video => JSON.stringify(video).includes(searchQuery.value.keyword))
    // videos.videos

  return {
    searchQuery,
    videosMatchingSearchQuery
  }
}