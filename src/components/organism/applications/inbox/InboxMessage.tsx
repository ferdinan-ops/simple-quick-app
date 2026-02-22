import * as React from 'react'

import { ArrowIcon, LoadingIcon, XIcon } from '@/assets/icons'

import COLORS from '@/lib/color'
import { cn } from '@/lib/utils'

import { useInboxMessage } from '@/hooks'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/atoms/button'
import { Loading, ScrollArea } from '@/components/atoms'

type InboxMessageProps = {
  id: string
}

export default function InboxMessage({ id }: InboxMessageProps) {
  const {
    inbox,
    isSuccess,
    isGroup,
    isPending,
    messageInput,
    setMessageInput,
    handleSend,
    renderMessages,
    handleBack,
    replyMessage,
    setReplyMessage
  } = useInboxMessage(id)

  if (!isSuccess) return <Loading>Loading Chats ...</Loading>

  return (
    <React.Fragment>
      <header className="flex items-center justify-between border-b border-gray4 py-[19px] pl-[25px] pr-[21px]">
        <div className="flex items-center gap-[14px]">
          <Button variant="icon" onClick={handleBack} className="size-6">
            <ArrowIcon size={24} color={COLORS.GRAY1} />
          </Button>
          <div className="flex flex-col gap-2">
            <p className="text-[15px] font-semibold text-primary">{inbox?.name}</p>
            {inbox?.participant && isGroup && (
              <p className="text-[11px] font-medium text-gray1">{inbox?.participant} participants</p>
            )}
          </div>
        </div>
        <Button variant="icon" onClick={handleBack} className="size-[14px]">
          <XIcon size={14} color={COLORS.GRAY1} />
        </Button>
      </header>
      <ScrollArea scrollClassName="mr-[11px] mb-[5px]" className="pl-[29px] pt-[13px]">
        {renderMessages()}
      </ScrollArea>
      {!isGroup && (
        <div className="px-5">
          <div className="mt-3 flex w-full items-center gap-[11px] p-[10px]">
            <LoadingIcon size={24} strokeWidth={7} color="text-primary" />
            <p className="text-[13px] font-bold text-gray2">
              Please wait while we connect you with one of our team ...
            </p>
          </div>
        </div>
      )}
      <form
        className={cn('flex items-center gap-[13px] px-5 pb-5', !isGroup ? 'pt-[11px]' : 'pt-5')}
        onSubmit={(e) => handleSend(e)}
      >
        <div className="relative w-full flex-1">
          {replyMessage && (
            <div className="absolute inset-x-0 bottom-full flex items-start gap-8 rounded-t-md border border-b-0 border-gray3 bg-white px-5 py-[15px]">
              <div className="flex flex-col gap-0">
                <p className="text-xs font-semibold text-gray2">Replying to {replyMessage.name}</p>
                <p className="text-xs font-medium text-gray1">{replyMessage.message}</p>
              </div>
              <div>
                <Button variant="icon" type="button" onClick={() => setReplyMessage(null)}>
                  <XIcon size={14} color={COLORS.GRAY1} />
                </Button>
              </div>
            </div>
          )}
          <Input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a new message"
            className={cn(
              'w-full text-sm font-medium text-gray1 placeholder:text-gray1',
              replyMessage && 'rounded-t-none'
            )}
          />
        </div>
        <Button type="submit" loading={isPending}>
          Send
        </Button>
      </form>
    </React.Fragment>
  )
}
