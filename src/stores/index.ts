import { createPinia, setActivePinia } from "pinia"
const pinia = createPinia()
setActivePinia(pinia)

import { useVideoStore } from "./useVideoStore"
import { useVideoFeaturedStore } from "./useVideoFeaturedStore"
import { usePlayingStore } from "./usePlayingStore"
import { usePlayingInListStore } from "./usePlayingInListStore"
import { usePlaylistStore } from "./usePlaylistStore"
import { usePrefersStore } from "./usePrefersStore"
import { useFilteringStore } from "./useFilteringStore"

const playing = usePlayingStore()
const playingInList = usePlayingInListStore()
const playlist = usePlaylistStore()
const videos = useVideoStore()
const featured = useVideoFeaturedStore()
const prefers = usePrefersStore()
const filtering = useFilteringStore()

export {playing, playingInList, playlist, videos, featured, prefers, filtering}
export {
  pinia,
  useVideoStore,
  useVideoFeaturedStore,
  usePlayingStore,
  usePlayingInListStore,
  usePrefersStore,
  useFilteringStore,
  usePlaylistStore
}