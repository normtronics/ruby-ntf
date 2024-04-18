
import Button from "../../components/Button";
import { MediaRenderer } from "../../components/MediaRenderer";
import prisma from "../../utils/prisma";
import styles from "../../styles/Claim.module.css";
import { Header } from "@/components/Header/Header";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";
import { CountdownTimer } from "@/components/count-down/count-down";
import { SimpleFooter } from "@/components/footer/footer";
import request, { gql, GraphQLClient } from "graphql-request";

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

interface NFT {
  id: string,
  description: string,
  image: string,
  slug: string,
  title: string,
  creator: string,
  atributes: { [key: string]: string }
}

async function getData(id: string) {
  console.log(process.env.NEXT_PUBLIC_HYGRAPH_URL, process.env.NEXT_PUBLIC_HYGRAPH_TOKEN)
  const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_URL || '', {
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
    },
  })

  const query = gql`
    query getNft($id: String!) {
      nft(where: {slug: $id}) {
        id
        description
        image
        slug
        title
        creator
        atributes
      }
    }
  `

  const variables = {
    id: "ruby-mountain-rebirth-two",
  }
  
  const data = await graphQLClient.request<{ nft: NFT }>(query, variables)

  return { nft: data.nft};
}

export default async function ClaimPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { nft } = await getData(searchParams.id)

  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = 1711727137973

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
 
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>{nft.title}</h1>
        <h2 className={styles.creator}>Created By Ruby Mountain</h2>
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
              <div className="date">April, 28th at 11:59 PM</div>
            </div>
            <Button id={searchParams.id} />
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
        {/* <NFTAccordion /> */}
      </div>
      <SimpleFooter />
    </>
  );
}