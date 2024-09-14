import { UserResource } from "@clerk/types"
import { Bell, BellOff } from "lucide-react"
import { useChannelActionContext } from "stream-chat-react"

interface ChannelNotificationToggleButtonProps {
  user: UserResource
  channelId: string
}

const ChannelNotificationToggleButton = ({ user, channelId }: ChannelNotificationToggleButtonProps) => {
  // $ Changes that happens here affects only the client side environment that's why we use "unsafeMetadata" instead "privateMetadata" which previously we used in the Clerk User object in our backend.
  const { addNotification } = useChannelActionContext()
  const mutedChannels = user.unsafeMetadata.mutedChannels || []
  const channelMuted = mutedChannels.includes(channelId)

  async function setChannelMuted(channelId: string, muted: boolean) {
    try {
      // throw Error("Not implemented")
      let mutedChannelsUpdate: string[]
      if (muted) {
        mutedChannelsUpdate = [...mutedChannels, channelId]
      } else {
        mutedChannelsUpdate = mutedChannels.filter((id) => id !== channelId)
      }

      await user.update({ unsafeMetadata: { mutedChannels: mutedChannelsUpdate } })
      addNotification(
        `Channel notifications ${muted ? "muted" : "unmuted"}`,
        "success"
      )
    } catch (error) {
      console.error(error);
      addNotification(
        `Something went wrong. Please try again.`,
        "error"
      )
    }
  }
  return (
    <div className="me-6">
      {
        !channelMuted ? (
          <span title="Mute channel notifications">
            <BellOff className="cursor-pointer" onClick={() => setChannelMuted(channelId, true)} />
          </span>
        ) : (
          <span title="Unmute channel notifications">
            <Bell className="cursor-pointer" onClick={() => setChannelMuted(channelId, false)} />

          </span>
        )
      }

    </div>
  )
}

export default ChannelNotificationToggleButton