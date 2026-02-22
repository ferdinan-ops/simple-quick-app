import * as React from 'react'

import { TaskHeader } from '@/components/molecules/applications/task'

type TaskLayoutProps = {
  children: React.ReactNode
}

export default function TaskLayout({ children }: TaskLayoutProps) {
  return (
    <div className="flex h-full flex-col gap-[22px] py-6 pl-8 pr-3">
      <TaskHeader />

      {children}
    </div>
  )
}
