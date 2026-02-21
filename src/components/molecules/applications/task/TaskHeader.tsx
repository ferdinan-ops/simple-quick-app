import { Dropdown } from '@/components/molecules'
import { Button } from '@/components/atoms/button'

import { useCreateTask } from '@/store/server/useTask'

import COLORS from '@/lib/color'

import { ChevronIcon } from '@/assets/icons'

export default function TaskHeader() {
  const { mutate: createTask, isPending } = useCreateTask()

  return (
    <header className="flex items-center justify-between pr-[9px]">
      <div className="flex h-full w-[45%] justify-center">
        <Dropdown className="items-center justify-center">
          <Dropdown.TriggerButton variant="outline" className="w-fit">
            My Task
            <ChevronIcon color={COLORS.GRAY2} size={20} />
          </Dropdown.TriggerButton>
          <Dropdown.Content>
            <Dropdown.Item>Personal Errands</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item>Urgent To-Do</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </div>
      <Button onClick={() => createTask({ status: 'TODO' })} loading={isPending}>
        New Task
      </Button>
    </header>
  )
}
