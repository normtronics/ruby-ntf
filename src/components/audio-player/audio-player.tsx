'use client'

import { useMediaQuery } from '@/app/hooks/use-media-query';
import { useEffect, useRef, useState } from 'react';
import { CrossLineIcon, RepeatIcon } from '../common/icons/icons';
import { useAudioPlayerContext } from './audio-player-context';
import { CurrentlyPlaying } from './current-playing';
import { PlayControls } from './play-controls';
import { VolumeControls } from './volume-controls';
import styles from './audio-player.module.css'

interface AudioPlayerParams {
  displayControls?: boolean
}

export const AudioPlayer = (props: AudioPlayerParams) => {
  const { displayControls = true } = props
  const {
    audioPlayer,
    setVolume,
    setCurrentTime,
    setProgress,
    setIsPlaying,
    setImage,
    setArtistName,
    setSongTitle,
    setIsRepeated,
    setShuffle,
    setQueue,
    setCurrentPlayIndex,
    setUrl
  } = useAudioPlayerContext()

  const file = 'https://www2.cs.uic.edu/~i101/SoundFiles/Fanfare60.wav'


  const ref = useRef<HTMLAudioElement>(null)
  const rangeRef = useRef<HTMLInputElement>(null)
  const isMobile = useMediaQuery(650)

  const [duration, setDuration] = useState(9)

  useEffect(() => {
    //@ts-ignore
    ref.current.src = file
  }, [])

  const onVolumeChange = (e: any) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      if(ref.current) {
        ref.current.volume = (newVolume || 1)
      }
    }
  }

  const onPlayClick = () => {
    console.log('play', ref)
    if(ref.current) {
      if(audioPlayer.isPlaying){
        ref.current.pause()
        setIsPlaying(false)
      }else {
        ref.current.play()
        setIsPlaying(true)
      }
    }
  }

  useEffect(() => {
    if(ref.current) {
       if(!audioPlayer.isPlaying){
         ref.current.pause()
       }else {
         ref.current.play()
       }
     }
   }, [audioPlayer.isPlaying])

  //  useEffect(() => {
  //   if(ref.current) {
  //     if(queue[currentIndex] && queue[currentIndex].url) {
  //       const image = queue[currentIndex].coverImage
  //       ref.current.src = queue[currentIndex].url
  //       updateSongTitle(queue[currentIndex].title)
  //       if(image) updateImageUrl(image)
  //       updateArtistsName(queue[currentIndex].artistName)
  //       ref.current.load()
  //       ref.current.play()
  //     }
  //   }
  // }, [currentIndex, queue])

  const next = (index?: number) => {
    if(index && index !== audioPlayer.queue.length - 1) {
      setCurrentPlayIndex(index)
      return
    }

    if(audioPlayer.currentPlayIndex !== audioPlayer.queue.length - 1) {
      setCurrentPlayIndex(audioPlayer.currentPlayIndex + 1)
    }
  }

  const previous = () => {
    if(rangeRef.current && ref.current){
      if(ref.current.currentTime > 10 && ref.current && rangeRef.current){
        rangeRef.current.value = '0'
        ref.current.currentTime = 0
        return
      }

      if(audioPlayer.currentPlayIndex <= audioPlayer.queue.length - 1) {
        setCurrentPlayIndex(audioPlayer.currentPlayIndex - 1)
      }
    }
  }

  const handleShuffle = () => {
    if(ref.current) {
      if(audioPlayer.shuffle) {
        setShuffle(false)
      } else {
        setShuffle(true)
      }
    }
  }

  const handleRepeat = () => {
    if(ref.current) {
      if(audioPlayer.repeated) {
        ref.current.loop = false
        setIsRepeated(false)
      }else {
        ref.current.loop = true
        setIsRepeated(true)
      }
    }
  }

  useEffect(() => {
    if (!ref.current) return

    setCurrentTime(0)
    ref.current.addEventListener('timeupdate', () => {
      if(ref.current && rangeRef.current){
        const currentTime = ref.current.currentTime;
        const progress = ref.current.currentTime / ref.current.duration * 1000;
        setCurrentTime(currentTime)
        setProgress(progress)

        rangeRef.current.value = `${ref.current.currentTime}`
      }
    })

    ref.current.addEventListener('loadedmetadata', () => {
      if(rangeRef.current){
        rangeRef.current.max = `${ref.current?.duration}`
        console.log('ref.current?.duration', ref.current?.duration)
        setDuration(ref.current?.duration || 0)
      } 
    })

    ref.current.addEventListener("loadeddata", () => {
      setProgress(0)
    })

    ref.current.addEventListener("ended", () => {
      setIsPlaying(false)
      if(audioPlayer.shuffle) {
        const ran = Math.floor(Math.random() * audioPlayer.queue.length - 1) + 1
        next(ran)
      } else {
        next()
      }
      
    })
  }, [])

  return (
    <div className={styles.audioPlayer}>
      <div className={styles.container}>
        <div className={styles.songTrack}>
          <input 
            ref={rangeRef} 
            type="range" 
            min={0}
            max={0} 
            onChange={(e) => {
              if(ref.current && rangeRef.current) {
                ref.current.currentTime = parseInt(rangeRef.current.value)
              }
            }}
            className={styles.track}
          /> 
        </div>
        <div className={styles.playTime}>
          {new Date(audioPlayer.currentTime * 1000).toISOString().substring(14, 19)}
        </div>
        <div className={styles.inner}>
          <PlayControls 
            isPlaying={audioPlayer.isPlaying}
            onPlayClick={onPlayClick}
            onNext={next}
            onPrevious={previous}
          /> 
          <div className={styles.bar}></div>
          <button 
            onClick={handleShuffle} 
            className={styles.iconButton}
          >
            <img src='/icons/shuffle.svg' alt="shuffle" className={styles.icon}/>
          </button>
          <div className={styles.bar}></div>
          <CurrentlyPlaying
            image={'https://f4.bcbits.com/img/a3062479360_16.jpg'}
            songTitle={audioPlayer.songTitle || 'Eclipse'}
            artist={audioPlayer.artistName || 'Ruby Mountain'}
          />
          <div className={styles.bar}></div>
          <span 
            onClick={handleRepeat} 
            className={styles.iconButton}
          >
            <img src='/icons/loop.svg' alt="loop" className={styles.icon}/>
          </span>
          <div className={styles.bar}></div>
          <VolumeControls 
            onVolumeChange={onVolumeChange}
            volume={audioPlayer.volume}
          /> 
          <div className={styles.bar}></div>
        </div>
        <div className={styles.playTimeEnd}>
          {rangeRef.current && new Date(duration * 1000).toISOString().substring(14, 19)}
        </div>
        <audio ref={ref}>
          <source />
        </audio>
      </div>
    </div>
  )
}