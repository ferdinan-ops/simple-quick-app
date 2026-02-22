import * as React from 'react'

import { useUpdateTask } from '@/store/server/useTask'

import { formatDate, parseDate } from '@/lib/date'

import type { TaskType } from '@/types/task.type'

export default function useTaskCard(taskItem: TaskType, id: string) {
  const [open, setOpen] = React.useState(taskItem.status !== 'DONE')
  const [targetDate, setTargetDate] = React.useState<Date | undefined>(
    taskItem.targetDate ? parseDate(taskItem.targetDate) : undefined
  )
  const [status, setStatus] = React.useState(taskItem.status)
  const [task, setTask] = React.useState(taskItem.task)
  const [descriptions, setDescriptions] = React.useState(taskItem.descriptions)
  const [isTaskFinishEdit, setIsTaskFinishEdit] = React.useState(!!taskItem.task)
  const [isDescriptionEdit, setIsDescriptionEdit] = React.useState(false)
  const [badges, setBadges] = React.useState<string[]>(taskItem.badges ?? [])

  React.useEffect(() => {
    setOpen(taskItem.status !== 'DONE')
    setStatus(taskItem.status)
    setTask(taskItem.task)
    setDescriptions(taskItem.descriptions)
    setTargetDate(taskItem.targetDate ? parseDate(taskItem.targetDate) : undefined)
    setBadges(taskItem.badges ?? [])
    setIsTaskFinishEdit(!!taskItem.task)
  }, [taskItem])

  const { mutate: updateTask } = useUpdateTask()

  const handleUpdateTask = (value: Partial<TaskType>) => {
    updateTask({
      id,
      task: value.task ?? task,
      descriptions: value.descriptions ?? descriptions,
      targetDate: value.targetDate ?? (targetDate ? formatDate(targetDate) : ''),
      status: value.status ?? status,
      badges: value.badges ?? badges
    })
  }

  const handleCheckboxChange = (checked: boolean) => {
    const newStatus = checked ? 'DONE' : 'TODO'
    setStatus(newStatus)
    setOpen(!checked)
    handleUpdateTask({ status: newStatus })
  }

  const handleDateChange = (date: Date) => {
    setTargetDate(date)
    handleUpdateTask({ targetDate: formatDate(date) })
  }

  const handleTaskBlur = () => {
    setIsTaskFinishEdit(true)
    handleUpdateTask({})
  }

  const handleBadgeClick = (badge: string) => {
    if (badges.includes(badge)) {
      setBadges(badges.filter((b) => b !== badge))
    } else {
      setBadges([...badges, badge])
    }
    handleUpdateTask({})
  }

  return {
    open,
    setOpen,
    targetDate,
    status,
    task,
    setTask,
    descriptions,
    setDescriptions,
    isTaskFinishEdit,
    badges,
    isDescriptionEdit,
    setIsDescriptionEdit,
    handleUpdateTask,
    handleCheckboxChange,
    handleDateChange,
    handleTaskBlur,
    handleBadgeClick
  }
}
