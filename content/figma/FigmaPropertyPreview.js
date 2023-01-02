import React from 'react'
import {Heading, Box, Text} from '@primer/react'

export default function FigmaPropertyPreview({components, property}) {

  const values = []
  const previewComponents = []

  for (const component of Object.values(components)) {
    if(values.includes(component.variantProps[property])) continue
    values.push(component.variantProps[property])
    previewComponents.push(component)
  }


  return (
    <article>
      <Box
        paddingY={10}
        borderColor="border.muted"
        bg="neutral.subtle"
        borderWidth={1}
        borderRadius={10}
        marginTop={3}
        borderStyle="solid"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >
        {previewComponents.map(component => (
          <img key={component.key} src={component.thumbnail_url} alt={component.name} />
        ))}
      </Box>
    </article>
  )
}
