import { User } from 'types'

export interface MenuProps {
  deleteRef: React.RefObject<HTMLDivElement>
}

export interface SelectThreadItemProps {
  thread: {
    _id: string
    name: string
  }
  selected: boolean
}

export interface SelectUserItemProps {
  user: User
  image: string
  selected: boolean 
  localUser: User | {}
  setLocalUser: (user: User | {}) => void
}