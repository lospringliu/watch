<script setup>
import { useUser, SEA, createRoom, useBackground, enterRoom } from '@composables';
import { reactive, ref, computed } from 'vue'

const emit = defineEmits(['room'])

const { user } = useUser()

const create = reactive({
  pair: null,
  name: ''
})

async function genPair() {
  let pair = await SEA.pair()
  create.pair = pair
}

function reset() {
  // emit('room', create.pair.pub)
  // enterRoom(create.pair.pub)
  create.pair = null
  create.name = ''
}

function createIt() {
  createRoom({ pair: { ...create.pair }, name: create.name });
  reset()
}

const bg = computed(() => useBackground({ pub: create.pair?.pub, size: 620 }))

const { t } = useI18n()
</script>

<template lang='pug'>
.flex.flex-col.bg-cover.rounded-2xl.p-8.max-w-620px.bg-light-800.justify-center(v-if="user.pub" :style="{ ...bg }")
  .flex
    button.button.m-2.flex-1(@click="genPair()" ) {{ t('gunvue.room_generate') }}
    button.button.m-2(@click="reset()" v-if="create.pair" ) {{ t('gunvue.reset') }}
  input.p-2.m-2.rounded-xl(type="text" v-if="create.pair" v-model="create.name" :placeholder="t('gunvue.room_new_name')")
  transition(name="fade")
    button.button.m-2.flex-1(@click="createIt()" v-if="create.pair && create.name" ) {{ t('gunvue.room_add') }}

</template> 