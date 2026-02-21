import type { ResponseType } from './response.type'

export type MessageType = {
  seq?: number
  name?: string
  sendAt?: string
  message?: string
}

export type InboxType = {
  seq?: number
  name?: string
  time?: string
  isUnread?: boolean
  participant?: number
  type?: string
  lastMessage?: {
    name?: string
    message?: string
  }
  messages: MessageType[]
}

export type InboxResponse = {
  data: InboxType
} & ResponseType
