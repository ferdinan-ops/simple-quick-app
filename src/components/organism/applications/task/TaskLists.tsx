import { TaskLayout } from '@/components/layouts/applications/task'
import { EmptyData, Loading, ScrollArea } from '@/components/atoms'
import { TaskCard } from '@/components/molecules/applications/task'

import { useGetTasks } from '@/store/server/useTask'

import { cn } from '@/lib/utils'

export default function TaskLists() {
  const { data: tasks, isLoading, isSuccess } = useGetTasks()

  if (isLoading && !tasks) {
    return (
      <TaskLayout>
        <Loading>
          <p className="text-center font-semibold text-gray2">Loading Task Lists...</p>
        </Loading>
      </TaskLayout>
    )
  }

  if (isSuccess && tasks?.length === 0) {
    return (
      <TaskLayout>
        <EmptyData text="No Task Added" />
      </TaskLayout>
    )
  }

  return (
    <TaskLayout>
      <ScrollArea>
        {tasks?.map((item, index) => (
          <TaskCard
            key={item.id}
            id={item.id}
            taskItem={item.data}
            className={cn(index !== tasks.length - 1 && 'border-b border-gray3', index !== 0 && 'pt-5')}
          />
        ))}
      </ScrollArea>
    </TaskLayout>
  )
}
