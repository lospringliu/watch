<template>
    <YouTube
        :src="'https://www.youtube.com/watch?v=' + videoid"
        width="100%"
        height="100%"
        @ready="onReady"
        :ref="videoid" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import YouTube from 'vue3-youtube'

export default defineComponent({
  name: 'Vue3Youtube',
  props: {
    videoid: { type: String, required: true},
  },
  components: { YouTube },
  methods: {
    onReady() {
    },
  },
})
</script>