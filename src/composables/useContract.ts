import { chains } from "./chains"
import axios from "axios"
import { INftToken } from "../types"
import { useGun } from "../gun-vue/composables"
import { sleep } from "../api/utils"
import AsyncForEach from "async-await-foreach"
import isEqual from 'underscore/modules/isEqual.js'
import isEmpty from 'underscore/modules/isEmpty.js'
import abi_nft_enumerable from "@nibbstack/erc721/abi/NFTokenEnumerable.json"
import abi_nft_metadata from "@nibbstack/erc721/abi/NFTokenMetadata.json"
const top = "bcapps"
const abi = []
abi_nft_enumerable.forEach(e => abi.push(e))
abi_nft_metadata.forEach(e => { if (!abi.find(ee => ee.name === e.name)) abi.push(e) })
const gun = useGun()
const contracts_initiated = ref(false)
const contract_initiated = ref("")
export const contracts = reactive({
})

export async function useContracts() {
  await init_contracts()
  return {
    contracts, init_contracts
  }
}
async function init_contracts() {
  if (contracts_initiated.value) {
    await sleep(500)
    return
  }
  contracts_initiated.value = true
  gun.get(top).get("contracts").map().once((data, chain) => {
    const chainobj = chains[chain]
    if (chainobj) {
      console.log(`${chain} in chains`)
      contracts[chain] = {}
      gun.get(top).get("contracts").get(chain).map().on((d, address) => {
        if (address.length > 20) {
          if (d._) {
            delete d._
          }
          if (isEmpty(contracts[chain][address])) {
            contracts[chain][address] = Object.assign({}, d, {reading: false, tokens: {}})
          } else {
            Object.assign(contracts[chain][address], d)
          }
        } else {
          console.log(`discard invalid address ${address}`)
        }
      })
    } else {
      console.log(`${chain} not in chains yet`)
    }
  })
  await sleep(1000)
}

//  const contract = reactive({
//    address: "",
//    chain: "",
//    standard: "erc721",
//    name: "",
//    symbol: "",
//    total_supply: null,
//    tokens: {},
//    chainobj: null,
//    abi,
//    api: null,
//    obj: null,
//  })

export function useContract(address, standard="erc721", chain="polygon") {
  const chainobj = chains[chain]
  if (!chainobj) { throw new Error(`unknown chain ${chain}`) }
  if (isEmpty(contracts[chain])) contracts[chain] = {}
  if (isEmpty(contracts[chain][address])) {
    contracts[chain][address] = {
      address,
      chain,
      standard,
      name: "",
      symbol: "",
      total_supply: null,
      // above in gun db
      abi,
      chainobj,
      tokens: {},
      api: null,
      obj: null,
    }
  }
  const contract = contracts[chain][address]
  contract.chainobj = chainobj
  contract.abi = abi
  contract.initiated = contract.initiated || false
  contract.reading = contract.reading || false
  contract.tokens = contract.tokens || {}
  contract.api = contract.api || null
  contract.obj = contract.obj || null
  init_contract(contract)
  return {
    contract,
    init_contract,
    read_contract,
    save_contract,
    sync_contract,
  }
}

async function read_contract(contract) {
  if (contract.reading) return
  await init_contracts()
  await sleep(500)
  gun.get(top).get("token").get(contract.chain).get(contract.address).map().on((d, k) => {
    if (!isEmpty(d)) {
      if (d._) { delete d._ }
      contract.tokens[k] = d
    }
  })
  contract.reading = true
}

async function sync_contract(contract, quantity=100) {
  // await read_contract(contract)
  // await sleep(51)
  // sync tokens from chain
  let running = 0
  if (contract.obj) {
    for (let index = 1; index <= contract.total_supply; index++) {
      if (running < quantity && isEmpty(contract.tokens[index])) {
        contract.tokens[index] = {}
        running += 1
      }
    }
    running = 0
    await AsyncForEach(Object.keys(contract.tokens), async (index) => {
      if (!isEmpty(contract.tokens[index])) return
      if (running > quantity) return
      console.log(`retrieving token #${index} ...`)
      try {
        const uri = await contract.obj.methods.tokenURI(index).call()
        const response = await axios.get(uri)
        const {name, image} = response.data
        contract.tokens[index] = { index, name, image }
        gun.get(top).get("token").get(contract.chain).get(contract.address).get(index).put({index, name, image})
        running += 1
      } catch (e) {
        console.log(e)
      }
    })
  }
}

async function save_contract(contract) {
  const {
    address,
    standard,
    chain,
    name,
    symbol,
    total_supply,
    tokens,
  } = contract
  gun.get(top).get("contracts").get(contract.chain).get(contract.address).put({address, standard, chain, name, symbol, total_supply})
  await AsyncForEach(Object.entries(tokens), async ([index, token]) => {
    if (isEmpty(token)) return
    gun.get(top).get("token").get(contract.chain).get(contract.address).get(index).put({index, name: token.name, image: token.image})
    await sleep(10)
  })
  await sleep(150)
}

async function init_contract(contract) {
  if (contract.initiated) return
  try {
    await contract.chainobj.load_library(contract)
    const api = new globalThis.Web3(contract.chainobj.endpoints[0])
    const obj = new api.eth.Contract(contract.abi, contract.address)
    contract.api = api
    contract.obj = obj
    contract.total_supply = await obj.methods.totalSupply().call()
    contract.name = await obj.methods.name().call()
    contract.symbol = obj.methods.symbol().call()
    contract.initiated = true
  } catch (e) {}
}

globalThis.useContract = useContract
globalThis.useContracts = useContracts