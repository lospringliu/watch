import { getRandomElement } from "../api/utils"
import { useUser } from "../gun-vue/composables"
const { user } = useUser()

export const chains = reactive({
  ethereum: {
    chain: "ethereum",
    algorithm: "ecdsa",
    need_activation: false,
    lib_name: "Web3",
    lib_url: "https://unpkg.com/web3@latest/dist/web3.min.js",
    endpoints: ['https://cloudflare-eth.com',],
    load_library: async (wallet = {} as any) => {
      const lib_name = wallet.chainobj.lib_name
      const { load } = useScriptTag(wallet.chainobj.lib_url, () => {}, { manual: true })
      if (!globalThis.hasOwnProperty(lib_name)) {
        console.log(`import library`)
        try {
          await load()
          console.log(`loaded ${lib_name}`)
        } catch (e) {
          console.log(e)
        }
      }
      await wallet.chainobj.wallet_init(wallet)
      if (user.is) wallet.balance_raw = JSON.parse(user.wallets[wallet.chain]?.balance || "{}")
    },
    wallet_init: async (wallet = {} as any) => {
      console.log(`wallet init`)
      if (!wallet.initiated) {
        try {
          wallet.api = new globalThis.Web3(getRandomElement(wallet.chainobj.endpoints))
          if (!wallet.address) {
            console.log(`address`)
            wallet.address = wallet.api.eth.accounts.privateKeyToAccount(Buffer.from(user?.pair()?.priv, "base64").toString("hex"))?.address
            user.db.get("wallets").get("defaults").get(wallet.chain).put({chain: wallet.chain, address: wallet.address, algorithm: wallet.chainobj.algorithm })
          }
          wallet.chainobj.update_balance(wallet)
        } catch (e) {}
      }
    },
    update_balance: async (wallet = {} as any) => {
      await wallet.chainobj.wallet_init(wallet)
      wallet.querying = true
      try {
        const r = await wallet.api.eth.getBalance(wallet.address)
        wallet.activated = true
        wallet.querying = false
        if (user.is) {
          user.db.get("wallets").get("defaults").get(wallet.chain).put({ address: wallet.address, activated: true, sequence: r.sequence, balance: JSON.stringify(r) })
        }
        wallet.balance_raw = r
      } catch (e) {
        wallet.querying = false
        console.log(`error get account balances`)
        wallet.api = new wallet.Remote({server: getRandomElement(wallet.endpoints)})
      }
    } 
  },
  moac: {
    chain: "moac",
    algorithm: "ecdsa",
    need_activation: false,
    lib_name: "Web3",
    lib_url: "https://unpkg.com/web3@latest/dist/web3.min.js",
    endpoints: ['https://gateway.moac.io/mainnet',],
    load_library: async (wallet = {} as any) => {
      const lib_name = wallet.chainobj.lib_name
      const { load } = useScriptTag(wallet.chainobj.lib_url, () => {}, { manual: true })
      if (!globalThis.hasOwnProperty(lib_name)) {
        console.log(`import library`)
        try {
          await load()
          console.log(`loaded ${lib_name}`)
        } catch (e) {
          console.log(e)
        }
      }
      await wallet.chainobj.wallet_init(wallet)
      if (user.is) wallet.balance_raw = JSON.parse(user.wallets[wallet.chain]?.balance || "{}")
    },
    wallet_init: async (wallet = {} as any) => {
      console.log(`wallet init`)
      if (!wallet.initiated) {
        try {
          wallet.api = new globalThis.Web3(getRandomElement(wallet.chainobj.endpoints))
          if (!wallet.address) {
            console.log(`address`)
            wallet.address = wallet.api.eth.accounts.privateKeyToAccount(Buffer.from(user?.pair()?.priv, "base64").toString("hex"))?.address
            user.db.get("wallets").get("defaults").get(wallet.chain).put({chain: wallet.chain, address: wallet.address, algorithm: wallet.chainobj.algorithm })
          }
          wallet.chainobj.update_balance(wallet)
        } catch (e) {}
      }
    },
    update_balance: async (wallet = {} as any) => {
      await wallet.chainobj.wallet_init(wallet)
      wallet.querying = true
      try {
        const r = await wallet.api.eth.getBalance(wallet.address)
        wallet.activated = true
        wallet.querying = false
        if (user.is) {
          user.db.get("wallets").get("defaults").get(wallet.chain).put({ address: wallet.address, activated: true, sequence: r.sequence, balance: JSON.stringify(r) })
        }
        wallet.balance_raw = r
      } catch (e) {
        wallet.querying = false
        console.log(`error get account balances`)
        wallet.api = new wallet.Remote({server: getRandomElement(wallet.endpoints)})
      }
    } 
  },
  jingtum: {
    chain: "jingtum",
    need_activation: true,
    algorithm: "ed25519",
    lib_name: "swtc_rpc",
    lib_url: "https://unpkg.com/@swtc/rpc",
    endpoints: ['https://srje115qd43qw2.swtc.top', 'https://srje071qdew231.swtc.top'],
    load_library: async (wallet= {} as any) => {
      const lib_name = wallet.chainobj.lib_name
      const { load } = useScriptTag(wallet.chainobj.lib_url, () => {}, { manual: true })
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
      await wallet.chainobj.wallet_init(wallet)
      if (user.is) wallet.balance_raw = JSON.parse(user.wallets[wallet.chain]?.balance || "{}")
    },
    wallet_init: async (wallet = {} as any) => {
      if (!wallet.initiated) {
        try {
          wallet.api = new wallet.Remote({server: getRandomElement(wallet.chainobj.endpoints)})
          if (!wallet.address) {
            wallet.address = wallet.Wallet?.fromSecret(Buffer.from(user?.pair()?.priv, "base64").toString("hex"), wallet.algorithm)?.address
            user.db.get("wallets").get("defaults").get(wallet.chain).put({chain: wallet.chain, address: wallet.address, algorithm: wallet.chainobj.algorithm })
          }
          wallet.chainobj.update_balance(wallet)
          setTimeout(() => {
            if (!wallet.activated && user.wallets?.jingtum?.activated) {
              wallet.activated = true
            }
          }, 500)
        } catch (e) {}
      }
    },
    update_balance: async (wallet = {} as any) => {
      await wallet.chainobj.wallet_init(wallet)
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
          wallet.api = new wallet.Remote({server: getRandomElement(wallet.chainobj.endpoints)})
        }
      }
    } 
  },
})