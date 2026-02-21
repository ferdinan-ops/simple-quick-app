import * as React from 'react'
import type { InboxType } from '@/types/inbox.type'
import { ArrowIcon, LoadingIcon, MoreIcon, XIcon } from '@/assets/icons'
import COLORS from '@/lib/color'
import { Loading, ScrollArea } from '@/components/atoms'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/atoms/button'
import { Dropdown } from '@/components/molecules'
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
import { useChangeDataInbox, useFetchOneInbox } from '@/store/server/useInbox'
import { useInboxScreen } from '@/store/client/useInboxScreen'
import InboxLists from './InboxLists'

function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    weekday: undefined,
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  })
}

function getDateOnly(dateStr: string): string {
  return new Date(dateStr).toISOString().split('T')[0] || ''
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

function getColorMessage(name: string) {
  switch (name) {
    case 'You':
      return {
        text: 'text-[#9B51E0]',
        bg: 'bg-[#EEDCFF]'
      }
    case 'Mary Hilda':
      return {
        text: 'text-[#E5A443]',
        bg: 'bg-[#FCEED3]'
      }
    case 'Obaidullah Amarkhil':
      return {
        text: 'text-[#43B78D]',
        bg: 'bg-[#D2F2EA]'
      }
    default:
      return {
        text: 'text-primary',
        bg: 'bg-white'
      }
  }
}

type InboxMessageProps = {
  id: string
}

export default function InboxMessage({ id }: InboxMessageProps) {
  const { data: inboxResponse, isSuccess } = useFetchOneInbox(id)

  const [messageInput, setMessageInput] = React.useState('')
  const [seqEdit, setSeqEdit] = React.useState<number | null>(null)
  const { mutate: changeDataInbox, isPending } = useChangeDataInbox()

  const navigateTo = useInboxScreen((state) => state.navigateTo)

  if (!isSuccess) return <Loading>Loading Chats ...</Loading>

  const handleCreateMessage = () => {
    const newInboxItem = {
      ...inboxResponse?.data,
      messages: [
        ...inboxResponse.data.messages,
        { message: messageInput, name: 'You', seq: inboxResponse.data.messages.length + 1 }
      ]
    }
    changeDataInbox({ id, ...newInboxItem })
    setMessageInput('')
  }

  const handleEditMessage = () => {
    const newInboxItem = {
      ...inboxResponse?.data,
      messages: inboxResponse.data.messages.map((message) => {
        if (message.seq === seqEdit) {
          return { ...message, message: messageInput }
        }
        return message
      })
    }
    changeDataInbox({ id, ...newInboxItem })
    setSeqEdit(null)
  }

  const renderedMessages: React.ReactNode[] = []
  let lastDate = ''

  inboxResponse.data.messages.forEach((message, index) => {
    const messageDate = message.sendAt ? getDateOnly(message.sendAt) : ''
    const isYou = message.name === 'You'

    if (messageDate && messageDate !== lastDate && inboxResponse.data.type === 'GROUP') {
      lastDate = messageDate
      renderedMessages.push(
        <div key={`date-${messageDate}-${index}`} className={cn('flex items-center gap-7', index !== 0 ? 'mt-7' : '')}>
          <div className="h-[1px] w-full bg-gray2" />
          <p className="min-w-max text-sm font-semibold text-gray2">
            {message.sendAt ? formatDateLabel(message.sendAt) : ''}
          </p>
          <div className="h-[1px] w-full bg-gray2" />
        </div>
      )
    }

    if (index === 5 && inboxResponse.data.type === 'GROUP') {
      renderedMessages.push(
        <p className="mt-5 text-center text-sm font-semibold text-primary" key={`new-message-sep-${index}`}>
          New Message
        </p>
      )
    }

    renderedMessages.push(
      <div key={`message-${message.seq}-${index}`} className={cn('flex w-full flex-col', isYou ? 'items-end' : '')}>
        <div className={cn('mt-4 flex w-full max-w-[512px] flex-col items-start gap-1', isYou ? 'items-end' : '')}>
          <p className={cn('text-[13px] font-semibold', getColorMessage(message.name as string).text)}>
            {message.name}
          </p>
          <div className={cn('flex w-auto min-w-[70%] items-start gap-[7px]', isYou ? 'flex-row-reverse' : '')}>
            <article
              className={cn(
                'flex flex-col gap-3 rounded-md p-[10px]',
                getColorMessage(message.name as string).bg,
                isYou && 'w-full'
              )}
            >
              <p className="text-[13px] font-medium text-gray2">{message.message}</p>
              <p className="text-[8px] font-medium text-gray2">{message.sendAt ? formatTime(message.sendAt) : ''}</p>
            </article>
            <div>
              <Dropdown>
                <Dropdown.TriggerButton variant="icon">
                  <MoreIcon width={11} height={3} color={COLORS.GRAY2} />
                </Dropdown.TriggerButton>
                <Dropdown.Content align="left" className="w-[126px] border-gray4">
                  {isYou ? (
                    <React.Fragment>
                      <Dropdown.Item
                        className="font-medium text-primary"
                        onClick={() => setSeqEdit(message.seq as number)}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Separator className="bg-gray4" />
                      <DeleteMessageDialog
                        id={id || ''}
                        inboxItem={inboxResponse.data}
                        messageSeq={message.seq as number}
                      />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Dropdown.Item className="font-medium">Share</Dropdown.Item>
                      <Dropdown.Separator className="bg-gray4" />
                      <Dropdown.Item className="font-medium">Reply</Dropdown.Item>
                    </React.Fragment>
                  )}
                </Dropdown.Content>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <React.Fragment>
      <header className="flex items-center justify-between border-b border-gray4 py-[19px] pl-[25px] pr-[21px]">
        <div className="flex items-center gap-[14px]">
          <Button variant="icon" onClick={() => navigateTo(<InboxLists />)} className="size-6">
            <ArrowIcon size={24} color={COLORS.GRAY1} />
          </Button>
          <div className="flex flex-col gap-2">
            <p className="text-[15px] font-semibold text-primary">{inboxResponse.data.name}</p>
            {inboxResponse.data.participant && inboxResponse.data.type === 'GROUP' && (
              <p className="text-[11px] font-medium text-gray1">{inboxResponse.data.participant} participants</p>
            )}
          </div>
        </div>
        <Button variant="icon" onClick={() => navigateTo(<InboxLists />)} className="size-[14px]">
          <XIcon size={14} color={COLORS.GRAY1} />
        </Button>
      </header>
      <ScrollArea scrollClassName="mr-[11px] mb-[5px]" className="pl-[29px] pt-[13px]">
        {renderedMessages}
      </ScrollArea>
      {inboxResponse.data.type === 'SINGLE' && (
        <div className="px-5">
          <div className="mt-3 flex w-full items-center gap-[11px] p-[10px]">
            <LoadingIcon size={24} strokeWidth={7} color="text-primary" />
            <p className="text-[13px] font-bold text-gray2">
              Please wait while we connect you with one of our team ...
            </p>
          </div>
        </div>
      )}
      <div
        className={cn(
          'flex items-center gap-[13px] px-5 pb-5',
          inboxResponse.data.type === 'SINGLE' ? 'pt-[11px]' : 'pt-5'
        )}
      >
        <Input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a new message"
          className="text-sm font-medium text-gray1 placeholder:text-gray1"
        />
        <Button onClick={seqEdit ? handleEditMessage : handleCreateMessage} loading={isPending}>
          {seqEdit ? 'Edit' : 'Send'}
        </Button>
      </div>
    </React.Fragment>
  )
}

function DeleteMessageDialog({ id, inboxItem, messageSeq }: { id: string; inboxItem: InboxType; messageSeq: number }) {
  const { mutate: changeDataInbox, isPending } = useChangeDataInbox()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (!isPending) setOpen(false)
  }, [isPending])

  const handleDeleteInbox = () => {
    const newMessages = inboxItem.messages.filter((message) => message.seq !== messageSeq)
    const newInboxItem = {
      ...inboxItem,
      messages: newMessages
    }

    changeDataInbox({ id, ...newInboxItem })
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
            onClick={(e) => {
              e.preventDefault()
              handleDeleteInbox()
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
