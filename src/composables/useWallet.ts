import { sleep } from "../api/utils"
import { useUser } from "../gun-vue/composables"
import { chains } from "./chains"
const { user } = useUser()
const user_is = computed(() => user.is)
export const default_chain_name = ref("jingtum")
export const default_chain = computed(() => chains[default_chain_name.value])

const wallet = reactive({
  chain: "",
  address: "",
  activated: false,
  balance_raw: {},
  api: null,
  initiated: computed(() => wallet.address && wallet.api),
  querying: false,
})
export function useWallet({ chain_name=default_chain_name.value } = {}) {
  const chain = chains[chain_name]
  wallet.chain = chain_name
  wallet.chainobj = chain
  wallet.activated = !chain.need_activation
  wallet.algorithm = chain.algorithm
  wallet.endpoints = chain.endpoints
  const stop_watch_auth = watch(user_is, () => {
    if (!user_is) {
      wallet.address = ''
      wallet.balances = {}
    }
  })
  const stop_watch_address = watch(user.wallets, () => {
    if (!wallet.address && user.wallets?.[chain_name]?.address) {
      wallet.address = user.wallets[chain_name].address
    }
    if (!wallet.activated && user.wallets?.[chain_name]?.activated) {
      wallet.activated = user.wallets[chain_name].activated
    }
  })
  return {
    wallet,
    chain
  }
}
const wallets = reactive({
})

export function useWallets() {
  Object.entries(chains).forEach(([chain_name, chain]) => {
    if (!wallets.hasOwnProperty(chain_name)) {
      wallets[chain_name] = {
        address: "",
        api: null,
        chain: chain_name,
        chainobj: chain,
        activated: !chain.need_activation,
        balance_raw: {},
        querying: false,
        algorithm: chain.algorithm,
        endpoints: chain.endpoints
      }
    }
    const wallet = wallets[chain_name]
    wallet.initiated = computed(() => wallet.address && wallet.api)
    if (wallet.stop_watch_auth) { wallet.stop_watch_auth() }
    if (wallet.stop_watch_address) { wallet.stop_watch_address() }
    wallet.stop_watch_auth = watch(user_is, () => {
      if (!user_is) {
        wallet.address = ''
        wallet.balances = {}
      }
    })
    wallet.stop_watch_address = watch(user.wallets, () => {
      if (!wallet.address && user.wallets?.[chain_name]?.address) {
        wallet.address = user.wallets[chain_name].address
      }
      if (!wallet.activated && user.wallets?.[chain_name]?.activated) {
        wallet.activated = user.wallets[chain_name].activated
      }
    })
  })
  return {
    wallets,
    chains
  }
}
globalThis.useWallets = useWallets

//  balance: computed(() => {
//    // reference implementation, not used
//    const balance = {sequence: 0, native: {} as any, tokens: {} as any} as any
//    try {
//      balance.sequence = wallet.balance_raw.sequence || 0
//      const native = (wallet.balance_raw.balances || []).find(t => t.issuer === "")
//      if (native) {
//        balance.native.token = native.currency
//        balance.native.value = native.value
//        balance.native.freezed = native.freezed
//        wallet.balance_raw.balances.forEach(token => {
//          if (token.value > 0.000001) {
//            balance.tokens[token.currency] = token
//          }
//        })
//      }
//    } catch (e) { console.log(e) }
//    return balance
//  }),