export interface IChannel {
  id: string
  name?: string
  title?: string
}

export interface IVideo {
  videoId: string
  videoPublishedAt: string
  currentTime?: number
  channelId?: string 
  channel?: IChannel
}