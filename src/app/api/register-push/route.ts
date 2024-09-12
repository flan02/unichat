import { currentUser } from "@clerk/nextjs/server";
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
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }




  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to register push subscription" }, { status: 500 });
  }
}