import type { IconProps } from '@/types/icon.type'

export default function CalendarIcon({ size = 32, color = 'white', className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.3334 1.99996H12.6667V0.666626H11.3334V1.99996H4.66671V0.666626H3.33337V1.99996H2.66671C1.93337 1.99996 1.33337 2.59996 1.33337 3.33329V14C1.33337 14.7333 1.93337 15.3333 2.66671 15.3333H13.3334C14.0667 15.3333 14.6667 14.7333 14.6667 14V3.33329C14.6667 2.59996 14.0667 1.99996 13.3334 1.99996ZM13.3334 14H2.66671V6.66663H13.3334V14ZM2.66671 5.33329H13.3334V3.33329H2.66671V5.33329Z"
        fill={color}
      />
    </svg>
  )
}
