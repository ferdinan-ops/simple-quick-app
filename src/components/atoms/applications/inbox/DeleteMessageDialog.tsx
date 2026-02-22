import * as React from 'react'

import { useChangeDataInbox } from '@/store/server/useInbox'
import type { InboxType } from '@/types/inbox.type'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Dropdown } from '@/components/molecules'
import { useDropdownContext } from '@/store/client/useDropdownContext'

type DeleteMessageDialogProps = {
  id: string
  inboxItem: InboxType
  messageSeq: number
}

export default function DeleteMessageDialog({ id, inboxItem, messageSeq }: DeleteMessageDialogProps) {
  const { mutate: changeDataInbox, isPending } = useChangeDataInbox()
  const context = useDropdownContext()

  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (!isPending) setOpen(false)
  }, [isPending])

  const handleDeleteInbox = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const DELETED_MESSAGE = 'This message has been deleted'

    const newInboxItem = {
      ...inboxItem,
      messages: inboxItem.messages.map((message) => {
        if (message.seq === messageSeq) return { ...message, status: 'DELETED', message: DELETED_MESSAGE }
        return message
      })
    }

    changeDataInbox({ id, ...newInboxItem })
    context?.setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Dropdown.Item className="font-medium text-red">Delete</Dropdown.Item>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your message from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-neutral-100">Cancel</AlertDialogCancel>
          <AlertDialogAction
            loading={isPending}
            className="bg-red text-white hover:bg-[#d62c2c]"
            onClick={handleDeleteInbox}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
