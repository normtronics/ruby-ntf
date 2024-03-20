import Button from "../../components/Button";
import { MediaRenderer } from "../../components/MediaRenderer";
import prisma from "../../utils/prisma";
import styles from "../../styles/Claim.module.css";
import { Header } from "@/components/Header/Header";
import Head from "next/head";


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

// eslint-disable-next-line @next/next/no-async-client-component
export default async function ClaimPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const nft = JSON.parse((await getData(searchParams.id)).nft);

  return (
    <div className={styles.container}>
      <Head>
        <title>The Rose Crib NFTs</title>
        <meta name="description" content="The Rose Crib NFTs" />

        <meta property="og:url" content="https://nft.therosecrib.xyz/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="The Rose Crib NFTs" />
        <meta property="og:description" content="The Rose Crib NFTs" />
        <meta property="og:image" content="https://nft.therosecrib.xyz/bb10NFT.png" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="nft.therosecrib.xyz" />
        <meta property="twitter:url" content="https://nft.therosecrib.xyz/" />
        <meta name="twitter:title" content="The Rose Crib NFTs" />
        <meta name="twitter:description" content="The Rose Crib NFTs" />
        <meta name="twitter:image" content="https://nft.therosecrib.xyz/bb10NFT.png" />
      </Head>
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
      <p>Press &apos;connect wallet&apos; to sign-up and claim your digital collectable</p>

      {/* {!nft.minted && <Button id={searchParams.id} />} */}
    </div>
  );
}