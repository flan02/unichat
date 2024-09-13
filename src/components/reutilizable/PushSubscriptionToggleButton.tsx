import { getCurrentPushSubscription, registerPushNotifications, unregisterPushNotifications } from "@/notifications/pushService"
import { BellOff, BellRing } from "lucide-react"

import { useEffect, useState } from "react"
import { LoadingIndicator } from "stream-chat-react"
import DisappearingMessage from "./DisappearingMessage"


type Props = {}

const PushSubscriptionToggleButton = (props: Props) => {
  const [hasActivePushSubscription, setHasActivePushSubscription] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [confirmationMessage, setConfirmationMessage] = useState<string>() // initialized as undefined

  useEffect(() => {
    async function getActivePushSubscription() {
      const subscription = await getCurrentPushSubscription() // ? it uses a sw to retrieve the current subscription
      setHasActivePushSubscription(!!subscription) // (!!) is a way to cast a value to a boolean
    }
    getActivePushSubscription()
  }, [])

  async function setPushNotificationsEnabled(enabled: boolean) {
    if (loading) return
    setLoading(true)
    setConfirmationMessage(undefined)
    try {
      if (enabled) {
        await registerPushNotifications()
      } else {
        await unregisterPushNotifications()
      }
      setConfirmationMessage("Push notifications" + (enabled ? " enabled" : " disabled"))

      setHasActivePushSubscription(enabled)
    } catch (error) {
      console.log(error);
      if (enabled && Notification.permission === "denied") {
        alert("Please enable push notifications in your browser settings")
      } else {
        alert("Something went wrong. Please try again later")
      }
    } finally {
      setLoading(false)
    }
  }

  if (hasActivePushSubscription === undefined) return null

  return (
    <div className="relative">
      {
        loading && (
          <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <LoadingIndicator />
          </span>
        )
      }
      {
        confirmationMessage && (
          <DisappearingMessage duration={5000} className="absolute left-1/2 top-8 z-10 -translate-x-1/2 rounded-lg bg-white dark:bg-black px-2 py-1 shadow-md">
            {confirmationMessage}
          </DisappearingMessage>
        )
      }
      {
        hasActivePushSubscription ? (
          <span title="Disable push notifications on this device">
            <BellOff
              onClick={() => setPushNotificationsEnabled(false)}
              className={`cursor-pointer ${loading ? "opacity-10" : ""}`}
            />
          </span>
        ) : (
          <span title="Enable push notifications on this device">
            <BellRing
              onClick={() => setPushNotificationsEnabled(true)}
              className={`cursor-pointer ${loading ? "opacity-10" : ""}`}
            />
          </span>
        )
      }
    </div>
  )
}

export default PushSubscriptionToggleButton