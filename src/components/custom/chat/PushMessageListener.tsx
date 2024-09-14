import { useEffect } from "react"
import { useChatContext } from "stream-chat-react"


type Props = {}

const PushMessageListener = (props: Props) => {
  const { client, setActiveChannel } = useChatContext()

  useEffect(() => {
    const messageListener = async (event: MessageEvent) => {
      console.log("Received message from server worket", event.data);
      const channelId = event.data.channelId
      if (channelId) {
        const channels = await client.queryChannels({ id: channelId }) // ? It returns a Promise
        if (channels.length > 0) {

          setActiveChannel(channels[0])
        } else {
          console.error(`PushMessageListener: A channel with id ${channelId} was not found`)
        }
      }
    }
    navigator.serviceWorker.addEventListener("message", messageListener)
    return () => {
      navigator.serviceWorker.removeEventListener("message", messageListener)
    }
  }, [client, setActiveChannel])
  return null
}

export default PushMessageListener