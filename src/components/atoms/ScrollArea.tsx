import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import 'overlayscrollbars/overlayscrollbars.css'

import { cn } from '@/lib/utils'

type ScrollAreaProps = {
  children: React.ReactNode
  center?: boolean
  className?: string
  scrollClassName?: string
}

export default function ScrollArea({ children, center, className, scrollClassName }: ScrollAreaProps) {
  return (
    <OverlayScrollbarsComponent
      className={cn('flex-1 pr-5', scrollClassName)}
      options={{ scrollbars: { autoHide: 'never', theme: 'os-theme-light' } }}
      defer
    >
      <div className={cn('h-full', center && 'flex flex-col items-center justify-center', className)}>{children}</div>
    </OverlayScrollbarsComponent>
  )
}
