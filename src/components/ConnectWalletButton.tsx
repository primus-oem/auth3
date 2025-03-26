"use client";

import { useAuth } from "@/hooks/useAuth";

export function ConnectWalletButton() {
  const { isAuthenticated, user, loginWithWallet, logout } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <span>{user?.name}</span>
        <button className="text-sm text-red-500" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <button onClick={loginWithWallet} className="px-4 py-2 bg-black text-white rounded">
      Connect Wallet
    </button>
  );
}
