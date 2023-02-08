import {Box} from '@primer/react'
import React from 'react'

export default function IconViewer({children}) {
  const [zoom, setZoom] = React.useState(10)

  return (
    <Box position={"relative"}>
      <Box borderColor="border.default" borderWidth={1} borderStyle="solid" borderRadius={6} css={{overflow: 'hidden'}}>
        <Box display={"flex"}
          justifyContent="center"
          alignItems="center"
          height={400}
          sx={{
            backgroundImage: theme =>
              `${gridGradient(0, getGridSize(zoom), theme.colors.border.subtle)}, ${gridGradient(
                90,
                getGridSize(zoom),
                theme.colors.border.subtle
              )}`,
            backgroundSize: `${getGridSize(zoom)}px ${getGridSize(zoom)}px`,
            backgroundPosition: 'center center'
          }}
        >
          <Box display={"flex"}
            sx={{
              transform: `scale(${zoom})`,
              boxShadow: theme => `0 0 0 ${1 / zoom}px ${theme.colors.accent.emphasis}`
            }}
          >
            {children}
          </Box>
          <Box position={"absolute"} left={0} right={0} bottom={0}>
            <Box display={"grid"}
              gridGap={2}
              gridTemplateColumns="1fr 48px"
              justifyItems="start"
              alignItems="center"
              width={['100%', '240px']}
              p={3}
            >
              <input
                type="range"
                aria-label="zoom"
                name="zoom"
                min="1"
                max="24"
                step="0.5"
                value={zoom}
                onChange={event => setZoom(parseFloat(event.target.value))}
                css={{width: '100%', padding: 0, margin: 0}}
              />
              <Box display={"inline-flex"} as="span" flexShrink={0}>
                {zoom * 100}%
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function gridGradient(angle, size, color) {
  // WebKit browsers do not support the "transparent" keyword in gradients.
  // As a workaround, we convert `color` to rgba with an alpha value of 0.
  const transparent = 'rgba(255,255,255,0)'
  return `linear-gradient(${angle}deg, ${transparent}, ${transparent} ${Math.floor(
    size / 2
  )}px, ${color}, ${transparent} ${Math.floor(size / 2) + 1}px)`
}

function getGridSize(zoom) {
  if (zoom > 8) {
    return zoom
  }

  if (zoom > 4) {
    return zoom * 2
  }

  if (zoom > 2) {
    return zoom * 6
  }

  return zoom * 12
}
