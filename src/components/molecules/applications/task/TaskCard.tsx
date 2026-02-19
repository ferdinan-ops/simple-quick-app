import * as React from 'react'

import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker } from '@/components/ui/datepicker'

import { Dropdown } from '@/components/molecules'
import { Button } from '@/components/atoms/button'

import COLORS from '@/lib/color'
import { cn } from '@/lib/utils'
import { formatDate, getDaysLeft, parseDate } from '@/lib/date'

import type { TaskType } from '@/types/task.type'

import { useDeleteTask, useUpdateTask } from '@/store/server/useTask'

import { ChevronIcon, MoreIcon, PencilIcon, TimeIcon } from '@/assets/icons'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

type TaskCardProps = {
  className?: string
  taskItem: TaskType
  id: string
}

export default function TaskCard({ taskItem, className, id }: TaskCardProps) {
  const [open, setOpen] = React.useState(taskItem.status === 'DONE' ? false : true)
  const [targetDate, setTargetDate] = React.useState<Date | undefined>(
    taskItem.targetDate ? parseDate(taskItem.targetDate) : undefined
  )
  const [status, setStatus] = React.useState(taskItem.status)
  const [task, setTask] = React.useState(taskItem.task)
  const [descriptions, setDescriptions] = React.useState(taskItem.descriptions)

  const [isDescriptionEdit, setIsDescriptionEdit] = React.useState(false)

  const { mutate: updateTask } = useUpdateTask()
  const { mutate: deleteTask } = useDeleteTask()

  const handleUpdateTask = (value: TaskType) => {
    updateTask({
      id,
      task: value.task ?? task,
      descriptions: value.descriptions ?? descriptions,
      targetDate: value.targetDate ? value.targetDate : targetDate ? formatDate(targetDate) : '',
      status: value.status ?? status
    })
  }

  return (
    <article
      className={cn('flex w-full flex-col gap-4 transition-all ease-in-out', open ? 'pb-5' : 'pb-[1px]', className)}
    >
      <div className="flex items-start justify-between gap-[54px] pl-1 pr-5">
        <div className="flex w-full items-start gap-[22px]">
          <Checkbox
            checked={status === 'DONE'}
            onCheckedChange={(checked) => {
              setStatus(checked ? 'DONE' : 'TODO')
              handleUpdateTask({ status: checked ? 'DONE' : 'TODO' })
            }}
            className="mt-[3px]"
          />
          <Textarea
            variant="hidden"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onBlur={() => handleUpdateTask({})}
            className={cn('text-sm font-semibold text-gray2', status === 'DONE' && 'text-gray3 line-through')}
          />
        </div>
        <div className="flex items-center">
          {status !== 'DONE' && targetDate && (
            <p className="w-max text-xs font-medium text-red">{getDaysLeft(formatDate(targetDate))} Days Left</p>
          )}
          {targetDate && (
            <p className="ml-5 mr-[10px] text-[10px] font-semibold text-gray2">{formatDate(targetDate)}</p>
          )}
          <Button variant="icon" className="mr-[14px]" onClick={() => setOpen(!open)}>
            <ChevronIcon
              color={COLORS.GRAY2}
              size={15}
              className={cn('transition-all', open ? 'rotate-180' : 'rotate-0')}
            />
          </Button>
          <Dropdown className="w-fit">
            <Dropdown.TriggerButton variant="icon">
              <MoreIcon color={COLORS.GRAY3} width={14} height={4} />
            </Dropdown.TriggerButton>
            <Dropdown.Content align="right" className="w-[126px]">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Dropdown.Item className="text-red">Delete</Dropdown.Item>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your task from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="hover:bg-neutral-100">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red text-white hover:bg-[#d62c2c]" onClick={() => deleteTask(id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>

      <div
        className={cn(
          'ml-[calc(22px+18px)] flex flex-col gap-[13px] overflow-hidden transition-all ease-in-out',
          open ? 'max-h-40' : 'max-h-0'
        )}
      >
        <div className="flex items-center gap-[18px]">
          <TimeIcon color={COLORS.PRIMARY} size={20} />
          <DatePicker
            value={targetDate}
            onChange={(date) => {
              setTargetDate(date)
              handleUpdateTask({ targetDate: formatDate(date) })
            }}
          />
        </div>
        <div className="flex items-start gap-[18px]">
          <Button variant="icon" onClick={() => setIsDescriptionEdit(!isDescriptionEdit)}>
            <PencilIcon color={COLORS.PRIMARY} size={20} />
          </Button>
          <Textarea
            variant="hidden"
            value={descriptions ?? 'No Description'}
            onChange={(e) => setDescriptions(e.target.value)}
            onBlur={() => handleUpdateTask({})}
            className={cn('max-w-[80%] text-sm font-medium text-gray2', status === 'DONE' && 'text-gray3 line-through')}
          />
        </div>
      </div>
    </article>
  )
}
