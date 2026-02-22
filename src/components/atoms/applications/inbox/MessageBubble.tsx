import * as React from 'react'

import COLORS from '@/lib/color'
import { cn } from '@/lib/utils'
import { formatTime } from '@/lib/date'
import { getColorMessage } from '@/lib/constant'

import { MoreIcon } from '@/assets/icons'
import type { InboxType, MessageType } from '@/types/inbox.type'

import { Dropdown } from '@/components/molecules'
import { DeleteMessageDialog } from '@/components/atoms/applications/inbox'
import type { DropdownContextType } from '@/store/client/useDropdownContext'

type MessageBubbleProps = {
  message: MessageType
  id: string
  inboxItem: InboxType
  onEditMessage?: () => void
  onReplyMessage?: () => void
}

export default function MessageBubble({ message, id, inboxItem, onEditMessage, onReplyMessage }: MessageBubbleProps) {
  const isYou = message.name === 'You'

  const handleClickItem = (type: 'edit' | 'reply', context: DropdownContextType) => {
    if (type === 'edit') {
      onEditMessage?.()
    } else {
      onReplyMessage?.()
    }

    context?.setOpen(false)
  }

  return (
    <div className={cn('flex w-full flex-col', isYou ? 'items-end' : '')}>
      <div
        className={cn('mt-4 flex w-full max-w-[calc(90%-53px)] flex-col items-start gap-1', isYou ? 'items-end' : '')}
      >
        <p className={cn('text-[13px] font-semibold', getColorMessage(message.name as string).text)}>{message.name}</p>
        {message.replyMessage && (
          <p className="max-w-[80%] bg-white p-[10px] text-xs text-gray2">{message.replyMessage.message}</p>
        )}
        <div className={cn('flex w-auto min-w-[70%] items-start gap-[7px]', isYou ? 'flex-row-reverse' : '')}>
          <article
            className={cn(
              'flex flex-col gap-3 rounded-md p-[10px]',
              getColorMessage(message.name as string).bg,
              isYou && 'w-full'
            )}
          >
            <p className={cn('text-[13px] font-medium text-gray2', message.status === 'DELETED' && 'italic')}>
              {message.message}
            </p>
            <div className="flex items-center gap-1">
              <p className="text-[8px] font-medium text-gray2">{message.sendAt ? formatTime(message.sendAt) : ''}</p>
              {message.status === 'EDITED' && <p className="text-[8px] font-medium text-gray2">(Edited)</p>}
            </div>
          </article>
          {message.status !== 'DELETED' && (
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
                        onClick={(context) => handleClickItem('edit', context)}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Separator className="bg-gray4" />
                      <DeleteMessageDialog id={id} inboxItem={inboxItem} messageSeq={message.seq as number} />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Dropdown.Item className="font-medium text-primary">Share</Dropdown.Item>
                      <Dropdown.Separator className="bg-gray4" />
                      <Dropdown.Item
                        className="font-medium text-primary"
                        onClick={(context) => handleClickItem('reply', context)}
                      >
                        Reply
                      </Dropdown.Item>
                    </React.Fragment>
                  )}
                </Dropdown.Content>
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
