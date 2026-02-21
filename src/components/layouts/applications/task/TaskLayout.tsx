import * as React from 'react'

import { TaskHeader } from '@/components/molecules/applications/task'

type TaskLayoutProps = {
  children: React.ReactNode
}

export default function TaskLayout({ children }: TaskLayoutProps) {
  return (
    <div className="flex h-full flex-col gap-5 pb-[20px] pl-[29px] pr-[13px] pt-[18px]">
      <TaskHeader />

      {children}
    </div>
  )
}
