import {CircleBadge, Box} from '@primer/react'
import React from 'react'

export default function UIExamples24({icon: Icon}) {
  return (
    <Box borderColor="border.default" borderWidth={1} borderStyle="solid" borderRadius={6} p={3}>
      <Box display={"grid"} gridGap={3} sx={{justifyItems: 'start'}}>
        <CircleBadge>
          <Icon />
        </CircleBadge>
      </Box>
    </Box>
  )
}
