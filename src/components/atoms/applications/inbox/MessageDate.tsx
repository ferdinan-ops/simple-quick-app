import { formatDateLabel } from '@/lib/date'
import { cn } from '@/lib/utils'

type MessageDateProps = {
  className?: string
  messageDate: string
}
export default function MessageDate({ className, messageDate }: MessageDateProps) {
  return (
    <div className={cn('flex items-center gap-7', className)}>
      <div className="h-[1px] w-full bg-gray2" />
      <p className="min-w-max text-sm font-semibold text-gray2">{messageDate ? formatDateLabel(messageDate) : ''}</p>
      <div className="h-[1px] w-full bg-gray2" />
    </div>
  )
}
