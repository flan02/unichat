'use client'
import useInitializeChatClient from "@/hooks/useInitializeChatClient"
import { useUser } from "@clerk/nextjs"
import { StreamChat } from "stream-chat"
import { Channel, ChannelHeader, ChannelList, Chat, LoadingIndicator, MessageInput, MessageList, Thread, Window } from "stream-chat-react"

type Props = {}


const ChatPage = (props: Props) => {
  const chatClient = useInitializeChatClient()
  const { user } = useUser()

  if (!chatClient || !user) return (
    <div className="h-screen flex items-center justify-center">
      <LoadingIndicator size={40} />
    </div>
  )
  return (
    <section>
      <Chat client={chatClient} theme="messaging light">
        <ChannelList
          filters={{ type: "messaging", members: { $in: [user.id] } }}
          sort={{ last_message_at: -1 }}
          options={{ state: true, presence: true, limit: 10 }}
        />
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </section>
  )
}

export default ChatPage

/* 

<UserButton afterSignOutUrl="/" />
<Button as={SignOutButton} />

*/