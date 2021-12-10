export class Storage {
  public key: string
  public data: any = null
  constructor(key: string) {
    this.key = key
  }

  read() {
    const value = localStorage.getItem(this.key)
    if (value === null) return null
    this.data = JSON.parse(value)
  }

  write() {
    if (this.data !== null) {
      localStorage.setItem(this.key, JSON.stringify(this.data))
    }
  }
}