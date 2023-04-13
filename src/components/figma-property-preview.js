import React from 'react'
import {Box, Text} from '@primer/react'
import InlineCode from '@primer/gatsby-theme-doctocat/src/components/inline-code'

const getPreviewComponents = (thumbnails, property, setProperties = {}) => {
  const values = []
  const previewComponents = []

  const preparedThumbnails = thumbnails.map(t => ({
    ...t,
    props: t.props.reduce((acc, prop) => {
      acc[prop.name] = prop.value
      return acc
    }, {}),
  }))

  valueLoop: for (const preview of preparedThumbnails) {
    // value already in array
    if (values.includes(preview.props[property])) continue
    // definedProperty wrong
    for (const [setProp, setVal] of Object.entries(setProperties)) {
      if (!preview.props[setProp] || preview.props[setProp] !== setVal.toLowerCase()) {
        continue valueLoop
      }
    }
    // valid component
    values.push(preview.props[property])
    previewComponents.push({...preview, ...{propertyValue: preview.props[property]}})
  }

  return previewComponents
}

export default function FigmaPropertyPreview({thumbnails, property, setProperties = {}}) {
  const previewComponents = getPreviewComponents(thumbnails, property, setProperties)

  return (
    <Box
      paddingY={8}
      bg="canvas.subtle"
      borderRadius={10}
      marginBottom={6}
      display="flex"
      alignItems="stretch"
      justifyContent="center"
      flexWrap="wrap"
      flexDirection="row"
      sx={{
        gap: 5,
      }}
    >
      {previewComponents.map(component => {
        const componentName = Object.entries(component.props)
          .flatMap(propArr => propArr.join(': '))
          .join(', ')

        return (
          <Box key={componentName} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
            <Box sx={{flexGrow: 1, alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
              <img width="50%" src={component.url} alt={componentName} />
            </Box>
            <Text sx={{fontSize: '1', color: 'fg.subtle', verticalAlign: 'middle'}}>
              <InlineCode>{component.propertyValue}</InlineCode>
            </Text>
          </Box>
        )
      })}
    </Box>
  )
}
