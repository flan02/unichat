/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { UserResource } from "@clerk/types"
import { Channel, UserResponse } from "stream-chat"
import UserResult from "./UserResult"
import { ArrowLeft } from "lucide-react"
import { Avatar, useChatContext, LoadingChannels as LoadingUsers } from "stream-chat-react"
import LoadingButton from "@/components/reutilizable/LoadingButton"
import useDebounce from "@/hooks/useDebounce"
import StartGroupChatHeader from "./StartGroupChatHeader"

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
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [searchInput, setSearchInput] = useState<string>("")
  const searchInputDebounced = useDebounce(searchInput, 250)
  const [moreUsersLoading, setMoreUsersLoading] = useState<boolean>(false)
  const [endOfPaginationReached, setEndOfPaginationReached] = useState<boolean | undefined>(undefined)

  const pageSize = 5

  const loadInitUsers = async () => {
    setUsers(undefined)
    setEndOfPaginationReached(undefined)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // ? Artificial delay of 1s.

    try {
      const response = await client.queryUsers({
        id: { $ne: loggedInUser.id },
        ...(searchInputDebounced
          ? { $or: [{ name: { $autocomplete: searchInputDebounced } }, { id: { $autocomplete: searchInputDebounced } }] }
          : {}
        )
      }, {
        id: 1,
        name: 1,
        image: 1
      }, {
        limit: pageSize + 1
      })

      setUsers(response.users.slice(0, pageSize))
      setEndOfPaginationReached(response.users.length <= pageSize)
    } catch (error) {
      console.error(error)
      alert("An error occurred while loading users")
    }
  }

  useEffect(() => {
    loadInitUsers()
  }, [client, loggedInUser.id, searchInputDebounced])

  async function loadMoreUsers() {

    setMoreUsersLoading(true)
    // await new Promise((resolve) => setTimeout(resolve, 1000)) // ? Artificial delay of 1s.
    try {
      const lastUserId = users?.[users.length - 1].id
      if (!lastUserId) return
      const response = await client.queryUsers({
        $and: [
          { id: { $ne: loggedInUser.id } },
          { id: { $gt: lastUserId } },
          searchInputDebounced
            ? { $or: [{ name: { $autocomplete: searchInputDebounced } }, { id: { $autocomplete: searchInputDebounced } }] }
            : {}

        ]
      },
        { id: 1 }, // 2nd argm
        { limit: pageSize + 1 }
      )
      setUsers([...users, ...response.users.slice(0, pageSize)])  // ? The spread operator is used to concatenate the new users to the existing ones
      setEndOfPaginationReached(response.users.length <= pageSize)
    } catch (error) {
      console.error(error)
      alert("An error occurred while loading more users")

    } finally {
      setMoreUsersLoading(false)
    }
  }


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
      alert("Error creating channel")
    }
  }

  async function startGroupChat(members: string[], name?: string) {
    try {
      const channel = client.channel("messaging", {
        members,
        name
      })
      await channel.create()
      handleChannelSelected(channel)
    } catch (error) {
      console.error(error)
      alert("An error occurred while starting a group chat")
    }
  }

  return (
    <div className="overflow-y-auto str-chat absolute z-10 w-full h-screen bg-slate-100 border-e border-e-[#DBDDE1] dark:border-e-gray-800 dark:bg-[#17191c]">
      <div className="flex flex-col p-3 w-full">

        <div className="mb-3 flex items-center gap-3 text-lg font-bold">
          <ArrowLeft className="cursor-pointer" onClick={onClose} /> Users
        </div>
        <input
          type="search"
          placeholder="Search users"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-full bg-transparent dark:border-gray-800 dark:text-white"
        />
      </div>
      {
        selectedUsers.length > 0 && (
          <StartGroupChatHeader
            onConfirm={(name) => startGroupChat([loggedInUser.id, ...selectedUsers], name)}
            onClearSelection={() => setSelectedUsers([])}
          />
        )
      }
      <div>
        {
          users?.map((user) => (
            <UserResult
              user={user}
              onUserClicked={startChatWithUser}
              key={user.id}
              selected={selectedUsers.includes(user.id)}
              onChangeSelected={(selected) => setSelectedUsers(
                selected
                  ? [...selectedUsers, user.id]
                  : selectedUsers.filter((id) => id !== user.id)
              )}
            />
          )) // ? This is the return value that why I used parentheses and not curly braces
        }
        { /* JSON.stringify(selectedUsers, null, 2) */}

        <div className="px-3">
          {
            !users && !searchInputDebounced && <LoadingUsers />
          }
          {
            !users && searchInputDebounced && "Searching..."
          }
          {
            users?.length === 0 && <div>No users found</div>
          }
        </div>
        {
          endOfPaginationReached === false && <LoadingButton onClick={loadMoreUsers} loading={moreUsersLoading} className="m-auto mb-3 w-[80%]" >Load more users</LoadingButton>
        }
      </div>
    </div>
  )
}

export default UsersMenu