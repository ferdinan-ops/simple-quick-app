import { Input } from '@/components/ui/input'

import { SearchIcon } from '@/assets/icons'

import COLORS from '@/lib/color'

type SearchProps = {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

export default function Search({ value, onChange, placeholder }: SearchProps) {
  return (
    <div className="relative">
      <Input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Search'}
        className="h-8 w-full px-[59px] font-medium text-gray1 placeholder:text-gray1 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-[59px] peer-disabled:opacity-50">
        <SearchIcon color={COLORS.GRAY1} size={12} />
      </div>
    </div>
  )
}
