import { Channel, ChannelHeader, ChannelList, Chat, LoadingIndicator, MessageInput, MessageList, Thread, Window } from "stream-chat-react"


interface ChatChannelProps {
  show: boolean
  hideChannelOnThread: boolean
}

const ChatChannel = ({ show, hideChannelOnThread }: ChatChannelProps) => {
  return (
    <div className={`w-full h-screen ${show ? "block" : "hidden"}`}>
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