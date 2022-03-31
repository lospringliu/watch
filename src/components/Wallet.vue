<script setup lang="ts">
import { useUser } from '../gun-vue/composables';
import { useWallet } from '../composables/useWallet'
const { user } = useUser()
const Remote = ref(null)
const Wallet = ref(null)
const { wallet, wallet_init, wallet_balance } = useWallet()
const [lib_name, lib_script] = wallet.librarys[0]
const { load } = useScriptTag(
  lib_script,
  () => {},
  { manual: true },
)

onBeforeMount(() => {
  if (!user.is) {
    user.auth = true
  }
  if (!globalThis[lib_name]) {
    console.log(`import library`)
    load().then(() => {
      console.log(`loaded ${lib_name}`)
      wallet.Remote = globalThis[lib_name].Remote
      wallet.Wallet = wallet.Remote.Wallet
      if (!wallet.address || !wallet.remote) {
        if (!user.is) {
        } else {
          wallet_init()
          wallet_balance()
        }
      }
    })
  }
})

</script>

<template lang="pug">
.flex.flex-col.justify-around.items-center.gap-2.m-2.min-h-90vh
  .flex.flex-col
    button.button(@click="wallet_balance")
      ph-camera(v-if="wallet.querying")
      ph-chats-teardrop(v-else)
    li {{ wallet.address }}
    li {{ wallet.activated }}
    li {{ wallet.balance }}
    li {{ wallet.transactions }}
</template>