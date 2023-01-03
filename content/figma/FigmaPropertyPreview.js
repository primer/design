import React from 'react'
import {Heading, Box, Text} from '@primer/react'

const getPreviewComponents = (components, property, setProperties = {}) => {
  const values = []
  const previewComponents = []

  valueLoop: for (const component of Object.values(components)) {
    // value already in arrya
    if (values.includes(component.variantProps[property])) continue
    // definedProperty wrong
    for (const [setProp, setVal] of Object.entries(setProperties)) {
      if(component.variantProps[setProp] !== setVal) {
        continue valueLoop
      }
    }
    // valid component
    values.push(component.variantProps[property])
    previewComponents.push({...component, ...{currentProperty: component.variantProps[property]}})
  }

  return previewComponents
}

export default function FigmaPropertyPreview({components, property, setProperties}) {

  const previewComponents = getPreviewComponents(components, property, setProperties)

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
        sx={{
          gap: 4
        }}
      >
        <Box sx={{display: 'table', width: '100px', tableLayout: 'auto', textAlign: 'center', borderCollapse: 'separate', borderSpacing: '24px 8px'}}>
          <Box sx={{display: 'table-row'}}>
            {previewComponents.map(component => (
              <Box key={`${component.key}-img`} sx={{display: 'table-cell', verticalAlign: 'middle'}}>
                <img src={component.thumbnail_url} alt={component.name} />
              </Box>
            ))}
          </Box>
          <Box sx={{display: 'table-row'}}>
            {previewComponents.map(component => (
              <Text
                key={component.key}
                sx={{fontSize: '1', color: 'fg.subtle', display: 'table-cell', verticalAlign: 'middle'}}
              >
                {component.currentProperty}
              </Text>
            ))}
          </Box>
        </Box>
      </Box>
    </article>
  )
}
