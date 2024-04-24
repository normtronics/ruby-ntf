import styles from "../../../../styles/Claim.module.css";
import { Header } from "@/components/Header/Header";
import { Metadata, ResolvingMetadata } from "next";
import { MediaRenderer } from "../../../../components/MediaRenderer";
import React from "react";
import { SimpleFooter } from "@/components/footer/footer";
import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { getNft } from "@/queries/getNft";
import Button from "@/components/Button";


type Props = {
  params: { slug: string } 
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params
  const { nft } = await getData(slug)  
  // const image = nft.image.replace("ipfs://", "https://ipfs.io/ipfs/")
  return {
    title: nft.title,
    description: nft.description,
    applicationName: "Ruby Mountain NFTs",
    authors: [{
      name: 'Ruby Mountain',
      url: 'https://nft.rubymountain.xyz/'
    }],
    keywords: 'music, nft, nfts',
    twitter: {
      card: 'summary',
      site: 'https://nft.rubymountain.xyz/',
      creator: 'Ruby Mountain',
      description: nft.description,
      title: nft.title,
      images: [{
        url: nft.image,
        secureUrl: nft.image,
        type: 'png',
      }],
    },
    creator: 'Ruby Mountain',
    openGraph: {
      type: 'website',
      title: nft.title,
      description: nft.description,
      emails: ['info@therosecrib.com'],
      siteName: 'The Rose Crib NFTs',
      url: `https://nft.rubymountain.xyz/${slug}`,
      images: [{
        url: nft.image,
        secureUrl: nft.image,
      }],
      countryName: 'USA',
    },
  }
}

async function getData(slug: string) {
  const data = await getNft(slug)

  return { nft: data.nft};
}

const checkExpired = (date: string) => {
  const today = new Date() 
  const end = new Date(date)
  return today > end
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { nft } = await getData(slug)
  const endDate = new Date(nft.end).toLocaleString("en-US", {
    timeZone: "America/Los_Angeles"
  })


  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>{nft.title}</h1>
        <a href={`/creator/${nft.creator.name}`}>
          <h2 className={styles.creator}>{nft.creator.name}</h2>
        </a>
        <MediaRenderer
          src={nft.image}
          alt={nft.title}
          width="100%"
          height="356px"
          className={styles.image}
        />
        <div className={styles.nft}>
          <div className="claimSection">
            <div className="countdown">
              Give away closes on
              <div className="date">{endDate} PST</div>
            </div>
            <Button nft={nft} />
            <p className="disclaimer">Press <i>&quot;Connect Wallet&quot;</i> to sign-up with email or crypto wallet and claim your digital collectable</p>
          </div>

          <br />
          <h2>Description</h2>
          <p className="description">
            {nft.description}
          </p>

          {/* @ts-ignore */}
          <br />
          <h2>Traits</h2>
          <div className={styles.attributes}>
            {Object.keys(nft.atributes).map((key) => (
              <div key={key} className={styles.attribute}>
                <p className={styles.attributeKey}>{key}</p>
                <p className={styles.attributeValue}>
                  {/* @ts-ignore */}
                  {nft.atributes[key]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SimpleFooter />
    </>
  );
}