<script setup lang="ts">
import { currentRoom } from '@composables'

let audio

function enter() {
  if (!audio) {
    audio = new Audio('audio/bell.mp3')
    audio.volume = 0.1
  }
  audio.play()
}

let leaveAudio

function leave() {
  if (!leaveAudio) {
    leaveAudio = new Audio('audio/wind.mp3')
    leaveAudio.volume = 0.1
  }
  leaveAudio.play()
}
//    transition(name="fade")
</script>

<template lang='pug'>
.flex.flex-col.items-center 
  space-plane(@user="$router.push('/users/' + $event)" :key="currentRoom.pub" @enter="enter()" @leave="leave()")
  router-view(v-slot="{ Component }")
    component(:is="Component")
</template>