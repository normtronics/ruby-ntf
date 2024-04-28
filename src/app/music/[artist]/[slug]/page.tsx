import styles from "../../../../styles/Claim.module.css";
import { Header } from "@/components/Header/Header";
import { Metadata, ResolvingMetadata } from "next";
import { MediaRenderer } from "../../../../components/MediaRenderer";
import React from "react";
import { SimpleFooter } from "@/components/footer/footer";
import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { getNft } from "@/queries/getNft";
import Button from "@/components/Button";
import { NftInfo } from "@/components/nft-info/nft-info";
import { Description } from "@/components/description/description";
import { Attributes } from "@/components/attribute-info/attribute-info";
import { useAudioPlayerContext } from "@/components/audio-player/audio-player-context";
import { BuyBox } from "@/components/buy-box/buy-box";


type Props = {
  params: { slug: string } 
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params
  const { nft } = await getData(slug)  
  return {
    title: nft.title,
    description: nft.description,
    applicationName: `${nft.creator.name} NFTs`,
    authors: [{
      name: nft.creator.name,
      url: `https://nft.rubymountain.xyz/${nft.creator.slug}/${slug}`
    }],
    keywords: 'music, nft, nfts',
    twitter: {
      card: 'summary',
      site: `https://nft.rubymountain.xyz/${nft.creator.slug}/${slug}`,
      creator: 'Ruby Mountain',
      description: nft.description,
      title: nft.title,
      images: [{
        url: nft.image,
        secureUrl: nft.image,
        type: 'png',
      }],
    },
    creator: nft.creator.name,
    openGraph: {
      type: 'website',
      title: nft.title,
      description: nft.description,
      emails: ['info@therosecrib.com'],
      siteName: 'The Rose Crib NFTs',
      url: `https://nft.rubymountain.xyz/${nft.creator.slug}/${slug}`,
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


  if(!nft) {
    return (
      <>
        Loading
      </>
    )
  }

  return (
    <>
      <Header />
      {nft && <div className={styles.container}>
        <img src={nft.image} alt={nft.title} className={styles.image}/>
        <NftInfo 
          name={nft.creator.name} 
          title={nft.title} 
          isMusic
          nft={nft}
        />
        <BuyBox 
          type={"fixed"} 
          nft={nft}
        />
        <Description description={nft.description}/>
        <div className={styles.nft}>
          <Attributes attributes={nft.atributes}/>
        </div>
      </div> }
      <SimpleFooter />
    </>
  );
}