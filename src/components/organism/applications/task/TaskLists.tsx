// import { EmptyData } from '@/components/atoms'
import { ChevronIcon, MoreIcon, PencilIcon, TimeIcon } from '@/assets/icons'
import { TaskLayout } from '@/components/layouts'
import { TaskCard } from '@/components/molecules/applications/task'
import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker } from '@/components/ui/datepicker'
import COLORS from '@/lib/color'
import { cn } from '@/lib/utils'

function getDaysLeft(dateString: string) {
  const [day, month, year] = dateString.split('/').map(Number)

  const targetDate = new Date(year as number, (month as number) - 1, day)
  const today = new Date()

  // Reset jam supaya hitungannya akurat
  today.setHours(0, 0, 0, 0)
  targetDate.setHours(0, 0, 0, 0)

  const diffTime = targetDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

const data = [
  {
    task: 'Close off Case #012920-RODRIGUES, Amiguel',
    createdAt: '20/02/2026',
    descriptions:
      'Closing off this case since this application has been canceled. No one really understand how this case could possibly canceled. The options and the documents within this documents within this document were totally a guaranteed for a success!',
    status: 'TODO'
  },
  {
    task: 'Set up documentation report for several Cases : Case 145443, Case 192829 and Case 182203',
    createdAt: '22/02/2026',
    descriptions:
      'All Cases must included all payment transactions, all documents and forms filled. All conversations in comments message in channels and emails should be provided as well in.',
    status: 'TODO'
  },
  {
    task: 'Set up appointment with Dr Blake',
    createdAt: '28/02/2026',
    status: 'TODO'
  },
  {
    task: 'Contact Mr Caleb - video conference?',
    createdAt: '11/02/2026',
    status: 'DONE'
  },
  {
    task: 'Assign 3 homework to Client A',
    createdAt: '10/02/2026',
    status: 'DONE'
  }
]

export default function TaskLists() {
  return (
    <TaskLayout>
      {/* <Loading>
        <p className="text-center font-semibold text-gray2">Loading Task Lists...</p>
      </Loading> */}
      {/* <EmptyData text="No Task Added" /> */}

      {data.map((item, index) => (
        <TaskCard
          taskItem={item}
          className={cn(index !== data.length - 1 && 'border-b border-gray3', index !== 0 && 'pt-5')}
        />
      ))}
    </TaskLayout>
  )
}
