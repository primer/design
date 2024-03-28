import React from 'react'
import {Box} from '@primer/react'

const KeyboardKey = ({children}: {children: React.ReactNode}) => {
  return (
    <Box
      as="kbd"
      backgroundColor="canvas.subtle"
      borderRadius={1}
      borderColor="border.default"
      borderWidth={1}
      borderStyle="solid"
      py={1}
      px={2}
    >
        {children}
    </Box>
  )
}

export default KeyboardKey
