<script setup lang="ts">
import { useUser } from '../gun-vue/composables';
import { default_chain_name, useWallet, useWallets } from '../composables/useWallet'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'
const { user } = useUser()
// const { wallet } = useWallet()
const { wallets, chains } = useWallets()
const noop = () => {console.log(`...debug doing nothing`)}

const chain_names = []
for (const chain in wallets) {
  chain_names.push({name: chain})
}

const balances = computed(() => {
  const balances = {} as any
  Object.keys(chains).forEach(chain => {
    console.log(chain)
    const balance = {sequence: 0, native: {} as any, tokens: {} as any} as any
    try {
      const balance_raw = JSON.parse(user.wallets[chain]?.balance || "{}")
        console.log(balance_raw)
      balance.sequence = balance_raw.sequence || 0
      const natives = (balance_raw.balances || []).filter(t => t.issuer === "")
      if (natives.length === 1) {
        const native = natives[0]
        balance.native.token = native.currency
        balance.native.value = native.value
        balance.native.freezed = native.freezed || 0
        balance_raw.balances.filter(t => t.issuer).forEach(token => {
          if (token.value > 0.01) {
            balance.tokens[token.currency] = token
          }
        })
      }
    } catch (e) { console.log(e) }
    balances[chain] = balance
  })
  return balances
})

const selectedChain = ref(chain_names.find(e => e.name === default_chain_name.value))
const wallet = ref(useWallet())
const chain = ref(default_chain_name.value)
watch(selectedChain, () => {
  wallet.value = useWallet(selectedChain.value.name)
  chain.value = selectedChain.value.name
})


onBeforeMount(() => {
  Object.keys(wallets).forEach(key => {
    const wallet = wallets[key]
    wallet.chainobj.load_library(wallet).then(() => {wallet.chainobj.wallet_init(wallet)})
  })
  if (!user.is) {
    user.auth = true
  }
})
const { t } = useI18n()
</script>

<template lang="pug">
h1.pt-8.text-center.font-bold.text-2xl.text-gray-800.dark_text-gray-200 Wallets
.container.overflow-x-hidden
  .grid.grid-col-1.place-content-around.gap-2.p-4.min-h-60vh
    .flex.flex-col.gap-2.max-w-full.sm_max-w-sm.bg-white.rounded-xl.shadow-lg
      Listbox(v-model="selectedChain")
        .relative.mt-1
          ListboxButton(class="relative w-full py-2 pl-12 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus_outline-none focus-visible_ring-2 focus-visible_ring-opacity-75 focus-visible_ring-white focus-visible_ring-offset-orange-300 focus-visible_ring-offset-2 focus-visible_border-indigo-500 sm_text-sm")
            span.block.truncate {{ selectedChain.name }}
            span.absolute.inset-y-0.right-0.flex.items-center.pr-2.pointer-events-none
              SelectorIcon.w-5.h-5.text-gray-400(aria-hidden="true")
  
          ListboxOptions(class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus_outline-none sm_text-sm")
            ListboxOption(
              v-slot="{ active, selected }"
              v-for="chain in chain_names"
              :key="chain.name"
              :value="chain"
              as="template"
            )
              li.cursor-default.select-none.relative.py-2.pl-10.pr-4(
                :class="{ 'text-cyan-900' : active, 'bg-amber-100': active, 'text-gray-900' : !active }"
              )
                span.block.truncate(
                  :class="{ 'font-medium' : selected, 'font-normal': !selected }"
                ) {{ chain.name }}
                span.absolute.inset-y-0.left-0.flex.items-center.pl-3.text-amber-600(v-if="selected")
                  CheckIcon.w-5.h-5(aria-hidden="true")
    .flex.flex-col.gap-2.max-w-full.sm_max-w-sm.bg-white.rounded-xl.shadow-lg(v-if="user.is")
      .flex.justify-center.items-center.gap-4.text-blue-600.bg-cyan-400
        p {{ wallet.chain }}
        mdi-wallet.w-12.h-12
        p {{ wallet.algorithm }}
      .mx-auto(v-if="balances[chain]?.native?.value") {{ t('wallets.balance') }} {{ balances[chain]?.native?.value }} {{ balances[chain]?.native?.token }}
      .font-mono.tracking-tight.px-1.mx-auto {{ wallet.address }}
      .flex.flex-col.gap-2(v-if="user.wallets[chain]?.activated")
        .border-b
        div(v-if="Object.keys(balances[chain].tokens).length > 0")
          p {{ t('wallets.tokens') }}
          ul.pl-4(v-for="(value, token) of balances[chain].tokens" :key="token")
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
    .flex.flex-col.gap-2.max-w-full.sm_max-w-sm.p-2.bg-white.rounded-xl.shadow-lg(v-else)
      p {{ t('wallets.login_first') }}
</template>
