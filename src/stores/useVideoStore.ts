const useVideoStore = defineStore('videos', {
  state: () => {
    return { videos: [] }
  },
  actions: {
    add(video) {
      this.videos.push(video)
    },
    sort(opts = {key: "date"} as any) {
      switch (opts.key) {
        case "date":
          this.videos.sort((x,y) => x.videoPublishedAt > y.videoPublishedAt ? 1 : -1)
          break
        case "id":
          this.videos.sort((x,y) => x.videoId > y.videoId ? 1 : -1)
          break
        default:
          console.log("no sort")
      }
    },
    remove(video) {
      const index = this.videos.find(v => v.id === video.id)
      if (index !== -1) {
        this.videos.splice(index, 1)
      }
    },
  },
})
