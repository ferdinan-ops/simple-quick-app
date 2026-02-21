import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createTaskFn, deleteTaskFn, fetchTaskFn, updateTaskFn } from '@/api/task.api'

export function useGetTasks() {
  return useQuery({
    queryKey: ['task'],
    queryFn: fetchTaskFn
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
  return useMutation({ mutationFn: updateTaskFn })
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
