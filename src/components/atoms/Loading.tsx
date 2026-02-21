import * as React from 'react'

import { LoadingIcon } from '@/assets/icons'
import { ScrollArea } from '@/components/atoms'

type LoadingProps = {
  children?: React.ReactNode
  className?: string
}

export default function Loading({ children, className }: LoadingProps) {
  return (
    <ScrollArea className={className} scrollClassName="pr-0" center>
      <div className="flex flex-col items-center gap-6 text-gray2">
        <LoadingIcon />
        {children ? children : null}
      </div>
    </ScrollArea>
  )
}
