import { getCurrentPushSubscription, registerPushNotifications, unregisterPushNotifications } from "@/notifications/pushService"
import { Bell, BellOff, BellRing } from "lucide-react"
import { register } from "module"
import { useEffect, useState } from "react"


type Props = {}

const PushSubscriptionToggleButton = (props: Props) => {
  const [hasActivePushSubscription, setHasActivePushSubscription] = useState<boolean>(false)

  useEffect(() => {
    async function getActivePushSubscription() {
      const subscription = await getCurrentPushSubscription() // ? it uses a sw to retrieve the current subscription
      setHasActivePushSubscription(!!subscription) // (!!) is a way to cast a value to a boolean
    }
    getActivePushSubscription()
  }, [])

  async function setPushNotifictionsEnabled(enabled: boolean) {
    try {
      if (enabled) {
        await registerPushNotifications()
      } else {
        await unregisterPushNotifications()
      }
      setHasActivePushSubscription(enabled)
    } catch (error) {
      console.log(error);
      if (enabled && Notification.permission === "denied") {
        alert("Please enable push notifications in your browser settings")
      } else {
        alert("Something went wrong. Please try again later")
      }
    }
  }

  if (hasActivePushSubscription === undefined) return null

  return (
    <div>
      {
        hasActivePushSubscription ? (
          <span title="Disable push notifications on this device">
            <BellOff
              onClick={() => setPushNotifictionsEnabled(false)}
              className="cursor-pointer"
            />
          </span>
        ) : (
          <span title="Enable push notifications on this device">
            <BellRing
              onClick={() => setPushNotifictionsEnabled(true)}
              className="cursor-pointer"
            />
          </span>
        )
      }
    </div>
  )
}

export default PushSubscriptionToggleButton