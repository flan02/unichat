import { env } from "@/env";
import { clerkClient, SessionWebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text()
    const wh = new Webhook(env.CLERK_WEBHOOK_SECRET)
    try {
      wh.verify(rawBody, {
        "svix-id": req.headers.get("svix-id") || "",
        "svix-signature": req.headers.get("svix-signature") || "",
        "svix-timestamp": req.headers.get("svix-timestamp") || ""
      })
    } catch (error) {
      return NextResponse.json({
        error: "Invalid webhook signature",
      }, { status: 401 })
    }
    const event: SessionWebhookEvent = JSON.parse(rawBody)
    console.log("Clerk webhook body: ", event);
    if (event.type === "session.ended" || event.type === "session.revoked" || event.type === "session.removed") {
      const userId = event.data.user_id // * In this case remove the push subscription for this session
      const sessionId = event.data.id
      const user = await clerkClient.users.getUser(userId) // * We passed the userId of this event
      const userSubscriptions = user.privateMetadata.subscriptions || []
      const updatedSubsscriptions = userSubscriptions.filter((subscription) => subscription.sessionId !== sessionId)
      await clerkClient.users.updateUser(userId, {
        privateMetadata: {
          subscriptions: updatedSubsscriptions
        }
      })
    }

    return NextResponse.json({
      success: true
    }, { status: 200 })
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Internal server error",
    }, { status: 500 })
  }
}