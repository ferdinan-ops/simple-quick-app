import { cn } from '@/lib/utils'

type MessageNewProps = {
  className?: string
}

export default function MessageNew({ className }: MessageNewProps) {
  return <p className={cn('mt-5 text-center text-sm font-semibold text-primary', className)}>New Message</p>
}
