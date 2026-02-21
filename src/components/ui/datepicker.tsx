import * as React from 'react'

import { Button } from '@/components/atoms/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import COLORS from '@/lib/color'
import { formatDate } from '@/lib/date'

import { CalendarIcon } from '@/assets/icons'

type DatePickerProps = {
  value?: Date
  onChange?: (date: Date) => void
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" id="date" className="z-10 w-[193px] justify-between border-gray3 text-xs font-medium">
          {value ? formatDate(value) : 'Set Date'}
          <CalendarIcon size={16} color={COLORS.GRAY2} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 w-fit overflow-hidden border-gray3 bg-white p-0 shadow-none" align="start" sideOffset={4} alignOffset={160}>
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
