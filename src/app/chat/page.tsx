'use client'
import ChatChannel from "@/components/custom/chat/ChatChannel"
import ChatSidebar from "@/components/custom/chat/ChatSidebar"
import useInitializeChatClient from "@/app/chat/useInitializeChatClient"
import { useUser } from "@clerk/nextjs"
import { Menu, X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { Chat, LoadingIndicator, Streami18n } from "stream-chat-react"
import useWindowSize from "@/hooks/useWindowSize"
import { mdBreakpoint } from "@/utils/tailwind"
import { useTheme } from "../ThemeProvider"
import { registerServiceWorker } from "@/utils/serviceWorker"

const i18Instance = new Streami18n({ language: "en" })

type Props = {}


const ChatPage = (props: Props) => {
  const chatClient = useInitializeChatClient()
  const { user } = useUser()
  const { theme } = useTheme()
  const [chatSidebarOpen, setChatSidebarOpen] = useState<boolean>(true)
  const windowSize = useWindowSize()
  const isLargeScreen = windowSize.width >= mdBreakpoint

  useEffect(() => {
    if (windowSize.width >= mdBreakpoint) setChatSidebarOpen(false)

  }, [windowSize.width])

  // ? This handle wraps the change of the chatSidebarOpen state avoiding unnecessary re-renders when its value changes too often.
  const handleSidebarOnClose = useCallback(() => {
    setChatSidebarOpen(false)
  }, [])

  useEffect(() => {
    async function setUpServiceWorker() {
      try {
        await registerServiceWorker()
      } catch (error) {
        console.error(error)
      }
    }
    setUpServiceWorker()
  }, [])

  if (!chatClient || !user) return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-black w-full">
      <LoadingIndicator size={40} />
    </div>
  )


  return (
    <section className="border border-slate-200 bg-gray-100 text-black dark:bg-black dark:text-white h-screen min-w-full sm:min-w-full">
      <div className="">

        <Chat client={chatClient} i18nInstance={i18Instance} theme={theme === 'dark' ? "str-chat__theme-dark" : "str-chat__theme-light"}>
          <div className="flex justify-center border-b border-b-[#dbdde1] p-3 md:hidden">
            <button onClick={() => { setChatSidebarOpen(!chatSidebarOpen) }}>
              {!chatSidebarOpen ? (
                <span className="flex items-center gap-1">
                  <Menu />
                </span>
              ) : (
                <X />
              )}
            </button>
          </div>
          <div className={`flex h-full overflow-y-auto`}>
            <ChatSidebar user={user} show={isLargeScreen || chatSidebarOpen} onClose={handleSidebarOnClose} />
            <ChatChannel show={isLargeScreen || !chatSidebarOpen} hideChannelOnThread={!isLargeScreen} />
          </div>
        </Chat>

      </div>
    </section>
  )
}

export default ChatPage

/* 

<UserButton afterSignOutUrl="/" />
<Button as={SignOutButton} />

*/