import * as React from 'react'

import { DropdownContext } from '@/store/client/useDropdownContext'

export default function DropdownProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  return <DropdownContext.Provider value={{ open, setOpen }}>{children}</DropdownContext.Provider>
}
