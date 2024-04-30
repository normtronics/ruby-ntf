import { AudioPlayer } from "@/components/audio-player/audio-player";
import { OnBoarding } from "@/components/onboarding/onboarding";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers'
import { Analytics } from "@vercel/analytics/react"

const title = 'Ruby Mountain NFTs'
const description = 'Ruby Mountain NFTs'

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Ruby Mountain NFTs",
  authors: [{
    name: 'Ruby Mountain',
    url: 'https://nft.rubymmountain.xyz/'
  }],
  keywords: 'music, nft, nfts',
  openGraph: {
    type: 'website',
    title,
    description,
    emails: ['info@therosecrib.com'],
    siteName: 'Ruby Mountain NFTs',
    url: 'https://nft.rubymountain.xyz/',
    images: [{
      url: 'https://nft.rubymountain.xyz/bb10NFT.png',
      secureUrl: 'https://nft.rubymountain.xyz/bb10NFT.png',
      type: 'png',
    }],
    countryName: 'USA',
  },
  twitter: {
    card: 'summary',
    site: 'https://nft.rubymountain.xyz/',
    creator: 'Ruby Mountain',
    description,
    title,
    images: [{
      url: 'https://nft.rubymountain.xyz/bb10NFT.png',
      secureUrl: 'https://nft.rubymountain.xyz/bb10NFT.png',
      type: 'png',
    }],
  },
  creator: 'Ruby Mountain',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          {/* <OnBoarding /> */}
          <AudioPlayer />
          <Analytics/>
        </Providers>
      </body>
    </html>
  );
}