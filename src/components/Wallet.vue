<script setup lang="ts">
import { useUser } from '../gun-vue/composables';
import { useWallet } from '../composables/useWallet'
const { user } = useUser()
const { wallet, wallet_init, wallet_balance } = useWallet()
globalThis.wallet = wallet
import { globalState } from "../stores/globalState"
const [lib_name] = wallet.librarys[0]
// const { load } = useScriptTag(
//   lib_script,
//   () => {},
//   { manual: true },
// )

onBeforeMount(() => {
  if (!user.is) {
    user.auth = true
  }
  if (!globalThis[lib_name]) {
    console.log(`import library`)
    globalState.swtc_load().then(() => {
      console.log(`loaded ${lib_name}`)
      wallet.Remote = globalThis[lib_name].Remote
      wallet.Wallet = wallet.Remote.Wallet
      if (!wallet.address || !wallet.remote) {
        if (!user.is) {
        } else {
          wallet_init()
          console.log(user.wallets.jingtum)
          wallet.balance_raw = user.wallets.jingtum
          wallet_balance()
        }
      }
    })
  }
})
</script>

<template lang="pug">
.grid.grid-col-1.place-content-around.gap-2.m-2.min-h-90vh
  .flex.flex-col.p-6.max-w-md.mx-auto.bg-white.rounded-xl.shadow-lg.space-x-4
    .mx-auto.text-blue-600
      mdi-wallet.w-16.h-16
    .tracking-tight.mx-auto {{ wallet.address }}
    .border-b
    div(v-if="wallet.activated")
      p ACTIVATED: {{ wallet.activated }}
      p BALANCE: {{ wallet.balance.native.quantity }} {{ wallet.balance.native.token}}
      div(v-if="wallet.balance.tokens")
        p TOKENS:
        ul.pl-4(v-for="(quantity, token) of wallet.balance?.tokens" :key="token")
          li {{ quantity }} {{ token }}
    .flex.place-content-around
      button.button.text-green-800(@click="wallet_balance")
        carbon-update-now(v-if="!wallet.query")
      button.button
        ph-spinner-bold.text-yellow-500(v-if="wallet.querying")
        ph-spinner-thin.text-green-100(v-else)
</template>