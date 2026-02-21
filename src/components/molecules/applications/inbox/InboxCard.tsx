import { PersonIcon } from '@/assets/icons'
import { InboxMessage } from '@/components/organism/applications/inbox'

import COLORS from '@/lib/color'
import { cn } from '@/lib/utils'
import { useInboxScreen } from '@/store/client/useInboxScreen'

import type { InboxType } from '@/types/inbox.type'

type InboxCardProps = {
  inboxItem: InboxType
  id?: string
  className?: string
}

export default function InboxCard({ inboxItem, id, className }: InboxCardProps) {
  const navigateTo = useInboxScreen((state) => state.navigateTo)

  return (
    <article
      onClick={() => navigateTo(<InboxMessage id={id || ''} />)}
      className={cn('flex cursor-pointer items-start gap-[17px] pb-8 pt-[21px]', className)}
    >
      <div className="relative">
        <div className="relative z-50 ml-[17px] flex h-[34px] w-[34px] items-center justify-center rounded-full bg-primary">
          {inboxItem.type === 'GROUP' ? (
            <PersonIcon size={18} color={COLORS.WHITE} />
          ) : (
            <p className="text-xs font-semibold text-white">{inboxItem.name?.charAt(0).toUpperCase()}</p>
          )}
        </div>
        {inboxItem.type === 'GROUP' && (
          <div className="absolute left-0 top-0 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-gray5">
            <PersonIcon size={18} color={COLORS.BLACK54} />
          </div>
        )}
      </div>
      <div className="flex w-full flex-col">
        <div className="flex items-start gap-[17px]">
          <p className="w-auto text-sm font-semibold text-primary">{inboxItem.name}</p>
          <p className="min-w-max text-xs text-gray2">{inboxItem.time}</p>
        </div>
        <div className="relative flex w-full flex-col">
          {inboxItem.isUnread && <div className="absolute bottom-0 right-0 h-[10px] w-[10px] rounded-full bg-red" />}
          {inboxItem.type === 'GROUP' && (
            <p className="text-xs font-semibold text-gray2">{inboxItem.lastMessage?.name}:</p>
          )}
          <p className="text-xs text-gray2">{inboxItem.lastMessage?.message}</p>
        </div>
      </div>
    </article>
  )
}
