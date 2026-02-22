import * as React from 'react'
import { useDeleteTask } from '@/store/server/useTask'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Dropdown } from '@/components/molecules'
import { useDropdownContext } from '@/store/client/useDropdownContext'

export default function DeleteTaskDialog({ id }: { id: string }) {
  const { mutate: deleteTask, isPending } = useDeleteTask()
  const context = useDropdownContext()

  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (!isPending) setOpen(false)
  }, [isPending])

  const handleContinue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    deleteTask(id)
    context?.setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Dropdown.Item className="text-red">Delete</Dropdown.Item>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your task from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-neutral-100">Cancel</AlertDialogCancel>
          <AlertDialogAction
            loading={isPending}
            className="bg-red text-white hover:bg-[#d62c2c]"
            onClick={handleContinue}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
