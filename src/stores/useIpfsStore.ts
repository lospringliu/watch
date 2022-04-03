import { defineStore } from "pinia";
import { sleep } from "../api/utils";
import Storage from "../services/storageGun";
import { useUser } from "../gun-vue/composables"

const { user } = useUser()
const transform = data => data.results.reduce((acc, result) => ({...acc, [result.cid]: result.file}), {})
const db = new Storage(["ipfs", "results"], transform );
db.data ||= { version: "0.0.1", results: [] };

export const useIpfsStore = defineStore({
  id: "store",
  state() {
    return {
      readed: false,
      files: [],
      results: db.data.results
    }
  },
  actions: {
    async read() {
      watch(user.is, async () => {
        console.log(`... watched user statechange for gun user db read`)
        await sleep(1000)
        db.read()
        await sleep(1000)
        this.results = []
        Object.keys(db.cur).forEach(key => this.results.push({cid: key, file: db.cur[key]}) )
      })
      if (user.is) {
        db.read()
        await sleep(1000)
        this.results = []
        Object.keys(db.cur).forEach(key => this.results.push({cid: key, file: db.cur[key]}) )
      }
    },
    resetFiles() {
      this.files = [];
    },
    addFiles(...files) {
      this.files.push(...files);
    },
    addResults(...files) {
      this.results.push(...files);
      this.results = this.results.filter(({ cid }) => !!cid);

      db.data.results = [ ...this.results ];
      db.write();
    },
    /**
     * Update Shorten Link for File
     * @param {String} cid 
     * @param {String} link 
     */
    updateShortenLink(cid, link) {
      this.results = this.results.map(result => {
        if (result.cid === cid) {
          return { ...result, shorten: link }
        }
        return result;
      });

      db.data.results = [ ...this.results ];
      console.log(db.data)
      db.write();
    }
  }
});
