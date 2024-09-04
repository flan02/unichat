import { ChannelList, ChannelPreview } from "stream-chat-react"
import Menubar from "./Menubar"
import { UserResource } from "@clerk/types"


interface ChatSidebarProps {
  user: UserResource
  show: boolean
}

const ChatSidebar = ({ user, show }: ChatSidebarProps) => {
  return (
    <div className={`w-full flex-col md:max-w-[300px] ${show ? "flex" : "hidden"}`}>
      <Menubar />
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

      />
    </div>
  )
}

export default ChatSidebar