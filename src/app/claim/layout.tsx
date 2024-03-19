import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers'

const title = 'The Rose Crib NFTs'
const description = 'The Rose Crib NFTs'

export const metadata: Metadata = {
  title,
  description,
  applicationName: "The Rose Crib NFTs",
  authors: [{
    name: 'The Rose Crib',
    url: 'https://nft.therosecrib.xyz/'
  }],
  keywords: 'music, nft, nfts',
  openGraph: {
    type: 'website',
    title,
    description,
    emails: ['info@therosecrib.com'],
    siteName: 'The Rose Crib NFTs',
    url: 'https://nft.therosecrib.xyz/',
    images: [{
      url: 'https://nft.therosecrib.xyz/bb10NFT.png',
      secureUrl: 'https://nft.therosecrib.xyz/bb10NFT.png',
      type: 'png',
    }],
    countryName: 'USA',
  },
  twitter: {
    card: 'summary',
    site: 'https://nft.therosecrib.xyz/',
    creator: 'The Rose Crib',
    description,
    title,
    images: [{
      url: 'https://nft.therosecrib.xyz/bb10NFT.png',
      secureUrl: 'https://nft.therosecrib.xyz/bb10NFT.png',
      type: 'png',
    }],
  },
  creator: 'The Rose Crib',
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
        </Providers>
      </body>
    </html>
  );
}