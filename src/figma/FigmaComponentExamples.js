import React from 'react'
import {ActionMenu, Box, ActionList, ToggleSwitch} from '@primer/react'

const makeNewState = (currentState = {}, newProps) => {
  // copy object
  const newState = {...currentState}
  // update current state with new prop values
  for (const [name, value] of Object.entries(newProps)) {
    newState[name] = value
  }

  return newState
}

const SwitchComponent = ({item}) => {
  const [switchState, setSwitchState] = React.useState(item.defaultValue)
  return (
    <Box key={item.name} alignItems={'center'} display={'flex'} sx={{gap: 1}}>
      <Box flexGrow={1} fontSize={2} fontWeight="bold" id={item.name}>
        {item.name}
      </Box>
      <ToggleSwitch onClick={() => setSwitchState(!switchState)} aria-labelledby={item.name} />
      {/* <ToggleSwitch onClick={() => handleClick(property.name, value)} aria-labelledby={property.name} />{' '} */}
    </Box>
  )
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

  const booleans = properties.filter(property => property.type === 'BOOLEAN')
  const filteredProperties = properties.filter(property => property.type !== 'BOOLEAN')

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
        {booleans.map(property => {
          return (
            // <Box key={property.name} alignItems={'center'} display={'flex'} sx={{gap: 1}}>
            //   <Box flexGrow={1} fontSize={2} fontWeight="bold" id={property.name}>
            //     {property.name}
            //   </Box>
            //   <ToggleSwitch onClick={() => handleClick(property.name, value)} aria-labelledby={property.name} />{' '}
            // </Box>
            <SwitchComponent item={property} />
          )
        })}
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
          const curPreviewState = Object.entries(previewState)
          let isActive = curPreviewState.every(([prop, value]) => {
            return value === thumbnail.props[prop]
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
