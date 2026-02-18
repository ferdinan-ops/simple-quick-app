import { ChevronIcon, MoreIcon, PencilIcon, TimeIcon } from '@/assets/icons'
import { Button } from '@/components/atoms/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker } from '@/components/ui/datepicker'
import COLORS from '@/lib/color'
import { cn } from '@/lib/utils'
import * as React from 'react'
import Dropdown from '../../Dropdown'

function getDaysLeft(dateString: string) {
  const [day, month, year] = dateString.split('/').map(Number)

  const targetDate = new Date(year as number, (month as number) - 1, day)
  const today = new Date()

  today.setHours(0, 0, 0, 0)
  targetDate.setHours(0, 0, 0, 0)

  const diffTime = targetDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

interface TaskCardProps {
  className?: string
  taskItem: {
    status: string
    task: string
    createdAt: string
    descriptions?: string
  }
}

export default function TaskCard({ taskItem, className }: TaskCardProps) {
  const [open, setOpen] = React.useState(true)

  return (
    <article
      className={cn('flex w-full flex-col gap-4 transition-all ease-in-out', open ? 'pb-5' : 'pb-[1px]', className)}
    >
      <div className="flex items-start justify-between gap-[54px] pl-1 pr-5">
        <div className="flex items-start gap-[22px]">
          <Checkbox checked={taskItem.status === 'DONE'} className="mt-[3px]" />
          <p
            className={cn('text-sm font-semibold text-gray2', taskItem.status === 'DONE' && 'text-gray3 line-through')}
          >
            {taskItem.task}
          </p>
        </div>
        <div className="flex items-center">
          {taskItem.status !== 'DONE' && (
            <p className="w-max text-xs font-medium text-red">{getDaysLeft(taskItem.createdAt)} Days Left</p>
          )}
          <p className="ml-5 mr-[10px] text-[10px] font-semibold text-gray2">{taskItem.createdAt}</p>
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
              <Dropdown.Item className="text-red">Delete</Dropdown.Item>
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
          <DatePicker />
        </div>
        <div className="flex items-start gap-[26px]">
          <PencilIcon color={COLORS.PRIMARY} size={15} className="pt-1" />
          <p className="max-w-[80%] text-xs font-medium text-gray2">{taskItem.descriptions ?? 'No Description'}</p>
        </div>
      </div>
    </article>
  )
}
