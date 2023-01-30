import React from 'react'
import {Box} from '@primer/react'
import { Caption } from '@primer/gatsby-theme-doctocat'

function ImageBox({caption, children, props, paddingX = false}) {
  return (
    <>
      <Box
        as="figure"
        {...props}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 6,
          borderWidth: 0,
          borderColor: 'border.subtle',
          borderStyle: 'solid',
          backgroundColor: 'neutral.subtle',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: paddingX ? 3 : 0,
          paddingBottom: paddingX ? 3 : 0,
          margin: 0
        }}
      >
        {children}
      </Box>
      {caption && (
        <Box
          as="figcaption"
          sx={{
            display: 'flex',
            alignSelf: 'stretch',
            padding: 2,
            justifyContent: 'center',
            marginBottom: 6,
            fontSize: 1,
            color: 'fg.muted'
          }}
        >
          {caption}
        </Box>
      )}
    </>
  )
}

export default ImageBox