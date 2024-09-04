import { Channel, ChannelHeader, ChannelList, Chat, LoadingIndicator, MessageInput, MessageList, Thread, Window } from "stream-chat-react"
import Menubar from "@/components/custom/chat/Menubar"

interface ChatChannelProps {
  show: boolean
  hideChannelOnThread: boolean
}

const ChatChannel = ({ show, hideChannelOnThread }: ChatChannelProps) => {
  return (
    <div className={`size-full ${show ? "block" : "hidden"}`}>
      <Channel>
        <Window hideOnThread={hideChannelOnThread}>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </div>
  )
}

export default ChatChannel