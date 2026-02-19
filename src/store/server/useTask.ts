import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createTaskFn, deleteTaskFn, fetchTaskFn, updateTaskFn } from '@/api/task.api'
import { getDaysLeft } from '@/lib/date'

export function useGetTasks() {
  return useQuery({
    queryKey: ['task'],
    queryFn: fetchTaskFn,
    // sort data
    select: (data) =>
      data.sort((a, b) => {
        // if status is DONE, move to bottom
        if (a.data.status === 'DONE' && b.data.status !== 'DONE') return 1
        if (a.data.status !== 'DONE' && b.data.status === 'DONE') return -1

        const dateB = b.data.targetDate ? getDaysLeft(b.data.targetDate) : 0
        const dateA = a.data.targetDate ? getDaysLeft(a.data.targetDate) : 0
        return dateA - dateB
      })
  })
}

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTaskFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task'] })
    }
  })
}

export function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTaskFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task'] })
    }
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTaskFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task'] })
    }
  })
}
