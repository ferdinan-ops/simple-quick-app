import * as React from 'react'

import { Search } from '@/components/atoms'

type InboxListsLayoutProps = {
  search: string
  setSearch: (search: string) => void
  children: React.ReactNode
}

export default function InboxListsLayout({ search, setSearch, children }: InboxListsLayoutProps) {
  return (
    <div className="flex h-full flex-col gap-[6px] pl-[29px] pr-[39px] pt-[20px]">
      <Search value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Inbox" />
      {children}
    </div>
  )
}
