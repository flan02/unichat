import { ChannelHeader, ChannelHeaderProps, useChannelStateContext } from "stream-chat-react"
import ChannelNotificationToggleButton from "./ChannelNotificationToggleButton"
import { useUser } from "@clerk/nextjs"


type Props = {}

const CustomChannelHeader = (props: ChannelHeaderProps) => {
  const { user } = useUser()
  const { channel: { id: channelId } } = useChannelStateContext()
  return (
    <div className="flex items-center justify-between gap-3 bg-white dark:bg-[#17191c]">
      <ChannelHeader {...props} />
      {
        user && channelId && <ChannelNotificationToggleButton user={user} channelId={channelId} />
      }
    </div>
  )
}

export default CustomChannelHeader