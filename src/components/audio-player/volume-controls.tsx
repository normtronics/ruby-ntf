import styles from './audio-player.module.css'

interface VolumeControlsProps {
  onVolumeChange: (e: any) => void
  volume: number
}

export const VolumeControls = (props: VolumeControlsProps) => {
  const { volume, onVolumeChange } = props
  return (
    <input
      className={styles.volumeControls}
      type="range"
      id="volume"
      name="volume"
      min="0.01"
      max="1"
      step=".025"
      onChange={onVolumeChange}
      defaultValue={volume}
      style={{
        margin: 16
      }}
    />
  )
}