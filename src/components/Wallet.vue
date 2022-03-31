<script setup lang="ts">
import { useUser } from '../gun-vue/composables';
import { getRandomElement } from '../api/utils'
const { load } = useScriptTag(
  "https://unpkg.com/@swtc/rpc@1.1.1/dist/swtc-rpc.js",
  () => {},
  { manual: true },
)
const { user } = useUser()
const Remote = ref(null)
const Wallet = ref(null)
const { wallet } = useWallet()

function useWallet({
    need_activation=true,
    endpoints=['https://srje115qd43qw2.swtc.top', 'https://srje071qdew231.swtc.top']
  } = {}) {
  const wallet = reactive({
    remote: null,
    address: "",
    activated: !need_activation,
    balance: {},
    transactions: [],
    endpoints,
    querying: false,
  })
  return { wallet, wallet_init, wallet_balance }
}
function wallet_init(){
  wallet.address = Wallet.value?.fromSecret(Buffer.from(user.pair().priv, "base64").toString("hex"), "ed25519")?.address
  wallet.remote = new Remote.value({server: getRandomElement(wallet.endpoints)})
} 
function wallet_balance(){
  wallet.querying = true
  wallet.remote.getAccountBalances(wallet.address)
    .then(r => {
      wallet.activated = true
      wallet.balance = r.balances[0]
      // wallet.transactions = ['tx1', 'tx2']
      wallet.querying = false
    })
    .catch(e => {
      wallet.querying = false
      if (e && e.error && e.error === "actNotFound") {
        wallet.activated = false
      } else {
        console.log(`error get account balances`)
      }
    })
} 

onBeforeMount(() => {
  if (!user.is) {
    user.auth = true
  }
  if (!globalThis.swtc_rpc) {
    console.log(`import swtclib`)
    load().then(() => {
      console.log(`loaded swtc_rpc`)
      Remote.value = globalThis.swtc_rpc.Remote
      Wallet.value = Remote.value.Wallet
      wallet_init()
      wallet_balance()
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