import { MainPopupLayout } from '../layouts'

type EmptyDataProps = {
  text: string
}

export default function EmptyData({ text }: EmptyDataProps) {
  return (
    <MainPopupLayout className="min-h-[556px] items-center justify-center">
      <span className="text-2xl">❌</span>
      <p className="text-center font-semibold text-gray2">{text}</p>
    </MainPopupLayout>
  )
}
