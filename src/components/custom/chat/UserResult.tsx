import { UserResponse } from "stream-chat"
import { UserCustom } from "./UsersMenu"
import { Avatar } from "stream-chat-react"


interface UserResultProps {
  user: UserResponse & UserCustom
  onUserClicked: (userId: string) => void
  selected?: boolean
  onChangeSelected: (selected: boolean) => void
}

const UserResult = ({ user, onUserClicked, selected, onChangeSelected }: UserResultProps) => {
  return (
    <button
      onClick={() => onUserClicked(user.id)}
      className="mb-3 w-full flex items-center p-2 gap-2 hover:bg-[#e9eaed]" >
      <input
        type="checkbox"
        className="mx-1 scale-125"
        checked={selected}
        onChange={(e) => onChangeSelected(e.target.checked)}
        onClick={(e) => e.stopPropagation()} // ! Prevent the parent onClick event from firing
      />
      <span>
        <Avatar image={user.image} name={user.name || user.id} size={40} />
      </span>
      <span className="whitespace-nowrap overflow-hidden text-ellipsis">
        {user.name || user.id}
      </span>
      {
        user.online ? (
          <span className="w-2 h-2 rounded-full bg-green-500" />
        ) : null
      }
    </button>
  )
}

export default UserResult