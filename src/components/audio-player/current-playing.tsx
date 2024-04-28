import Image from "next/image";
import styles from './audio-player.module.css'

interface CurrentlyPlayingProps {
  image: string
  songTitle: string
  artist: string
}

export const CurrentlyPlaying = (props: CurrentlyPlayingProps) => {
  const { image, songTitle, artist } = props
  console.log(props)
  return (
    <div className={styles.currentlyPlaying}>
      {(image && songTitle && artist) ? (
        <>
          <img
            src={image}
            alt={`${songTitle}-${artist}`}
            className={styles.image}
          />
          <div className={styles.artistInfo}>
            <span className={styles.artistName}>{songTitle}</span>
            <span className={styles.artistName}>{artist}</span>
          </div>
        </>
      ) : null}
    </div>
  )
}