import type { IconProps } from '@/types/icon.type'

export default function CheckIcon({ size = 32, color = 'white', className }: IconProps) {
  return (
    <svg
      height={size}
      width={size}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      className={className}
    >
      <polygon
        style={{ fill: color }}
        points="202.624,478.016 0,291.36 70.512,214.8 191.968,326.656 431.44,33.984 512,99.904 "
      />
    </svg>
  )
}
