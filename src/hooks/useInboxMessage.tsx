import * as React from 'react'

import { useInboxScreen } from '@/store/client/useInboxScreen'
import { useChangeDataInbox, useFetchOneInbox } from '@/store/server/useInbox'

import { cn } from '@/lib/utils'
import { getDateOnly, getFormattedDateForInbox } from '@/lib/date'

import { MessageBubble, MessageDate, MessageNew } from '@/components/atoms/applications/inbox'
import { InboxLists } from '@/components/organism/applications/inbox'
import type { MessageType } from '@/types/inbox.type'

export default function useInboxMessage(id: string) {
  const { data: inboxResponse, isSuccess } = useFetchOneInbox(id)
  const { mutate: changeDataInbox, isPending } = useChangeDataInbox()
  const navigateTo = useInboxScreen((state) => state.navigateTo)

  const [messageInput, setMessageInput] = React.useState('')
  const [seqEdit, setSeqEdit] = React.useState<number | null>(null)
  const [replyMessage, setReplyMessage] = React.useState<MessageType | null>(null)

  const inbox = inboxResponse?.data
  const isGroup = inbox?.type === 'GROUP'

  const resetInput = () => {
    setMessageInput('')
    setSeqEdit(null)
    setReplyMessage(null)
  }

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inbox) return

    const updatedMessages = seqEdit
      ? inbox.messages.map((msg) => (msg.seq === seqEdit ? { ...msg, message: messageInput, status: 'EDITED' } : msg))
      : [
          ...inbox.messages,
          {
            message: messageInput,
            name: 'You',
            seq: inbox.messages.length + 1,
            sendAt: getFormattedDateForInbox(),
            ...(replyMessage && {
              replyMessage: {
                name: replyMessage.name,
                message: replyMessage.message,
                seq: replyMessage.seq
              }
            })
          }
        ]

    changeDataInbox({ id, ...inbox, messages: updatedMessages })
    resetInput()
  }

  const renderMessages = (): React.ReactNode[] => {
    if (!inbox) return []
    let lastDate = ''

    return inbox.messages.flatMap((message, index) => {
      const nodes: React.ReactNode[] = []
      const messageDate = message.sendAt ? getDateOnly(message.sendAt) : ''

      if (isGroup && messageDate && messageDate !== lastDate && index < 5) {
        lastDate = messageDate
        nodes.push(
          <MessageDate
            key={`date-${messageDate}-${index}`}
            messageDate={message.sendAt as string}
            className={cn(index !== 0 && 'mt-7')}
          />
        )
      }

      if (isGroup && index === 5) nodes.push(<MessageNew key={`new-${index}`} />)

      nodes.push(
        <MessageBubble
          key={`message-${message.seq}-${index}`}
          message={message}
          id={id}
          inboxItem={inbox}
          onEditMessage={() => {
            setSeqEdit(message.seq as number)
            setMessageInput(message.message as string)
          }}
          onReplyMessage={() => {
            setReplyMessage(message)
          }}
        />
      )

      return nodes
    })
  }

  return {
    inbox,
    isSuccess,
    isGroup,
    isPending,
    messageInput,
    seqEdit,
    replyMessage,
    setReplyMessage,
    setMessageInput,
    handleSend,
    renderMessages,
    handleBack: () => navigateTo(<InboxLists />)
  }
}
