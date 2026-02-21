import * as React from 'react'
import { useInboxScreen } from '@/store/client/useInboxScreen'

export default function Inbox() {
  const inboxScreen = useInboxScreen((state) => state.inboxScreen)
  return <React.Fragment>{inboxScreen}</React.Fragment>
}
