import type { TaskResponse, TaskType } from '@/types/task.type'
import api from './axiosInstance'
import { getDaysLeft } from '@/lib/date'

export async function fetchTaskFn(): Promise<TaskResponse[]> {
  const response = await api.get('/collections/task/records', {
    params: {
      _t: Date.now()
    },
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache'
    }
  })

  if (!response.data || !response.data.data || !response.data.data.length) {
    return []
  }

  return response.data.data.sort((a: TaskResponse, b: TaskResponse) => {
    if (a.data.status === 'DONE' && b.data.status !== 'DONE') return 1
    if (!a.data.task && b.data.task) return 1
    if (a.data.status !== 'DONE' && b.data.status === 'DONE') return -1
    if (a.data.task && !b.data.task) return -1

    const dateB = b.data.targetDate ? (getDaysLeft(b.data.targetDate, 'forSort').daysLeft ?? 0) : 0
    const dateA = a.data.targetDate ? (getDaysLeft(a.data.targetDate, 'forSort').daysLeft ?? 0) : 0
    return dateA - dateB
  })
  // return response.data.data
}

export async function createTaskFn(data: TaskType) {
  const response = await api.post('/collections/task/records', { data })
  return response.data
}

export async function updateTaskFn(data: TaskType & { id: string }) {
  const { id, ...rest } = data
  return await api.put(`/collections/task/records/${id}`, { data: rest })
}

export async function deleteTaskFn(id: string) {
  await api.delete(`/collections/task/records/${id}`)
  return id
}
