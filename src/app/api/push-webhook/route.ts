import { NextResponse } from "next/server";
import { iStreamPushEvent } from "./iStreamPushEvent";
import { clerkClient } from "@clerk/nextjs/server";
import webPush, { WebPushError } from "web-push";
import { env } from "@/env";
import { StreamChat } from "stream-chat";

export async function POST(req: Request) {
  try {
    const streamClient = StreamChat.getInstance(env.NEXT_PUBLIC_STREAM_KEY, env.STREAM_SECRET)
    const rawBody = await req.text()
    const validRequest = streamClient.verifyWebhook(rawBody, req.headers.get('x-signature') || '')
    if (!validRequest) {
      return NextResponse.json({ error: "Webhook signature invalid" }, { status: 401 });
    }
    //const event: iStreamPushEvent = await req.json()
    const event: iStreamPushEvent = JSON.parse(rawBody)

    console.log('Push webhook body: ', JSON.stringify(event)) // ? need data as string to destructurize object nested in body
    const sender = event.user
    const recipientIds = event.channel.members
      .map((member) => member.user_id)
      .filter((id) => id !== event.user.id)
    const channelId = event.channel.id


    const recipients = (
      await clerkClient.users.getUserList({
        userId: recipientIds,
      })).data.filter((user: any) => !user.unsafeMetadata.mutedChannels?.includes(channelId))


    const pushPromises = recipients
      .map((recipient: any) => {
        const subscriptions = recipient.privateMetadata.subscriptions || []
        return subscriptions.map((subscription: any) => {
          webPush.sendNotification(subscription, JSON.stringify({
            title: `New message from ${sender.name}`,
            body: event.message.text,
            icon: sender.image,
            image: event.message.attachments[0]?.image_url || event.message.attachments[0]?.thumb_url,
            data: { channelId, },
          }),
            {
              vapidDetails: {
                subject: "mailto:chanivetdan@hotmail.com",
                publicKey: env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
                privateKey: env.WEB_PUSH_PRIVATE_KEY,
              }
            }).catch((error) => {
              console.error('Error sending push notification: ', error)
              if (error instanceof WebPushError && error.statusCode === 410) {
                console.log('Push subscription expired, deleting...')
                clerkClient.users.updateUser(recipient.id, {
                  privateMetadata: {
                    subscriptions: recipient.privateMetadata.subscriptions?.filter((sub: { endpoint: any; }) => sub.endpoint !== subscription.endpoint)
                  }
                })
              }
            })
        })
      })
      .flat() // ? flat() is used to flatten the array of promises

    await Promise.all(pushPromises)
    return NextResponse.json({
      success: true,
      status: 200,
    })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "There was an error" }, { status: 500 });
  }
}