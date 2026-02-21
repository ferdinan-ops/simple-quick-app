import * as React from 'react'
import { Outlet } from 'react-router-dom'

import { QuickMenu } from '@/components/molecules'
import { Header, Sidebar } from '@/components/organism'
import { TaskLists } from '@/components/organism/applications/task'

import { InboxIcon, QuickIcon, TaskIcon } from '@/assets/icons'
import { Inbox } from '@/components/organism/applications/inbox'

export default function MainLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex h-screen w-full flex-col">
        <Header />

        <main className="relative min-h-0 flex-1 bg-gray1">
          {children || <Outlet />}
          <QuickMenu
            mainButton={{
              active: {
                icon: <QuickIcon color="white" size={32} />,
                color: 'bg-primary hover:bg-primary/90'
              },
              inactive: {
                icon: <QuickIcon color="white" size={32} />,
                color: 'bg-gray2 hover:bg-gray2/90'
              }
            }}
            actions={[
              {
                activeIcon: <InboxIcon color="white" size={26} />,
                inactiveIcon: <InboxIcon color="#8785FF" size={26} />,
                label: 'Inbox',
                color: 'bg-purple hover:bg-purple-hover',
                popup: <Inbox />
              },
              {
                activeIcon: <TaskIcon color="white" size={26} />,
                inactiveIcon: <TaskIcon color="#F2C94C" size={26} />,
                label: 'Task',
                color: 'bg-yellow hover:bg-yellow-hover',
                popup: <TaskLists />
              }
            ]}
          />
        </main>
      </div>
    </div>
  )
}
