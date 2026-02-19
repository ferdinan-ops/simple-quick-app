'use client'

import * as React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '../atoms/button'
import { CalendarIcon } from '@/assets/icons'
import COLORS from '@/lib/color'
import { formatDate } from '@/lib/date'

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date) => void
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" id="date" className="z-10 w-[193px] border-gray3 justify-between text-xs">
          {value ? formatDate(value) : 'Set Date'}
          <CalendarIcon size={16} color={COLORS.GRAY2} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 w-[258px] overflow-hidden bg-white p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange?.(date as Date)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
