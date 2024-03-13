"use client";

import { ThirdwebProvider, coinbaseWallet, embeddedWallet, en, localWallet, metamaskWallet, walletConnect } from "@thirdweb-dev/react";

import type { FC } from "react";

console.log(process.env.NEXT_PUBLIC_CHAIN)

export const CustomThirdwebProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThirdwebProvider
      activeChain={process.env.NEXT_PUBLIC_CHAIN}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      locale={en()}
      supportedWallets={[
        metamaskWallet({ recommended: true }),
        coinbaseWallet(),
        walletConnect(),
        localWallet(),
        embeddedWallet({
          auth: {
            options: [
              "email",
              "google",
              "apple",
              "facebook",
            ],
          },
        }),
      ]}
    >
      {children}
    </ThirdwebProvider>
  );
};