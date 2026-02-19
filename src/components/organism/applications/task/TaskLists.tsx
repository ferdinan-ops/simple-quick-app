import { EmptyData } from '@/components/atoms'
import { Loading } from '@/components/atoms'
import { TaskLayout } from '@/components/layouts'
import { TaskCard } from '@/components/molecules/applications/task'
import { cn } from '@/lib/utils'
import { useGetTasks } from '@/store/server/useTask'

export default function TaskLists() {
  const { data: tasks, isLoading, isSuccess } = useGetTasks()

  if (isLoading) {
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
      {tasks?.map((item, index) => (
        <TaskCard
          key={index}
          id={item.id}
          taskItem={item.data}
          className={cn(index !== tasks.length - 1 && 'border-b border-gray3', index !== 0 && 'pt-5')}
        />
      ))}
    </TaskLayout>
  )
}
