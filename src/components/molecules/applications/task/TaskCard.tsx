import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker } from '@/components/ui/datepicker'

import { Dropdown } from '@/components/molecules'
import { Button } from '@/components/atoms/button'
import { DeleteTaskDialog } from '@/components/atoms/applications/task'

import COLORS from '@/lib/color'
import { cn } from '@/lib/utils'
import { formatDate, getDaysLeft } from '@/lib/date'

import type { TaskType } from '@/types/task.type'

import { BookmarkIcon, ChevronIcon, MoreIcon, PencilIcon, TimeIcon } from '@/assets/icons'
import { useTaskCard } from '@/hooks'
import { BADGES, getColorBadge } from '@/lib/constant'

type TaskCardProps = {
  className?: string
  taskItem: TaskType
  id: string
}

export default function TaskCard({ taskItem, className, id }: TaskCardProps) {
  const {
    open,
    setOpen,
    targetDate,
    status,
    task,
    setTask,
    descriptions,
    setDescriptions,
    isTaskFinishEdit,
    isDescriptionEdit,
    setIsDescriptionEdit,
    handleUpdateTask,
    handleCheckboxChange,
    handleDateChange,
    handleTaskBlur,
    badges,
    handleBadgeClick
  } = useTaskCard(taskItem, id)

  return (
    <article
      className={cn(
        'flex w-full flex-col gap-4 transition-all ease-in-out',
        open ? 'pb-[22px]' : 'pb-[1px]',
        className
      )}
    >
      <div className="flex items-start justify-between gap-[54px] pl-1 pr-5">
        <div className={cn('flex w-full items-start gap-[22px]', !isTaskFinishEdit && 'items-center')}>
          <Checkbox
            disabled={isTaskFinishEdit ? false : true}
            checked={status === 'DONE'}
            onCheckedChange={(checked) => handleCheckboxChange(!!checked)}
            className={cn(isTaskFinishEdit && 'mt-[3px]')}
          />
          <Textarea
            variant={isTaskFinishEdit ? 'hidden' : 'default'}
            value={task}
            placeholder="Type Task Title"
            onChange={(e) => setTask(e.target.value)}
            onBlur={handleTaskBlur}
            className={cn(
              status === 'DONE' && 'text-gray3 line-through',
              !isTaskFinishEdit && 'font-medium placeholder:text-gray2'
            )}
          />
        </div>
        <div className="flex items-center">
          {status !== 'DONE' && targetDate && (
            <p className="w-max text-xs font-medium text-red">
              {getDaysLeft(formatDate(targetDate)).daysLeft} {getDaysLeft(formatDate(targetDate)).status}
            </p>
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
              <DeleteTaskDialog id={id} />
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>

      <div
        className={cn(
          'ml-[calc(22px+18px)] flex flex-col gap-[13px] transition-all ease-in-out',
          open ? 'max-h-[5000px]' : 'max-h-0'
        )}
      >
        <div className="flex items-center gap-[18px]">
          <TimeIcon color={COLORS.PRIMARY} size={20} />
          <DatePicker value={targetDate} onChange={handleDateChange} />
        </div>
        <div className="flex items-start gap-[18px]">
          <Button variant="icon" className="h-5 w-5" onClick={() => setIsDescriptionEdit(!isDescriptionEdit)}>
            <PencilIcon color={COLORS.PRIMARY} size={15} />
          </Button>
          <Textarea
            variant="hidden"
            isOnEditDesc={isDescriptionEdit}
            value={descriptions}
            placeholder="No Descriptions"
            onChange={(e) => setDescriptions(e.target.value)}
            onBlur={() => handleUpdateTask({})}
            className={cn(
              'max-w-[80%] font-medium placeholder:text-gray2',
              status === 'DONE' && 'text-gray3 line-through'
            )}
          />
        </div>
        <div className="flex items-center gap-[18px]">
          <Dropdown className="flex-none">
            <Dropdown.TriggerButton variant="icon">
              <BookmarkIcon color={badges.length === 0 ? COLORS.GRAY3 : COLORS.PRIMARY} />
            </Dropdown.TriggerButton>
            <Dropdown.Content align="left" className="max-h-[5000px] w-[277px] gap-[11px] px-4 py-[14px]">
              {BADGES.map((badge) => (
                <Dropdown.Item
                  key={badge.label}
                  className={cn(
                    'h-7 rounded-md px-[13px] text-[11px] font-semibold text-gray2',
                    badges.includes(badge.label) && 'border border-primary'
                  )}
                  style={{ backgroundColor: badge.color }}
                  onClick={() => handleBadgeClick(badge.label)}
                >
                  {badge.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
          <div className="flex items-center gap-[10px]">
            {badges.map((badge) => (
              <div
                className="rounded-md px-3 py-2 text-xs font-semibold text-gray2"
                style={{ backgroundColor: getColorBadge(badge) }}
                key={badge}
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
