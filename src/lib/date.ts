export function getDaysLeft(dateString: string, type: 'forSort' | 'forDisplay' = 'forDisplay') {
  const [day, month, year] = dateString.split('/').map(Number)

  const targetDate = new Date(year as number, (month as number) - 1, day)
  const today = new Date()

  today.setHours(0, 0, 0, 0)
  targetDate.setHours(0, 0, 0, 0)

  const diffTime = targetDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return {
      ...(type === 'forSort' ? { daysLeft: 0 } : {}),
      status: 'Today'
    }
  }

  if (diffDays < 0) {
    return {
      daysLeft: type === 'forSort' ? diffDays : Math.abs(diffDays),
      status: 'Overdue',
    }
  }

  if (diffDays === 1) {
    return {
      daysLeft: 1,
      status: 'Day Left',
    }
  }

  return {
    daysLeft: diffDays,
    status: 'Days Left',
  }
}

export function parseDate(dateString: string) {
  const [day, month, year] = dateString.split('/').map(Number)
  return new Date(year as number, (month as number) - 1, day)
}

export function formatDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}