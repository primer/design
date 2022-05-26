import React from 'react'
import {Box} from '@primer/components'
import {ColumnsIcon, PlayIcon} from '@primer/octicons-react'

const CustomVideoPlayer = (props: React.HTMLProps<HTMLVideoElement>) => {
  const videoElement = React.useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = React.useState<boolean>(props.autoPlay)

  const playVideo = () => {
    videoElement.current.play()
    setIsPlaying(true)
  }

  const pauseVideo = () => {
    videoElement.current.pause()
    setIsPlaying(false)
  }

  return (
    <Box
      position="relative"
      sx={{
        ':hover button': {
          opacity: 1,
        },
      }}
    >
      {/* component users would be able to pass their own <track> children */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video {...props} ref={videoElement} />
      {!props.controls && (
        <Box
          as="button"
          position="absolute"
          sx={{
            backgroundColor: 'rgba(0,0,0,0.55)',
            border: 'none',
            cursor: 'pointer',
            inset: '0px',
            opacity: isPlaying ? 0 : 1,
          }}
          onClick={isPlaying ? pauseVideo : playVideo}
        >
          {isPlaying ? (
            <ColumnsIcon aria-label="Pause" size={40} fill="white" />
          ) : (
            <PlayIcon aria-label="Play" size={50} fill="white" />
          )}
        </Box>
      )}
    </Box>
  )
}

export default CustomVideoPlayer
