<script setup>
import { ref, onMounted, toRef } from 'vue'
import { useUser } from '@composables'

const { user } = useUser()

const emit = defineEmits(['submit'])

const message = ref('')

function send() {
  emit('submit', message.value);
  message.value = ''
}

const { t } = useI18n()
</script>

<template lang="pug">
.flex.gap-2(v-if="user.pub")
  textarea.px-2.rounded-xl.bg-light-200.flex-1(v-model="message" :placeholder="t('gunvue.your_message')" @keydown.enter.prevent.stop="send()")
  button.button(@click="send()" v-if="user.pub")
    la-comment-dots.mx-2
.p-2.flex.flex-col.items-center(v-else)
  button.button(@click="user.auth = true")
    | {{ t('gunvue.login_for_message') }}
</template>