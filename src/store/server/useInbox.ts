import { changeDataFn, fetchInboxFn, fetchOneInboxFn } from '@/api/inbox.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetInbox() {
  return useQuery({
    queryKey: ['inbox'],
    queryFn: fetchInboxFn
  })
}

export function useChangeDataInbox() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: changeDataFn,
    onSuccess: (id: string) => {
      queryClient.invalidateQueries({ queryKey: ['inbox', id] })
    }
  })
}

export function useFetchOneInbox(id: string) {
  return useQuery({
    queryKey: ['inbox', id],
    queryFn: () => fetchOneInboxFn(id)
  })
}
