import { User } from '../../../types'

export interface Props {
  user: User
  image: string
  selected: boolean
  localUser: User | {}
  setLocalUser: (user: User | {}) => void
}
