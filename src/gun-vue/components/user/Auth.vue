<script setup>
import { useUser, safeJSONParse, uploadText, SEA, parseLink } from '@composables'
import { ref, watch } from 'vue'

const current = ref('pass')
const pair = ref()
const passphrase = ref(null)

function show(option) {
  if (current.value != option) {
    current.value = option;
  } else {
    current.value = null;
  }
}

watch(pair, (p) => {
// console.log(p)
  if (p && typeof p == 'string' && p.substring(0, 3) == 'SEA') {
    passphrase.value = ''
  }
  if (typeof p == 'string' && p.includes('#/auth/')) {
    p = parseLink(p)
  }
  let obj = safeJSONParse(p)
  if (obj.pub && obj.priv) {
    auth(obj)
    pair.value = ''
  } else {
    console.log('No valid pair')
  }
})

const { auth } = useUser()

async function decode() {
  pair.value = await SEA.decrypt(pair.value, passphrase.value);
}

const { t } = useI18n()
</script>

<template lang="pug">
.flex.flex-col.my-4.flex-1.items-center.bg-light-700.rounded-3xl.p-4.shadow-lg
  .font-bold.text-xl {{ t('gunvue.already_account') }}
  .text-md {{ t('gunvue.login_saved_key') }}
  .flex
    button.button.m-2.cursor-pointer.flex.items-center(@click="show('key')")
      la-key.text-xl
      .p-1.ml-1.font-bold {{ t('gunvue.login_paste') }}
    label.button.m-2.cursor-pointer.flex.items-center(for="qr-input")
      la-qrcode.text-xl
      .p-1.ml-1.font-bold {{ t('gunvue.login_qr') }}
    label.button.m-2.cursor-pointer.flex.items-center(for="json-input")
      la-file-code.text-xl
      .p-1.ml-1.font-bold {{ t('gunvue.login_json') }}
  form.flex(v-if="passphrase !== null")
    input.py-1.px-4.m-1.rounded-xl(
      autofocus type="text" 
      v-model="passphrase" 
      :placeholder="t('gunvue.enter_password')"
      )
    button.button.text-2xl(@click="decode()" type="submit")
      la-sign-in-alt
  .hidden
    qr-load(@loaded="pair = $event")
    input#json-input(
      tabindex="-1" 
      type="file" 
      accept="application/json" 
      ref="file" 
      @change="uploadText($event, file => pair = file)"
      )
  .flex.flex-wrap
    transition(name="fade")
      textarea.p-2.text-sm.flex-1.w-full(
        rows="6" cols="40" 
        v-if="current == 'key'" 
        v-model="pair" 
        key="text" 
        :placeholder="t('gunvue.paste_keys')"
        )
</template> 