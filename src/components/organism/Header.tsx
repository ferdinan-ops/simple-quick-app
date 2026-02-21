import { SearchIcon } from '@/assets/icons'
import { Button } from '../atoms/button'

export default function Header() {
  return (
    <header className="flex h-[58px] w-full items-center bg-gray2 px-[26px]">
      <Button variant="icon" className="bg-transparent hover:bg-transparent">
        <SearchIcon className="h-4 w-4 text-white" />
      </Button>
    </header>
  )
}
