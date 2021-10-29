import { ref, computed } from 'vue'

export default function useVideoSearch(videos: any) {
  const searchQuery = ref('')
  const videosMatchingSearchQuery = computed(() => {
    return videos.value.filter((video: any) => {
      return JSON.stringify(video).includes(searchQuery.value)
    })
  })

  return {
    searchQuery,
    videosMatchingSearchQuery
  }
}