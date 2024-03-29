
import Button from "../../components/Button";
import { MediaRenderer } from "../../components/MediaRenderer";
import prisma from "../../utils/prisma";
import styles from "../../styles/Claim.module.css";
import { Header } from "@/components/Header/Header";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";
import { CountdownTimer } from "@/components/count-down/count-down";
import { SimpleFooter } from "@/components/footer/footer";

const title = 'Ruby Mountain NFTs'
const description = 'Ruby Mountain NFTs'

const metadata: Metadata = {
  title,
  description,
  applicationName: "Ruby Mountain NFTs",
  authors: [{
    name: 'Ruby Mountain',
    url: 'https://nft.rubymountain.xyz/'
  }],
  keywords: 'music, nft, nfts',
  openGraph: {
    type: 'website',
    title,
    description,
    emails: ['info@therosecrib.com'],
    siteName: 'Ruby Mountain NFTs',
    url: '',
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
}

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = searchParams.id
 
  return {
    ...metadata,
    openGraph: {
      type: 'website',
      title,
      description,
      emails: ['info@therosecrib.com'],
      siteName: 'The Rose Crib NFTs',
      url: `https://nft.rubymountain.xyz/claim?id=${id}`,
      images: [{
        url: 'https://nft.rubymountain.xyz/bb10NFT.png',
        secureUrl: 'https://nft.rubymountain.xyz/bb10NFT.png',
        type: 'png',
      }],
      countryName: 'USA',
      },
  }
}

async function getData(id: string) {
  const nft = await prisma.nFT.findUnique({
    where: {
      id,
    },
  });

  if (!nft) {
    throw new Error("NFT does not exist");
  }

  return { nft: JSON.stringify(nft) };
}

export default async function ClaimPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const nft = JSON.parse((await getData(searchParams.id)).nft);

  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = 1711727137973

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
 
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>{nft.name}</h1>
        <h2 className={styles.creator}>Created By Ruby Mountain</h2>
        {/* <CountdownTimer targetDate={dateTimeAfterThreeDays} /> */}
        <MediaRenderer
          src={nft.image}
          alt={nft.name}
          width="356px"
          height="356px"
          className={styles.image}
        />
        <div className={styles.nft}>
          <Button id={searchParams.id} />
          <p className="disclaimer">Press <i>&quot;Connect Wallet&quot;</i> to sign-up and claim your digital collectable</p>

          <br />
          <h2>Description</h2>
          <p className="description">{nft.description}</p>

          {/* @ts-ignore */}
          <br />
          <h2>Traits</h2>
          <div className={styles.attributes}>
            {Object.keys(nft.attributes).map((key) => (
              <div key={key} className={styles.attribute}>
                <p className={styles.attributeKey}>{key}</p>
                <p className={styles.attributeValue}>
                  {/* @ts-ignore */}
                  {nft.attributes[key]}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* <NFTAccordion /> */}
      </div>
      <SimpleFooter />
    </>
  );
}