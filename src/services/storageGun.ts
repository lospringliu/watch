// use gun db instead of localstorage, testing
// {
//   cid: 'QmTtsqZHiTtmLuyHyzWvgkouzhC4jpPUvMp1doeVLJxtX8',
//   file: {
//     name: 'ionicons.css',
//     type: 'text/css',
//     size: 27607,
//     created_at: 1648918643943
//   }
// }
// // change to gun and automatically deduplicate by content
// gun.get("storage").get("ipfs").get(r.cid).put(r.file)

// read once, write many

import { useUser } from "../gun-vue/composables"
const { user } = useUser()

export default class Storage {
  constructor(keys = ["storagekey"], transform = v => v) {
    this.keys = keys
    this.cur = {}
    this.prev = {}
    this.data = { version: "0.0.1", results: [] }
    this.node = null
    this.transform = transform
  }

  read() {
    if (user.is) {
      this.node = user.db.get("storage")
      for (const key of this.keys) {
        this.node = this.node.get(key)
      }
      this.data = { version: "0.0.1", results: [] }
      this.cur = {}
      this.prev = {}
      this.node.map().once((data, key) => {
        delete data._
        console.log(`... store get data key ${key}`)
        console.log(data)
        this.cur[key] = data
        this.prev[key] = JSON.stringify(data)
      })
    } else {
      console.log(`user is not login yet, read only after login`)
    }
  }
  write() {
    if (user.is) {
      this.node = user.db.get("storage")
      for (const key of this.keys) {
        this.node = this.node.get(key)
      }
      if (this.data) this.cur = this.transform(this.data)
      console.log(this.cur)
      // removed keys should put null, later
      const keys_cur = Object.keys(this.cur)
      const keys_prev = Object.keys(this.prev)
      keys_cur.forEach(key => {
        if (!keys_prev.find(k => k === key)) {
          // new keys put
          console.log(`... store new key ${key} put`)
          console.log(this.cur[key])
          this.node.get(key).put(this.cur[key])
        } else if (this.prev[key] !== JSON.stringify(this.cur[key])) {
          // updated keys put
          console.log(`... store updated key ${key} put`)
          console.log(this.cur[key])
          this.node.get(key).put(this.cur[key])
        } else {}
      })
    } else {
      console.log(`user is not login yet, write only after login`)
    }
  }
}