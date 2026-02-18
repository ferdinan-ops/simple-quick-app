'use client'

import * as React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '../atoms/button'
import { CalendarIcon } from '@/assets/icons'
import COLORS from '@/lib/color'

function formatDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

export function DatePicker() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(new Date('2025-06-01'))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" id="date" className="z-10 w-[193px] justify-between text-xs">
          {date ? formatDate(date) : 'Set Date'}
          <CalendarIcon size={16} color={COLORS.GRAY2} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 w-[258px] overflow-hidden bg-white p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
