'use client'

import { NFT } from "@/types/nft"
import Link from "next/link"
import styles from './card.module.css'
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';


interface CardProps {
  nft: NFT
}

export const Card = (props: CardProps) => {
  const router = useRouter()
  const {
    nft
  } = props

  const goToArtistPage = useCallback(() => {
    router.push(`/artist/${nft.creator.slug}`)
  }, [])

  return (
    <a
      href={`/${nft.nftype}/${nft.creator.slug}/${nft.slug}`}
    >
      <div className={`${styles.square} ${styles.fullImg}`}>
        <img src={nft.image} />
        <div className={styles.nftInfo}>
          <div className={styles.topInfo}>
            <span>
              <h2>{nft.title}</h2>
            </span>
          </div>
          <span className={styles.artist} onClick={goToArtistPage}>
            <div>{nft.creator.name}</div>
          </span>
        </div>
      </div>
    </a>
  )
}