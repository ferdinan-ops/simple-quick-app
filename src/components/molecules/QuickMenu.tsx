import * as React from 'react'

import { FloatButton } from '@/components/atoms/button'
import { QuickPopup } from '@/components/molecules'

import { cn } from '@/lib/utils'

type Action = {
  activeIcon: React.ReactNode
  inactiveIcon: React.ReactNode
  onClick?: () => void
  color?: string
  label?: string
  popup?: React.ReactNode
}

type QuickMenuProps = {
  actions: Action[]
  mainButton: {
    active: {
      icon: React.ReactNode
      color: string
    }
    inactive: {
      icon: React.ReactNode
      color: string
    }
  }
}

type ButtonStyleParams = {
  index: number
  isExpanded: boolean
  activeIndex: number | null
}

const getButtonStyle = ({ index, isExpanded, activeIndex }: ButtonStyleParams) => {
  const BUTTON_SIZE = 60
  const GAP = 26

  let order = index + 1
  if (activeIndex !== null && index > activeIndex) {
    order = index
  }

  const distance = order * (BUTTON_SIZE + GAP)

  if (isExpanded && activeIndex === null) {
    return {
      transform: `translateX(-${distance}px) translateY(-50%)`,
      opacity: 1
    }
  }

  if (isExpanded && activeIndex === index) {
    return {
      transform: `translateX(4px) translateY(-50%) scale(1.135)`,
      opacity: 1,
      zIndex: 50
    }
  }

  if (isExpanded && activeIndex !== null && activeIndex !== index) {
    return {
      transform: `translateX(-${distance}px) translateY(-50%)`,
      opacity: 1
    }
  }

  return {}
}

export default function QuickMenu({ actions, mainButton }: QuickMenuProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const [isExpanded, setIsExpanded] = React.useState(false)

  const reset = () => {
    setIsExpanded(false)
    setActiveIndex(null)
  }

  return (
    <React.Fragment>
      <QuickPopup
        className={cn(
          'translate-y-3 opacity-0 transition-all duration-300 ease-in-out',
          activeIndex !== null && 'translate-y-0 opacity-100'
        )}
      >
        {activeIndex !== null ? actions[activeIndex]?.popup : null}
      </QuickPopup>
      <div className="fixed bottom-[34px] right-[27px] flex size-[68px] items-center">
        <FloatButton
          className={cn(
            'bottom-0 right-0 z-50',
            activeIndex === null
              ? `${mainButton.active.color} shadow-[0_4px_4px_rgba(0,0,0,0.10)]`
              : `z-30 translate-x-[-15px] ${mainButton.inactive.color}`
          )}
          size="large"
          onClick={() => (activeIndex === null ? setIsExpanded(!isExpanded) : reset())}
        >
          {activeIndex === null ? mainButton.active.icon : mainButton.inactive.icon}
        </FloatButton>
        {actions.map((action, index) => (
          <FloatButton
            key={index}
            className={cn(
              'group top-1/2 z-0 -translate-y-1/2 opacity-0',
              isExpanded && activeIndex === index
                ? `${action.color} shadow-[0_4px_4px_rgba(0,0,0,0.10)]`
                : 'bg-gray6 hover:bg-gray6/90'
            )}
            onClick={() => setActiveIndex(index)}
            style={getButtonStyle({
              index,
              isExpanded,
              activeIndex
            })}
          >
            {(activeIndex === null || activeIndex !== index) && (
              <div
                className={cn(
                  activeIndex !== null ? 'opacity-0' : 'opacity-100',
                  'absolute left-1/2 top-[-26px] z-[-1] flex w-fit -translate-x-1/2 items-center transition-all ease-in-out'
                )}
              >
                <p className="text-xs font-semibold text-white">{action.label}</p>
              </div>
            )}
            {isExpanded && activeIndex === index ? action.activeIcon : action.inactiveIcon}
          </FloatButton>
        ))}
      </div>
    </React.Fragment>
  )
}
