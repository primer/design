import React from 'react'
import {Heading, ActionMenu, Box, ActionList} from '@primer/react'

const makeNewState = (currentState = {}, newProps) => {
  // copy object
  const newState = {...currentState}
  // update current state with new prop values
  for (const [name, value] of Object.entries(newProps)) {
    newState[name] = value
  }

  return newState
}

export default function FigmaComponentExamples({properties, thumbnails}) {
  const [previewState, setPreviewState] = React.useState([])

  React.useEffect(() => {
    // create initial state from default values
    const defaultValues = Object.fromEntries(properties.map(property => [property.name, property.defaultValue]))
    // set initial state
    setPreviewState(makeNewState({}, defaultValues))
  }, [])

  const handleClick = (propertyName, value) => {
    setPreviewState(makeNewState(previewState, {[propertyName]: value}))
  }

  return (
    <article>
      <Box
        display="flex"
        alignItems="start"
        sx={{
          gap: 4,
          flexWrap: 'wrap'
        }}
      >
        {properties.map(property => {
          return (
            <Box key={property.name} alignItems={'flex-start'} display={'flex'} flexDirection="column" sx={{gap: 1}}>
              <ActionMenu>
                <ActionMenu.Button aria-label="Select field type">
                  {property.name}: {previewState[property.name]}
                </ActionMenu.Button>
                <ActionMenu.Overlay>
                  <ActionList selectionVariant="single">
                    {property.values.map(value => (
                      <ActionList.Item
                        key={`${property.name}-${value}`}
                        selected={value === previewState[property.name]}
                        onSelect={() => handleClick(property.name, value)}
                      >
                        {value}
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
          const curThumbnailProps = Object.entries(thumbnail.props)
          let isActive = curThumbnailProps.every(([prop, value]) => {
            return value === previewState[prop]
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
