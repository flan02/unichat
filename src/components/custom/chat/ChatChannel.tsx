import { Channel, ChannelHeader, ChannelList, Chat, LoadingIndicator, MessageInput, MessageList, Thread, Window } from "stream-chat-react"
import CustomChannelHeader from "./CustomChannelHeader"


interface ChatChannelProps {
  show: boolean
  hideChannelOnThread: boolean
}

const ChatChannel = ({ show, hideChannelOnThread }: ChatChannelProps) => {
  return (
    <div className={`w-full h-screen ${show ? "block" : "hidden"}`}>
      <Channel>
        <Window hideOnThread={hideChannelOnThread}>
          <CustomChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </div>
  )
}

export default ChatChannel