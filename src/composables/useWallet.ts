import { useUser } from "../gun-vue/composables"
import { getRandomElement } from "../api/utils"
// import { prefers } from '../stores'
const { user } = useUser()
const wallet = reactive({
  Remote: null,
  Wallet: null,
  chain: "jingtum",
  algorithm: "secp256k1",
  remote: null,
  address: "",
  initiated: computed(() => wallet.address && wallet.remote),
  activated: false,
  balance: {},
  transactions: [],
  endpoints: [],
  querying: false,
  librarys: [["swtc_rpc", "https://unpkg.com/@swtc/rpc@1.1.1/dist/swtc-rpc.js"],]
})

export function useWallet({
    chain = "jingtum",
    algorithm = "ed25519",
    need_activation=true,
    endpoints=['https://srje115qd43qw2.swtc.top', 'https://srje071qdew231.swtc.top']
  } = {}) {
    wallet.chain = chain
    wallet.algorithm = algorithm
    wallet.activated = !need_activation
    wallet.endpoints = endpoints
    const stop_watch = watch(user.wallets, () => {
      if (!wallet.address && user.wallets?.jingtum) {
        wallet.address = user.wallets.jingtum.address
        stop_watch()
      }
    })
  return { wallet, wallet_init, wallet_balance }
}
function wallet_init(){
  if (!wallet.initiated) {
    if (!wallet.address) {
      wallet.address = wallet.Wallet?.fromSecret(Buffer.from(user?.pair()?.priv, "base64").toString("hex"), wallet.algorithm)?.address
      user.db.get("wallets").get("defaults").get(wallet.chain).put({chain: wallet.chain, address: wallet.address, algorithm: wallet.algorithm})
    }
    wallet.remote = new wallet.Remote({server: getRandomElement(wallet.endpoints)})
  }
} 
function wallet_balance(){
  wallet_init()
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
        wallet.remote = new wallet.Remote({server: getRandomElement(wallet.endpoints)})
      }
    })
} 