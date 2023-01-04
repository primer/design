import React from 'react'
import {Heading, Box, Text} from '@primer/react'

const getPreviewComponents = (thumbnails, property, setProperties = {}) => {
  const values = []
  const previewComponents = []

  valueLoop: for (const preview of thumbnails) {
    // value already in array
    if (values.includes(preview.props[property].toLowerCase())) continue
    // definedProperty wrong
    for (const [setProp, setVal] of Object.entries(setProperties)) {
      if (preview.props[setProp].toLowerCase() !== setVal.toLowerCase()) {
        continue valueLoop
      }
    }
    // valid component
    values.push(preview.props[property].toLowerCase())
    previewComponents.push({...preview, ...{propertyValue: preview.props[property]}})
  }

  return previewComponents
}

export default function FigmaPropertyPreview({thumbnails, property, setProperties}) {
  const previewComponents = getPreviewComponents(thumbnails, property, setProperties)

  return (
    <Box
      paddingY={10}
      borderColor="border.muted"
      bg="neutral.subtle"
      borderWidth={1}
      borderRadius={10}
      marginTop={3}
      marginBottom={6}
      borderStyle="solid"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
      sx={{
        gap: 4
      }}
    >
      <Box
        sx={{
          display: 'table',
          tableLayout: 'auto',
          textAlign: 'center',
          borderCollapse: 'separate',
          borderSpacing: '24px 8px'
        }}
      >
        <Box sx={{display: 'table-row'}}>
          {previewComponents.map(component => {
            const componentName = Object.entries(component.props)
            .flatMap(propArr => propArr.join(': '))
            .join(', ')

            return (
              <Box sx={{display: 'table-cell', verticalAlign: 'middle'}}>
                <img
                  width="50%"
                  src={component.url}
                  alt={componentName}
                />
              </Box>
            )
          })}
        </Box>
        <Box sx={{display: 'table-row'}}>
          {previewComponents.map(component => (
            <Text sx={{fontSize: '1', color: 'fg.subtle', display: 'table-cell', verticalAlign: 'middle'}}>
              {component.propertyValue}
            </Text>
          ))}
        </Box>
      </Box>
    </Box>
  )
}