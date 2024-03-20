import Button from "../../components/Button";
import { MediaRenderer } from "../../components/MediaRenderer";
import prisma from "../../utils/prisma";
import styles from "../../styles/Claim.module.css";
import { Header } from "@/components/Header/Header";
import { Metadata, ResolvingMetadata } from "next";

const title = 'The Rose Crib NFTs'
const description = 'The Rose Crib NFTs'

const metadata: Metadata = {
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
    url: '',
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
      url: `https://nft.therosecrib.xyz/claim?id=${id}`,
      images: [{
        url: 'https://nft.therosecrib.xyz/bb10NFT.png',
        secureUrl: 'https://nft.therosecrib.xyz/bb10NFT.png',
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

  return (
    <div className={styles.container}>
      <Header />
      {nft.minted ? (
        <h1 className={styles.title}>NFT has already been claimed</h1>
      ) : (
        <h1 className={styles.title}>
          You&apos;ve discovered the<br />
          <span className={styles.blue}>&apos;{nft.name}&apos; NFT</span>.
        </h1>
      )}
      <div className={styles.nft}>
        <MediaRenderer
          src={nft.image}
          alt={nft.name}
          width="250px"
          height="250px"
        />
        <h2>{nft.name}</h2>
        <p>{nft.description}</p>
        {/* @ts-ignore */}
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

      <Button id={searchParams.id} />
      <br />
      <br />
      <p>Press &apos;connect wallet&apos; to sign-up and claim your digital collectable</p>

      {/* {!nft.minted && <Button id={searchParams.id} />} */}
    </div>
  );
}