import axios from 'axios'
import { IVideo, IChannel } from "../types"
import AsyncForEach from "async-await-foreach"
import { videos } from "../stores/useStore"
import { prefers } from "../stores/useStore"
const gapi = axios.create({ baseURL: 'https://youtube.googleapis.com/youtube/v3/' })
gapi.defaults.headers.common.Accept = 'application/json'


function makeParams(options = {}) {
  return {
    params: Object.assign({}, {
      part: 'snippet,contentDetails',
      maxResults: 20,
    }, options),
  }
}

async function fetchYoutubeVideos (channels: IChannel[] = []) {
  // const videos: any = []
  await AsyncForEach(channels, async (channel) => {
    const is_channel = channel.id.startsWith('UC')
    let playlistId = channel.id
    try {
      if (is_channel) {
        const response = await gapi.get('channels', makeParams({ key: prefers.youtubeAppKey, id: channel.id }))
        if (response.data.pageInfo.totalResults === 1) {
          playlistId = response.data.items[0].contentDetails.relatedPlaylists.uploads
        }
      }
      const resp = await gapi.get('playlistItems', makeParams({ key: prefers.youtubeAppKey, playlistId }))
      resp.data.items.forEach(item => {
        const video: IVideo = item.contentDetails
        video.channel = channel
        new Date().valueOf() - new Date(video.videoPublishedAt).valueOf() < 3 * 24 * 60 * 60 * 1000 && videos.add(video)
      })
      // resp.data.items.forEach(item => new Date().valueOf() - new Date(item.contentDetails.videoPublishedAt).valueOf() < 3 * 24 * 60 * 60 * 1000 && videos.add(item.contentDetails))
      // resp.data.items.forEach(item => videos.add(item.contentDetails))
      videos.videos.sort((x, y) => x.videoPublishedAt > y.videoPublishedAt ? -1 : 1)
    }
    catch (e) {
      console.log(e)
    }
  })
  return videos.videos
}
export {
  fetchYoutubeVideos
}