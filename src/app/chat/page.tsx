'use client'
import Button from "@/components/reutilizable/Button"
import { SignOutButton, UserButton } from "@clerk/nextjs"
import { StreamChat } from "stream-chat"
import { Channel, ChannelHeader, Chat, MessageInput, MessageList, Thread, Window } from "stream-chat-react"

type Props = {}

const clerkId = "user_2lRTKaEVMp2xgV8vFaKXi0kJg1m"
const chatClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_KEY!
)

chatClient.connectUser(
  {
    id: clerkId,
    name: "flan02"
  },
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl8ybFJUS2FFVk1wMnhnVjh2RmFLWGkwa0pnMW0ifQ.NFtSs8OwPqVt7Ly0FNzAHk8Ki399XC4XlTmMrJr2NuI"
)

const channel = chatClient.channel("messaging", "channel_1", {
  name: "Channel #1",
  members: [clerkId]
})

const ChatPage = (props: Props) => {
  return (
    <section>
      <Chat client={chatClient} theme="messaging light">
        <Channel channel={channel}>
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