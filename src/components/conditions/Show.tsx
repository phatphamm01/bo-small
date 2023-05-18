//TYPES MODULES
import type { ReactElement } from 'react'
type ShowProps = {
  when: any
  children: ReactElement
}

export default function Show({ when, children }: ShowProps) {
  return !!when ? children : null
}
