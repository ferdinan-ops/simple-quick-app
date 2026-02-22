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
      status: 'Overdue'
    }
  }

  if (diffDays === 1) {
    return {
      daysLeft: 1,
      status: 'Day Left'
    }
  }

  return {
    daysLeft: diffDays,
    status: 'Days Left'
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

export function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    weekday: undefined,
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  })
}

export function getDateOnly(dateStr: string): string {
  return new Date(dateStr).toISOString().split('T')[0] || ''
}

export function formatTime(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

export function getFormattedDateForInbox() {
  const date = new Date()

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const month = months[date.getMonth()]
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`
}
