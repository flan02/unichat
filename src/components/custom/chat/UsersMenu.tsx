/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { UserResource } from "@clerk/types"
import { Channel, UserResponse } from "stream-chat"
import UserResult from "./UserResult"
import { ArrowLeft } from "lucide-react"
import { Avatar, useChatContext, LoadingChannels as LoadingUsers } from "stream-chat-react"

interface UserMenuProps {
  loggedInUser: UserResource
  onClose: () => void
  onChannelSelect: () => void
}

export type UserCustom = {
  image?: string
}

const UsersMenu = ({ loggedInUser, onClose, onChannelSelect }: UserMenuProps) => {
  const { client, setActiveChannel } = useChatContext() // This const is accesible from the Chat component
  const [users, setUsers] = useState<(UserResponse & UserCustom)[]>()

  const loadInitUsers = async () => {
    // * await

    try {
      const response = await client.queryUsers({
        id: { $ne: loggedInUser.id }
      }, {
        id: 1,
        name: 1,
        image: 1
      })
      setUsers(response.users)
    } catch (error) {
      console.error(error)
      alert("An error occurred while loading users")
    }
  }

  useEffect(() => {
    loadInitUsers()
  }, [client, loggedInUser.id])


  const handleChannelSelected = (channel: Channel) => {
    setActiveChannel(channel)
    onChannelSelect()
  }

  const startChatWithUser = async (userId: string) => {
    try {
      const channel = client.channel("messaging", {
        members: [userId, loggedInUser.id],
      })
      await channel.create()
      handleChannelSelected(channel)
    } catch (error) {
      console.error(error)
      alert("An error occurred while starting a chat with the user")
    }
  }

  return (
    <div className="str-chat absolute z-10 w-full h-screen bg-slate-100 border-e border-e-[#DBDDE1]">
      <div className="flex items-center gap-3 p-3 text-lg font-bold">
        <ArrowLeft className="cursor-pointer" onClick={onClose} /> Users
      </div>
      {
        users?.map((user) => (
          <UserResult user={user} onUserClicked={startChatWithUser} key={user.id} />
        )) // ? This is the return value that why I used parentheses and not curly braces
      }
    </div>
  )
}

export default UsersMenu