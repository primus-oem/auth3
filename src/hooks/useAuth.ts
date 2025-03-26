'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useAccount, useSignMessage } from 'wagmi';
import { createSiweMessage } from '@/lib/siwe';

export function useAuth() {
  const { data: session } = useSession();
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const loginWithWallet = async () => {
    if (!address) return;

    const nonceRes = await fetch('/api/siwe/nonce');
    const nonce = await nonceRes.text();

    const message = createSiweMessage(
      address,
      'Sign in with Ethereum to auth3',
      nonce,
      window.location.host,
      window.location.origin
    );

    const signature = await signMessageAsync({
      message: message.prepareMessage(),
    });

    await fetch('/api/siwe/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, signature }),
    });

    window.location.reload();
  };

  const loginWithOAuth = (provider: 'google' | 'github' | 'twitter') => {
    signIn(provider);
  };

  return {
    user: session?.user ?? null,
    isAuthenticated: !!session,
    loginWithWallet,
    loginWithOAuth,
    logout: () => signOut(),
  };
}
