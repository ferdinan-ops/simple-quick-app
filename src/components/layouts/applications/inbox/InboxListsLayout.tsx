import * as React from 'react'

import { Search } from '@/components/atoms'

type InboxListsLayoutProps = {
  search: string
  setSearch: (search: string) => void
  children: React.ReactNode
}

export default function InboxListsLayout({ search, setSearch, children }: InboxListsLayoutProps) {
  return (
    <div className="flex h-full flex-col px-8 py-6">
      <Search value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Inbox" />
      {children}
    </div>
  )
}
