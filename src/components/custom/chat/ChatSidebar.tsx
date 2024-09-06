
import { ChannelList, ChannelPreview, ChannelPreviewMessenger, ChannelPreviewUIComponentProps } from "stream-chat-react"
import Menubar from "./Menubar"
import { UserResource } from "@clerk/types"
import { useCallback, useEffect, useState } from "react"
import UsersMenu from "./UsersMenu"


interface ChatSidebarProps {
  user: UserResource
  show: boolean
  onClose: () => void
}

const ChatSidebar = ({ user, show, onClose }: ChatSidebarProps) => {
  const [usersMenuOpen, setUsersMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!show) setUsersMenuOpen(false)
  }, [show])

  // * Only when the onClose function changes, the ChannelPreviewCustom function will be recreated. This is to prevent unnecessary re-renders.
  const ChannelPreviewCustom = useCallback((props: ChannelPreviewUIComponentProps) =>
  (
    <ChannelPreviewMessenger
      {...props}
      onSelect={() => {
        props.setActiveChannel?.(props.channel, props.watchers)
        onClose()
      }}
    />
  ), [onClose])

  return (
    <div className={`relative w-full h-screen flex-col md:max-w-[300px] ${show ? "flex" : "hidden"}`}>
      {
        usersMenuOpen && <UsersMenu
          loggedInUser={user}
          onClose={() => setUsersMenuOpen(false)}
          onChannelSelect={() => {
            setUsersMenuOpen(false)
            onClose()
          }}
        />
      }
      <Menubar onUserMenuClick={() => setUsersMenuOpen(true)} />
      <ChannelList
        filters={{ type: "messaging", members: { $in: [user.id] } }}
        sort={{ last_message_at: -1 }}
        options={{ state: true, presence: true, limit: 10 }}
        showChannelSearch
        additionalChannelSearchProps={{
          searchForChannels: true,
          searchQueryParams: {
            channelFilters: {
              filters: { members: { $in: [user.id] } }
            }
          }
        }}
        Preview={ChannelPreviewCustom}
      />
    </div>
  )
}

export default ChatSidebar