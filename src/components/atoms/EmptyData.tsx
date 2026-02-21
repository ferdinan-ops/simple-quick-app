import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/atoms'

type EmptyDataProps = {
  text: string
  className?: string
}

export default function EmptyData({ text, className }: EmptyDataProps) {
  return (
    <ScrollArea className={cn('gap-6', className)} scrollClassName="pr-0" center>
      <span className="text-2xl">❌</span>
      <p className="text-center font-semibold text-gray2">{text}</p>
    </ScrollArea>
  )
}
