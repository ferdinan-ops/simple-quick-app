import * as React from 'react'
import { Button } from '../atoms/button'
import { ChevronIcon } from '@/assets/icons'
import COLORS from '@/lib/color'
import { Dropdown } from '../molecules'
import { ScrollArea } from '../ui/scroll-area'

interface TaskLayoutProps {
  children: React.ReactNode
}

export default function TaskLayout({ children }: TaskLayoutProps) {
  return (
    <div className="flex h-full flex-col gap-5 pb-[20px] pl-[29px] pr-[13px] pt-[18px]">
      <div className="flex items-center justify-between pr-[9px]">
        <div className="flex h-full w-[45%] justify-center">
          <Dropdown className="items-center justify-center">
            <Dropdown.TriggerButton variant="outline" className="w-fit">
              My Task
              <ChevronIcon color={COLORS.GRAY2} size={20} />
            </Dropdown.TriggerButton>
            <Dropdown.Content>
              <Dropdown.Item>Personal Errands</Dropdown.Item>
              <Dropdown.Separator />
              <Dropdown.Item>Urgent To-Do</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </div>
        <Button>New Task</Button>
      </div>
      <ScrollArea className="flex-1">{children}</ScrollArea>
    </div>
  )
}
