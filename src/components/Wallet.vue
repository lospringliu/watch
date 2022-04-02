<script setup lang="ts">
import { useUser } from '../gun-vue/composables';
import { useWallet } from '../composables/useWallet'
const { user } = useUser()
const { wallet, load_library, wallet_init, wallet_balance } = useWallet()
globalThis.wallet = wallet
const balance = computed(() => {
  const balance = {sequence: 0, native: {} as any, tokens: {} as any} as any
  try {
    const jingtum = JSON.parse(user.wallets.jingtum?.balance || "{}")
    const native_token = "SWT"
    const whitelists = ["#", ">", "undefined", "balance", "chain", "activated", "address", "algorithm", "sequence", "SWT"]
    balance.sequence = jingtum.sequence || 0
    if (!jingtum.balances) {
      return balance
    }
    const native = jingtum.balances.find(t => t.issuer === "")
    if (native) {
      balance.native.token = native.currency
      balance.native.value = native.value
      balance.native.freezed = native.freezed
      jingtum.balances.forEach(token => {
        if (whitelists.find(t => t === token.currency)) { return }
        if (token.value < 0.000001) {
          // whitelists.push(token)
        } else {
          balance.tokens[token.currency] = token
        }
      })
    }
  } catch (e) { console.log(e) }
  return balance
})

onBeforeMount(() => {
  load_library()
  if (!user.is) {
    user.auth = true
  }
})
const { t } = useI18n()
</script>

<template lang="pug">
.grid.grid-col-1.place-content-around.gap-2.p-4.min-h-80vh
  .flex.flex-col.gap-2.max-w-sm.p-2.bg-white.rounded-xl.shadow-lg(v-if="user.is")
    .flex.justify-center.items-center.gap-4.text-blue-600
      p {{ wallet.chain }}
      mdi-wallet.w-12.h-12
      p {{ wallet.algorithm }}
    .mx-auto(v-if="balance.native?.value") {{ t('wallets.balance') }} {{ balance.native?.value }} {{ balance.native?.token }}
    .font-mono.tracking-tight.mx-auto {{ wallet.address }}
    .flex.flex-col.gap-2(v-if="user.wallets.jingtum?.activated")
      .border-b
      div(v-if="balance.tokens")
        p {{ t('wallets.tokens') }}
        ul.pl-4(v-for="(value, token) of balance.tokens" :key="token")
          li {{ value.value }} {{ token }}
      .flex.place-content-around
        button.button.text-green-800(@click="wallet_balance")
          carbon-update-now(v-if="!wallet.query")
        button.button
          ph-spinner-bold.text-yellow-500(v-if="wallet.querying")
          ph-spinner-thin.text-green-100(v-else)
    div(v-else)
      p {{ t('wallets.not_activated') }}
  .flex.flex-col.gap-2.max-w-sm.p-2.bg-white.rounded-xl.shadow-lg(v-else)
    p {{ t('wallets.login_first') }}
</template>