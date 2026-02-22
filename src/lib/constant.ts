export const BADGES = [
  {
    label: 'Important ASAP',
    color: '#E5F1FF'
  },
  {
    label: 'Offline Meeting',
    color: '#FDCFA4'
  },
  {
    label: 'Virtual Meeting',
    color: '#F9E9C3'
  },
  {
    label: 'ASAP',
    color: '#AFEBDB'
  },
  {
    label: 'Client Related',
    color: '#CBF1C2'
  },
  {
    label: 'Self Task',
    color: '#CFCEF9'
  },
  {
    label: 'Appointments',
    color: '#F9E0FD'
  },
  {
    label: 'Court Related',
    color: '#9DD0ED'
  }
]

export const getColorBadge = (label: string) => {
  return BADGES.find((badge) => badge.label === label)?.color
}

const COLOR_MESSAGE = {
  YOU: {
    text: 'text-[#9B51E0]',
    bg: 'bg-[#EEDCFF]'
  },
  'MARY HILDA': {
    text: 'text-[#E5A443]',
    bg: 'bg-[#FCEED3]'
  },
  'OBAIDULLAH AMARKHIL': {
    text: 'text-[#43B78D]',
    bg: 'bg-[#D2F2EA]'
  },
  DEFAULT: {
    text: 'text-primary',
    bg: 'bg-white'
  }
}

export function getColorMessage(name: string) {
  return COLOR_MESSAGE[name.toUpperCase() as keyof typeof COLOR_MESSAGE] || COLOR_MESSAGE.DEFAULT
}
