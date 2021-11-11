export interface IChannel {
  id: string
  name: string
}

export interface IVideo {
  videoId: string
  videoPublishedAt: string
  currentTime?: number
  channel?: IChannel
}