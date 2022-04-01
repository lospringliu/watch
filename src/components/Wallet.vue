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
const { t } = useI18n()
</script>

<template lang="pug">
.grid.grid-col-1.place-content-around.gap-2.m-2.min-h-90vh
  .flex.flex-col.gap-2.max-w-sm.p-2.bg-white.rounded-xl.shadow-lg
    .flex.justify-center.items-center.gap-4.text-blue-600
      p {{ wallet.chain }}
      mdi-wallet.w-12.h-12
      p {{ wallet.algorithm }}
    .font-mono.tracking-tight.mx-auto {{ wallet.address }}
    .border-b
    .flex.flex-col.gap-2(v-if="user.wallets.jingtum?.activated")
      p {{ t('wallets.balance') }} {{ wallet.balance.native.quantity }} {{ wallet.balance.native.token}}
      .border-b
      div(v-if="wallet.balance.tokens")
        p {{ t('wallets.tokens') }}
        ul.pl-4(v-for="(quantity, token) of wallet.balance?.tokens" :key="token")
          li {{ quantity }} {{ token }}
      .flex.place-content-around
        button.button.text-green-800(@click="wallet_balance")
          carbon-update-now(v-if="!wallet.query")
        button.button
          ph-spinner-bold.text-yellow-500(v-if="wallet.querying")
          ph-spinner-thin.text-green-100(v-else)
    div(v-else)
      p {{ t('wallets.not_activated') }}
</template>