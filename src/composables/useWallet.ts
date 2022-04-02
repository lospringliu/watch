import { useUser } from "../gun-vue/composables"
import { getRandomElement } from "../api/utils"
// import { prefers } from '../stores'
const { user } = useUser()
const endpoints = ref(['https://srje115qd43qw2.swtc.top', 'https://srje071qdew231.swtc.top'])
const wallet = reactive({
  lib_name: "swtc_rpc",
  lib_url: "https://unpkg.com/@swtc/rpc@1.1.1/dist/swtc-rpc.js",
  Remote: null,
  Wallet: null,
  chain: "jingtum",
  algorithm: "ed25519",
  remote: null,
  address: "",
  initiated: computed(() => wallet.address && wallet.remote),
  activated: false,
  balance_raw: {},
  balance: computed(() => {
    let blc = {native: {}, tokens: {} as any} as any
    if (wallet.balance_raw?.activated) { wallet.activated = true }
    if (!wallet.activated && wallet.balance_raw.hasOwnProperty("sequence")) { wallet.activated = true }
    if (!wallet.activated) {return blc}
    const whitelists = ["#", ">", "undefined", "balance", "chain", "activated", "address", "algorithm", "sequence", "SWT"]
    blc.sequence = wallet.balance_raw.sequence || 0
    blc.native = {token: "SWT", quantity: wallet.balance_raw.SWT}
    Object.keys(wallet.balance_raw).forEach(token => {
      if (whitelists.find(t => t === token)) { return }
      if (wallet.balance_raw[token] < 0.000001) {
      } else {
        blc.tokens[token] = wallet.balance_raw[token]
      }
    })
    return blc
  }),
  transactions: [],
  endpoints,
  querying: false
})

export function useWallet({
    need_activation=true,
  } = {}) {
    wallet.activated = !need_activation
    const user_is = computed(() => user.is)
    const stop_watch_auth = watch(user_is, () => {
      if (!user_is) {
        wallet.address = ''
        wallet.balances = {}
      }
    })
    const stop_watch_address = watch(user.wallets, () => {
      if (!wallet.address && user.wallets?.jingtum?.address) {
        wallet.address = user.wallets.jingtum.address
      }
      if (!wallet.activated && user.wallets?.jingtum?.activated) {
        wallet.activated = user.wallets.jingtum.activated
      }
    })
  return { wallet, load_library, wallet_init, wallet_balance }
}
async function load_library() {
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
  await wallet_init()
  // if (user.is) wallet.balance_raw = user.wallets[wallet.chain]
}

async function wallet_init(){
  if (!wallet.initiated) {
    try {
      if (!wallet.address) {
        wallet.address = wallet.Wallet?.fromSecret(Buffer.from(user?.pair()?.priv, "base64").toString("hex"), wallet.algorithm)?.address
        user.db.get("wallets").get("defaults").get(wallet.chain).put({chain: wallet.chain, address: wallet.address, algorithm: wallet.algorithm })
      }
      wallet.remote = new wallet.Remote({server: getRandomElement(wallet.endpoints)})
      setTimeout(() => {
        if (!wallet.activated && user.wallets?.jingtum?.activated) {
          wallet.activated = true
        }
      }, 1000)
    } catch (e) {}
  }
} 

async function wallet_balance() {
  await wallet_init()
  wallet.querying = true
  try {
    const r = await wallet.remote.getAccountBalances(wallet.address)
    wallet.activated = true
    r.balances.forEach(t => {
      if (t.issuer === "") {
        t.value = (t.value).toFixed(4)
      } else {
        t.value = parseFloat(t.value).toFixed(4)
      }
    })
    // wallet.transactions = ['tx1', 'tx2']
    wallet.querying = false
    if (user.is) {
      user.db.get("wallets").get("defaults").get(wallet.chain).put({ address: wallet.address, activated: true, sequence: r.sequence, balance: JSON.stringify(r) })
    } else {
      wallet.balance_raw = r
    }
  } catch (e) {
      wallet.querying = false
      if (e && e.error && e.error === "actNotFound") {
        wallet.activated = false
      } else {
        console.log(`error get account balances`)
        wallet.remote = new wallet.Remote({server: getRandomElement(wallet.endpoints)})
      }
  }
} 