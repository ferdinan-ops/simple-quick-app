import * as React from 'react'

export type DropdownContextType = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const DropdownContext = React.createContext<DropdownContextType | null>(null)

export function useDropdownContext() {
  const context = React.useContext(DropdownContext)
  if (!context) throw new Error('useDropdownContext must be used within DropdownContext')
  return context
}
