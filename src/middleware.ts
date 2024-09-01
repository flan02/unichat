import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/chat(.*)'])

export default clerkMiddleware((auth, request) => {
  if (isPublicRoute(request)) {
    auth().protect()
  }
});

