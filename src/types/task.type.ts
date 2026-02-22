import type { ResponseType } from './response.type'

export type TaskType = {
  task?: string
  targetDate?: string
  descriptions?: string
  status?: string
  badges?: string[]
}

export type TaskResponse = {
  data: TaskType
} & ResponseType
