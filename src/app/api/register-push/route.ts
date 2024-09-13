import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { PushSubscription } from "web-push";


export async function POST(req: Request) {
  try {
    const newSubscription: PushSubscription | undefined = await req.json();
    if (!newSubscription) {
      return NextResponse.json({ error: "Missing push subscription in body" }, { status: 400 });
    }
    console.log("Received push subscription to add:", newSubscription);

    // * Save the subscription in Clerk storage
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const userSubscriptions = user.privateMetadata.subscriptions || [];

    const updatedSubscriptions = userSubscriptions.filter((subscription) => subscription.endpoint !== newSubscription.endpoint); // this line avoid duplicates

    // updatedSubscriptions.push(newSubscription);
    updatedSubscriptions.push({ ...newSubscription, sessionId: user.id });

    await clerkClient.users.updateUser(user.id, {
      privateMetadata: {
        subscriptions: updatedSubscriptions
      }
    })

    return NextResponse.json({ success: "Push subscription registered" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to register push subscription" }, { status: 500 });
  }
}



export async function DELETE(req: Request) {
  try {
    const subscriptionToDelete: PushSubscription | undefined = await req.json();
    if (!subscriptionToDelete) {
      return NextResponse.json({ error: "Missing push subscription in body" }, { status: 400 });
    }
    console.log("Received push subscription to delete:", subscriptionToDelete);
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }
    const userSubscriptions = user.privateMetadata.subscriptions || [];
    const updatedSubscriptions = userSubscriptions.filter((subscription) => subscription.endpoint !== subscriptionToDelete.endpoint);
    await clerkClient.users.updateUser(user.id, {
      privateMetadata: {
        subscriptions: updatedSubscriptions
      }
    })
    return NextResponse.json({ success: "Push subscription deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to register push subscription" }, { status: 500 });
  }
}