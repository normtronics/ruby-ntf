'use client'

import { useAudioPlayerContext } from '../audio-player/audio-player-context'
import styles from './nft-info.module.css'
import { useCallback } from 'react';
import { NFT } from '@/types/nft';

interface NftINfoProps {
  title: string
  name: string
  isMusic: boolean
  nft: NFT
}

export const NftInfo = (props: NftINfoProps) => {
  const {
    audioPlayer,
    setIsPlaying,
    setImage,
    setArtistName,
    setSongTitle,
    setUrl,
    setIsActive
  } = useAudioPlayerContext()

  const playClicked = useCallback(() => {
    setImage(props.nft.image)
    setArtistName(props.nft.creator.name)
    setSongTitle(props.nft.songs[0].title)
    setUrl(props.nft.songs[0].url)
    setIsPlaying(true)
    setIsActive(true)
  }, [])

  const pauseClicked = useCallback(() => {
    setIsPlaying(false)
  }, [])

  return (
    <div className={styles.info}>
      {props.isMusic ? <div>
        {!audioPlayer.isPlaying ? 
          <img 
            src='/icons/play.svg' 
            alt="play" 
            className={styles.icon}
            onClick={playClicked}
          /> : 
          <img 
            src='/icons/pause.svg' 
            alt="pause" 
            className={styles.icon}
            onClick={pauseClicked}
          />
        }
      </div> : null }
      <div className={styles.infoTitle}>
        <h1 className={styles.title}>{props.title}</h1>
        <a href={`/creator/${props.name}`}>
          <h2 className={styles.creator}>{props.name}</h2>
        </a>
      </div>
    </div>
  )
}