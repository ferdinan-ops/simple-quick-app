import { MainPopupLayout } from '../layouts'

interface EmptyDataProps {
  text: string
}

export default function EmptyData({ text }: EmptyDataProps) {
  return (
    <MainPopupLayout>
      <span className="text-2xl">❌</span>
      <p className="text-center font-semibold text-gray2">{text}</p>
    </MainPopupLayout>
  )
}
