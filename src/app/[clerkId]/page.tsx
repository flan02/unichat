'use client'
import { useRouter } from "next/navigation"
import { useEffect } from "react"

type Props = {}

// ! This page is not used in the app, it's just a placeholder to show the loading state and redirect automatically by Clerk to the chat page

const ClerkId = (props: Props) => {
  const router = useRouter()
  useEffect(() => {
    router.push("/chat")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>...Loading chats...</div>
  )
}

export default ClerkId