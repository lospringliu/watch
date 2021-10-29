<script setup lang="ts">
import { ref, onMounted } from "vue"
import Vue3Youtube from "./Vue3Youtube.vue"
import * as axios from 'axios'

const gapi = axios.create({ baseURL: 'https://youtube.googleapis.com/youtube/v3/' })
gapi.defaults.headers.common.Accept = 'application/json'

function makeParams(options = {}) {
  return {
    params: Object.assign({}, {
      part: 'snippet,contentDetails',
      maxResults: 10,
    }, options),
  }
}
const youtube = {
  channels: [
    'UC7Ky7FjJBI7ojx2Yqz2pkNQ', // shasha
    'UCH2BtkEp1kHY7o9TCIhYaFA', // shasha huangqiu
    'UCwNGgFvBpxtU8JagZLzztzQ', // yan talk
    'UCkZ9vSvx7lg9FvZifpbH2FA', // laobing
    'UCE05tYKEsEk7Qmhwg5pqcKw', // yangfeng
    'UCd6umYVQpBZ9CIyCwe8Kg7w', // chengyue
    'UCXRoo1Gp89SCbhdR_xEIp0w', // beimei cuige
    'UCnrxxRlv2ZSSW4ApuEy8C0w', // 谦秋论
  ],
  playlists: [
    'UURdpxiOm4HrwGI24Kv6MBKQ', // David郑经纬
    'UURByPS00RZsAUe2DTCoHuFQ', // 好奇大叔UncleCurious
    'UUdXqCN_HtF_RjlsHzDSnJIQ', // GermanCheese
    'UUoCHlYM3srHBmg21mK1-JPg', // 老楊到處說
    'PLBsA1M_J2ICIvMjsj_U7lIdeq-E8AW-bM', // 杨世光
  ],
}
const videos = ref([])

onMounted(async () => {
  const key = localStorage.getItem('google-api-key') || "AIzaSyB45Wu2r4NUvLS04fC4UDCEhi2ofPEOxNo"
  youtube.channels.forEach(async(channel) => {
    try {
      const response = await gapi.get('channels', makeParams({ key, id: channel }))
      if (response.data.pageInfo.totalResults === 1) {
        // is valid channel
        const playlistId = response.data.items[0].contentDetails.relatedPlaylists.uploads
        const resp = await gapi.get('playlistItems', makeParams({ key, playlistId }))
        resp.data.items.forEach(item => new Date() - new Date(item.contentDetails.videoPublishedAt) < 2 * 24 * 60 * 60 * 1000 && videos.value.push(item.contentDetails))
        videos.value.sort((x, y) => x.videoPublishedAt > y.videoPublishedAt ? -1 : 1)
      }
      else {
        console.log(`${channel} is not a valid channel`)
      }
    }
    catch (e) {
      console.log(e)
    }
  })
  youtube.playlists.forEach(async(playlistId) => {
    try {
      const resp = await gapi.get('playlistItems', makeParams({ key, playlistId }))
      resp.data.items.forEach(item => new Date() - new Date(item.contentDetails.videoPublishedAt) < 2 * 24 * 60 * 60 * 1000 && videos.value.push(item.contentDetails))
      videos.value.sort((x, y) => x.videoPublishedAt > y.videoPublishedAt ? -1 : 1)
    }
    catch (e) {
      console.log(e)
    }
  })
})
</script>

<template>
  <div v-for="video in videos" :key="video.videoId" class="grid">
    <vue3-youtube :videoid="video.videoId" />
  </div>
</template>