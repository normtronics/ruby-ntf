import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

export type AudioPlayer = {
  currentTime: number,
  progress: number,
  url: string | null,
  isPlaying: boolean,
  image: string | null,
  artistName: string | null,
  songTitle: string | null,
  volume: number,
  repeated: boolean,
  shuffle: boolean,
  queue: string[],
  currentPlayIndex: number
}

interface AudioPlayerProps {
  audioPlayer: AudioPlayer,
  setCurrentTime: Dispatch<SetStateAction<number>>,
  setProgress: Dispatch<SetStateAction<number>>,
  setUrl: Dispatch<SetStateAction<string | null>>,
  setIsPlaying: Dispatch<SetStateAction<boolean>>,
  setImage: Dispatch<SetStateAction<string | null>>,
  setArtistName: Dispatch<SetStateAction<string | null>>,
  setSongTitle: Dispatch<SetStateAction<string | null>>,
  setVolume: Dispatch<SetStateAction<number>>,
  setIsRepeated: Dispatch<SetStateAction<boolean>>,
  setShuffle: Dispatch<SetStateAction<boolean>>,
  setQueue: Dispatch<SetStateAction<string[]>>,
  setCurrentPlayIndex: Dispatch<SetStateAction<number>>
}


export const AudioPlayerContext = createContext<AudioPlayerProps | null>(null);

export const AudioPlayerProvider = ({ children }: { children: React.ReactNode}) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [url, setUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [artistName, setArtistName] = useState<string | null>(null)
  const [songTitle, setSongTitle] = useState<string | null>(null)
  const [volume, setVolume] = useState(0.5)
  const [repeated, setIsRepeated] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [queue, setQueue] = useState<string[]>([])
  const [currentPlayIndex, setCurrentPlayIndex] = useState(0)

  const initAudioPlayer: AudioPlayer = {
    currentTime,
    progress,
    url,
    isPlaying,
    image,
    artistName,
    songTitle,
    volume,
    repeated,
    shuffle,
    queue,
    currentPlayIndex
  }
 
  return (
    <AudioPlayerContext.Provider value={{
      audioPlayer: initAudioPlayer,
      setCurrentTime,
      setProgress,
      setUrl,
      setIsPlaying,
      setImage,
      setArtistName,
      setSongTitle,
      setVolume,
      setIsRepeated,
      setShuffle,
      setQueue,
      setCurrentPlayIndex
    }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export const useAudioPlayerContext = () => {
  const audioPlayerContext = useContext(AudioPlayerContext);
  if (audioPlayerContext === null) {
    throw new Error('useAudioPlayerContext must be inside a AudioPlayerContext');
  }
  return audioPlayerContext
};
