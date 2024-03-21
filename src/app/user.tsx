'use client';
import { useUser } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';
export default function GetLoggedInUser() {
  const { isLoaded, isSignedIn, user } = useUser();

  const { userId, sessionId, getToken } = useAuth();

  if (!userId) {
    return null;
  }

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div>
      <div>Hello, {user.firstName} welcome to Clerk</div>
      <div>
        Hello, {userId} your current active session is {sessionId}
      </div>
    </div>
  );
}