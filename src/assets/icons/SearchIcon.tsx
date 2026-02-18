import type { IconProps } from '@/types/icon.type'

export default function SearchIcon({ color = 'white', size = 31, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.2032 18.9783H21.5662L30.1754 27.6047L27.6047 30.1754L18.9783 21.5662V20.2032L18.5124 19.7201C16.5456 21.4109 13.9922 22.4289 11.2144 22.4289C5.02061 22.4289 0 17.4082 0 11.2144C0 5.02061 5.02061 0 11.2144 0C17.4082 0 22.4289 5.02061 22.4289 11.2144C22.4289 13.9922 21.4109 16.5456 19.7201 18.5124L20.2032 18.9783ZM3.45058 11.2145C3.45058 15.5104 6.91842 18.9783 11.2144 18.9783C15.5104 18.9783 18.9782 15.5104 18.9782 11.2145C18.9782 6.91846 15.5104 3.45062 11.2144 3.45062C6.91842 3.45062 3.45058 6.91846 3.45058 11.2145Z"
        fill={color}
      />
    </svg>
  )
}
