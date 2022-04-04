<script setup lang="ts">
import { useUser } from '../gun-vue/composables';
import { useWallet, useWallets } from '../composables/useWallet'
const { user } = useUser()
const { wallet } = useWallet()
// const { wallets } = useWallets()
// const wallet = wallets.jingtum
const noop = () => {console.log(`...debug doing nothing`)}
const balance = computed(() => {
  const balance = {sequence: 0, native: {} as any, tokens: {} as any} as any
  try {
    const jingtum = JSON.parse(user.wallets.jingtum?.balance || "{}")
    balance.sequence = jingtum.sequence || 0
    const native = (jingtum.balances || []).find(t => t.issuer === "")
    if (native) {
      balance.native.token = native.currency
      balance.native.value = native.value
      balance.native.freezed = native.freezed
      jingtum.balances.filter(t => t.issuer).forEach(token => {
        if (token.value > 0.000001) {
          balance.tokens[token.currency] = token
        }
      })
    }
  } catch (e) { console.log(e) }
  return balance
})

onBeforeMount(() => {
  wallet.chainobj.load_library(wallet)
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
      div(v-if="Object.keys(balance.tokens).length > 0")
        p {{ t('wallets.tokens') }}
        ul.pl-4(v-for="(value, token) of balance.tokens" :key="token")
          li {{ value.value }} {{ token }}
      .flex.place-content-around
        button.button.text-green-800
          ph-spinner-bold.text-yellow-500(v-if="wallet.querying" @click="noop()")
          carbon-update-now(v-else @click="wallet.chainobj.update_balance(wallet)")
    div(v-else)
      .flex.place-content-around
        p {{ t('wallets.not_activated') }}
        button.button.text-green-800(@click="wallet.chainobj.update_balance(wallet)")
          ph-spinner-bold.text-yellow-500(v-if="wallet.querying" @click="noop()")
          carbon-update-now(v-else @click="wallet.chainobj.update_balance(wallet)")
  .flex.flex-col.gap-2.max-w-sm.p-2.bg-white.rounded-xl.shadow-lg(v-else)
    p {{ t('wallets.login_first') }}
</template>