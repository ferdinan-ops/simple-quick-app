import type { InboxResponse, InboxType } from '@/types/inbox.type'
import api from './axiosInstance'

export async function fetchInboxFn(): Promise<InboxResponse[]> {
  const response = await api.get('/collections/inbox/records', {
    params: {
      _t: Date.now()
    },
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache'
    }
  })

  if (!response.data || !response.data.data || !response.data.data.length) return []
  return response.data.data.sort((a: InboxResponse, b: InboxResponse) => (a.data.seq ?? 0) - (b.data.seq ?? 0))
}

export async function changeDataFn(data: InboxType & { id: string }) {
  const { id, ...rest } = data
  await api.put(`/collections/inbox/records/${id}`, { data: rest })
  return id
}

export async function fetchOneInboxFn(id: string): Promise<InboxResponse> {
  const response = await api.get(`/collections/inbox/records/${id}`)
  return response.data.data
}
