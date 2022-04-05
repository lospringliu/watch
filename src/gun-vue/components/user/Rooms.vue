<script setup>
import { computed, ref } from 'vue'
import { useUser, createRoom, SEA, enterRoom, recreateRoom } from '@composables';

const emit = defineEmits(['browse'])

const { user } = useUser()

const rooms = computed(() => {
  let list = user.safe.rooms
  if (list) {
    delete list['_']
    return list
  } else {
    return {}
  }

})

const open = ref(false)


const { t } = useI18n()
</script>

<template lang='pug'>
.flex.flex-col(v-if="Object.keys(rooms).length > 0")
  .flex.p-4.bg-light-900.rounded-xl.mb-2.items-center.cursor-pointer.shadow-sm.hover_shadow-md.transition(@click="open = !open")
    .text-lg.font-bold {{ t('gunvue.my_rooms') }}
    .flex-1 
    .text-md.font-bold.mr-2 {{ Object.keys(rooms).length }}
    la-angle-down(v-if="!open")
    la-angle-up(v-else)
  transition(name="fade" mode="out-in")
    .flex.flex-wrap.gap-2.mb-8(v-if="open" )
      room-card(
        style="flex: 1 1 200px" 
        v-for="( enc, room ) in rooms" :key="room"
        :pub="room"
        )
          .p-4.flex.flex-wrap.gap-1
            button.button(@click="$emit('browse', room)")
              la-eye
              .ml-2 {{ t('gunvue.view') }}
            button.button(@click="enterRoom(room)")
              ion-enter-outline
              .ml-2 {{ t('gunvue.enter') }}
            button.button(@click="recreateRoom(enc)")
              la-tools
              .ml-2 {{ t('gunvue.renew') }}
</template>