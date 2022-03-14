export interface IChannel {
  id: string
  name?: string
  title?: string
}

export interface IVideo {
  videoId: string
  videoPublishedAt: string
  ipfs?: string
  currentTime?: number
  channelId?: string 
  channel?: IChannel
}

export interface AppContext<HasRouter extends boolean = true> {
  app: App<Element>
  router: HasRouter extends true ? Router : undefined
  routes: HasRouter extends true ? RouteRecordRaw[] : undefined
  head: HeadClient | undefined
}

export type UserModule = (ctx: AppContext) => void
