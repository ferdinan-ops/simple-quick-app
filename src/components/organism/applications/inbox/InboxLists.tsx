import * as React from 'react'

import { InboxCard } from '@/components/molecules/applications/inbox'
import { ScrollArea, EmptyData, Loading } from '@/components/atoms'

import { cn } from '@/lib/utils'

import { useDebounce } from '@/hooks'
import { useGetInbox } from '@/store/server/useInbox'
import { InboxListsLayout } from '@/components/layouts/applications/inbox'

export default function InboxLists() {
  const { data: inboxResponse, isLoading, isSuccess } = useGetInbox()

  const [search, setSearch] = React.useState('')
  const debouncedSearch = useDebounce(search, 500)

  const inbox = React.useMemo(() => {
    if (!inboxResponse) return []
    if (!debouncedSearch) return inboxResponse

    return inboxResponse.filter((item) => item.data.name?.toLowerCase().includes(debouncedSearch.toLowerCase()))
  }, [debouncedSearch, inboxResponse])

  if (isLoading) {
    return (
      <InboxListsLayout search={search} setSearch={setSearch}>
        <Loading>Loading Chats ...</Loading>
      </InboxListsLayout>
    )
  }

  if (isSuccess && inboxResponse.length === 0) {
    return (
      <InboxListsLayout search={search} setSearch={setSearch}>
        <EmptyData text="No Data Added" />
      </InboxListsLayout>
    )
  }

  return (
    <InboxListsLayout search={search} setSearch={setSearch}>
      <ScrollArea scrollClassName="pr-0">
        {inbox.map((item, index) => (
          <InboxCard
            inboxItem={item.data}
            id={item.id}
            key={item.id}
            className={cn(index !== inbox.length - 1 && 'border-b border-gray3')}
          />
        ))}
      </ScrollArea>
    </InboxListsLayout>
  )
}
