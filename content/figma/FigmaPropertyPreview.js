import React from 'react'
import {Heading, Box, Text} from '@primer/react'

export default function FigmaPropertyPreview({components, property}) {

  const values = []
  const previewComponents = []

  for (const component of Object.values(components)) {
    if(values.includes(component.variantProps[property])) continue
    values.push(component.variantProps[property])
    previewComponents.push({...component, ...{'currentProperty': component.variantProps[property]}})
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
        gap={4}
      >
        {previewComponents.map(component => (
          <Box key={component.key} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3}}>
            <img src={component.thumbnail_url} alt={component.name} />
            <Text fontSize={1}>{component.currentProperty}</Text>
          </Box>
        ))}
      </Box>
    </article>
  )
}
