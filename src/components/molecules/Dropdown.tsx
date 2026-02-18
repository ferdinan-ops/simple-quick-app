import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/atoms/button'

interface DropdownProps {
  children: React.ReactNode
  className?: string
}

interface DropdownContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const DropdownContext = React.createContext<DropdownContextType | null>(null)

export default function Dropdown({ children, className }: DropdownProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className={cn('relative flex flex-1 flex-col', className)}>{children}</div>
    </DropdownContext.Provider>
  )
}

function TriggerButton(props: ButtonProps) {
  const context = React.useContext(DropdownContext)
  if (!context) throw new Error('TriggerButton must be inside Dropdown')

  return (
    <Button
      {...props}
      onClick={(e) => {
        context?.setOpen(!context.open)
        props.onClick?.(e)
      }}
    />
  )
}

function Content({ children, className, align = 'center' }: DropdownProps & { align?: 'center' | 'right' }) {
  const context = React.useContext(DropdownContext)
  if (!context) throw new Error('Content must be inside Dropdown')
  return (
    <div
      className={cn(
        'absolute top-[calc(100%+7px)] z-50 flex -translate-y-2 flex-col rounded-md border border-gray3 bg-white opacity-0 transition-all',
        context.open && 'translate-y-0 opacity-100',
        align === 'center' && 'left-1/2 w-full origin-center -translate-x-1/2',
        align === 'right' && 'right-0 origin-bottom-right',
        className
      )}
    >
      {children}
    </div>
  )
}

function Item({ children, className }: DropdownProps) {
  return (
    <button className={cn('flex items-center px-[15px] py-[12px] text-sm font-semibold text-gray2', className)}>
      {children}
    </button>
  )
}

function Separator({ className }: { className?: string }) {
  return <div className={cn('h-[1px] w-full bg-gray3', className)} />
}

Dropdown.TriggerButton = TriggerButton
Dropdown.Content = Content
Dropdown.Item = Item
Dropdown.Separator = Separator
