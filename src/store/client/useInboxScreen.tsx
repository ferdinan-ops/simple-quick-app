import * as React from 'react'
import { create } from 'zustand'

import { InboxLists } from '@/components/organism/applications/inbox'

interface InboxScreenStore {
  inboxScreen: React.ReactNode
  navigateTo: (inboxScreen: React.ReactNode) => void
}

export const useInboxScreen = create<InboxScreenStore>((set) => ({
  inboxScreen: <InboxLists />,
  navigateTo: (inboxScreen) => set({ inboxScreen })
}))
