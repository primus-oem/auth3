"use client";

import { useAuth } from "@/hooks/useAuth";

export function OAuthButtons() {
  const { loginWithOAuth } = useAuth();

  return (
    <div className="flex flex-col gap-2">
      <button onClick={() => loginWithOAuth("google")} className="btn">
        Login with Google
      </button>
      <button onClick={() => loginWithOAuth("github")} className="btn">
        Login with GitHub
      </button>
      <button onClick={() => loginWithOAuth("twitter")} className="btn">
        Login with X
      </button>
    </div>
  );
}
