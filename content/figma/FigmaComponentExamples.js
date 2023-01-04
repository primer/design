import React from 'react'
import {Heading, ActionMenu, Box, ActionList} from '@primer/react'

export default function FigmaComponentExamples({properties, thumbnails}) {
  const [previewState, setPreviewState] = React.useState([])

  React.useEffect(() => {
    let newArr = []

    properties.map(property => {
      newArr.push(property.defaultValue)
    })

    setPreviewState(newArr)
  }, [])

  const handleClick = (index, value) => {
    let newArr = [...previewState]
    newArr[index] = value
    setPreviewState(newArr)
  }

  return (
    <article>
      <Box
        display="flex"
        alignItems="start"
        sx={{
          gap: 4
        }}
      >
        {properties.map((variant, index) => {
          console.log('VARIANT', variant)
          let variantIndex = index

          return (
            <Box alignItems={'flex-start'} display={'flex'} flexDirection="column" sx={{gap: 1}}>
              <ActionMenu key={index}>
                <ActionMenu.Button aria-label="Select field type">
                  {variant.name}: {previewState[variantIndex]}
                </ActionMenu.Button>
                <ActionMenu.Overlay>
                  <ActionList selectionVariant="single">
                    {variant.values.map((name, index) => (
                      <ActionList.Item
                        key={index}
                        selected={name === previewState[variantIndex]}
                        onSelect={() => handleClick(variantIndex, name)}
                      >
                        {name}
                      </ActionList.Item>
                    ))}
                  </ActionList>
                </ActionMenu.Overlay>
              </ActionMenu>
            </Box>
          )
        })}
      </Box>

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
        {thumbnails.map((thumbnail, index) => {
          // let variantNames = thumbnail[1].name.split(',')
          // let variantTypes = variantNames.map(type => {
          //   return type.split('=')[1]
          // })
          const variantTypes = Object.values(thumbnail.props)
          let isActive = variantTypes.every((type, index) => {
            return type === previewState[index]
          })
          const componentName = Object.entries(thumbnail.props)
            .flatMap(propArr => propArr.join(': '))
            .join(', ')

          return (
            isActive && (
              <Box display={'flex'} justifyContent="center" key={index}>
                <img width="50%" src={thumbnail.url} alt={componentName} />
              </Box>
            )
          )
        })}
      </Box>
    </article>
  )
}
