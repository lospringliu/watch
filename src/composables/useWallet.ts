import { useUser } from "../gun-vue/composables"
import { getRandomElement } from "../api/utils"
const { user } = useUser()
export const default_chain_name = ref("jingtum")

export const chains = reactive({
  ethereum: {
    algorithm: "ecdsa",
    need_activation: false,
    endpoints: ['https://cloudflare-eth.com',]
  },
  moac: {
    algorithm: "ecdsa",
    need_activation: false,
    endpoints: ['https://gateway.moac.io/mainnet',]
  },
  jingtum: {
    need_activation: true,
    algorithm: "ed25519",
    lib_name: "swtc_rpc",
    lib_url: "https://unpkg.com/@swtc/rpc@1.1.1/dist/swtc-rpc.js",
    endpoints: ['https://srje115qd43qw2.swtc.top', 'https://srje071qdew231.swtc.top'],
    load_library: async (wallet= {} as any) => {
      const lib_name = wallet.lib_name
      const { load } = useScriptTag(wallet.lib_url, () => {}, { manual: true })
      if (!globalThis.hasOwnProperty(lib_name)) {
        console.log(`import library`)
        try {
          await load()
          console.log(`loaded ${lib_name}`)
        } catch (e) {
          console.log(e)
        }
      }
      wallet.Remote = (globalThis[lib_name]).Remote
      wallet.Wallet = wallet.Remote.Wallet
      await chains.jingtum.wallet_init(wallet)
      if (user.is) wallet.balance_raw = JSON.parse(user.wallets[wallet.chain]?.balance || "{}")
    },
    wallet_init: async (wallet = {} as any) => {
      if (!wallet.initiated) {
        try {
          if (!wallet.address) {
            wallet.address = wallet.Wallet?.fromSecret(Buffer.from(user?.pair()?.priv, "base64").toString("hex"), wallet.algorithm)?.address
            user.db.get("wallets").get("defaults").get(wallet.chain).put({chain: wallet.chain, address: wallet.address, algorithm: wallet.algorithm })
          }
          wallet.api = new wallet.Remote({server: getRandomElement(wallet.endpoints)})
          chains.jingtum.update_balance(wallet)
          setTimeout(() => {
            if (!wallet.activated && user.wallets?.jingtum?.activated) {
              wallet.activated = true
            }
          }, 500)
        } catch (e) {}
      }
    },
    update_balance: async (wallet = {} as any) => {
      await chains.jingtum.wallet_init(wallet)
      wallet.querying = true
      try {
        const r = await wallet.api.getAccountBalances(wallet.address)
        wallet.activated = true
        r.balances.forEach(t => {
          if (t.issuer === "") {
            t.value = (t.value).toFixed(4)
          } else {
            t.value = parseFloat(t.value).toFixed(4)
          }
        })
        wallet.querying = false
        if (user.is) {
          user.db.get("wallets").get("defaults").get(wallet.chain).put({ address: wallet.address, activated: true, sequence: r.sequence, balance: JSON.stringify(r) })
        }
        wallet.balance_raw = r
      } catch (e) {
        wallet.querying = false
        if (e && e.error && e.error === "actNotFound") {
          wallet.activated = false
          wallet.balance_raw = {}
          if (user.is) {
            user.db.get("wallets").get("defaults").get(wallet.chain).put({ address: wallet.address, activated: false, sequence: 1, balance: JSON.stringify({}) })
          }
        } else {
          console.log(`error get account balances`)
          wallet.api = new wallet.Remote({server: getRandomElement(wallet.endpoints)})
        }
      }
    } 
  },
})

export const default_chain = computed(() => chains[default_chain_name.value])

const wallets = computed(() => {
  const obj = {} as any
  Object.entries(chains).forEach(([chain_name, chain]) => {
    obj[chain_name] = chain
  })
  return obj
})
export function useWallets() {
  return {
    wallets
  }
}

const wallet = reactive({
  chain: "",
  address: "",
  activated: false,
  balance_raw: {},
  api: null,
  initiated: computed(() => wallet.address && wallet.api),
  querying: false,
})

export function useWallet({ algorithm="", chain_name=default_chain_name.value } = {}) {
  const chain = chains[chain_name]
  wallet.chain = chain_name
  wallet.activated = !chain.need_activation
  wallet.algorithm = algorithm || chain.algorithm
  wallet.endpoints = chain.endpoints
  if (chain.lib_name) {
    wallet.lib_name = chain.lib_name
    wallet.lib_url = chain.lib_url
  }
  const user_is = computed(() => user.is)
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
    load_library: chain.load_library,
    wallet_init: chain.wallet_init,
    update_balance: chain.update_balance }
}
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