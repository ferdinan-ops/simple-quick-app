import * as React from 'react'

import { cn } from '@/lib/utils'
import { useDropdownContext } from '@/store/client/useDropdownContext'

import { DropdownProvider } from '@/components/providers'
import { Button, type ButtonProps } from '@/components/atoms/button'

type DropdownProps = {
  children: React.ReactNode
  className?: string
}

export default function Dropdown({ children, className }: DropdownProps) {
  return (
    <DropdownProvider>
      <div className={cn('relative flex flex-1 flex-col', className)}>{children}</div>
    </DropdownProvider>
  )
}

function TriggerButton(props: ButtonProps) {
  const context = useDropdownContext()

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

function Content({ children, className, align = 'center' }: DropdownProps & { align?: 'center' | 'right' | 'left' }) {
  const context = useDropdownContext()

  return (
    <div
      className={cn(
        'absolute top-[calc(100%+7px)] flex max-h-0 -translate-y-2 flex-col overflow-hidden rounded-md border border-gray3 bg-white opacity-0 transition-all',
        context.open && 'z-50 max-h-32 translate-y-0 opacity-100',
        align === 'center' && 'left-1/2 w-full origin-center -translate-x-1/2',
        align === 'right' && 'right-0 origin-bottom-right',
        align === 'left' && 'left-0 origin-bottom-left',
        className
      )}
    >
      {children}
    </div>
  )
}

function Item({ children, className, onClick }: DropdownProps & { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center px-[15px] py-[12px] text-sm font-semibold text-gray2 hover:bg-neutral-100',
        className
      )}
    >
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
