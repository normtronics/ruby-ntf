import { NextIcon, PauseIcon, PlayIconAudio, PrevIcon } from "../common/icons/icons"
import styles from './audio-player.module.css'

interface PlayControlsProps {
  isPlaying: boolean
  onPlayClick: () => void
  onNext: () => void
  onPrevious: () => void
}

export const PlayControls = (props:  PlayControlsProps) => {
  const { onPlayClick, isPlaying, onNext, onPrevious } = props
  return (
    <>
      <button 
        onClick={() => onPrevious()} 
        className={`${styles.iconButton}`}
      >
        <img src='/icons/rewind-back.svg' alt="rewind-back" className={styles.icon}/>
      </button>

      <button
        className={styles.iconButton}
        onClick={onPlayClick}
      >
        {!isPlaying ? 
          <img src='/icons/play.svg' alt="play" className={styles.icon}/> : <img src='/icons/pause.svg' alt="pause" className={styles.icon}/>
        }
      </button>
      <button 
        onClick={() => onNext()} 
        className={styles.iconButton}
      >
        <img src='/icons/rewind-forward.svg' alt="rewind-forward" className={styles.icon}/>
      </button>
    </>
  )
}