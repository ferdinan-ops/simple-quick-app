import { SearchIcon } from '@/assets/icons'

export default function Header() {
  return (
    <header className="flex h-[58px] w-full items-center bg-gray2 px-[26px]">
      <SearchIcon className="h-4 w-4 text-white" />
    </header>
  )
}
