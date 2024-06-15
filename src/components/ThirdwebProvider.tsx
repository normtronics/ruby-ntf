"use client";

import { ThirdwebProvider, coinbaseWallet, embeddedWallet, en, localWallet, metamaskWallet, walletConnect } from "@thirdweb-dev/react";

import type { FC } from "react";

console.log(process.env.NEXT_PUBLIC_CHAIN)

export const CustomThirdwebProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThirdwebProvider
      activeChain={process.env.NEXT_PUBLIC_CHAIN}
      authConfig={{
        domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string || '',
        authUrl: "/api/auth/"
      }}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      locale={en()}
      supportedWallets={[
        // metamaskWallet({ recommended: true }),
        // coinbaseWallet(),
        // walletConnect(),
        embeddedWallet({
          auth: {
            options: [
              "email",
              // "google",
              // "apple",
              // "facebook",
            ],
          },
        }),
      ]}
    >
      {children}
    </ThirdwebProvider>
  );
};