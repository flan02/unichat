import { PushSubscription } from "web-push";
// TODO - Extend the type of this Clerk User object to include the new metadata
declare global {
  interface UserPrivateMetadata {
    subscriptions: (PushSubscription & { sessionId: string })[] | undefined;
  }

  interface UserUnsafeMetadata {
    mutedChannels: string[] | undefined;
  }
}