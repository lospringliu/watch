import { useUser } from "../gun-vue/composables"
import { getRandomElement } from "../api/utils"
// import { prefers } from '../stores'
const { user } = useUser()
const wallet = reactive({
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
    if (!wallet.activated && wallet.balance_raw.hasOwnProperty("activated") && !wallet.balance_raw.activated) { return blc }
    if (wallet.balance_raw?.activated) { wallet.activated = true }
    const whitelists = ["#", ">", "undefined", "balance", "chain", "activated", "address", "algorithm", "sequence", "SWT"]
    blc.sequence = wallet.balance_raw.sequence || 0
    blc.native = {token: "SWT", quantity: wallet.balance_raw.SWT}
    Object.keys(wallet.balance_raw).forEach(token => {
      if (whitelists.find(t => t === token)) { return }
      if (wallet.balance_raw[token] < 0.000001) {
        // whitelists.push(token)
      } else {
        blc.tokens[token] = wallet.balance_raw[token]
      }
    })
    return blc
  }),
  transactions: [],
  endpoints: [],
  querying: false,
  librarys: [["swtc_rpc", "https://unpkg.com/@swtc/rpc@1.1.1/dist/swtc-rpc.js"],]
})

export function useWallet({
    need_activation=true,
    endpoints=['https://srje115qd43qw2.swtc.top', 'https://srje071qdew231.swtc.top']
  } = {}) {
    wallet.activated = !need_activation
    wallet.endpoints = endpoints
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
        // stop_watch_address()
      }
      if (!wallet.activated && user.wallets?.jingtum?.activated) {
        wallet.activated = user.wallets.jingtum.activated
        // stop_watch_address()
      }
    })
  return { wallet, wallet_init, wallet_balance }
}
function wallet_init(){
  if (!wallet.initiated) {
    if (!wallet.address) {
      wallet.address = wallet.Wallet?.fromSecret(Buffer.from(user?.pair()?.priv, "base64").toString("hex"), wallet.algorithm)?.address
      user.db.get("wallets").get("defaults").get(wallet.chain).put({chain: wallet.chain, address: wallet.address, algorithm: wallet.algorithm })
    }
    setTimeout(() => {
      if (!wallet.activated && user.wallets?.jingtum?.activated) {
        wallet.activated = true
      }
    }, 1000)
    wallet.remote = new wallet.Remote({server: getRandomElement(wallet.endpoints)})
  }
} 
function wallet_balance(){
  wallet_init()
  wallet.querying = true
  wallet.remote.getAccountBalances(wallet.address)
    .then(r => {
      wallet.activated = true
      r.balances.forEach(t => {
        if (t.issuer === "") {
          r[t.currency] = (t.value).toFixed(4)
        } else {
          r[t.currency] = parseFloat(t.value).toFixed(4)
        }
      })
      delete r.balances
      wallet.balance_raw = r
      // wallet.transactions = ['tx1', 'tx2']
      wallet.querying = false
      if (user.is) {
        user.db.get("wallets").get("defaults").get(wallet.chain).put({chain: wallet.chain, address: wallet.address, algorithm: wallet.algorithm, activated: true, ...r })
      }
    })
    .catch(e => {
      wallet.querying = false
      if (e && e.error && e.error === "actNotFound") {
        wallet.activated = false
      } else {
        console.log(`error get account balances`)
        wallet.remote = new wallet.Remote({server: getRandomElement(wallet.endpoints)})
      }
    })
} 